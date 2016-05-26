## Install

```
npm install gulp-compile-template --save
```

## Options

options see [underscore template](http://underscorejs.org/#template).

options see [ejs template](https://github.com/mde/ejs).

### options config
```

{
	name: 'ejs',  //use template name ,ejs or underscore (default)
	ejs:{
		/* ejs options see ejs template*/
	},
	underscore:{
		/* underscore options see underscore template */
	}
}

```

## How to use

```
var template = require('gulp-compile-template')
gulp.task('tpl', function() {
    return gulp.src('tpl/*.html')
        .pipe(template({
        	underscore: {
                variable: 'data'
            }
        }))
        .pipe(gulp.dest('js/tpl'))
});
```

## Input

tpl.html

```
<h1><%= name%></h1>
```

## Output
tpl.js

```
module.exports = function(data){
    var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    __p+='<h1>'+
    ((__t=( name))==null?'':__t)+
    '</h1>';
    return __p;
};
```

## LICENSE
MIT [http://www.opensource.org/licenses/mit-license.php]