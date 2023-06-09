import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FilterTable = ({ setSearchTable }) => {
   return (
      <React.Fragment>
         <div className="card-header pt-8">
            <div className="card-title">
               <div className="d-flex align-items-center position-relative my-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="position-absolute ms-6" />
                  <Form.Control
                     className="form-control-solid w-250px ps-15"
                     placeholder="Search Files & Folders"
                     onChange={(e) => setSearchTable(e.target.value)}
                  />
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
export default FilterTable;
