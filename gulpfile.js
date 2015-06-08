var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('javascript',shell.task('watchify -d index.js -o www/index.js'))
    .task('css',shell.task('lessc lib/css/index.less www/index.css'))
    .task('mock',shell.task('restmock'))
    .task('default',['mock','css','javascript'],function(){
        gulp.watch('lib/css/*',['css']).on('change',function(e){
            console.log(e.path+' was '+e.type)
        })
    })
