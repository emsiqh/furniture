import { NavLink } from "react-router-dom";
import { BiShoppingBag, BiHeart, BiMenu } from "react-icons/bi";

import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { nav__links } from "../../assets/data/constant";

import "./header.css";

const Header = () => {
    return (
        <header className="header">
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <h1>Multimart</h1>
                        </div>
                        <div className="navigation">
                            <ul className="menu">
                                {
                                    nav__links.map((item) => (
                                        <li className="nav__item" key={item.path}>
                                            <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav__active" : ""}>{item.display}</NavLink>
                                        </li>
                                    )
                                    )
                                }
                            </ul>
                        </div>

                        <div className="nav__icons">
                            <span className="fav__icon">
                                <BiHeart fontSize="1.4rem" color="#0a1d37" cursor="pointer" />
                                <span className="badge">1</span>
                            </span>
                            <span className="cart__icon">
                                <BiShoppingBag fontSize="1.4rem" color="#0a1d37" cursor="pointer" />
                                <span className="badge">1</span>
                            </span>
                            <span><motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="user" /></span>
                        </div>

                        <div className="mobile__menu">
                            <span><BiMenu /></span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header