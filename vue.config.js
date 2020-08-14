module.exports = {
  pwa: {
    name: 'Mind Games',
    themeColor: '#009688',
    msTileColor: '#009688',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  },
  chainWebpack: config => {
    config.module
        .rule('svg-sprite')
        .use('svgo-loader')
        .loader('svgo-loader');
}  
}

