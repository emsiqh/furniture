import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import Helmet from "../components/Helmet/Helmet";
import { auth } from "../firebase.config";
import "../styles/login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
            toast.success("Login successfully");
            navigate("/checkout");
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <Helmet title="Login">
            <section>
                <Container>
                    <Row>
                        {
                            loading ? (
                                <Col lg='12' className="text-center">
                                    <h5 className="fw-bold">Loading...</h5>
                                </Col>
                            ) : (
                                <Col lg="6" className="m-auto text-center">
                                    <h3 className="fw-bold fs-4 mb-4">Login</h3>
                                    <Form className="auth__form" onSubmit={signIn}>
                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>
                                        <button type="submit" className="buy__btn auth__btn">Login</button>
                                        <p>Don't have an account? <Link to="/register">Create now</Link></p>
                                    </Form>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Login