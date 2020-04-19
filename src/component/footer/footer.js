import React from 'react'
import './footer.css'
import { Layout } from 'antd';

const Footer = () => {

    const { Footer } = Layout;
    let date = new Date();
    let year = date.getFullYear();

    return(
        <Footer>
            <div className="footer">
                <section>
                
                    <div className="footer_bottom">
                        <ul>
                            <li>&copy; Copyright {year} WootLab Movies</li>
                        </ul>
                    </div>
                
                </section>
            </div>
        </Footer>
    );
}

export default Footer;