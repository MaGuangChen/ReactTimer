//得到從CountdownForm傳遞過來被處理過的user輸入秒數，
//接著處理秒數並進行倒數，同時倒數時有三種狀態：start,pause,stopped
//要達成我們可以用component lifecycle
//component lifecycle method 能夠在特定情況發生時自動被啟動
import React from 'react';
import Clock from 'Clock';
import CountdownForm from 'CountdownForm';
import Controls from 'Controls';

var Countdown = React.createClass({
    getInitialState: function(){
      return {
          count:0,
          //countdownStatus應該要有"停止倒數","暫停","start"，預設為停止倒數  
          //用狀態為條件，進而控制render的秒數
          countdownStatus: 'stopped'
    };
},
   //component life cycle method，用以觀察state的變更，並作出回應
   //componentDidUpdate 會在每次component得props或state被更新後自動呼叫
  componentDidUpdate : function(prevProps,prevState){
        //總之就是每次props或state被更新時做一次檢查狀態的動作，
        //如果新狀態跟先前版本狀態不一樣，那就執行switch method
        if(this.state.countdownStatus !== prevState.countdownStatus){
          //當countdownStatus 不等於 prevState.countdownStatus時，我們可以用
          //switch function來讓start 停止倒數 暫停 能夠被執行
            switch(this.state.countdownStatus){
                 case 'start' ://當countdownStatus被更新成start時，也就是
                     this.startTimer();//當狀態符合時執行一個function來處理state
                 break;
                 case 'stopped'://當countdownStatus被更新成stopped時
                     this.setState({count:0});//則將state.count的值歸零
                 case 'paused' :
                     //停止名為timer的method
                     clearInterval(this.timer)//這個clearInterval是專門用來暫停setInterval() method的，但不會重新計算喔
                     this.timer = undefined;
                     break;
                 //因為case stopped沒有用break，
                 //因此將會順序執行case stopped 跟 case paused，原因是因為除了
                 //將state.count歸零外，我們也需要將每秒減1秒的function給關掉
             }
         }
  },
  //在此component從dom中被移除時，這個method會被自動執行
  componentWillUnmount: function(){
      //當component從dom中被移除時就暫停startTimer內的timer method
      clearInterval(this.timer);
      this.timer = undefined;
  },
  //當state被更新為start時執行的函數ˋ
  startTimer: function(){
      //setTimeOut這個method 將會在一定的時間後執行一次某個我們選定的函式
      //，很像我們接下來用的method setInterval
      //setInterval 這個method將會在每間隔多久的時間就執行一次某個我們選定的函式，直到我們說停為止
      //這邊的this.timer將會新定義一個method
      this.timer = setInterval( () => {
         //為state的值-1
         let newCount = this.state.count -1;
         
         this.setState({
             count: newCount >= 0 ? newCount : 0
             //如果newCount大於等於0則正常顯示newCount的值，如果為false則為0
         });
         //如果變數newCount為0了，那我們就沒有倒數的必要了喔
         if(newCount === 0){
             this.setState({countdownStatus: 'stopped'});
         }
      },1000);
  },
    //更新state，也就是CountdownForm表單被提交（submit）時
    handleSetCountdown: function(seconds){
        this.setState({
           count: seconds,//透過CountdownForm的更新
           countdownStatus: 'start'//要知道this.state.count的值，
           //並且持續追蹤目前this.state.count的值，且應用在lifecycle method內的switch function
        });
    },
    //更新state，在倒數進行中也就是Controls component被render時能夠更新state
    handleStatusChange: function(newStatus){
       
       this.setState({
           //接收Controls的props來更新state狀態
           countdownStatus: newStatus
        })
    },
    render: function(){
        //其實我們想要render CountdownForm的時機點只有第一次在user輸入完秒數後，
        //點擊start按鈕前而已，一旦進入倒數後，我們希望render的component則是Controls，
        //因為Controls component有暫停、開始、停止的按鈕
        var {count,countdownStatus} = this.state;
        //負責決定現在要印的component，是CountdownForm還是Controls
        //作為決定的條件為state.countdownStatus
        let renderControlArea = () => {
            if(countdownStatus !== 'stopped'){
               //如果目前的state不等於字串stopped，這時我們需要有
               //暫停按鈕或著start按鈕出現在螢幕上
               //返回Controls component的內容
               //含有props名為countdownStatus 值為this.state.countdownStatus
               //另含有props名為onStatusChange值為
               //
               return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            }else{//那如果目前state.countdownStatus的值為字串stopped
                  //那麼就render CountdownForm吧！！
              return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            }
        };
        //技術上我們可以使用componentWillReceviceProps來控制state.count
        return (
            <div>
              <Clock totalSeconds={count}/>
              {renderControlArea()}
            </div>
        );
    }

});
module.exports = Countdown;