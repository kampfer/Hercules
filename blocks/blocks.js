define('blocks/blocks', function(require, exports, module) {
	var $ = require('$'),
	model = require('class/hercules-model'),
    Text = require('blocks/text'),
    myText,
    Image = require('blocks/image'),
    myImage,
	dialog = require('dialog');

	var blocksDialog = dialog.extend({
		attrs: {
			classPrefix: 'blocks',
			content: '<div class="btn-group">\
                    <button action-type="text" class="btn btn-large" type="button"><i class="icon-font"></i> TEXT</button>\
                    <button action-type="image" class="btn btn-large" type="button"><i class="icon-picture"></i> IMAGE</button>\
                </div>',
            zIndex:5000
		},
        events:{
            'click [action-type=text]':'addText', 
            'click [action-type=image]':'addImage'
        },
        addText:function(){
            this.hide();
            if(!myText){
                myText = new Text({model:this.get('model')}); 
            }
            myText.show();
        },
        addImage:function(){
            this.hide();
            if(!myImage){
                myImage = new Image({model:this.get('model')}); 
            }
            myImage.show();
        }
	});

	module.exports = blocksDialog;
});

