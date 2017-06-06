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
       //異步測試
       describe("倒數計時永不顯示負數時間",()=>{
           it("測試是否在startTimer method中的this.setState是否有用",(done)=>{
               //先render到文件內
               let countdown = TestUtils.renderIntoDocument(<Countdown />);
               //假設user輸入的值為-1
               countdown.handleSetCountdown(-1);
               //參數值傳入後我們預期state.count是-1 state.countdownStatus
               expect(countdown.state.count).toBe(-1);
               expect(countdown.state.countdownStatus).toBe('start');
               //一秒後雖然state.count為-2但由於我們的三元運算子設定下，count傳遞進來只要是負數則會為0
               setTimeout(()=>{
                   //在1001毫秒後，測試state.count是否為0
                   expect(countdown.state.count).toBe(0);
                   done();//宣告異步執行
               },1001);
           }); 

           it('在點擊暫停按鈕後，state為paused的情況下倒數中的秒數要被暫停',(done)=>{
               //第一步一樣是要將component render上文件才能做後續測試
               let countdown = TestUtils.renderIntoDocument(<Countdown />);

                //下面這個等於user輸入了3並開始了setInterval，暫停按鈕出現
                countdown.handleSetCountdown(3);

                //Controls component的method用來改變Countdown state的
                //在這邊叫的意思等於user按下了暫停按鈕，並暫停了setInterval
                //所以秒數要停留在3才對
                countdown.handleStatusChange('paused');
                //一秒後檢查是否停留在三秒且狀態為paused
                setTimeout(()=>{
                   expect(countdown.state.count).toBe(3);
                   expect(countdown.state.countdownStatus).toBe('paused');
                   //因為我們用了setTimeout或是setInterval等這種時間函式時，
                   //他們將會變成異步處理，所以要新增call back，
                   //也就是在it function的第二個參數arrow function中加入參數
                   //並在setTimeout method執行完後呼叫
                   done();
                },1001);
            });

            it('在點擊重置時間按鈕時，一切都會回歸原狀',(done)=>{
               //第一步一樣是要將component render上文件才能做後續測試
               let countdown = TestUtils.renderIntoDocument(<Countdown />);

                //下面這個等於user輸入了3並開始了setInterval，暫停按鈕出現
                countdown.handleSetCountdown(3);

                //Controls component的method用來改變Countdown state的
                //在這邊叫的意思等於user按下了暫停按鈕，並暫停了setInterval
                //所以秒數要停留在3才對
                countdown.handleStatusChange('stopped');
                //一秒後檢查是否停留在三秒且狀態為paused
                setTimeout(()=>{
                   expect(countdown.state.count).toBe(0);
                   expect(countdown.state.countdownStatus).toBe('stopped');
                   //因為我們用了setTimeout或是setInterval等這種時間函式時，
                   //他們將會變成異步處理，所以要新增call back，
                   //也就是在it function的第二個參數arrow function中加入參數
                   //並在setTimeout method執行完後呼叫
                   done();
                },1001);
            });


       });
//-------------------------------最外層
});
