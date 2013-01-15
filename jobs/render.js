define('jobs/render', function(require, exports, module) {
	var $ = require('$'),
	backbone = require('backbone'),
	_ = require('underscore');

	//预览或者初始化渲染用view
	var ViewRender = backbone.View.extend({
		el: 'div[node-type=main]',
		template: '<% for(var i=0;i<length;i++){ %>\
                    <div class="row-fluid" node-type="row">\
                        <% var children = models[i].get("children"); \
                           for(var k=0;k<children.length;k++){ \
                        %>\
                        <div class="span<%= children[k].get("col") %>" data-col="<%= children[k].get("col")%>" node-type="col">\
                            <div class="box" node-type="box">\
                                <div class="item-box" node-type="content" data-type="<%= children[k].get("type") %>">\
                                <% if(children[k].get("type") !== "mixed"){ %>\
                                    <%= children[k].get("html") %>\
                                <% }else { %>\
                                    <div class="row-fluid">\
                                        <% var rows = children[k].get("row");\
                                           for(var j=0;j<rows.length;j++){ %>\
                                            <div class="span<%= rows[j].get("col") %>">\
                                               <div class="box" node-type="box">\
                                                    <div class="item-box" data-type="<%= rows[j].get("type") %>">\
                                                        <%= rows[j].get("html") %>\
                                                        <div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>\
                                                    </div>\
                                               </div>\
                                            </div>\
                                        <% } %>\
                                    </div>\
                                <% }%>\
                                <div class="drag-bar" action-type="drag"><i class="icon-move"></i></div>\
                                </div>\
                            </div>\
                        </div>\
                        <% } %>\
                    </div>\
                  <% } %>',
		render: function() {
			$(this.el).html(_.template(this.template, this.model));
		}
	});

	module.exports = ViewRender;
});

