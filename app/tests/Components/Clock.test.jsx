//引入這些庫
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
//引入本地component
var Clock = require('Clock');
//describe可以為測試任務命名且分開
//it 則是任務本身
describe('Clock Component', () => {
    it('測試Clock Component是否存在', () => {
       expect(Clock).toExist();
       //expect庫裡面提供的method，可以看這個component是否存在
    });
    
    describe('測試render function是否正常', () => {
      it('將formatSeconds的執行結果render上畫面', () => {
         //測試條件為Clock component的props為 62，下面這函示等於抓取Clock component
         let clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);
         //$el這個將要儲存the root about the component intern dom
         //ReactDOM.findDOMNode(clock)這個method將會轉換我們的變數變成真正的html dom
         //這樣來說我們的Clock component將會變成真正html dom
         var $el = $(ReactDOM.findDOMNode(clock));
         //要查一下啦，總體來說就是把文字pull出來啦
         var actualText = $el.find('.clock-text').text();

         expect(actualText).toBe('01:02');
      });
    });



    describe('formatSeconds', () => {
      it('這個是測試秒數與分鐘格式化功能一切正常', ()=> {
          //因為要render我們的component並且返回component，讓我們可以做這些東西
          let clock = TestUtils.renderIntoDocument(<Clock/>);
          let seconds = 615;//希望測試的內容可以直接放在it function裡面，這是我們要測的秒數
          let expected = '10:15';//這個是我們預期返回的結果，615秒等於10分15秒
          let actual = clock.formatSeconds(seconds);//這邊呼叫Clock component的method來測試
          //使用expect庫來測試actual變數是否等於expected變數等於10分15秒
          expect(actual).toBe(expected);
        });

        it('我們希望可以讓有01之類的前面數字為零的單位數可以正常顯示', ()=> {
          //因為要render我們的component並且返回component，讓我們可以做這些東西
          let clock = TestUtils.renderIntoDocument(<Clock/>);
          let seconds = 61;//希望測試的內容可以直接放在it function裡面，這是我們要測的秒數
          let expected = '01:01';//這個是我們預期返回的結果，615秒等於10分15秒
          let actual = clock.formatSeconds(seconds);//這邊呼叫Clock component的method來測試
          //使用expect庫來測試actual變數是否等於expected變數等於10分15秒
          expect(actual).toBe(expected);
        });
    });
});