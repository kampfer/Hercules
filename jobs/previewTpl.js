define('jobs/previewTpl',function(require,exports,module){
    module.exports = '<!doctype html>\
        <html>\
            <head>\
                <meta charset="utf-8">\
                <title>preview model</title>\
                <meta name="viewport" content="width=device-width, initial-scale=1.0">\
                <meta name="description" content="Hercules demo for edit model">\
                <meta name="author" content="xiaojue,kampfer">\
                <!--[if lt IE 9]>\
                    <script src="script/html5.js"></script>\
                    <script src="script/css3-mediaqueries.js">\
                <![endif]-->\
                <link href="bootstrap/css/bootstrap.css" rel="stylesheet">\
                <link href="bootstrap/css/edit.css" rel="stylesheet">\
            </head>\
            <body>\
                <div class="container">\
                    <%= html%>\
                </div>\
            </body>\
        </html>';
});