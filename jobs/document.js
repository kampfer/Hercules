define('jobs/document', function(require, exports, module) {
	var View = require('jobs/view'),
		Row = require('jobs/row'),
		Column = require('jobs/column');

	var Document = View.extend({
		initialize : function() {
			Document.__super__.initialize.apply(this, arguments);
			this.ownerDocument = this;
		},

		export : function() {
		}
	});

	module.exports = Document;

    var row = new Row({
        el : $('#test-row')
    });
    var column = new Column({
        el : $('#test')
    });
    var column2 = new Column({
        el : $('#test2')
    });
    row.addChild(column);
    row.addChild(column2);

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
    row2.addChild(column3);
    row2.addChild(column4);
    row2.addChild(column5);

    var document = new Document({
    	el : $('#document')
    });
	document.addChild(row);
	document.addChild(row2);

	console.log(document);
});