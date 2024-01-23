import React from "react";

function Navbar() {
  return (
    <>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link link-body-emphasis px-2 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis px-2 active">
                About
              </a>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis ps-2">
                Login
              </a>
            </li>
            <div className="" style={{border:"1px solid red"}}></div>
            <li className="nav-item">
              <a href="#" className="nav-link link-body-emphasis ps-2">
                Sign up
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#" className="nav-link btn btn-primary" style={{color:"var(--btn-color)"}}>
                Logout
              </a>
            </li> */}

          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none" previewlistener="true">
                <span className="fs-4">DevHeart</span>
            </a>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
            </form>
        </div>
      </header>
    </>
  );
}

export default Navbar;
