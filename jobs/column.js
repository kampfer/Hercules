define('jobs/column', function(require, exports, module) {
	var backbone = require('modules/backbone');
	require('modules/jquery-1.8.2.min');
	require('modules/jquery-ui.min');

	var spanWidth;

	var Column = backbone.View.extend({
		initialize : function() {
			//this.listenTo(this.model, "change", this.render);
			this.spanNum = +(this.$el.attr('col'));
			this.spanWidth = this.$el.width() / this.spanNum;
			this.row = null;
			this.id = this.$el.attr('id');

			this.render();
		},

		//TODO 取消垂直和水平方向的缩放条 ghost属性不起作用
		render : function() {
			var $el = this.$el,
				that = this;
			$el.resizable({
				resize : function() {
					var spanNum = Math.round($el.width() / that.spanWidth);
					if(spanNum !== that.spanNum) {
						//that.changeSpanNum(spanNum);
						console.log(spanNum);
						if(that.row) {
							that.row.updateColumn(that.id, spanNum);
						}
					}
				},
				stop : function() {
					$el.removeAttr('style');
				},
				grid : [this.spanWidth, 10],
				minWidth : this.spanWidth,
				maxWidth : this.spanWidth * 11
			});
			$el.find('.ui-resizable-s').hide();
			$el.find('.ui-resizable-e').hide();
		},

		changeSpanNum : function(num) {
			this.$el.removeClass('span' + this.spanNum);
			this.$el.addClass('span' + num);
			this.$el.attr('col', num);
			this.spanNum = num;
		}
	});

	module.exports = Column;
});