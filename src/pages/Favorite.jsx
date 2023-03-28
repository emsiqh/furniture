import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

const Favorite = () => {
    return (
        <Helmet title="Favorite">
            <CommonSection title="Favorite items" />
            <section>
                <Container>
                    <Row>
                        <Col lg='9'>

                        </Col>
                        <Col lg='3'>

                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Favorite