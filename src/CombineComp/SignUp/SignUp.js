import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import './SignUp.css';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../Assete/images/Logo/Pentagone tape.png';
import ImgSideSignUp from "../../Assete/images/navbar/abc.png";
import Navbar from '../../NavFoot/NavBar/Navbar';
import Footer from '../../NavFoot/Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Env from '../../Environments/Env';
import { Helmet } from 'react-helmet';

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const OnChangeData = (e) => {
    setData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }
  const submit = () => {
    // console.log(data)
    axios.post(`${Env.server}/api/user/signup`, data)
      .then((res) => {
        if (res.data.message === "success") {
          alert("Sign Up Success");
          navigate("/login");
        }
      })
      .catch((err) => console.log("Catch Error", err))
  }
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging - SignUp</title>
          <link rel="canonical" href={`${Env.link}/signup`} />
          <meta
            name="description"
            content="PentagonPackaging, is just a click away! Find cheap and quality custom packaging and custom printed boxed along with your own packaging design."
          />
          <meta
            property="og:title"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
          <meta
            name="keywords"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
        </Helmet>
      </div>
      <Navbar />
      <section style={{ marginTop: "50px" }} className="h-100 gradient-form">
        <div className="container py-5 h-100" >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src={logo}
                          style={{ height: '130px', width: "130px", marginBottom: "30px" }}
                          alt="logo"
                        />
                        {/* <h4 className="mt-1 mb-5 pb-1">Pentagone Packaging</h4> */}
                      </div>
                      <form>
                        <center><p>Sign Up</p></center>
                        <div className="form-outline mb-5">
                          <input
                            type="text"
                            id="form2Example11"
                            className="form-control"
                            onChange={(e) => OnChangeData(e)}
                            name='name'
                            placeholder="UserName"
                          />
                        </div>
                        <div className="form-outline mb-5">
                          <input
                            type="email"
                            onChange={(e) => OnChangeData(e)}
                            name='email'
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-outline mb-5">
                          <input
                            type="number"
                            name='phNum'
                            id="form2Example11"
                            className="form-control"
                            placeholder="Phone Number"
                            onChange={(e) => OnChangeData(e)}
                          />
                        </div>
                        <div className="form-outline mb-5">
                          <input
                            type="text"
                            onChange={(e) => OnChangeData(e)}
                            name='country'
                            id="form2Example11"
                            className="form-control"
                            placeholder="Country"
                          />
                        </div>

                        <div className="form-outline mb-3">
                          <input
                            type="password"
                            onChange={(e) => OnChangeData(e)}
                            name='password'
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                          />

                        </div>
                        <div >
                          <a className="text-muted ">
                            Forgot password?
                          </a>
                        </div>
                        <div className="text-center  ">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 borderRadius"
                            type="button"
                            style={{ margin: "30px", backgroundColor: "skyblue" }}
                            onClick={submit}
                          >
                            Sign Up
                          </button>


                        </div>
                        <div className="d-flex justify-content-center pb-4">
                          <p className="mb-0 me-2">Already Have a account?</p>
                          <Link to="/login" ><p style={{ color: "skyblue", cursor: "pointer" }}>Log in</p></Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <img src={ImgSideSignUp} style={{ height: "auto", width: "auto" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>

  );
};

export default SignUp;