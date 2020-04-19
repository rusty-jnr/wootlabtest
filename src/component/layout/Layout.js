import React from 'react'
import './layout.css'
import Header from '../header/header'
import Footer from '../footer/footer'
import { Layout } from 'antd';
import Preloader from '../../component/preloader/preloader'

const SiteLayout = (props) => {

    const { Content } = Layout;

    return(
        <div>
        <Preloader />
            <Layout>
                <Header />
                    <Content>
                        {props.children}
                    </Content>
                <Footer />
            </Layout>
        </div>
    );
}

export default SiteLayout;