define('class/hercules-collection',function(require,exports,module){

	var backbone = require('backbone'),
        _ = require('underscore'),
        model = require('class/hercules-model');
    
    var rowCollection = backbone.Collection.extend({
        model:model.row,
        initListenTo:function(renderView){
            this.listenTo(this,'add',_.bind(renderView.addOne,renderView)); 
            this.listenTo(this,'remove',_.bind(renderView.removeOne,renderView)); 
        }
    });

    exports.row = rowCollection;

});
