var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('javascript',shell.task('watchify -d index.js -o www/index.js'))
    .task('watchcss',function(){
        gulp.watch(['lib/css/*','node_modules/dashboard/lib/css/*'],['css'])
            .on('change',function(e){
                console.log(e.path+' was '+e.type)
            })
    })
    .task('css',['watchcss'],shell.task('lessc lib/css/index.less www/index.css'))
    .task('mock',shell.task('restmock'))
    .task('default',['mock','css','javascript'],function(){
        /*
         * can't be here since it's blocked by mock and javascript,
         * so make seperated watch task, and make default task dependent
         * on watch tasks
         */
    })
    .task('cordova',
        shell.task(['cordova create cordova lalalic.superdaddy superdaddy',
            'cd cordova',
            'cordova platform add android',
            'cordova plugin add com.triarc.sqlitePlugin',
            ]))
