import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiShoppingBag, BiHeart, BiMenu } from "react-icons/bi";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";


import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { nav__links } from "../../assets/data/constant";
import userAuth from "../../custom-hooks/userAuth";
import { auth } from "../../firebase.config";

import "./header.css";
import { cartActions } from "../../redux/slices/cartSlice";
import { favActions } from "../../redux/slices/favSlice";

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const userActionRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const favQuantity = useSelector(state => state.favorites.favQuantity);
    const navigate = useNavigate();
    const { currentUser } = userAuth();

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
    const userActionToggle = () => userActionRef.current.classList.toggle("show__userActions");

    const dispatch = useDispatch();

    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Logged out");
            dispatch(cartActions.clearAllItems());
            dispatch(favActions.clearAllFavorites());
            navigate('/home');
        }).catch(err => {
            toast.error("Something went wrong");
        })
    }

    const navigateToCart = () => {
        navigate("/cart");
    };

    const navigateToFav = () => {
        navigate("/fav");
    };


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
                            <span className="fav__icon" onClick={navigateToFav}>
                                <BiHeart fontSize="1.4rem" color="#0a1d37" cursor="pointer" />
                                <span className="badge">{favQuantity}</span>
                            </span>
                            <span className="cart__icon" onClick={navigateToCart}>
                                <BiShoppingBag fontSize="1.4rem" color="#0a1d37" cursor="pointer" />
                                <span className="badge">{totalQuantity}</span>
                            </span>
                            <div className="user__profile">
                                <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} alt="user" onClick={userActionToggle} />
                                <div
                                    className="user__actions"
                                    ref={userActionRef}
                                    onClick={userActionToggle}>
                                    {
                                        currentUser ? <span onClick={logout}>Logout</span> :
                                            <div className="d-flex align-items-center justify-content-center flex-column">
                                                <Link to="/login">Login</Link>
                                                <Link to="/register">Register</Link>
                                            </div>
                                    }
                                </div>
                            </div>
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