import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";

import { cartActions } from "../redux/slices/cartSlice";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import products from "../assets/data/products";
import ProductList from "../components/UI/ProductsList";
import "../styles/product-details.scss";


const ProductDetails = () => {
    const { id } = useParams();
    const [tab, setTab] = useState("desc");
    const [rating, setRating] = useState(null);
    const product = products.find(item => item.id === id);
    const { imgUrl, productName, price, avgRating, reviews, shortDesc, description, category } = product;
    const relatedProducts = products.filter(item => item.category === category);
    const reviewUser = useRef('');
    const reviewMsg = useRef('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            message: reviewUserMsg,
            rating
        }
        toast.success("Review successfully");
        console.log(reviewObj);
    };

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: id,
            productName: productName,
            image: imgUrl,
            price: price,
        }));
        toast.success("Product added successfully");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={productName}>
            <CommonSection title={productName} />
            {/* Main section */}
            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={imgUrl} alt="" />
                        </Col>
                        <Col lg="6">
                            <div className="product__details">
                                <h2>{productName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiOutlineStar /></span>
                                    </div>
                                    <p>(<span>{avgRating}</span> ratings)</p>
                                </div>
                                <div className="d-flex align-items-center gap-5">
                                    <span className="product__price">{price}</span>
                                    <span>Category: {category.toUpperCase()}</span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>
                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}>Add to Cart</motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Review section */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
                            </div>
                            {
                                tab === 'desc' ?
                                    <div className="tab__content mt-4">
                                        <p>{description}</p>
                                    </div>
                                    :
                                    <div className="product__review mt-5">
                                        <div className="review__wrapper">
                                            <ul>
                                                {
                                                    reviews?.map((review, index) => (
                                                        <li key={index} className="mb-4">
                                                            <h6>John Doe</h6>
                                                            <span>{review.rating} (rating)</span>
                                                            <p>{review.text}</p>
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <div className="review__form">
                                                <h4>Leave your experience</h4>
                                                <form action="" onSubmit={submitHandler}>
                                                    <div className="form__group">
                                                        <input type="text" placeholder="Enter your name" ref={reviewUser} required />
                                                    </div>
                                                    <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<AiFillStar /></motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<AiFillStar /></motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<AiFillStar /></motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<AiFillStar /></motion.span>
                                                        <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<AiFillStar /></motion.span>
                                                    </div>
                                                    <div className="form__group mb-0">
                                                        <textarea ref={reviewMsg} rows={4} type="text" placeholder="Your opinion..." required />
                                                    </div>
                                                    <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy__btn" >Submit</motion.button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </Col>

                        {/* Related Products */}
                        <Col lg='12' className="mt-5">
                            <h2 className="related__title">You might also like</h2>
                        </Col>
                        <ProductList data={relatedProducts} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default ProductDetails