//處理user輸入的component並且接收props把結果render到Countdown.jsx
import React from 'react';
//雖然我們是要做一個stateless function，但是因為我們要自訂一些特殊的method，所以我們還是用了createClass
let CountdownForm = React.createClass({
    onSubmit: function(e){
        e.preventDefault();
        //將user輸入的秒數字串接收，長這樣的：'123'
        let strSeconds = this.refs.seconds.value;//我們現在還只有秒數字串所以用這個變數來存
        //正則表達式，regular expression
        //條件是要strSeconds變數只有0~9，像這樣：'0293'，星號的意思是0~9的數字可以出現無數次
        if(strSeconds.match(/^[0-9]*$/)){
           this.refs.seconds.value = '' ;//不確定不用ref行不行
           this.props.onSetCountdown(parseInt(strSeconds, 10));//傳回去更新Countdown的state，要查一下parseInt method
        }
    },
    render: function(){
        return (
          <div>
             <form value="form" onSubmit={this.onSubmit} className="countdown-form">
                 
                 <input type="text" ref="seconds" placeholder="輸入要倒數的秒數" />
                 <button className="button expanded">Start</button>
             
             </form>
          
          </div>
        );
    }

});

module.exports = CountdownForm;