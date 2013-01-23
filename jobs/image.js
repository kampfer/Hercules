define('jobs/image', function(require, exports, module) {
    var View = require('jobs/view');

    var Image = View.extend({
        initialize : function(options, src) {
            Image.__super__.initialize.apply(this, arguments);

            var $el = this.$el;

            $('<img>').attr('src', src).appendTo(this.$el);
            $('<div class="drag-bar"><i class="icon-move"></i></div>').appendTo(this.$el);

        }
    });

    module.exports = Image;
});