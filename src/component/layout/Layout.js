import React, { useEffect } from 'react'
import './layout.css'
import { useLocation } from 'react-router-dom';
import Header from '../header/header'
import Footer from '../footer/footer'
import { Layout } from 'antd';
import Preloader from '../../component/preloader/preloader'

const SiteLayout = (props) => {
    let location = useLocation();
    const { Content } = Layout;

    useEffect(() => {
    }, [location])

    return(
        <div>
        <Preloader />
            <Layout>
                {
                    location.pathname === "/" || location.pathname === "/register" 
                        ?
                    ''
                        :
                    <Header />
                }
                    <Content>
                        {props.children}
                    </Content>
                <Footer />
            </Layout>
        </div>
    );
}

export default SiteLayout;