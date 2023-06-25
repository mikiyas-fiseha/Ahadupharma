import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "./images/newsletter.png";
const Footer = () => {
    return (
        <>
            <footer className="py-4">
                <div className="container-xxl">
                    {/* <div className="row align-items-center">
                        <div className="col-lg-5 col-sm-12 ">
                            <div className="footer-top-data d-flex gap-30 align-items-center">
                                <img src={newsletter} alt="newsletter" />
                                <h2 className="mb-0 text-white signupnews">Sign Up for Newsletter</h2>
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-1"
                                    placeholder="Your Email Address"
                                    aria-label="Your Email Address"
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text p-2" id="basic-addon2">
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row row-cols-2">
                        <div className="col-lg-4col-sm-6">
                            <h4 className="text-white mb-4">Contact Us</h4>
                            <div>
                                <address className="text-white fs-6">
                                    Hno : 277 Addis Ababa, <br /> Boel, Eedna MAll <br />
                                    PinCode: 1000
                                </address>
                                <a
                                    href="tel:+91 8264954234"
                                    className="mt-3 d-block mb-1 text-white"
                                >
                                    0979990433
                                </a>
                                <a
                                    href="mailto:mikiyas7@gmail.com"
                                    className="mt-2 d-block mb-0 text-white"
                                >
                                    mikiyas7@gmail.com
                                </a>
                                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                    <a className="text-white" href="#/">
                                        <BsLinkedin className="fs-4" />
                                    </a>
                                    <a className="text-white" href="#/">
                                        <BsInstagram className="fs-4" />
                                    </a>
                                    <a className="text-white" href="#/">
                                        <BsGithub className="fs-4" />
                                    </a>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className="text-white mb-4">Information</h4>
                            <div className="footer-link d-flex flex-column">
                                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                                    Privacy Policy
                                </Link>
                            
                                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                                    Shipping Policy
                                </Link>
                                <Link to="/term-conditions" className="text-white py-2 mb-1">
                                    Terms & Conditions
                                </Link>
                                <Link className="text-white py-2 mb-1" to='/blogs'>Blogs</Link>
                            </div>
                        </div>
                        <div className="col-3 d-none d-md-block">
                            <h4 className="text-white mb-4" >quick Links</h4>
                            <div className="footer-link d-flex flex-column">
                            <Link className="text-white py-2 mb-1" to='/user-info'>Profile</Link>

                                <Link className="text-white py-2 mb-1" to='/'>Home</Link>
                                <Link className="text-white py-2 mb-1" to='/contact'>Contact</Link>
                                <Link className="text-white py-2 mb-1" to='/product'>Store</Link>

                            </div>
                        </div>
                        
                    </div>
                </div>
            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy; {new Date().getFullYear()};Ahadu pharmacy
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
