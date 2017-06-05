import React from 'react';

let Controls = React.createClass({
  propTypes: {
      countdownStatus: React.PropTypes.string.isRequired,
      onStatusChange: React.PropTypes.func.isRequired
  },
  //處理按鈕被點擊所被改變的state
  onStatusChange: function(newStatus) {
    //在這個onStatusChange的method裡面，我們是用一個function去產出另外一個function
    //學習如何使用function產出function是有價值的技巧
     return ()=>{
         //這編的onStatusChange不是method而是Controls的props，會將props回傳回去更新
         //Controls component的state
         this.props.onStatusChange(newStatus);
     }
  },
  render: function(){
      let {countdownStatus} = this.props;
      //利用props的值來決定要返回什麼按鈕，是暫停還是開始按鈕
      let renderStartStopButton = () => {
          if(countdownStatus == 'start'){
            return <button className="button secondary" onClick={this.onStatusChange('paused')}>暫停</button>
          }else if(countdownStatus == 'paused'){
              return <button className="button primary" onClick={this.onStatusChange('start')}>Start</button>
          }
      };
      return (
         <div className="controls">
            {renderStartStopButton()}
            <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>重置時間</button>
         </div>
      );
  }
});

module.exports = Controls;