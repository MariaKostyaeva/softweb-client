import React from 'react';
import './Footer.style.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_content p-4">
                <div>
                    <div className="navigation-up">
                        <a href="#" className="up">Наверх</a>
                        <a href="#" className="arrow"><i className="fa-solid fa-chevron-up"></i></a>
                    </div>
                    <div className="content">© 2023 SoftWeb Inc.<br/>Powered by Maksimchuk Ivan and Kostyaeva Maria</div>
                </div>
                <div className="footer-social social">
                    <a href="#" className="social_item fab fa-telegram"></a>
                    <a href="#" className="social_item fab fa-vk"></a>
                    <a href="#" className="social_item fab fa-google"></a>
                    <a href="#" className="social_item fab fa-yandex"></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;