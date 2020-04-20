import React, { useState } from 'react'
import './login.css'
import Cookies from 'js-cookie'
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Input, Button, } from 'antd';
import logo from '../../assets/img/logo.svg'
import loginlogo from '../../assets/img/user.svg'
import SiteLayout from '../../component/layout/Layout'

const Login = () => {
    const history = useHistory();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const userNameChange = (e) => {
        setUserName(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {
        if(userName === '' || password === ''){
            setError('All fields are Required!!')
            setTimeout(function(){
                setError('')
            }, 3000)
        }else{
            fetch('https://wootlab-moviedb.herokuapp.com/api/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    password: password
                }),
            })
            .then(res => res.json())
            .then(response => {
                setUserName('')
                setPassword('')
                Cookies.set('id', response.id)
                Cookies.set('username', response.username)
                history.push("/home")
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    return(
        <SiteLayout>
            <div>
                <div className="login_banner">
                
                    <div className="login_banner_header">

                        <div className="logo">
                            <ul>
                                <li><img src={logo} alt=""/></li>
                            </ul>
                        </div>
                    
                    </div>
                    
                    <div className="login_banner_form">
                        <Row gutter={[16, 24]} className="login_form_row" >
                            <Col className="gutter-row login_form_holder" xs = {{ span: 24 }} sm = {{ span: 16 }} md = {{ span: 12 }} lg = {{ span: 10 }} xl ={{ span: 8 }}>
                                
                                <div className="login_logo">
                                    <img src={loginlogo} alt=""/>
                                    <h4>Sign In</h4>
                                    <p>Sign in to Wootlab Movies</p>
                                </div>

                                <div className="login_inputs">
                                    <div className="error">
                                        {error}
                                    </div>
                                    <Input placeholder="Username" onChange={userNameChange} />
                                    <Input.Password placeholder="Password" onChange={passwordChange} />
                                    <Button type="primary" onClick={login}>Sign In</Button>
                                </div>

                                {/* <div className="login_form_kmsi">
                                    <ul>
                                        <li>
                                            <Checkbox>Keep me signed in</Checkbox>
                                        </li>
                                    </ul>
                                </div> */}

                                <div className="login_footer">
                                    <ul>
                                    <NavLink exact to="/register" >
                                        <li>New to wootlab movies? <span>Sign up today.</span></li>
                                    </NavLink>
                                    </ul>
                                </div>
                            
                            </Col>
                        </Row>
                    </div>
                
                </div>
            </div>
        </SiteLayout>
    );
}

export default Login;