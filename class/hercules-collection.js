define('class/hercules-collection', function(require, exports, module) {

	var backbone = require('backbone'),
	_ = require('underscore'),
	model = require('class/hercules-model');

	var rowCollection = backbone.Collection.extend({
		model: model.row,
		initListenTo: function(renderView) {
			this.listenTo(this, 'add', _.bind(renderView.addOne, renderView));
		},
		findColModelIndex: function(children, colcid) {
			var index;
			var colmodel = _.find(children, function(item, i) {
				if (item.cid == colcid) {
					index = i;
					return true;
				} else {
					return false;
				}
			});
			return index;
		},
		getRowModel: function(rowcid) {
			var ParentChildren,parentCid, model = this._byCid[rowcid];

			function recursion(children,parent) {
				for (var k = 0; k < children.length; k++) {
					if (children[k].cid === rowcid) {
                        parentCid = parent.cid;
						ParentChildren = children;
						model = children[k];
						break;
					}
					if (children[k].get('children')) {
						recursion(children[k].get('children'),children[k]);
					}
				}
			}

			if (model) {
				return {
					ParentChildren: ParentChildren,
                    parentCid:parentCid,
					current: model
				};
			} else {
				for (var i = 0; i < this.models.length; i++) {
					var children = this.models[i].get('children');
					recursion(children,this.models[i]);
				}
				return {
					ParentChildren: ParentChildren,
                    parentCid:parentCid,
					current: model
				};
			}

		}
	});

	exports.row = rowCollection;

});

