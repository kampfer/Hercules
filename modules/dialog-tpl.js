define('modules/dialog-tpl', function(require, exports, module) {

	module.exports = '<div class="{{classPrefix}}">\
                    <div class="{{classPrefix}}-close" title="关闭本框" data-role="close"></div>\
                        <div class="{{classPrefix}}-content" data-role="content"></div>\
                    </div>';
});

