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
		child: 'div[node-type=child]',
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
			//'focus div[data-type=text]': 'editText',
			//'blur div[data-type=text]': 'changeText'
		},
		enterBox: function(e) {
			var item = $(e.currentTarget),
			type = item.attr('data-type');
			if (type !== 'mixed') {
				//item.closest(DOMS.box).append(this.createNav(type));
				item.append(this.createNav(type));
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
			_.each(children, function(item) {
				ret += '<div data-id="' + item.cid + '" class="span' + item.get("col") + '" data-col="' + item.get("col") + '" node-type="col">' + '<div class="box" node-type="box">' + '<div class="item-box" node-type="content" data-type="' + item.get('type') + '">';
				if (item.get('type') == 'mixed') {
					_.each(item.get('children'), function(child) {
						ret += '<div data-id="' + child.cid + '" data-col="' + child.get("col") + '" node-type="child">';
						ret += '<div class="box" node-type="box">';
						ret += '<div class="item-box" node-type="content" data-type="' + child.get('type') + '">' + child.get('html') + '</div>';
						ret += '</div>';
						ret += '</div>';
					});
				} else {
					ret += item.get('html');
				}
				ret += '</div></div></div>';
			});
			ret += '</div>';
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
			// var html = this.getHtml();
			// $(this.el).html(html);
			// this.batchDoc();
			this.doc = mydoc = new this.options.$doc({
				el: $(this.el),
				model : this.model
			});
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
		updateRowByCid: function(rootRowcid, value) {
			var row = this.model.find(function(item) {
				return item.cid == rootRowcid;
			});
			if (row) row.set(value);
		},
		removeByCid: function(rowcid, colcid, childcid) {
			var self = this,
			rowModel = this.model.getRowModel(rowcid),
			children = rowModel.get('children'),
			colmodel = this.model.findColModel(children, colcid);
			removeChildren = function(child, cid) {
				for (var i = 0; i < child.length; i++) {
					if (child[i].cid == cid) {
						child.splice(i, 1);
						break;
					}
				}
				self.removeOne(cid);
			};
			if (colmodel.get('type') === 'mixed') {
				var child = colmodel.get('children');
				removeChildren(child, childcid);
				if (!child.length) {
					removeChildren(children, colcid);
				}
			} else {
				removeChildren(children, colcid);
			}
			if (!children.length) {
				this.removeOne(rowcid);
				this.model.remove({
					cid: rowcid
				});
			}
		},
		addOne: function(model, collection) {
			mydoc.traverse2AddRow(collection.last());
			//for(collection.last())
			//var html = $(this.createRow(collection.first()));
			//$(this.el).prepend(html);
			//this.batchDoc();
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
				model: this.model,
				updateRowByCid: this.updateRowByCid //把更新方法给$doc做改变ui时更新数据用,用法见113行
			});
			rows.each(function(index, rowitem) {
				var row = new $row({
					el: $(rowitem)
				});
				//一级列加入
				$(rowitem).find(DOMS.col).each(function(index, colitem) {
					var col = new $col({
						el: $(colitem)
					});
					row.addChild(col);
				});
				mydoc.addChild(row);
			});
			//console.log(mydoc);
		},
		trash: function(e) {
			// var self = this,
			// target = $(e.currentTarget),
			// rowTarget = target.closest(DOMS.row),
			// colTarget = target.closest(DOMS.col),
			// childTarget = target.closest(DOMS.child),
			// childcid = childTarget.attr('data-cid'),
			// rowcid = rowTarget.attr('data-cid'),
			// colcid = colTarget.attr('data-cid');
			var colcid = $(e.currentTarget).closest('div[data-type]').attr('data-cid'),
				col = mydoc.getChild(colcid),
				row = col.getParent(),
				rowcid = row.getId(),
				childcid;
			this.removeByCid(rowcid, colcid, childcid);
			row.averageSpan();
			mydoc.updateRowByCid(row);
		},
		removeOne: function(cid) {
			// var target = $('[data-id=' + cid + ']');
			// this.clearDZP(target, 'draggable');
			// this.clearDZP(target, 'resizable');
			// this.clearDZP(target, 'droppable');
			// target.remove();
			var target = mydoc.getChild(cid), parent = target.getParent();
			parent.removeChild(target);
			target.dispose();
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

			return selectedText;
		},
		bold : function(e) {
			var selectedText = this.getSelectedText();
			if(selectedText) {
				var reg = new RegExp(selectedText),
					id = $(e.currentTarget).closest('div[data-type]').attr('data-cid'),
					text = mydoc.getChild(id);
				text.setContent( text.html.replace(reg, '<b>' + selectedText + '</b>') );
			}
		},
		italic : function(e) {
			var selectedText = this.getSelectedText();
			if(selectedText) {
				var reg = new RegExp(selectedText),
					id = $(e.target).closest('div[data-type=text]').attr('data-cid'),
					text = mydoc.getChild(id);
				console.log($(e.target).closest('div[data-type=text]'));
				text.setContent( text.html.replace(reg, '<i>' + selectedText + '</i>') );
			}
		},
		tag : function() {},
		alignLeft : function(e) {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest('div[data-type]').attr('data-cid');
			var node = mydoc.getChild(id);
			node.$text.css('text-align', 'left');
			mydoc.updateRowByCid(node.getParent());
		},
		alignRight : function(e) {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest('div[data-type]').attr('data-cid');
			var node = mydoc.getChild(id);
			node.$text.css('text-align', 'right');
			mydoc.updateRowByCid(node.getParent());
		},
		alignCenter : function(e) {
			var selectedText = this.getSelectedText(),
				$target = $(e.currentTarget),
				id = $target.closest('div[data-type]').attr('data-cid');
			var node = mydoc.getChild(id);
			node.$text.css('text-align', 'center');
			mydoc.updateRowByCid(node.getParent());
		}
	});

	module.exports = ViewRender;
});

