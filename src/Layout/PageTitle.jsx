import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ position }) => {
   return (
      <React.Fragment>
         <div className="page-title d-flex flex-column py-1">
            <h1 className="d-flex align-items-center my-1">
               <span className="text-dark fw-bold fs-1">{document.title}</span>
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-1">
               <li className="breadcrumb-item text-muted">
                  <Link to="/" className="text-muted text-hover-primary">
                     Home
                  </Link>
               </li>
               {h.arrLength(position) &&
                  position.map((row, index) => {
                     return (
                        <React.Fragment key={index}>
                           <li className="breadcrumb-item">
                              <span className="bullet bg-gray-200 w-5px h-2px" />
                           </li>
                           <li className="breadcrumb-item text-dark">{row}</li>
                        </React.Fragment>
                     );
                  })}
            </ul>
         </div>
      </React.Fragment>
   );
};
export default PageTitle;
