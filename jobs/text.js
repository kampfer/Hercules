define('jobs/text', function(require, exports, module) {
    var View = require('jobs/view');

    var Text = View.extend({
        initialize : function(options, content) {
            Text.__super__.initialize.apply(this, arguments);
            
            var $el = this.$el,
                that = this;

            $el.html(content);
            $('<div class="drag-bar"><i class="icon-move"></i></div>').appendTo($el);

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
                }/*,
                grid : [this.spanWidth, 10],
                minWidth : this.spanWidth,
                maxWidth : this.spanWidth * 11*/
            });
            $el.find('.ui-resizable-s').hide();
            $el.find('.ui-resizable-e').hide();

            $el.draggable({
                'zIndex' : 10000,
                scroll : false,
                handle : '.drag-bar',
                revert : true,
                stop : function() {
                    $el.removeAttr('style');
                }
            });

            $el.removeAttr('style');
        },

        events:{
            'mouseenter':'showDragBar',
            'mouseleave':'hideDragBar'
        },

        hideDragBar : function() {
            this.$el.find('.drag-bar').hide();
        },

        showDragBar : function() {
            this.$el.find('.drag-bar').show();
        }
    });

    module.exports = Text;
});