//得到從CountdownForm傳遞過來被處理過的user輸入秒數，
//接著處理秒數並進行倒數，同時倒數時有三種狀態：start,pause,stopped
//要達成我們可以用component lifecycle
//component lifecycle method 能夠在特定情況發生時自動被啟動
import React from 'react';
import Clock from 'Clock';
import CountdownForm from 'CountdownForm';

var Countdown = React.createClass({
    getInitialState: function(){
      return {
          count:0,
          countdownStatus: '停止倒數'//應該要有"停止倒數","暫停","start"，預設為停止倒數  
    };
},
   //component life cycle method，用以觀察state的變更，並作出回應
   //componentDidUpdate 會在每次component得props或state被更新時自動呼叫
  componentDidUpdate : function(prevProps,prevState){
        if(this.state.countdownStatus !== prevState.countdownStatus){
          //當countdownStatus 不等於 prevState.countdownStatus時，我們可以用
          //switch function來讓start 停止倒數 暫停 能夠被執行
            switch(this.state.countdownStatus){
                 case 'start' ://當countdownStatus被更新成start時，也就是
                     this.startTimer();//當狀態符合時執行一個function來處理state
                 break;
             }
         }
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
    render: function(){
        var {count} = this.state;
        return (
            <div>
              <Clock totalSeconds={count}/>
              <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            </div>
        );
    }

});
module.exports = Countdown;