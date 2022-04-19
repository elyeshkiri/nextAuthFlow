import React, { useEffect, useState } from "react";

const leftSlider = ({}) => {
 

return ( 
    <div id="form-section" className="d-none d-lg-flex container-fluid signin">
    <div className="website-logo">
        <a>
            <div className="logo"></div>
        </a>
    </div>
    <div className="row">
        <div className="info-slider-holder">
            <div className="info-holder">
                <h6>{"Onjiz app is an application to organize and record the employee's movement of a company. It provides real-time work details of an organization."}</h6>
                <div className="bold-title">{"Founder & IT Team"}</div>
                <div className="mini-testimonials-slider ">
                    <div className="col-12 d-flex">
                        {/* <ngx-slick-carousel className="carousel" #slickModal="slick-carousel" [config]="slideConfig"> */}
                            {/* <div  className="slide">
                                <div className="details-holder w-100">
                                    <img className="photo" src="{{ data.img }}" />
                                    <h4>name</h4>
                                    <h5>position</h5>
                                </div>
                            </div> */}
                        {/* </ngx-slick-carousel> */}
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
   )
  }
export default leftSlider