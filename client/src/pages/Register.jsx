import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, storage, db } from "../firebase.config";
import Helmet from "../components/Helmet/Helmet";
import "../styles/login.scss";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const storageRef = ref(storage, `images/${Date.now() + userName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on((error) => {
                toast.error(error.message);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // update profile
                    await updateProfile(user, {
                        displayName: userName,
                        photoURL: downloadURL
                    })

                    // store user profile in firestore database
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: userName,
                        email,
                        photoURL: downloadURL,
                    })
                })
            })

            setLoading(false);
            toast.success("Account created successfully");
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    }

    return (
        <Helmet title="Register">
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
                                    <h3 className="fw-bold fs-4 mb-4">Register</h3>
                                    <Form className="auth__form" onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input className="border-0 bg-white" type="file" onChange={e => setFile(e.target.files[0])} />
                                        </FormGroup>
                                        <button type="submit" className="buy__btn auth__btn">Create</button>
                                        <p>Already have an account? <Link to="/login">Login now</Link></p>
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

export default Register