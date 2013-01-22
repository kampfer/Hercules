define('jobs/column', function(require, exports, module) {
    require('modules/jquery-1.8.2.min');
    require('modules/jquery-ui.min');

    var spanWidth, Column,
        View = require('jobs/view');

    Column = View.extend({
        events:{
            'mouseenter':'showDragBar',
            'mouseleave':'hideDragBar'
        },
        
        initialize : function() {
            Column.__super__.initialize.apply(this, arguments);

            var $el = this.$el,
                that = this;
            this.spanNum = +($el.attr('data-col'));
        },

        setSpan : function(num) {
            if(num !== this.spanNum) {
                this.$el.removeClass('span' + this.spanNum);
                this.$el.addClass('span' + num);
                this.$el.attr('data-col', num);
                this.spanNum = num; 
            }
        },

        getSpanWidth : function() {
            return this.$el.width() / this.spanNum;
        },

        hideDragBar : function() {
            this.$el.find('.drag-bar').hide();
        },

        showDragBar : function() {
            this.$el.find('.drag-bar').show();
        }
    });

    module.exports = Column;
});
