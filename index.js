var gutil = require('gulp-util'),
    path = require('path'),
    extend = require("extend"),
    through = require('through2'),
    _ = require('underscore'),
    ejs = require('ejs'),
    PluginError = gutil.PluginError,
    package = require('./package.json');

var PLUGIN_NAME = package.name;

module.exports = function (options) {
    options = options || {};

    function compile (file) {
        var html = file.contents.toString(),
            template;

        options = extend(true,{
            name:'underscore',
            ejs: {
                client : true,
                compileDebug:false,
                filename : path.relative(process.cwd(), file.path)
            }
        },options);

        if(options.name == 'underscore'){
            template = _.template(html, options.underscore).source;
        }else if(options.name == 'ejs'){
            template = ejs.compile(html, options.ejs).toString();
        }

        return 'module.exports = ' + template + ';';
    }

    return through.obj(function (file, enc, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var filePath = file.path;

        try {
            var content = compile(file);

            file.contents = new Buffer(content);

            file.path = gutil.replaceExtension(file.path, '.js');
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: filePath}));
            return callback();
        }

        this.push(file);
        callback();
    });
};
