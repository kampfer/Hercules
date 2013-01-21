define('jobs/start', function(require, exports, module) {

	var backbone = require('backbone'),
	$ = require('$'),
	Model = require('class/hercules-model'),
	Collection = require('class/hercules-collection'),
    Doc = require('jobs/document'),
    row = require('jobs/row'),
    col = require('jobs/column'),
    Menu = require('jobs/menu'),
	Render = require('jobs/render');

	var HerculesModel = new Collection.row();
    
	var renderView = new Render({
        $doc:Doc,
        $row:row,
        $col:col,
		model: HerculesModel
	});

    HerculesModel.initListenTo(renderView);
    
	//创建导航
	var menu = new Menu({
        model:HerculesModel,
        renderView:renderView
    });
});

