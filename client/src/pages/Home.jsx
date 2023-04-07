import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img.png';
import Services from '../../services/Services';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products';
import "../styles/home.scss"

const Home = () => {

    const year = new Date().getFullYear();
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [mobileProducts, setMobileProducts] = useState([]);
    const [wirelessProducts, setWirelessProducts] = useState([]);
    useEffect(() => {
        const filteredTrendingProducts = products.filter(item => item.category === "chair");
        const filteredBestSalesProducts = products.filter(item => item.category === "sofa");
        const filteredMobileProducts = products.filter(item => item.category === "mobile");
        const filteredWirelessProducts = products.filter(item => item.category === "wireless");
        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);
        setMobileProducts(filteredMobileProducts);
        setWirelessProducts(filteredWirelessProducts);
    }, [])


    return <Helmet title="Home">
        <section className='hero__section'>
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <div className="hero__content">
                            <p className="hero__subtitle">Trending product in {year}</p>
                            <h2>Make Your Interior More Minimalistic & Modern </h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum mi nec hendrerit semper. Nam et dolor magna. Morbi nec felis id dui tincidunt maximus nec bibendum quam.</p>
                            <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
                                <Link to='/shop' >SHOP NOW</Link>
                            </motion.button>
                        </div>
                    </Col>
                    <Col lg='6' md='6'>
                        <div className='hero__img'>
                            <img src={heroImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <Services />
        <section className='trending__products'>
            <Container>
                <Row>
                    <Col lg="12" className='text-center'>
                        <h2 className='section__title'>Trending Products</h2>
                    </Col>
                    <ProductsList data={trendingProducts} />
                </Row>
            </Container>
        </section>

        <section className='best__sales'>
            <Container>
                <Row>
                    <Col lg="12" className='text-center'>
                        <h2 className='section__title'>Best Sale</h2>
                    </Col>
                    <ProductsList data={bestSalesProducts} />
                </Row>
            </Container>
        </section>

        <section className='new__arrivals'>
            <Container>
                <Row>
                    <Col lg="12" className='text-center'>
                        <h2 className='section__title'>New Arrivals</h2>
                    </Col>
                    <ProductsList data={mobileProducts} />
                    <ProductsList data={wirelessProducts} />
                </Row>
            </Container>
        </section>
    </Helmet>
}

export default Home