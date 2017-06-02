import React from 'react';
import Navigation from 'Navigation';
let Main = (props) => {
  return (
    <div>
      <Navigation />
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          {props.children}
          
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
