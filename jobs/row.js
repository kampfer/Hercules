define('jobs/row', function(require, exports, module) {
	var backbone = require('modules/backbone');
	require('modules/jquery-1.8.2.min');
	require('modules/jquery-ui.min');

	var Row = backbone.View.extend({
		initialize : function() {
			this._columns = [];
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
			this._columns.push(column);
		}
	});

	module.exports = Row;

	var Column = require('jobs/column');
	var row = new Row({
		el : $('#test-row')
	});
	var row2 = new Row({
		el : $('#test-row2')
	});
    var column = new Column({
    	el : $('#test')
    });
    row.addColumn(column);
});