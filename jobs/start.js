define('jobs/start', function(require, exports, module) {

	var backbone = require('backbone'),
	$ = require('$'),
	Collection = require('class/hercules-collection'),
	blocks = require('jobs/blocks'),
    Menu = require('jobs/menu'),
	Model = require('class/hercules-model'),
	Render = require('jobs/render');

	var HerculesModel = new Collection.row();

	var blocksView = new blocks({
		model: HerculesModel
	});

	var renderView = new Render({
		model: HerculesModel
	});
    

	HerculesModel.on('add', function(row) {
		console.log(row);
	});

	HerculesModel.on('remove', function(row) {
		console.log(row);
	});

	//创建导航
	var menu = new Menu({
        model:HerculesModel,
        blocksView:blocksView,
        renderView:renderView
    });
});

