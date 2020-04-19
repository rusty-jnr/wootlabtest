import React from 'react'
import Footer from '../footer/footer'
import { Layout } from 'antd';
import Preloader from '../../component/preloader/preloader'

const LogRegLayout = (props) => {

    const { Content } = Layout;

    return(
        <div>
            <Preloader />
            <Layout>
                    <Content>
                        {props.children}
                    </Content>
                <Footer />
            </Layout>
        </div>
    );
}

export default LogRegLayout;