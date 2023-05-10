import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faDownload } from "@fortawesome/free-solid-svg-icons";
import * as bootstrap from "bootstrap";
import moment from "moment";
moment.locale("id");

const ListsDatabase = ({ isLoading, listDatabase, isLoadingLoadTable, setBreadCrumb, handleLoadTable, setSelected_db, searchTable }) => {
   useEffect(() => {
      if (!isLoading && h.arrLength(listDatabase)) {
         var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
         tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
               placement: "top",
               customClass: "tooltip-dark",
            });
         });
      }
      return () => {};
   }, [bootstrap, isLoading, listDatabase]);

   return (
      <React.Fragment>
         <tbody className="fw-semibold text-gray-600">
            {!isLoading && h.arrLength(listDatabase)
               ? listDatabase
                    .filter((e) => {
                       if (searchTable) {
                          return e.database.toLowerCase().search(searchTable.toLowerCase()) > -1 && e;
                       } else {
                          return e;
                       }
                    })
                    .map((row, index) => {
                       return (
                          <tr key={index}>
                             <td>
                                <div className="d-flex align-items-center">
                                   <span className="icon-wrapper">
                                      <FontAwesomeIcon icon={faDatabase} className="fs-2x text-primary me-4" />
                                   </span>
                                   <a
                                      href="#"
                                      className="text-gray-800 text-hover-primary"
                                      onClick={(e) => {
                                         e.preventDefault();
                                         setBreadCrumb([row.database]);
                                         handleLoadTable(row.database);
                                         setSelected_db(row.database);
                                      }}>
                                      {row.database}
                                   </a>
                                   {row.database === isLoadingLoadTable && h.spinner()}
                                </div>
                             </td>
                             <td className="text-center">{row.size}</td>
                             <td className="text-end">{moment(row.datetime).format("dddd Do-MM-YYYY, hh:mm:ss")}</td>
                          </tr>
                       );
                    })
               : isLoading
               ? h.table_loading(3)
               : h.table_empty(3)}
         </tbody>
      </React.Fragment>
   );
};
export default ListsDatabase;
