define('jobs/view', function(require, exports, module) {
	var backbone = require('modules/backbone'); 

	var View = backbone.View.extend({
		initialize : function() {
			//this.listenTo(this.model, "change", this.render);
			this.children = [];
			this.childrenMap = {};
			this.parent = null;
			this.id = this.$el.attr('data-id');
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

		addChild : function(child) {
			if(child instanceof View) {
				var id = child.getId();

				if(this.childrenMap[id] === undefined) {
					this.childrenMap[id] = this.children.length;
					this.children.push(child);
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

		setParent : function(parent) {
			if(parent instanceof View) {
				if(parent === this) {
					return;
				}

				this.parent = parent;

				if( !this.parent.getChild(this.id) ) {
					this.parent.addChild(this);
				}
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
