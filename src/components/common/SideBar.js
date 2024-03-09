import React from 'react'
import Home from '../../assets/home.svg'
import Analytics from '../../assets/analytics.svg'
import Settings from '../../assets/settings.svg'
import Logo from '../../assets/logo.jpg'
function SideBar() {
  return (
    <div className='side-bar'>
        <div className='logo'>
            <img src={Logo} alt='logo' height={40} style={{borderRadius:"50%"}}/>
            <span>Low code api</span>
        </div>
       <div className='container-side'>
       <div className='side-bar-item'><img src={Home} alt='home' height={24}/>Home</div>
        <div className='side-bar-item'><img src={Analytics} alt='Analytics' height={24}/>Analytics</div>
        <div className='side-bar-item'><img src={Settings} alt='settigs' height={24}/>Settings</div>
       </div>
    </div>
  )
}

export default SideBar