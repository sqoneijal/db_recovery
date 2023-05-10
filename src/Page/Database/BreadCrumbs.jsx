import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BreadCrumbs = ({
   isLoading,
   breadCrumb,
   setBreadCrumb,
   selected_db,
   setSelected_db,
   setSelected_table,
   total_items,
   setTotal_items,
   daftarTable,
   daftarCSV,
   listDatabase,
}) => {
   return (
      <React.Fragment>
         <div className="d-flex flex-stack">
            <div className="badge badge-lg badge-light-primary">
               <div className="d-flex align-items-center flex-wrap">
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        setBreadCrumb([]);
                        setSelected_db("");
                        setSelected_table("");
                        setTotal_items(listDatabase.length);
                     }}>
                     <FontAwesomeIcon className="fs-2 text-primary me-3" icon={faHome} />
                  </a>
                  {breadCrumb.map((row, index) => {
                     return (
                        <React.Fragment key={index}>
                           <FontAwesomeIcon className="fs-2 text-primary mx-1" icon={faChevronRight} />
                           <a
                              href="#"
                              className="me-2 mx-2"
                              onClick={(e) => {
                                 e.preventDefault();
                                 if (row === selected_db) {
                                    setBreadCrumb([selected_db]);
                                    setSelected_db(row);
                                    setSelected_table("");
                                    setTotal_items(daftarTable.length);
                                 }
                              }}>
                              {row}
                           </a>
                        </React.Fragment>
                     );
                  })}
               </div>
            </div>
            <div className="badge badge-lg badge-primary">
               <span>{isLoading ? h.span_loading() : `${total_items} items`}</span>
            </div>
         </div>
      </React.Fragment>
   );
};
export default BreadCrumbs;
