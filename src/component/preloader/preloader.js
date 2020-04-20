import React, { useEffect, useState } from 'react'
import './preloader.css'
import { useLocation, useHistory, useParams } from 'react-router-dom';

const Preloader = () => {

    const [loader, setLoader] = useState(true);
    let location = useLocation();
    let history = useHistory();
    let { id, title } = useParams();

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 2000)
    }, [location, history, id, title])


    return (
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