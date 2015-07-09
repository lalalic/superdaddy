var gulp=require('gulp'),
    shell=require('gulp-shell'),
    isWin=/^win/.test(process.platform);

gulp.task('javascript',shell.task('watchify -d index.js -o www/index.js --ignore jquery'))
    .task('watchcss',function(){
        gulp.watch(['lib/css/*','node_modules/dashboard/lib/css/*'],['css'])
            .on('change',function(e){
                console.log(e.path+' was '+e.type)
            })
    })
    .task('css',['watchcss'],shell.task('lessc lib/css/index.less www/index.css'))
    .task('mock',shell.task('"node_modules/.bin/restmock"'))
    .task('default',['mock','css','javascript'],function(){
        /*
         * can't be here since it's blocked by mock and javascript,
         * so make seperated watch task, and make default task dependent
         * on watch tasks
         */
    })
    .task('cordovaCreate',shell.task(['cordova create cordova lalalic.superdaddy superdaddy --link-to=www']))
    .task('cordovaConfig', ['cordovaCreate'], function(){
        var fs=require('fs'),
            path="cordova/config.xml"
            content=fs.readFileSync(path,'utf8');
        fs.writeFileSync(path, content.replace('src="index.html"','src="cordova.html"'));
    })
    .task('cordova', ['cordovaConfig'],
                shell.task([
                'cordova platform add android',
                'cordova plugin add cordova-plugin-file',
                'cordova plugin add cordova-plugin-file-transfer',
                'cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage',
                'cordova plugin add cordova-plugin-camera',
                'cordova plugin add https://github.com/vilic/cordova-plugin-wechat --variable APP_ID=xxxxx'
            ],{cwd:"cordova"}))
