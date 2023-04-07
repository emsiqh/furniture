import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { social__links } from '../../assets/data/constant';
import './footer.scss';

const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className='footer'>
            <Container>
                <Row>
                    <Col lg="4" md="6" className='mb-4'>
                        <div className="logo">
                            <h1 className='text-white'>Multimart</h1>
                        </div>
                        <p className='footer__text mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel nibh ut nisi volutpat luctus at at lorem.</p>
                    </Col>
                    <Col lg="3" md="3" className='mb-4'>
                        <div className='footer__quick-links'>
                            <h4 className='quick__links-title'>Top Categories</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Mobile Phones</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Modern Sofa</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="2" md="3" className='mb-4'>
                        <div className='footer__quick-links'>
                            <h4 className='quick__links-title'>Useful links</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Shop</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Cart</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Login</Link>
                                </ListGroupItem>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to="#">Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="1" md="4">
                        <div className='footer__quick-links'>
                            <h4 className='quick__links-title'>Contact</h4>
                            <ListGroup className='mb-3'>
                                {
                                    social__links.map((item, index) => {
                                        return (
                                            <ListGroupItem key={index} className='ps-0 border-0 d-flex align-items-center gap-2'>
                                                <span>{React.createElement(item.icon, { className: "social__icon" })}</span>
                                                <Link to={item.path}>{item.name}</Link>
                                            </ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg="12" className='text-white footer__copyright'>
                        Copyright {year}
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer