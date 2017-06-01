import React , {Component} from 'react';
import {Link, IndexLink} from 'react-router';
//React router的東西啦，要用所以要引入


//因為我這個只是簡單的presentaion component
//所以我直接arrow function囉
let Navigation = ()=>{
   return (
       <div className="top-bar">
          <div className="top-bar-left">
              <ul className="menu">
                  <li className="menu-text">
                     React 計時應用
                  </li>
                  <li>
                    <IndexLink to="/" activeClassName="active-link">計時器Timer</IndexLink>
                  </li>
                  <li>
                    <Link to="/" activeClassName="active-link">倒數計時器Countdown</Link>
                  </li>
              </ul>
          </div>
          
          <div className="top-bar-right">
               <ul className="menu">
                   <li className="menu-text" >
                      Created by  
                       <a href="https://github.com/MaGuangChen" target="_blank">Paul Ma</a>
                   </li>
                </ul>
          </div>
       </div>
   );
};

module.exports = Navigation;