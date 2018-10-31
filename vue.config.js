const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    baseUrl:'',
    chainWebpack: config => {
        if( process.env.NODE_ENV === 'production'){
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
        config.resolve.alias
            .set('@', resolve('src'))
            .set('util',resolve('src/util'))
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/style/index.scss";`
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        overlay:false,
        port: 8000,
    },
}