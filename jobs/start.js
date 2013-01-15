define('jobs/start',function(require,exports,module){
    
    var backbone = require('backbone'),
        $ = require('$'),
        Model = require('class/hercules-model');

    var mianMenu = backbone.View.extend({
        el:'[node-type=menu]',
        events:{
            'click [action-type=addNew]':'addNew',
            'click [action-type=model1]':'InitModel1',
            'click [action-type=model2]':'InitModel2',
            'click [action-type=model3]':'InitModel3',
            'click [action-type=preview]':'preview'
        },
        addNew:function(){
            console.log('addNew');
        },
        InitModel1:function(){
        
        },
        InitModel2:function(){
        
        },
        InitModel3:function(){
        
        },
        preview:function(){
        
        },
        initialize:function(){
        
        }
    });
    //创建导航
    var menu = new mianMenu();
});
