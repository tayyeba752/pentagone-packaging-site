import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import './Login.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../Assete/images/Logo/Pentagone tape.png';
import img2 from "../../Assete/images/slideshow/team-meeting-renewable-energy-project.jpeg";
import Navbar from '../../NavFoot/NavBar/Navbar';
import Footer from '../../NavFoot/Footer/Footer';
import { Link } from 'react-router-dom';
import Env from '../../Environments/Env';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {
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
    axios.post(`${Env.server}/api/user/login`, data)
      .then((res) => {
        let resp = res.data.response;
        if (res.data.message === "successLogin") {
          if (resp.role === "admin") {
            localStorage.setItem("role", resp.role)
            localStorage.setItem("name", resp.name)
            // navigate("/Admin/Dashboard");
          } else {
            localStorage.setItem("role", "user");
            localStorage.setItem("country", resp.country)
            localStorage.setItem("email", resp.email)
            localStorage.setItem("phNum", resp.phNum)
            localStorage.setItem("name", resp.name)
            navigate("/");
          }
        }
      })
      .catch((err) => alert("error login"))
  }

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging - Login</title>
          <link rel="canonical" href={`${Env.link}/login`} />
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
      <section className="h-100 gradient-form" style={{ marginBottom: "60px", marginTop: "60px" }}>
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
                          alt="pentagone_Logo"
                        />
                        {/* <h4 className="mt-1 mb-5 pb-1">Pentagone Packaging</h4> */}
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-5">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            onChange={(e) => OnChangeData(e)}
                            name='email'
                            placeholder="email address"
                          />
                        </div>
                        <div className="form-outline mb-3">
                          <input
                            type="password"
                            id="form2Example22"
                            onChange={(e) => OnChangeData(e)}
                            className="form-control"
                            name='password'
                            placeholder="Password"
                          />
                          {/* <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label> */}
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
                            Log in
                          </button>


                        </div>
                        <div className="d-flex justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/signup" ><p style={{ color: "skyblue", cursor: "pointer" }}>Create new</p></Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h3 className="mb-4 fw-bold">We are more than just a company</h3>
                      <p className='text-white'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
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

export default Login;