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

            $el.resizable({
                resize : function(event, ui) {
                    var spanNum = Math.round($el.width() / that.spanWidth);
                    var offsetSpan = spanNum - that.spanNum;
                    if(offsetSpan) {
                        if( that.parent && that.parent.updateNextVariableColumn(that, offsetSpan) ) {         
                            that.setSpan(spanNum);
                        }
                    }
                },
                start : function() {
                    //$el.draggable('disable');
                    that.spanWidth = that.$el.width() / that.spanNum;
                    $el.css('position', 'relative');
                },
                stop : function() {
                    //$el.draggable('enable');
                    $el.removeAttr('style');
                }//,
                //grid : [this.spanWidth, 10],
                //maxWidth : this.spanWidth * 11,
                //minWidth : this.spanWidth * 1
            });
            $el.find('.ui-resizable-s').hide();
            $el.find('.ui-resizable-e').hide();

            $el.draggable({
                'zIndex' : 10000,
                scroll : false,
                handle : '.drag-bar',
                revert : true,
                start : function() {
                    //$el.draggable('disable');
                },
                stop : function() {
                    //$el.draggable('enable');
                    $el.removeAttr('style');
                }
            });

            $('<div class="drag-bar"><i class="icon-move"></i></div>').appendTo($el);
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
        },

        events:{
            'mouseenter':'showDragBar',
            'mouseleave':'hideDragBar'
        }
    });

    module.exports = Column;
});
