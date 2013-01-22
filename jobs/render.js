define('jobs/render', function(require, exports, module) {
	var $ = require('$'),
	backbone = require('backbone'),
    rowCollection = require('class/hercules-collection').row,
    Model = require('class/hercules-model'),
	_ = require('underscore');

	require('modules/jquery-ui.min');

	var DOMS = {
		box: 'div[node-type=box]',
		col: 'div[node-type=col]',
		row: 'div[node-type=row]',
		editbox: 'div[node-type=edit-box]'
	};

	var mydoc;

	//预览或者初始化渲染用view
	var ViewRender = backbone.View.extend({
		el: 'div[node-type=main]',
		events: {
			'mouseenter div[node-type=content]': 'enterBox',
			'mouseleave div[node-type=content]': 'leaveBox',
			'mouseleave div[node-type=edit-box]': 'leaveEditBox',
			'click [action-type=bold]': 'bold',
			'click [action-type=italic]': 'italic',
			'click [action-type=tag]': 'tag',
			'click [action-type=alignLeft]': 'alignLeft',
			'click [action-type=alignCenter]': 'alignCenter',
			'click [action-type=alignRight]': 'alignRight',
			'click [action-type=trash]': 'trash'			
		},
		enterBox: function(e) {
			var item = $(e.currentTarget),
			type = item.attr('data-type');
			if (type !== 'mixed') {
				item.closest(DOMS.box).append(this.createNav(type));
			}
			return false;
		},
		leaveBox: function(e) {
			var item = $(e.currentTarget),
			relatedTarget = $(e.relatedTarget),
			type = item.attr('data-type');
			if (relatedTarget.closest(DOMS.editbox).length) return false;
			if (type !== 'mixed') {
				$(DOMS.editbox).remove();
			}
			return false;
		},
		leaveEditBox: function(e) {
			$(DOMS.editbox).remove();
		},
		createNav: function(type) {
			var navs = {
				'text': '<li><a href="#"><i class="icon-bold" action-type="bold"></i></a></li>\
                       <li><a href="#"><i class="icon-italic" action-type="italic"></i></a></li>\
                       <li><a href="#"><i class="icon-tag" action-type="tag"></i></a></li>\
                       <li><a href="#"><i class="icon-align-left" action-type="alignLeft"></i></a></li>\
                       <li><a href="#"><i class="icon-align-center" action-type="alignCenter"></i></a></li>\
                       <li><a href="#"><i class="icon-align-right" action-type="alignRight"></i></a></li>\
                       <li><a href="#"><i class="icon-trash" action-type="trash"></i></a></li>',
				'image': '<li><a href="#"><i class="icon-align-left"></i></a></li>\
                       <li><a href="#"><i class="icon-align-center"></i></a></li>\
                       <li><a href="#"><i class="icon-align-right"></i></a></li>\
                       <li><a href="#"><i class="icon-trash" action-type="trash"></i></a></li>'
			},
			html = '<div class="edit-box" node-type="edit-box">\
                           <div class="navbar">\
                               <div class="navbar-inner">\
                                   <div class="container">\
                                       <div class="nav-collapse collapse">\
                                           <ul class="nav edit-li">\
                                                ' + navs[type] + '\
                                           </ul>\
                                       </div>\
                                   </div>\
                               </div>\
                           </div>\
                       </div>';
			return html;
		},
		createRow: function(model) {
			var ret = '<div class="row-fluid" node-type="row" data-id="' + model.cid + '">',
			children = model.get('children');
			recursion(children);
			ret += '</div>';

			function recursion(children) {
				for (var k = 0; k < children.length; k++) {
					ret += '<div data-id="' + children[k].cid + '" class="span' + children[k].get("col") + '" data-col="' + children[k].get("col") + '" node-type="col">' + '<div class="box" node-type="box">' + '<div class="item-box" node-type="content" data-type="' + children[k].get("type") + '">';
					if (children[k].get('children')) {
						ret += '<div class="row-fluid" node-type="row" data-id="' + children[k].cid + '">';
						recursion(children[k].get('children'));
						ret += '</div>';
					} else {
						ret += children[k].get('html');
					}
					ret += '</div></div></div>';
				}
			}

			return ret;
		},
		recursionModel: function(model) {
			var ret = '';
			for (var i = 0; i < model.length; i++) {
				ret += this.createRow(model.models[i]);
			}
			return ret;
		},
		getHtml: function() {
			var html = this.recursionModel(this.model);
			return html;
		},
		render: function() {
			var html = this.getHtml();
			$(this.el).html(html);
			this.batchDoc();
            /*
            this.updateRowByCid('c18',
			{
				col: 12,
				children: [
				new Model.text({
					col: 4
				}), new Model.text({
					col: 4
				}), new Model.text({
					col: 4
				})]
			});
            */
		},
        //更新方法
        updateRowByCid:function(rootRowcid,value){
            var row = this.model.find(function(item){
                return item.cid == rootRowcid;
            });
            if(row) row.set(value);
        },
		removeByCid: function(rowcid, colcid) {
			var self = this,
			rowModel = this.model.getRowModel(rowcid)['current'],
			children = rowModel.get('children');
			if (children.length) {
				var index = this.model.findColModelIndex(children, colcid);
				if (index !== undefined) {
					children.splice(index, 1);
					this.removeOne(colcid);
					if (!children.length) {
						clearParentChildren(rowcid);
					}
				}
			}

			function clearParentChildren(cid) {
				var Model = self.model.getRowModel(cid);
				if (Model.ParentChildren === undefined) {
					self.model.remove(Model['current']);
					self.removeOne(cid);
					return;
				}
				var children = Model.ParentChildren;
				var index = self.model.findColModelIndex(children, cid);
				if (index !== undefined) {
					children.splice(index, 1);
					if (!children.length) {
						clearParentChildren(Model.parentCid);
					} else {
						self.removeOne(cid);
					}
				} else {
					clearParentChildren(cid);
				}
			}

		},
		addOne: function(model, collection) {
			var html = $(this.createRow(collection.first()));
			$(this.el).prepend(html);
			this.batchDoc();
		},
		clearDZP: function(els, method) {
			els.each(function(index, item) {
				if ($.isFunction(item[method])) item[method]("destroy");
			});
		},
		batchDoc: function() {
			var $doc = this.options.$doc,
			$row = this.options.$row,
			$col = this.options.$col;
			//全部删除
			var cols = $(this.el).find(DOMS.col);
			var rows = $(this.el).find(DOMS.row);
			this.clearDZP(cols, 'draggable');
			this.clearDZP(cols, 'resizable');
			this.clearDZP(rows, 'droppable');
			//全部再绑定一次
			mydoc = new $doc({
				el: $(this.el),
                model:this.model,
                updateRowByCid:this.updateRowByCid //把更新方法给$doc做改变ui时更新数据用,用法见113行
			});
			rows.each(function(index, rowitem) {
				var row = new $row({
					el: $(rowitem)
				});
				$(rowitem).find(DOMS.col).each(function(index, colitem) {
					row.addChild(new $col({
						el: $(colitem)
					}));
				});
				mydoc.addChild(row);
			});
			//console.log(mydoc);
		},
		trash: function(e) {
			var self = this,
			target = $(e.currentTarget),
			rowTarget = target.closest(DOMS.row),
			colTarget = target.closest(DOMS.col),
			rowcid = rowTarget.attr('data-id'),
			colcid = colTarget.attr('data-id');
			this.removeByCid(rowcid, colcid);
		},
		removeOne: function(cid) {
			var target = $('[data-id=' + cid + ']');
			this.clearDZP(target, 'draggable');
			this.clearDZP(target, 'resizable');
			this.clearDZP(target, 'droppable');
			target.remove();
		},
		getSelectedText : function() {
			var selectedText;
			//ff、chrome，用getSelection
			if(window.getSelection) {
				selectedText=window.getSelection();
			}
			//ie利用Range
			else if(document.selection) {
				selectedText=document.selection.createRange().text;
			}
		},
		bold : function(e) {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest(DOMS.col).attr('data-id');
			var node = mydoc.getChild(id).getElement().find('[node-type=content]');
			if(selectedText) {
				var reg = new RegExp(selectedText);
				node.innerHTML.replace(reg, '<b>' + selectedText + '</b>');
			} else {
				node.innerHTML = '<b>' + node.innerHTML + '</b>';
			}
		},
		italic : function() {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest(DOMS.col).attr('data-id');
			var node = mydoc.getChild(id).getElement().find('[node-type=content]');
			if(selectedText) {
				var reg = new RegExp(selectedText);
				node.innerHTML.replace(reg, '<i>' + selectedText + '</i>');
			} else {
				node.innerHTML = '<i>' + node.innerHTML + '</i>';
			}
		},
		tag : function() {},
		alignLeft : function() {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest(DOMS.col).attr('data-id');
			var node = mydoc.getChild(id).getElement().find('[node-type=content]');
			node.style.align = 'left';
		},
		alignRight : function() {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest(DOMS.col).attr('data-id');
			var node = mydoc.getChild(id).getElement().find('[node-type=content]');
			node.style.align = 'right';
		},
		alignCenter : function() {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest(DOMS.col).attr('data-id');
			var node = mydoc.getChild(id).getElement().find('[node-type=content]');
			node.style.align = 'center';
		}
	});

	module.exports = ViewRender;
});

