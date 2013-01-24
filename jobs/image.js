define('jobs/image', function(require, exports, module) {
    var Column = require('jobs/column');

    var Image = Column.extend({
        initialize : function(options, src) {
            Image.__super__.initialize.apply(this, arguments);

            var $el = this.$el;

            this.src = src;

            $('<img>').attr('src', src).appendTo(this.$el);
            $('<div class="drag-bar"><i class="icon-move"></i></div>').appendTo(this.$el);
        }
    });

    module.exports = Image;
});