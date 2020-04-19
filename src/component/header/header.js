import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import './header.css'
import Cookies from 'js-cookie'
import logo from '../../assets/img/logo.svg'

const Header = () => {
    let location = useLocation();
    let history = useHistory();
    var cookie = Cookies.get('username');

    const { Header } = Layout;

    const [scroll, setScroll] = useState(false)
    const [showPopOver, setShowPopOver] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY;
            if(isTop > 0){
                setScroll(true)
            }else{
                setScroll(false)
            }
        });

        window.removeEventListener('scroll', () => {
            let isTop = window.scrollY;
            if(isTop === true){
                setScroll(true)
                console.log(isTop)
            }else{
                setScroll(false)
                console.log(isTop)
            }
        });
    },[location])

    const showMenu = () => {
        setShowPopOver(!showPopOver)
    }

    const signOut = () => {
        Cookies.remove('username')
        Cookies.remove('id')
        history.push("/")
    }
    
    return(
        <div>
            <Header className={`${scroll === false ? '' : 'active_header'}`}>
                <div className={`account_style `}>
                    <div className="logo">
                        <NavLink exact to="/home">
                            <img src={logo} alt="" />
                        </NavLink>
                    </div>
                </div>   

                <div className="user_name">

                    <p>Hello {cookie}</p>

                    <div className={`drawer_icon ${showPopOver === true ? 'active' : ''}`} onClick={showMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    
                    <div className={` ${showPopOver === false ? 'hidden_content' : 'user_content'}`}>
                        <ul>
                            <NavLink exact to="/favourite">
                                <li>
                                    Favourite
                                </li>
                            </NavLink>
                        </ul>

                        <hr />

                        <ul>
                            <li onClick={signOut}>Sign out</li>
                        </ul>
                    </div>

                </div> 
            </Header>
        </div>
    );
}

export default Header;