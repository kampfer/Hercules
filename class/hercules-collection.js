define('class/hercules-collection',function(require,exports,module){

	var backbone = require('backbone'),
        model = require('class/hercules-model');
    
    var rowCollection = backbone.Collection.extend({
        model:model.row,
        initialize:function(){
        
        }
    });

    exports.row = rowCollection;

});
