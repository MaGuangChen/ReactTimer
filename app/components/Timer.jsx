import React from 'react';
import Clock from 'Clock';
import Controls from 'Controls';

var Timer = React.createClass({
   getInitialState:function(){
     return{
        count: 0,
        timerStatus: 'stopped'//如果一開始不是stopped的話就會直接開始換囉
     }; 
   },
   //每當state被更新時
  componentDidUpdate: function(prevProps,prevState) {
      if(this.state.timerStatus !== prevState.timerStatus) {
          switch (this.state.timerStatus){
              case 'start' :
                  this.handelStart();
                  break;
              case 'stopped' :
                  this.setState({count: 0});
              case 'paused' :
                   clearInterval(this.timer);
                   this.timer = undefined;
                   break;
          }
      }
  },
  componentWillUnmount: function(){
     clearInterval(this.timer);
  },
  handelStart: function(){
      this.timer = setInterval( ()=>{
          this.setState({
               count: this.state.count + 1
          });

      },1000);
  },
   //這個method 用來更新status喔，有三種status: start、stopped、paused
   handelStatusChange: function(newTimerStatus){
     this.setState({
        timerStatus: newTimerStatus
     })
   },
    render: function(){
        //這邊根據狀態決定render的按鈕，分為start、暫停、重置時間
        let {count,timerStatus} = this.state;
        return (
            <div>
             <h1 className="page-title">計時器應用</h1>
              <Clock totalSeconds={count}/>
              <Controls countdownStatus={timerStatus} onStatusChange={this.handelStatusChange}/>
            </div>
        );
    }

});
module.exports = Timer; 