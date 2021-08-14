/**
 * @fileoverview
 * vue-cli 3.x 부터는 default로 vue.config.js 파일이 없음.
 * (2.x에서는 webpack.config.js 파일이 루트 디렉토리에 있음)
 * 필요시 생성해서 사용
 * https://cli.vuejs.org/guide/webpack.html#simple-configuration
 */

module.exports = {
    lintOnSave: false,
    transpileDependencies: [
        'vuetify'
    ],
    publicPath: process.env.NODE_ENV === 'production'
        ? '/postlude/'
        : '/'
};
