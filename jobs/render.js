define('jobs/render', function(require, exports, module) {
	var $ = require('$'),
	backbone = require('backbone'),
	_ = require('underscore');

	//预览或者初始化渲染用view
	var ViewRender = backbone.View.extend({
		el: 'div[node-type=main]',
		recursionModel: function(model) {
            var ret = '';
			for (var i = 0; i < model.length; i++) {
                ret += '<div class="row-fluid" node-type="row">';
				var children = model.models[i].get('children');
			    recursion(children);
                ret += '</div>';
			}
			function recursion(children) {
				for (var k = 0; k < children.length; k++) {
                    ret += '<div data-id="'+children[k].cid+'" class="span'+children[k].get("col")+'" data-col="'+children[k].get("col")+'" node-type="col">'+
                           '<div class="box" node-type="box">'+
                           '<div class="item-box" node-type="content" data-type="'+children[k].get("type")+'">';
					if (children[k].get('children')) {
                        ret += '<div class="row-fluid" node-type="row">';
						recursion(children[k].get('children'));
                        ret += '</div>';
                        ret += '<div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>';
					}else{
                        ret += children[k].get('html');
                        ret += '<div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>';
                    }
                    ret += '</div></div></div>';
				}
			}
            return ret;
		},
		render: function() {
			var html = this.recursionModel(this.model);
            $(this.el).html(html);
		}
	});

	module.exports = ViewRender;
});

