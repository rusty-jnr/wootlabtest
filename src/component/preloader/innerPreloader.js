import React from 'react'
import './preloader.css'

const MiniPreloader = ({ isLoading }) => {


    return( 
        <div className={`inner_preloader ${isLoading ? 'active' : ''}`}>
            <div className='container'>
                <div className='lt'></div>
                <div className='rt'></div>
                <div className='lb'></div>
                <div className='rb'></div>
            </div>
            
        </div>
    );
}

export default MiniPreloader;