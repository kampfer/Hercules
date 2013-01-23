define('blocks/text',function(require,exports,module){
	var $ = require('$'),
	model = require('class/hercules-model'),
	dialog = require('dialog');
    
    var textDialog = dialog.extend({
        attrs:{
			classPrefix: 'blocks',
			content: '<form><fieldset>\
                <legend>Text</legend>\
                <label>Text content</label>\
                <textarea node-type="text-content" row="3"></textarea>\
                <p><button type="button" class="btn" action-type="text-confirm">confirm</button></p>\
            </fieldset></div>',
            zIndex:5000
        },
        events:{
            'click [action-type=text-confirm]':'textConfirm'
        },
        textConfirm:function(){
            var content = $('<div>'+$('[node-type=text-content]').val()+'</div>').text();
            this.get('model').add({children:[new model.text({html:content})]});
            this.hide();
        }
    });

    module.exports = textDialog;

});
