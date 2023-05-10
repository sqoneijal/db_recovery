import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import demo5_svg from "Root/assets/image/demo5.svg";
import demo5_dark_svg from "Root/assets/image/demo5-dark.svg";
import demo5_mobile_svg from "Root/assets/image/demo5-mobile.svg";
import { Container } from "react-bootstrap";

const Menu = React.lazy(() => import("./Menu"));

const Base = ({ setButton }) => {
   const propsMenu = { setButton };

   return (
      <React.Fragment>
         <div id="kt_header" className="header align-items-stretch">
            <Container fluid className="d-flex align-items-stretch justify-content-between">
               <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 w-lg-225px me-5">
                  <div className="btn btn-icon btn-active-icon-primary ms-n2 me-2 d-flex d-lg-none" id="kt_aside_toggle">
                     <i className="ki-outline ki-abstract-14 fs-1" />
                  </div>
                  <Link to="/">
                     <img alt="Logo" src={demo5_svg} className="d-none d-lg-inline h-30px theme-light-show" />
                     <img alt="Logo" src={demo5_dark_svg} className="d-none d-lg-inline h-30px theme-dark-show" />
                     <img alt="Logo" src={demo5_mobile_svg} className="d-lg-none h-25px" />
                  </Link>
               </div>
               <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                  <div className="d-flex align-items-stretch" id="kt_header_nav">
                     <Suspense fallback={<div className="header-menu align-items-stretch">{h.placeholder()}</div>}>
                        <Menu {...propsMenu} />
                     </Suspense>
                  </div>
               </div>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Base;
