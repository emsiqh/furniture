import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { AiFillDelete, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { cartActions } from "../redux/slices/cartSlice";
import "../styles/cart.scss";

const Cart = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const deleteProduct = (item) => {
        dispatch(cartActions.deleteItem(item.id));
        toast.success("Product deleted successfully");
    };

    const increaseQuantity = (item) => {
        dispatch(cartActions.increaseQuantity(item.id));
    };

    const decreaseQuantity = (item) => {
        dispatch(cartActions.decreaseQuantity(item.id));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping Cart" />
            <section>
                <Container>
                    <Row>
                        <Col lg="9">
                            {
                                cartItems.length === 0 ? <h2 className="fs-4 text-center">No item added to the cart</h2>
                                    :
                                    <table className="table bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td><img src={item.imgUrl} /></td>
                                                        <td>{item.productName}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-around">
                                                                {item.quantity}
                                                                <div className="d-flex flex-column">
                                                                    <AiOutlineArrowUp className="change__qty-icon" onClick={() => increaseQuantity(item)} />
                                                                    <AiOutlineArrowDown className="change__qty-icon" onClick={() => decreaseQuantity(item)} />
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td><AiFillDelete className="cart__icon" onClick={() => deleteProduct(item)} /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                            }

                        </Col>
                        <Col lg="3">
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">
                                    Subtotal
                                    <span className="fs-4 fw-bold">${totalAmount}</span>
                                </h6>
                            </div>

                            <p className="fs-6 mt-2">Shipping fee will be caculated in checkout</p>
                            <div>
                                <button className="buy__btn w-100"><Link to="/checkout">Checkout</Link></button>
                                <button className="buy__btn w-100 mt-3"><Link to="/shop">Continue shopping</Link></button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </Helmet>
    )
}

export default Cart