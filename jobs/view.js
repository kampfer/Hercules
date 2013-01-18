define('jobs/view', function(require, exports, module) {
    var backbone = require('modules/backbone'); 

    var View = backbone.View.extend({
        initialize : function() {
            //this.listenTo(this.model, "change", this.render);
            this.children = [];
            //this.childrenMap = {};
            this.parent = null;
            this.id = this.$el.attr('id');
        },

        setId : function(id) {
            var oldId = this.id;
        
            this.id = id;
            
            if(this.parent && this.parent.children) {
                delete parent.children[oldId];
                this.parent.addChild(this);
            }
        },

        getId : function() {
            return this.id;
        },

        addChild : function(child, index) {
            if(child instanceof View) {
                var id = child.getId();

                //if(this.childrenMap[id] === undefined) {
                if( !this.getChild(id) ) {
                    if(index !== undefined) {
                        //this.childrenMap[id] = index;
                        this.children.splice(index, 0, child);
                    } else {
                        //this.childrenMap[id] = this.children.length;
                        this.children.push(child);
                    }
                }

                if(child.getParent() !== this) {
                    child.setParent(this);
                }

                child.ownerDocument = this.ownerDocument;
            }
        },

        getChild : function(id) {
            if(typeof id === 'string') {
                var child;

                this.traverse(this, function(node) {
                    if(node.getId() === id) {
                        child = node;
                        return false;
                    }
                });

                if(child) {
                    return child;
                }
            }
        },

        getIndex : function() {
            if(this.parent) {
                for(var i = 0, child; child = this.parent.children[i]; i++) {
                    if(child.id === this.id) {
                        return i;
                    }
                }
            }
        },

        removeChild : function(child) {
            var id;
            if(child instanceof View) {
                id = child.getId();
            } else if(typeof child === 'string') {
                id = child;
            } else {
                return;
            }

            var index = child.getIndex();
            if(index !== undefined) {
                child.setParent(null);
                this.children.splice(index, 1);
            }
        },

        setParent : function(parent) {
            if(parent === this) {
                return;
            }

            this.parent = parent;

            //setParent(null)所以这里需要判断空值
            if( this.parent && !this.parent.getChild(this.id) ) {
                this.parent.addChild(this);
            }
        },

        getParent : function() {
            return this.parent;
        },

        traverse : function(view, callback) {
            if( !(view instanceof View) ) {
                return;
            }

            if( callback.call(this, view) === false ) {
                return;
            }

            if(view.children) {
                for(var i = 0, child; child = view.children[i]; i++) {
                    this.traverse(child, callback);
                }
            }
        },

        dispose : function() {
            delete this.children;
            delete this.parent;
        }
    });

    module.exports = View;
});