import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { favActions } from "../redux/slices/favSlice";
import { cartActions } from '../redux/slices/cartSlice';
import "../styles/favorite.scss";

const Favorite = () => {

    const favItems = useSelector(state => state.favorites.favItems);
    const dispatch = useDispatch();
    const deleteProduct = (item) => {
        dispatch(favActions.deleteFavorite(item.id));
        toast.success("Removed from favorite successfully");
    }

    const addToCart = (item) => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
        }));
        toast.success("Product added successfully");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Helmet title="Favorite">
            <CommonSection title="Favorite items" />
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className="d-flex flex-column">
                            {
                                favItems.length === 0 ? <h2 className="fs-4 text-center">No item added to the favorites</h2>
                                    : (
                                        favItems.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="fav__item">
                                                        <div className="fav__item-img">
                                                            <img src={item.imgUrl} alt="product" />
                                                        </div>
                                                        <div className="fav__item-info">
                                                            <div className="fav__item-rating">
                                                                <AiFillStar />
                                                                <AiFillStar />
                                                                <AiFillStar />
                                                                <AiFillStar />
                                                                <AiFillStar />
                                                            </div>
                                                            <div className="fav__item-name">
                                                                <h3 className="fav__item-title">{item.productName}</h3>
                                                            </div>
                                                            <div className="fav__item-price">
                                                                ${item.price}
                                                            </div>
                                                            <div className="fav__item-actions">
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => addToCart(item)}>
                                                                    <MdAdd className="fav__item-icon" />
                                                                </motion.span>
                                                                <motion.span whileTap={{ scale: 1.2 }} onClick={() => deleteProduct(item)}>
                                                                    <AiFillDelete className="fav__item-icon" />
                                                                </motion.span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Favorite