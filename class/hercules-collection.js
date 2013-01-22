define('class/hercules-collection', function(require, exports, module) {

	var backbone = require('backbone'),
	_ = require('underscore'),
	model = require('class/hercules-model');

	var rowCollection = backbone.Collection.extend({
		model: model.row,
		initListenTo: function(renderView) {
			this.listenTo(this, 'add', _.bind(renderView.addOne, renderView));
		},
		findColModel: function(children, colcid) {
			var index;
			var colmodel = _.find(children, function(item, i) {
				if (item.cid == colcid) {
					return true;
				} else {
					return false;
				}
			});
			return colmodel;
		},
		getRowModel: function(rowcid) {
			return this._byCid[rowcid];
		}
	});

	exports.row = rowCollection;

});

