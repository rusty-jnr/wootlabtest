import React, { useEffect, useState } from 'react'
import './preloader.css'
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'

const Preloader = ({ match }) => {

    const [loader, setLoader] = useState(true);
    let location = useLocation();
    let history = useHistory();
    let { id, title } = useParams();

    useEffect(() => {
        var cookie = Cookies.get('username');

        setTimeout(function(){
            if(
                location.pathname === "/home" || location.pathname === `/view/${id}/${title}` || 
                location.pathname === "/favourite"
            ){
                if(cookie){
                    console.log('Cookie available')
                    setLoader(false)
                }else{
                    history.push("/")
                    setLoader(false)
                }
            }else if(
                location.pathname === "/" || location.pathname === "/register"
            ){
                if(cookie){
                    history.push("/home")
                    setLoader(false)
                }else{
                    console.log('Cookie not available')
                    setLoader(false)
                }
            }
        }, 1000)
    },[location, history, id, title])


    return( 
        <div className={`preloader ${loader === true ? 'active' : ''}`}>
            <div className='container'>
                <div className='lt'></div>
                <div className='rt'></div>
                <div className='lb'></div>
                <div className='rb'></div>
            </div>
            
        </div>
    );
}

export default Preloader;