define('jobs/document', function(require, exports, module) {
    var View = require('jobs/view'),
        Row = require('jobs/row'),
        Column = require('jobs/column'),
        Image = require('jobs/image'),
        Text = require('jobs/text');

    var Document = View.extend({
        initialize : function() {
            Document.__super__.initialize.apply(this, arguments);
            this.ownerDocument = this;
            this.parseModel();
            this.enterDocument();
        },

        parseModel : function(model) {
            var that = this;
            function traverse(child) {
                var grandsons = child.get('children') || [];
                for(var i = 0, grandson; grandson = grandsons[i]; i++) {
                    var type = grandson.get('type');
                    var item;
                    if(type === 'text') {
                        item = that.createText( grandson.get('html'), grandson.get('col') );
                    } else if(type === 'image') {
                        item = that.createImage( grandson.get('src'), grandson.get('col') );
                    } else if(type === 'mixed') {
                        item = that.createMixed( grandson, grandson.get('col') );
                    }

                    row.addChild(item);
                }
            }

            model = model || this.model;
            var children = model.models;
            for(var i = 0, child; child = children[i]; i++) {
                row = this.createRow();

                this.addChild(row);

                traverse(child);
            }
        },

        createRow : function() {
            return new Row({
                tagName : 'div',
                className : 'row-fluid'
            });
        },

        createColumn : function(col) {
            return new Column({
                tagName : 'div',
                className : 'span' + col,
                attributes : {
                    'data-col' : col
                }
            });
        },

        createText : function(content, col) {
            var item;
            if(col) {
                item = this.createColumn(col);
            }

            var text = new Text({
                tagName : 'div',
                className : 'text'
            }, content);

            if(item) {
                item.addChild(text);
            } else {
                item = text;
            }

            return item;
        },

        createImage : function(src, col) {
            var item;
            if(col) {
                item = this.createColumn(col);
            }

            var image = new Image({
                tagName : 'div',
                className : 'image'
            }, src);

            if(item) {
                item.addChild(image);
            } else {
                item = image;
            }

            return item;
        },

        createMixed : function(model, col) {
            var column = this.createColumn(col);

            var children = model.get('children');
            for(var i = 0; children[i]; i++) {
                var type = children[i].get('type');
                if(type === 'text') {
                    var item = this.createText( children[i].get('html') );
                } else if( type === 'image') {
                    var item = this.createImage( children[i].get('src') );
                }
                column.addChild(item);
            }

            return column;
        },

        translateColumn2Row : function() {

        },

        translateRow2Column : function() {},

        export : function() {
        }
    });

    module.exports = Document;
});