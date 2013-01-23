define('blocks/image', function(require, exports, module) {
	var $ = require('$'),
	model = require('class/hercules-model'),
	dialog = require('dialog');

	var imageDialog = dialog.extend({
		attrs: {
			classPrefix: 'blocks',
			content: '<form><fieldset>\
                <legend>Image</legend>\
                <label>Image url</label>\
                <input node-type="image-url" type="text" placeholder="http://">\
                <p><button type="button" class="btn" action-type="image-confirm">confirm</button></p>\
            </fieldset></div>',
            zIndex:5000
		},
		events: {
			'click [action-type=image-confirm]': 'imageConfirm'
		},
		imageConfirm: function() {
			var url = $('[node-type=image-url]').val();
			this.get('model').add({
				children: [new model.image({
                    src:url
                })]
			});
			this.hide();
		}
	});

	module.exports = imageDialog;
});

