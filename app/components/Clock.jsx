import React from 'react';
//Clock component是專門負責處理總秒數
//並將總秒數轉為分鐘與秒的格式


let Clock = React.createClass({
  //設定預設props，當沒收到props傳遞時的預設
  getDefaultProps: function () {
    totalSeconds: 0
  },
  //讓props的資料型態為number
  propTypes: {
    totalSeconds: React.PropTypes.number
  },
   //宣告新的method
  formatSeconds: function (totalSeconds) {
     //參數totalSeconds是傳進來的props，代表總秒數
    //seconds等於參數除以60的餘數
    let seconds = totalSeconds % 60;
     //minutes 為整除後的參數
    let minutes = Math.floor(totalSeconds / 60);

    if (seconds < 10) {//為單位數加上0
      seconds = '0' + seconds;
    }

    if (minutes < 10) {//為單位數加上0
      minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
  },
  render: function () {
    let {totalSeconds} = this.props;

    return (
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
});

module.exports = Clock;
