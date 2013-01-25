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

                    if(index === undefined || (row === that && column.getIndex() === index)) {
                        return;
                    }

                    // if(index !== 0) {
                    //     if(row !== that) {
                    //         column.$el.insertAfter(that.children[index - 1].$el);
                    //     } else {
                    //         column.$el.insertAfter(that.children[index].$el);
                    //     }
                    // } else {
                    //     column.$el.prependTo(that.$el);
                    // }
                    ui.draggable.removeAttr('style');

                    row.removeChild(column);
                    that.addChild(column, index);

                    that.updateViewIndex();

                    if(row !== that) {
                        row.averageSpan();
                        that.averageSpan();
                    }

                    that.ownerDocument.updateRowByCid(row);
                    that.ownerDocument.updateRowByCid(that);
                },
                tolerance : 'pointer'
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
                nextColumn = this.children[i];
                if( (offset > 0 && nextColumn.spanNum - offset > 0) ||
                    (offset < 0 && nextColumn.spanNum - offset < 12) ) {
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
        },

        updateViewIndex : function(index) {
            for(var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.$el.appendTo(this.$el);
            }
        },

        //TODO updateView方法 销毁所有view重新生成
        //updateView : function() {},

        dispose : function() {
            this.$el.droppable( "destroy" );
            Row.__super__.dispose.apply(this);
        }
    });

    module.exports = Row;
});
