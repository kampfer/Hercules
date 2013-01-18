define('jobs/render', function(require, exports, module) {
	var $ = require('$'),
	backbone = require('backbone'),
	_ = require('underscore');

    var DOMS = {
        box:'div[node-type=box]',
        editbox:'div[node-type=edit-box]'
    };

	//预览或者初始化渲染用view
	var ViewRender = backbone.View.extend({
		el: 'div[node-type=main]',
		events: {
			'mouseenter div[node-type=content]': 'enterBox',
			'mouseleave div[node-type=content]': 'leaveBox',
			'mouseleave div[node-type=edit-box]': 'leaveEditBox'
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
            if(relatedTarget.closest(DOMS.editbox).length) return false;
			if (type !== 'mixed') {
				$(DOMS.editbox).remove();
			}
			return false;
		},
        leaveEditBox:function(e){
			$(DOMS.editbox).remove();
        },
		createNav: function(type) {
			var navs = {
				'text': '<li><a href="#"><i class="icon-bold"></i></a></li>\
                       <li><a href="#"><i class="icon-italic"></i></a></li>\
                       <li><a href="#"><i class="icon-tag"></i></a></li>\
                       <li><a href="#"><i class="icon-align-left"></i></a></li>\
                       <li><a href="#"><i class="icon-align-center"></i></a></li>\
                       <li><a href="#"><i class="icon-align-right"></i></a></li>\
                       <li><a href="#"><i class="icon-trash"></i></a></li>',
				'image': '<li><a href="#"><i class="icon-align-left"></i></a></li>\
                       <li><a href="#"><i class="icon-align-center"></i></a></li>\
                       <li><a href="#"><i class="icon-align-right"></i></a></li>\
                       <li><a href="#"><i class="icon-trash"></i></a></li>'
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
			var ret = '<div class="row-fluid" node-type="row">',
			children = model.get('children');
			recursion(children);
			ret += '</div>';

			function recursion(children) {
				for (var k = 0; k < children.length; k++) {
					ret += '<div data-id="' + children[k].cid + '" class="span' + children[k].get("col") + '" data-col="' + children[k].get("col") + '" node-type="col">' + '<div class="box" node-type="box">' + '<div class="item-box" node-type="content" data-type="' + children[k].get("type") + '">';
					if (children[k].get('children')) {
						ret += '<div class="row-fluid" node-type="row">';
						recursion(children[k].get('children'));
						ret += '</div>';
						ret += '<div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>';
					} else {
						ret += children[k].get('html');
						ret += '<div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>';
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
		},
		addOne: function(model, collection) {
			var html = this.createRow(collection.first());
			$(this.el).prepend(html);
		},
		removeOne: function(model, collection, options) {
			var cid = model.get('children')[options.index]['cid'];
			$('[data-id=' + cid + ']').remove();
		}
	});

	module.exports = ViewRender;
});

