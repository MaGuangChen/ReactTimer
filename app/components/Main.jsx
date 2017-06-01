import React from 'react';
import Navigation from 'Navigation';
let Main = (props) => {
  return (
    <div>
      <div>
        <div>
         <Navigation />
          <p>Main.jsx Rendered</p>
          {props.children}
          
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
