import React from "react";
import Nav from "./Nav.json";
import { Link, useLocation } from "react-router-dom";

const Menu = ({ setButton }) => {
   const location = useLocation();

   return (
      <React.Fragment>
         <div className="header-menu align-items-stretch">
            <div className="menu menu-rounded menu-column menu-lg-row menu-root-here-bg-desktop menu-active-bg menu-state-primary menu-title-gray-800 menu-arrow-gray-400 align-items-stretch my-5 my-lg-0 px-2 px-lg-0 fw-semibold fs-6">
               {Nav.map((row, index) => {
                  return (
                     <div className={`menu-item me-0 me-lg-2 ${location.pathname === row.pathname ? "here menu-here-bg" : ""}`} key={index}>
                        <Link
                           to={row.pathname}
                           className="menu-link py-3"
                           onClick={() => {
                              setButton(false);
                              document.title = row.label;
                           }}>
                           <span className="menu-title">{row.label}</span>
                        </Link>
                     </div>
                  );
               })}
            </div>
         </div>
      </React.Fragment>
   );
};
export default Menu;
