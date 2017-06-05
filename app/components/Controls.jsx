import React from 'react';

let Controls = React.createClass({
  propTypes: {
      countdownStatus: React.PropTypes.string.isRequired
  },
  render: function(){
      let {countdownStatus} = this.props;
      let renderStartStopButton = () => {
          if(countdownStatus == 'start'){
            return <button className="button secondary">暫停</button>
          }else if(countdownStatus == '暫停'){
              return <button className="button primary">Start</button>
          }
      };
      return (
         <div className="controls">
            {renderStartStopButton()}
            <button className="button alert hollow">重置時間</button>
         </div>
      );
  }
});

module.exports = Controls;