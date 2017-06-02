var React = require('react');
var ReactDOM = require('react-dom');
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
var Main = require('Main');
import Timer from 'Timer';
import Countdown from 'Countdown';
// Load foundation讀取 foundation css
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

// App css的樣式要求
require('style!css!sass!applicationStyles')
//Route /是由Route tag所設定,當符合/時Main component就會render，
//底下的Route的path也是指路徑
//而在Nav.js中在定義去的路徑位置
//IndexRoute是當沒有任何東西被符合時要印的囉

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="countdown" component={Countdown}></Route>
      <Route path="countdown" component={Timer}></Route>
      <IndexRoute component={Timer}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
