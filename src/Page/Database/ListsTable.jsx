import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
moment.locale("id");

const ListsTable = ({ daftarTable, setBreadCrumb, setSelected_table, handleLoadCSV, isLoadingLoadCSV, searchTable }) => {
   return (
      <React.Fragment>
         <tbody className="fw-semibold text-gray-600">
            {h.arrLength(daftarTable)
               ? daftarTable
                    .filter((e) => {
                       if (searchTable) {
                          return e.tablename.toLowerCase().search(searchTable.toLowerCase()) > -1 && e;
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
                                      <FontAwesomeIcon icon={faTable} className="fs-2x text-primary me-4" />
                                   </span>
                                   <a
                                      href="#"
                                      className="text-gray-800 text-hover-primary"
                                      onClick={(e) => {
                                         e.preventDefault();
                                         setBreadCrumb((prev) => prev.concat(row.tablename));
                                         setSelected_table(row.tablename);
                                         handleLoadCSV(row.tablename);
                                      }}>
                                      {row.tablename}
                                   </a>
                                   {row.tablename === isLoadingLoadCSV && h.spinner()}
                                </div>
                             </td>
                             <td className="text-center">{row.size}</td>
                             <td className="text-end">{moment(row.datetime).format("dddd Do-MM-YYYY, hh:mm:ss")}</td>
                          </tr>
                       );
                    })
               : h.table_empty(3)}
         </tbody>
      </React.Fragment>
   );
};
export default ListsTable;
