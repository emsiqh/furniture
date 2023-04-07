import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MdAdd, MdFavorite } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { cartActions } from '../../redux/slices/cartSlice';
import { favActions } from '../../redux/slices/favSlice';
import "../../styles/product-card.scss";

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
        }));
        toast.success("Product added successfully");
    };

    const favItems = useSelector(state => state.favorites.favItems);
    const addToFav = () => {
        const itemAlreadyInFav = favItems.some(fav => fav.id === item.id);
        if (itemAlreadyInFav) {
            toast.error("Item is already in favorites");
        } else {
            dispatch(favActions.addFavorite({
                id: item.id,
                productName: item.productName,
                price: item.price,
                imgUrl: item.imgUrl,
            }));
            toast.success("Added to favorites successfully");
        }
    };

    return (
        <Col lg='3' md="4">
            <div className='product__item'>
                <div className='product__img'>
                    <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
                </div>
                <div className='p-2 product__info'>
                    <h3 className='product__name'><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span>{item.category}</span>
                </div>

                <div className='product__card-bottom d-flex align-items-center justify-content-between p-2'>
                    <span className='price'>${item.price}</span>
                    <div className="d-flex gap-2">
                        <motion.span whileTap={{ scale: 1.2 }} onClick={addToFav}>
                            <MdFavorite className='product__icon-add' />
                        </motion.span>
                        <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
                            <MdAdd className='product__icon-add' />
                        </motion.span>
                    </div>
                </div>
            </div>
        </Col>

    )
}

export default ProductCard