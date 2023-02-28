import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiShoppingBag, BiHeart, BiMenu } from "react-icons/bi";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { nav__links } from "../../assets/data/constant";

import "./header.css";

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("sticky__header");
            } else {
                headerRef.current.classList.remove("sticky__header");
            }
        })
    }

    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    })

    const menuToggle = () => menuRef.current.classList.toggle("active__menu");


    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <h1>Multimart</h1>
                        </div>
                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
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
                                <span className="badge">{totalQuantity}</span>
                            </span>
                            <span><motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="user" /></span>
                            <div className="mobile__menu">
                                <span onClick={menuToggle}><BiMenu /></span>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header