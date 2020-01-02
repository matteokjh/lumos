import React, { useState, useEffect } from 'react';
import './App.sass';
import Nav from './components/Nav'
import { userProps } from './types/user'

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as userProps)

  // methods
  const getUserInfo = () => {

  }

  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className="App">
      {/* 顶部导航栏 */}
      <Nav imageUrl={userInfo.avatar} name={userInfo.name}/>
    </div>
  );
}

export default App;
