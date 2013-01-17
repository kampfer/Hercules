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
                    var id = ui.draggable.attr('id'),
                        column = that.ownerDocument.getChild(id);
                    ui.draggable.removeAttr('style');
                    ui.draggable.appendTo($el);
                    that.addChild(column);
                    that.averageSpan();
                },
                tolerance : 'pointer'
            });
        },

        getColumnIndex : function(column) {
            var id = typeof column === 'string' ? column : column.getId();
            var index = this.childrenMap[id];
            
            return index;
        },

        averageSpan : function() {
            var span = 12 / this.children.length;
            for(var i = 0, child; child = this.children[i]; i++) {
                child.setSpan(span);
            }
        },

        updateNextVariableColumn : function(column, offset) {
            var index = this.getColumnIndex(column), nextColumn;

            for(var i = index + 1; i < this.children.length; i++) {
                if( (offset > 0 && this.children[i].spanNum > 1) ||
                    (offset < 0 && this.children[i].spanNum < 12) ) {
                    nextColumn = this.children[i];
                    nextColumn.setSpan(nextColumn.spanNum - offset);
                    return true;
                }
            }
        }
    });

    module.exports = Row;
});