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
            model = model || this.model;
            var children = model.models;
            for(var i = 0, child; child = children[i]; i++) {
                this.traverse2AddRow(child);
            }
        },

        traverse2AddRow : function(child) {
            var row = this.createRow(child);
            this.addChild(row);

            var grandsons = child.get('children') || [];
            for(var i = 0, grandson; grandson = grandsons[i]; i++) {
                var type = grandson.get('type');
                var item;
                if(type === 'text') {
                    item = this.createText( grandson );
                } else if(type === 'image') {
                    item = this.createImage( grandson );
                } else if(type === 'mixed') {
                    item = this.createMixed( grandson );
                }

                row.addChild(item);
            }

            row.enterDocument();
        },

        createRow : function(model) {
            return new Row({
                tagName : 'div',
                className : 'row-fluid',
                attributes : {
                    'data-cid' : model.cid
                }
            });
        },

        createColumn : function(model) {
            return new Column({
                tagName : 'div',
                className : 'span' + model.get('col'),
                attributes : {
                    'data-col' : model.get('col'),
                    'node-type' : 'box',
                    'data-cid' : model.cid
                }
            });
        },

        createText : function(model) {
            var text = new Text({
                tagName : 'div',
                className : 'span' + model.get('col'),
                attributes : {
                    'data-type' : 'text',
                    'node-type' : 'content',
                    'data-col' : model.get('col'),
                    'data-cid' : model.cid
                }
            }, model.get('html'));

            return text;
        },

        createImage : function(model) {
            var image = new Image({
                tagName : 'div',
                className : 'span' + model.get('col'),
                attributes : {
                    'data-type' : 'image',
                    'data-col' : model.get('col'),
                    'data-cid' : model.cid
                }
            }, model.get('src'));

            return image;
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

        dispose : function() {
            this.traverse(this, function(node) {
                node.dispose();
            });
            Document.__super__.dispose.apply(this);
        }
    });

    module.exports = Document;
});