import React from 'react';
import Clock from 'Clock';
import CountdownForm from 'CountdownForm';

var Countdown = React.createClass({
    getInitialState: function(){
      return {count:0};
    },
    //更新state
    handleSetCountdown: function(seconds){
        this.setState({
           count: seconds
        });
    },
    render: function(){
        var {count} = this.state;
        return (
            <div>
              <Clock totalSeconds={129}/>
              <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            </div>
        );
    }

});
module.exports = Countdown;