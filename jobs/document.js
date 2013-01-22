define('jobs/document', function(require, exports, module) {
	var View = require('jobs/view'),
		Row = require('jobs/row'),
		Column = require('jobs/column');

	var Document = View.extend({
		initialize : function() {
			Document.__super__.initialize.apply(this, arguments);
			this.ownerDocument = this;
		},
		'export' : function() {

		}
	});

	module.exports = Document;
});
