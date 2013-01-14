define('config',function(require,exports,module){
    module.exports = {
        timestamp:new Date().valueOf(),
        alias:{
            '$':'modules/jquery-1.8.2.min',
            'drag':'modules/jquery.event.drag-2.2',
            'events':'modules/events',
            'class':'modules/class',
            'backbone':'modules/backbone',
            'underscore':'modules/underscore'
        }
    };
});
