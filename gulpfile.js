/* global require: true */

const gulp = require( 'gulp' )                                 // gulp
// 图片压缩
const imagemin = require( 'gulp-imagemin' )                    // 图片压缩
const pngquant = require( 'imagemin-pngquant' )                // PNG图片压缩

// 图片压缩
gulp.task( 'imagemin', function() {
    // 未压缩图片( 处理前 需要手动将src路径下的静态图片资源清空 )
    gulp.src( './uncompressedImages/*.{png,jpg,gif,ico}' )
    .pipe( imagemin({
        progressive: true,
        svgPlugins: [{
            removeViewBox: false
        }],
        use: [pngquant()]
    }) )
    .pipe( gulp.dest( './src/assets/images/' ) )
})

// 默认任务 - 压缩图片
gulp.task(
    'default', ['imagemin']
)
