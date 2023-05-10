import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
moment.locale("id");

const ListsCSV = ({ daftarCSV, selected_db, selected_table }) => {
   return (
      <React.Fragment>
         <tbody className="fw-semibold text-gray-600">
            {h.arrLength(daftarCSV)
               ? daftarCSV.map((row, index) => {
                    return (
                       <tr key={index}>
                          <td>
                             <div className="d-flex align-items-center">
                                <span className="icon-wrapper">
                                   <FontAwesomeIcon icon={faFileCsv} className="fs-2x text-primary me-4" />
                                </span>
                                <a
                                   href={`/database/downloadcsvfile?${h.serialize({
                                      path: `${selected_db}/${selected_table}/${row.name}`,
                                      name: row.name,
                                   })}`}
                                   className="text-gray-800 text-hover-primary">
                                   {row.name}
                                </a>
                             </div>
                          </td>
                          <td className="text-center">{row.size}</td>
                          <td className="text-end">{moment(row.datetime).format("dddd Do-MM-YYYY, hh:mm:ss")}</td>
                       </tr>
                    );
                 })
               : h.table_empty(4)}
         </tbody>
      </React.Fragment>
   );
};
export default ListsCSV;
