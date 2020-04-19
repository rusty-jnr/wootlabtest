import React, { useState } from 'react'
import './register.css'
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import logo from '../../assets/img/logo.svg'
import loginlogo from '../../assets/img/user.svg'
import LogRegLayout from '../../component/nouserlayout/Layout'

const Register = () => {

    const history = useHistory();

    const [firstName, setFirstName] = useState('')
    const [surName, setSurName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const firstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const surNameChange = (e) => {
        setSurName(e.target.value)
    }

    const userNameChange = (e) => {
        setUserName(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const register = () => {
        if(firstName === '' || surName === '' || userName === '' || password === ''){
            setError('All fields are Required!!')
            setTimeout(function(){
                setError('')
            }, 3000)
        }else{
            fetch('https://wootlab-moviedb.herokuapp.com/api/user/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: surName,
                    username: userName,
                    password: password
                }),
            })
            setSuccess('Registered Successfully')
            setTimeout(function(){
                setSuccess('')
                setFirstName('')
                setSurName('')
                setUserName('')
                setPassword('')
                history.push("/")
            }, 3000)
        }
    }

    return(
        <LogRegLayout>
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
                                    <h4>Sign Up</h4>
                                    <p>Sign Up to Wootlab Movies</p>
                                </div>

                                <div className="login_inputs">
                                    <div className="error">
                                        {error}
                                    </div>
                                    <div className="success">
                                        {success}
                                    </div>
                                    <Input placeholder="Firstname" onChange={firstNameChange} />
                                    <Input placeholder="Surname" onChange={surNameChange} />
                                    <Input placeholder="Username" onChange={userNameChange} />
                                    <Input.Password placeholder="Password" onChange={passwordChange} />
                                    <Button type="primary" onClick={register}>Sign Up</Button>
                                </div>

                                <div className="login_footer">
                                    <ul>
                                    <NavLink exact to="/" >
                                        <li>have an account already <span>Sign in</span></li>
                                    </NavLink>
                                    </ul>
                                </div>
                            
                            </Col>
                        </Row>
                    </div>
                
                </div>
            </div>
        </LogRegLayout>
    );
}

export default Register;