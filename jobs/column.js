define('jobs/column', function(require, exports, module) {
	require('modules/jquery-1.8.2.min');
	require('modules/jquery-ui.min');

	var spanWidth, Column
		View = require('jobs/view');

	Column = View.extend({
		initialize : function() {
			Column.__super__.initialize.apply(this, arguments);

			var $el = this.$el,
				that = this;

			this.spanNum = +($el.attr('col'));
			this.spanWidth = $el.width() / this.spanNum;

			$el.resizable({
				resize : function() {
					var spanNum = Math.round($el.width() / that.spanWidth);
					var offsetSpan = spanNum - that.spanNum;
					if(offsetSpan) {
						if( that.parent && that.parent.updateNextVariableColumn(that, offsetSpan) ) {
							that.setSpan(spanNum);
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

			$el.draggable({
				'zIndex' : 10000,
				scroll : false,
				containment : '.container',
				revert : true,
				start : function() {},
				stop : function() {}
			});
		},

		setSpan : function(num) {
			if(num !== this.spanNum) {
				this.$el.removeClass('span' + this.spanNum);
				this.$el.addClass('span' + num);
				this.$el.attr('col', num);
				this.spanNum = num;	
			}
		}
	});

	module.exports = Column;
});