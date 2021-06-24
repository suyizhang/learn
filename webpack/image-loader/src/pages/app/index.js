import React from 'react';
import './index.less';
import imgUrl from './wallhaven-ne78w4filter.png';
import jmgUrl from './wallhaven-ne78w4filter.jpg';
import ss from './2038367.jpg';
const App = () => {
  return (
    <div className="app">
      <img className="im" src={imgUrl} /> 
      <img className="im" src={jmgUrl} /> 
      <img className="im" src={ss} /> 
    </div>
  )
};

export default App;
