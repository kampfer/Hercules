define('jobs/text', function(require, exports, module) {
    var Column = require('jobs/column');

    var Text = Column.extend({
        initialize : function(options, content) {
            var $el = this.$el,
                that = this;

            this.html = content;

            this.$text = $('<div>').addClass('text').attr('contenteditable', 'true').html(content).appendTo($el);

            this.$text.focus(function() {
                document.designMode = 'on';
            });

            this.$text.blur(function() {
                document.designMode = 'off';
                that.ownerDocument.updateRowByCid(that.getParent());
            });

            Text.__super__.initialize.apply(this, arguments);
        },

        beEditable : function() {
            document.designMode = 'on';
        },

        beUnEditable : function() {
            document.designMode = 'off'
        },

        setContent : function(html) {
            this.$text.html(html);
            this.html = html;
            this.ownerDocument.updateRowByCid(this.getParent());
        },

        dispose : function() {
            this.$text.unbind();
            Text.__super__.dispose.call(this);
        }
    });

    module.exports = Text;
});