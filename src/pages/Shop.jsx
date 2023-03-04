import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { BsSearch } from "react-icons/bs";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import "../styles/shop.scss";

const Shop = () => {
    const [productsData, setProductsData] = useState(products);
    const filterFunctions = {
        sofa: item => item.category === 'sofa',
        chair: item => item.category === 'chair',
        mobile: item => item.category === 'mobile',
        watch: item => item.category === 'watch',
        wireless: item => item.category === 'wireless'
    };

    const handleFilter = e => {
        const filterValue = e.target.value;
        if (filterFunctions[filterValue]) {
            const filteredProducts = products.filter(filterFunctions[filterValue]);
            setProductsData(filteredProducts);
        }
    }

    const handleSearch = e => {
        const searchValue = e.target.value;
        const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchValue.toLowerCase()));
        setProductsData(searchedProducts);
    }

    return (
        <Helmet title="Shop">
            <CommonSection title="Product Details" />
            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="3">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option>Filter by category</option>
                                    <option value="chair">Chair</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="3">
                            <div className="filter__widget">
                                <select>
                                    <option>Sort by</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="6">
                            <div className="search__box">
                                <input type="text" placeholder="Search..." onChange={handleSearch} />
                                <span>
                                    <BsSearch />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        {
                            productsData.length === 0 ? <h1 className="text-center fs-4">No product is found!</h1> : <ProductsList data={productsData} />
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Shop