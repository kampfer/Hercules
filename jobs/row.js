define('jobs/row', function(require, exports, module) {
    var backbone = require('modules/backbone');
    require('modules/jquery-1.8.2.min');
    require('modules/jquery-ui.min');

    var Row = backbone.View.extend({
        initialize : function() {
            this.columns = [];
            this.columnMap = {};
            this.span = [];
            this.id = this.$el.attr('id');
            this.render();
        },

        render : function() {
            this.$el.droppable({
                out : function() {
                    console.log('out');
                },
                over : function(event, ui) {
                }
            });
        },

        addColumn : function(column) {
            this.columns.push(column);
            this.span.push(column.spanNum);
            this.columnMap[column.id] = this.columns.length - 1;
            column.row = this;
        },

        updateColumn : function(columnId, spanNum) {
            var columnIndex = this.columnMap[columnId],
                column = this.columns[columnIndex],
                spanOffset = spanNum - this.span[columnIndex];

            var nextColumn;
            for(var i = columnIndex + 1; i < this.columns.length; i++) {
                if( (spanOffset > 0 && this.columns[i].spanNum > 1) ||
                    (spanOffset < 0 && this.columns[i].spanNum < 12) ) {
                    nextColumn = this.columns[i];
                    this.span[i] -= spanOffset;
                    nextColumn.changeSpanNum(this.span[i]);
                    break;
                }
            }

            if(nextColumn) {
                this.span[columnIndex] = spanNum;
                column.changeSpanNum(spanNum);
            }
            console.log(this.span);
        }
    });

    module.exports = Row;

    var Column = require('jobs/column');
    var row = new Row({
        el : $('#test-row')
    });
    var column = new Column({
        el : $('#test')
    });
    var column2 = new Column({
        el : $('#test2')
    });
    row.addColumn(column);
    row.addColumn(column2);

    var row2 = new Row({
        el : $('#test-row2')
    });
    var column3 = new Column({
        el : $('#test3')
    });
    var column4 = new Column({
        el : $('#test4')
    });
    var column5 = new Column({
        el : $('#test5')
    });
    row2.addColumn(column3);
    row2.addColumn(column4);
    row2.addColumn(column5);
});