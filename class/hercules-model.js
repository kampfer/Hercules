define('class/hercules-model', function(require, exports, module) {
	//定义hercules的各种model类型
	var backbone = require('backbone');

	var textModel = backbone.Model.extend({
        defaults:{
            type:'text',
            html:'a test text!',
            col:12
        }
	});

	var imageModel = backbone.Model.extend({
        defaults:{
            type:'image',
            src:'http://twitter.github.com/bootstrap/assets/img/bs-docs-responsive-illustrations.png',
            col:12
        },
        initialize:function(){
            if(!this.has('html')){
                this.set('html','<img src="'+this.get('src')+'" alt="">');
            }
        }
	});

	var mixedModel = backbone.Model.extend({
        defaults:{
            type:'mixed',
            col:12,
            row:[]
        }
    });

	exports.text = textModel;
	exports.image = imageModel;
	exports.mixed = mixedModel;
});

