define('jobs/column', function(require, exports, module) {
	var backbone = require('modules/backbone');
	require('modules/jquery-1.8.2.min');
	require('modules/jquery-ui.min');

	var Column = backbone.View.extend({
		initialize : function() {
			//this.listenTo(this.model, "change", this.render);
			this.render();
		},

		//TODO 取消垂直和水平方向的缩放条 ghost属性不起作用
		render : function() {
			this.$el.draggable().resizable({
				start : function( event, ui ) {
					ui.element.css('position', 'relative');
				},
				ghost : false
			});
			this.$el.find('.ui-resizable-s').hide();
			this.$el.find('.ui-resizable-e').hide();
		}
	});

	module.exports = Column;
});