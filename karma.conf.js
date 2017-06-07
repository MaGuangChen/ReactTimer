//這個引入不知道為何不能使用import的方式呢～
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
   config.set({
      browsers: ['Chrome'],//要測試的真實brower
      singleRun: true,//單一測試
      frameworks: ['mocha'],//我們要使用的測試框架
      //要用的庫要放在這邊，不然沒辦法測試，可以從webpack.config.js看
      //但要注意的是，script要改成node_modules，讓karma進node modules找檔案
      files: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/foundation-sites/dist/foundation.min.js',
          'app/tests/**/*.test.jsx'],//我們要測試的檔案，兩個星號的意思是只要在這個資料夾內的任何符合格式的檔案
      preprocessors: {
          'app/tests/**/*.test.jsx' : ['webpack','sourcemap']
      },//Preprocessor 預處理器，與檔案相似是可以定義測試的
      reporters: ['mocha'],
      client: {
          mocha : {
              timeout: '5000'//五秒後，如果還沒完成就顯示錯誤
          }
       },//這個是一個test timeout，用途舉例是，當一個測試跑超過20秒還沒完成，那我們沒什麼理由要等他了，因此要用這個
       webpack: webpackConfig,
       webpackServer: {
           noInfo: true
       }
      });
};