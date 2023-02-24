import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img.png';
import Services from '../../services/Services';
import ProductsList from '../components/UI/ProductsList';
import "../styles/home.scss"

const Home = () => {
    const year = new Date().getFullYear();

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
                    <ProductsList />
                </Row>
            </Container>
        </section>
    </Helmet>
}

export default Home