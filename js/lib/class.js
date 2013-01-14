var Class = function() {};

Class.initializing = false;

Class.extend = function(props) {
	var Class = function() {
		if(!Class.initializing && this.initializer) {
			this.initializer.apply(this, arguments);			
		}
	};

	Class.initializing = true;
	// this === 构造函数。
	//能否直接使用this.prototype考虑使用this.prototype。
	var prototype = new this();
	Class.initializing = false;

	prototype = kampfer.extend(prototype, props);

	Class.prototype = prototype;

	Class.prototype.constructor = Class;

	Class.superClass = this.prototype;

	Class.extend = kampfer.Class.extend;

	return Class;
};