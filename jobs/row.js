define('jobs/row', function(require, exports, module) {
    var View = require('jobs/view');
    require('modules/jquery-1.8.2.min');
    require('modules/jquery-ui.min');

    var Row = View.extend({
        initialize : function() {
            Row.__super__.initialize.apply(this, arguments);

            var $el = this.$el,
                that = this;

            this.$el.droppable({
                drop : function(event, ui) {
                    var id = ui.draggable.attr('data-cid'),
                        column = that.ownerDocument.getChild(id),
                        isMixed = column.children.length > 1,
                        row = column.getParent();

                    var index = that.findSpanIndexByOffsetLeft(event.pageX);
                    console.log(index);

                    if(index === undefined || (row === that && column.getIndex() === index)) {
                        return;
                    }

                    if(index !== 0) {
                        if(row !== that) {
                            column.$el.insertAfter(that.children[index - 1].$el);
                        } else {
                            column.$el.insertAfter(that.children[index].$el);
                        }
                    } else {
                        column.$el.prependTo(that.$el);
                    }
                    ui.draggable.removeAttr('style');

                    row.removeChild(column);
                    that.addChild(column, index);

                    if(row !== that) {
                        row.averageSpan();
                        that.averageSpan();
                    }

                    console.log(that.ownerDocument);
                },
                tolerance : 'intersect'
            });
        },

        averageSpan : function() {
            var baseSpan = Math.floor(12 / this.children.length),
                lastSpan = 12 % this.children.length;

            for(var i = 0, child; child = this.children[i]; i++) {
                if(i < lastSpan) {
                    child.setSpan(baseSpan + 1);
                } else {
                    child.setSpan(baseSpan);
                }
                
            }
        },

        updateNextVariableColumn : function(column, offset) {
            var index = column.getIndex(), nextColumn;

            for(var i = index + 1; i < this.children.length; i++) {
                if( (offset > 0 && this.children[i].spanNum > 1) ||
                    (offset < 0 && this.children[i].spanNum < 12) ) {
                    nextColumn = this.children[i];
                    nextColumn.setSpan(nextColumn.spanNum - offset);
                    return true;
                }
            }
        },

        //取得左边距小于offsetLeft,且值最接近offsetLeft的column
        findSpanIndexByOffsetLeft : function(offsetLeft) {
            var left = this.$el.offset().left;
            for(var i = 0, child; child = this.children[i]; i++) {
                left += child.$el.width();
                if(offsetLeft < left) {
                    return i;
                }
            }
            return i;
        }
    });

    module.exports = Row;
});
