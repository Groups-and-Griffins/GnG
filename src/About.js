import React from 'react'

export default function About() {
  return (
    <div>
    <div className="hero_area">
      {/* header section strats */}
      <header className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="/calendar">
                  <span>
                    Groups&Griffons
                  </span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex  flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item">
                        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/about">About </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/login"> Login</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/signup"> Sign Up</a>
                      </li>
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit" />
                    </form> */}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* end header section */}
      {/* slider section */}
      <section className=" slider_section ">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            {/* <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active">01</li>
            <li data-target="#carouselExampleIndicators" data-slide-to={1}>02</li>
            <li data-target="#carouselExampleIndicators" data-slide-to={2}>03</li> */}
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="slider_detail-box">
                      <h1>
                        About the team
                      </h1>
                      <p>
                        Groups and Griffins is working hard to make scheduling your DND group is a better experience for both Dungeon Masters and players
                      </p>
                      {/* <div className="btn-box">
                        <a href className="btn-1">
                          Read More
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="slider_img-box">
                      <img src="assets/images/griffin_logo.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="slider_detail-box">
                      <h1>
                        Start <br />
                        Organizing <br />
                        Your Campaign
                      </h1>
                      <p>
                        Organizing consistant gatherings for your group can be hard, but we're here to try and help!
                      </p>
                      {/* <div className="btn-box">
                        <a href className="btn-1">
                          Read More
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="slider_img-box">
                      <img src="assets/images/griffinLeft_logo.png" height="320"  width="320" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="slider_detail-box">
                      <h1>
                        Start <br />
                        Business with <br />
                        Our Company
                      </h1>
                      <p>
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi
                      </p>
                      {/* <div className="btn-box">
                        <a href className="btn-1">
                          Read More
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="slider_img-box">
                      <img src="assets/images/griffin_logo.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_btn-container">
            {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="sr-only">Next</span>
            </a> */}
          </div>
        </div>
      </section>
      {/* end slider section */}
    </div>
    
    {/* team member section */}
    <section className="service_section">
      <div className="container">
        <div className="custom_heading-container">
          <h2>
            Our Members
          </h2>
        </div>
        <div className="service_container layout_padding2">
          <div className="service_box">
            <div className="img-box">
              <img src="assets/images/michaelToken.png" alt="" />
            </div>
            <div className="detail-box">
              <h4>
              Michael Hessler 
              </h4>
            </div>
          </div>
           <div className="service_box">
            <div className="img-box">
              <img src="assets/images/camToken.png" alt="" />
            </div>
            <div className="detail-box">
              <h4>
              Camille Nguyen 
              </h4>
            </div>
          </div> 
          <div className="service_box">
            <div className="img-box">
              <img src="assets/images/samToken.png" alt="" />
            </div>
            <div className="detail-box">
              <h4>
                Sam Childers
              </h4>
            </div>
          </div>
        <div className="service_box">
            <div className="img-box">
              <img src="assets/images/alexToken.png" alt="" />
            </div>
            <div className="detail-box">
              <h4>
              Alex Hernandez
              </h4>
            </div>
          </div>
          <div className="service_box">
            <div className="img-box">
              <img src="assets/images/vrajToken.png" alt="" />
            </div>
            <div className="detail-box">
              <h4>
              Vraj Patel
              </h4>
            </div>
          </div>
          </div>
        {/* <div>
          <a href>
            Read More
          </a>
        </div> */}
      </div>
    </section>
    {/* end service section */}
    
    
    
  </div>
  )
}
