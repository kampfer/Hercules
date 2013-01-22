define('jobs/menu', function(require, exports, module) {

	var backbone = require('backbone'),
    _ = require('underscore'),
    previewTpl = require('jobs/previewTpl'),
    Blocks = require('blocks/blocks'),
    myBlocks,
	Model = require('class/hercules-model');

	var mianMenu = backbone.View.extend({
		el: '[node-type=menu]',
		events: {
			'click [action-type=addNew]': 'addNew',
			'click [action-type=model1]': 'InitModel1',
			'click [action-type=model2]': 'InitModel2',
			'click [action-type=model3]': 'InitModel3',
			'click [action-type=preview]': 'preview'
		},
		addNew: function() {
            if(!myBlocks){
                myBlocks = new Blocks({
                    model:this.model
                });
            }
			myBlocks.show();
		},
		renderAll: function() {
			this.options.renderView.render();
		},
		InitModel1: function() {
			this.model.reset([
			//一行的数据
			{
				col: 12,
				children: [
				new Model.text({
					col: 4,
					html : 'test1'
				}), new Model.text({
					col: 4,
					html : 'test2'
				}), new Model.text({
					col: 4,
					html : 'test3'
				})]
			},
			{
				col: 12,
				children: [
				new Model.text({
					col: 4,
					html : 'test4'
				}), new Model.text({
					col: 4,
					html : 'test5'
				}), new Model.text({
					col: 4,
					html : 'test6'
				})]
			},
			{
				col: 12,
				children: [
				new Model.text({
					col: 4,
					html : 'test7'
				}), new Model.text({
					col: 4,
					html : 'test8'
				}), new Model.text({
					col: 4,
					html : 'test9'
				})]
			}]);
			this.renderAll();
		},
		InitModel2: function() {
			this.model.reset([
			//一行的数据
			{
				col: 12,
				children: [
				new Model.image({
					col: 6
				}), new Model.image({
					col: 6
				})]
			},
			{
				col: 12,
				children: [
				new Model.image({
					col: 6
				}), new Model.image({
					col: 6
				})]
			}]);
			this.renderAll();
		},
		InitModel3: function() {
			this.model.reset([
			//一行的数据
			{
				col: 12,
				children: [
				new Model.text({
					col: 3
				}), 
                new Model.mixed({
					col: 9,
					children: [
                    new Model.text(),
                    new Model.image()
                    ]
				})]
			}]);
			this.renderAll();
		},
        getPreviewVal:function(){
           return _.template(previewTpl,{html:this.options.renderView.getHtml()}); 
        },
		preview: function() {
			var winname = window.open('', "_blank", '');
			winname.document.open('text/html', 'replace');
			winname.opener = null; //防止代码对本页面做修改
			winname.document.write(this.getPreviewVal());
			winname.document.close();
		},
		initialize: function() {

		}
	});
	module.exports = mianMenu;
});

