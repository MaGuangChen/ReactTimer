//引入這些庫
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
//引入本地component
var Controls = require('Controls');

describe("Controls component",()=>{
    it("Controls項目component存在與否",()=>{
       expect(Controls).toExist();
    });

    describe('User看到的render是否正確', ()=>{
       it("countdownStatus 如果值為start那應該要render出暫停按鈕",()=>{
          //先將Controls render到文件上，確定user看到的是對的東西被render
          let controls = TestUtils.renderIntoDocument(<Controls countdownStatus="start"/>);
          //這個el為已經被controls component已經被render的部分
          var $el = $(ReactDOM.findDOMNode(controls));
          //尋找dom裡面的內容含有暫停的button tag
          let $pauseButton = $el.find('button:contains(暫停)');

          //聲明式，代表著共有多少個button
          //在此例，$pauseButton一共會因為找到一個含有暫停字串的button
          //因此變數$pauseButton的陣列長度為1
          expect($pauseButton.length).toBe(1);
       });

       it("countdownStatus 如果值為暫停那應該要render出start按鈕",()=>{
          //先將Controls render到文件上，確定user看到的是對的東西被render
          let controls = TestUtils.renderIntoDocument(<Controls countdownStatus="暫停"/>);
          //這個el為已經被controls component已經被render的部分
          var $el = $(ReactDOM.findDOMNode(controls));
          //尋找dom裡面的內容含有暫停的button tag
          let $pauseButton = $el.find('button:contains(Start)');

          //聲明式，代表著共有多少個button
          //在此例，$pauseButton一共會因為找到一個含有start字串的button
          //因此變數$pauseButton的陣列長度為1
          expect($pauseButton.length).toBe(1);
       });
    });
});