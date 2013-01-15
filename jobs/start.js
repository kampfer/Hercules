define('jobs/start',function(require,exports,module){
    
    var backbone = require('backbone'),
        $ = require('$'),
        Collection = require('class/hercules-collection'),
        Model = require('class/hercules-model'),
        ViewRender = require('jobs/render');

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
            var Model1 = new Collection.row(); 
            Model1.add([
                //一行的数据
                {
                    col:12,
                    children:[
                        new Model.text({col:4}),
                        new Model.text({col:4}),
                        new Model.text({col:4})
                    ]
                },     
                {
                    col:12,
                    children:[
                        new Model.text({col:4}),
                        new Model.text({col:4}),
                        new Model.text({col:4})
                    ]
                },     
                {
                    col:12,
                    children:[
                        new Model.text({col:4}),
                        new Model.text({col:4}),
                        new Model.text({col:4})
                    ]
                }     
            ]);
            var View = new ViewRender({
                model:Model1
            });
            View.render();
        },
        InitModel2:function(){
            var Model1 = new Collection.row(); 
            Model1.add([
                //一行的数据
                {
                    col:12,
                    children:[
                        new Model.image({col:6}),
                        new Model.image({col:6})
                    ]
                },     
                {
                    col:12,
                    children:[
                        new Model.image({col:6}),
                        new Model.image({col:6})
                    ]
                }    
            ]);
            var View = new ViewRender({
                model:Model1
            });
            View.render();
        },
        InitModel3:function(){
            var Model1 = new Collection.row(); 
            Model1.add([
                //一行的数据
                {
                    col:12,
                    children:[
                        new Model.text({col:3}),
                        new Model.mixed({col:9,row:[new Model.text({col:2}),new Model.image({col:10})]})
                    ]
                },     
                {
                    col:12,
                    children:[
                        new Model.text({col:3}),
                        new Model.mixed({col:9,row:[new Model.text({col:2}),new Model.image({col:10})]})
                    ]
                },     
                {
                    col:12,
                    children:[
                        new Model.text({col:3}),
                        new Model.mixed({col:9,row:[new Model.text({col:2}),new Model.image({col:10})]})
                    ]
                }     
            ]);
            var View = new ViewRender({
                model:Model1
            });
            View.render();
        },
        preview:function(){
        
        },
        initialize:function(){
        
        }
    });
    //创建导航
    var menu = new mianMenu();

});
