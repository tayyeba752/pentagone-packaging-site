import React from "react";
import logo from "../../Assete/images/Logo/PentagonePng.png"
import { Link } from "react-router-dom";
const Footer = () => {
  const phoneNumber = "(888) 404-6465";
  return (
    <>
      <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#40b2d8e0", color: "white" }}>

        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

          <div className="me-5 d-none d-lg-block">
            <span style={{ color: "white"  , fontWeight:"bold"}}>Get connected with us on social networks:</span>
          </div>
          <div className="social-links">
            <a style={{ color: "white" }} href="#" className="social-icon-link bi-whatsapp fs-3"></a>
            <a style={{ color: "white" }} href="#" className="social-icon-link bi-instagram fs-3"></a>
            <a style={{ color: "white" }} href="#" className="social-icon-link bi-linkedin fs-3"></a>
            <a style={{ color: "white" }} href="#" className="social-icon-link bi-facebook fs-3"></a>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-5">
              <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
                <h6 className="  fw-bold mb-4" style={{ color: "white" }}>
                  <i className="fas fa-gem me-3"></i><img src={logo} style={{ height: "70px", width: "200px", cursor: "pointer", marginTop: "10px" }} />
                </h6>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="  fw-bold mb-4" style={{ color: "white" }}>
                  Products
                </h6>
                <p style={{ color: "white"  }}>
                  <a href="/catagories" className="text-reset" style={{ color: "white" }}>Categories</a>
                </p>
                <p style={{ color: "white"  }}>
                  <a href="/industries" className="text-reset" style={{ color: "white" }}>Industries</a>
                </p>
                <p style={{ color: "white" }}>
                  <a href="/ShapesAndStyle" className="text-reset" style={{ color: "white"  }}>Shape & Styles</a>
                </p>
                <p style={{ color: "white"  }}>
                  <a href="/Materials" className="text-reset" style={{ color: "white" }}>Materials</a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="  fw-bold mb-4" style={{ color: "white" }}>
                  Useful links
                </h6>
                <p style={{ color: "white"  }}>
                  <a href="/" className="text-reset">Home</a>
                </p>
                <p style={{ color: "white"  }}>
                  <a href="/GetQuote" className="text-reset">Get Quote</a>
                </p>
                <p style={{ color: "white"  }}>
                  <a href="/products" className="text-reset">Products</a>
                </p>
                <p style={{ color: "white"  }}>
                  <a href="/login" className="text-reset">Login</a>
                </p>
              </div>

              <div className="col-md-6 col-lg-3 col-xl-4 mx-auto mb-md-0 mb-4">
                <h6 className="  fw-bold mb-4" style={{ color: "white" }}>Contact</h6>
                {/* <p><i className="social-icon-link bi-house fs-3"></i> Pentagon Services</p> */}
                <p style={{ color: "white"  }}>
                  <i className="social-icon-link bi-envelope fs-3" style={{ color: "white" }}></i>
                  <a  href="mailto:sales@pentagonpackaging.com" class="social-icon-link" style={{fontSize:"17px", cursor:"pointer", color:"white"}}>sales@pentagonpackaging.com</a>

                </p>
                {/* <p><i className="social-icon-link bi-telephone fs-3"></i> 032333333333333</p> */}
                <p style={{ color: "white"  }}>
                  <i style={{ color: "white" }} className="social-icon-link bi-telephone fs-3"></i>
                  <span
                    style={{ fontSize: "17px", cursor:"pointer" ,color:"white"}}
                    className="social-icon-link"
                    onClick={() => window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`}
                  >
                    {phoneNumber}
                  </span>
                </p>
                <p style={{ color: "white" }}>
                  <i style={{ color: "white" }} className="social-icon-link bi-geo-alt fs-3"></i>

                  <span
                    style={{ fontSize: "17px", cursor: "pointer", color: "white" }}
                    className="social-icon-link" 
                  >
                    2150 Spencer RD Apt 3D Orange <br/> park florida, 32073
                  </span>
                </p>
                </div>
            </div>

          </div>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color:"white" }}>
          © 2023 Copyright:
          <Link className="text-reset fw-bold" to="/" style={{ color: "#31c9f7" }}>pentagonpackaging.com</Link>
        </div>

      </footer>
    </>
  );
}
export default Footer;