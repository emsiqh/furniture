import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { BsSearch } from "react-icons/bs";

import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import Helmet from "../components/Helmet/Helmet";
import products from "../assets/data/products";
import "../styles/shop.scss";

const Shop = () => {
    const [productsData, setProductsData] = useState(products);
    const [sortBy, setSortBy] = useState("");

    const filterFunctions = {
        all: () => true, // default
        sofa: item => item.category === 'sofa',
        chair: item => item.category === 'chair',
        mobile: item => item.category === 'mobile',
        watch: item => item.category === 'watch',
        wireless: item => item.category === 'wireless'
    };

    const handleFilter = e => {
        const filterValue = e.target.value;
        setSortBy("");
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

    const handleSort = e => {
        const sortValue = e.target.value;
        setSortBy(sortValue);
        const sortedProducts = [...productsData];
        if (sortValue === "ascending") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "descending") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProductsData(sortedProducts);
    };

    return (
        <Helmet title="Shop">
            <CommonSection title="Product Details" />
            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="all">Filter by category</option>
                                    <option value="chair">Chair</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select value={sortBy} onChange={handleSort}>
                                    <option value="">Sort by</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
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