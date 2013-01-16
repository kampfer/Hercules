define('jobs/start', function(require, exports, module) {

	var backbone = require('backbone'),
	$ = require('$'),
	Model = require('class/hercules-model'),
	Collection = require('class/hercules-collection'),
	blocks = require('jobs/blocks'),
    Menu = require('jobs/menu'),
	Render = require('jobs/render');

	var HerculesModel = new Collection.row();

	var blocksView = new blocks({
		model: HerculesModel
	});

	var renderView = new Render({
		model: HerculesModel
	});

    HerculesModel.initListenTo(renderView);
    
	//创建导航
	var menu = new Menu({
        model:HerculesModel,
        blocksView:blocksView,
        renderView:renderView
    });
});

