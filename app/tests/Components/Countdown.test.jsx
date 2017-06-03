var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe("Countdown component", () => {
     it("Countdown component存在與否", () => {
         expect(Countdown).toExist();//expect庫toExist method是測試是否存在的method
     });


     describe("handleSetCountdown method是否可運行，並進行倒數",()=>{
         it('state是否已經被set state為start接著開始運行componentDidUpdating',(done)=>{
            //因為要執行             
            //這時我們需要先render我們的component，接著呼叫handleSetCountdown method之後才完成
            //下面這函示等於抓取Countdown component並放在render function
            let countdown = TestUtils.renderIntoDocument(<Countdown />);
            //呼叫handleSetCountdown並給予參數值10
            countdown.handleSetCountdown(10);
            //參數值傳入後我們預期state.count變為10
            expect(countdown.state.count).toBe(10);
            //參數值傳入後我們預期state.countdownStatus變為start，這樣可以run componentDidUpdating
            expect(countdown.state.countdownStatus).toBe('start');
             
             //這個setTimeout是異步(Asynchronous)的喔
             //，所以不會順序執行，會影響到上面render dom喔
             //因此要設一個call back，不然mocha test不支援會fail的
             setTimeout(()=>{
                //在1001毫秒後，測試看看count有沒有變成9了
                expect(countdown.state.count).toBe(9);
                done();//這就是call back啦，一開始的it第二個參數arrow function的參數
             },1001);


            });
       });
       describe("倒數計時永不顯示負數時間",()=>{
           it("測試是否在startTimer method中的this.setState是否有用",(done)=>{
               let countdown = TestUtils.renderIntoDocument(<Countdown />);
               countdown.handleSetCountdown(-1);
               expect(countdown.state.count).toBe(-1);
               expect(countdown.state.countdownStatus).toBe('start');
           });      
       });

});
