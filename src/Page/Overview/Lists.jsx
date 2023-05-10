import React, { Suspense, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import * as bootstrap from "bootstrap";

const Backup = React.lazy(() => import("./Backup/Context"));

const Lists = ({ refreshTable, setRefreshTable }) => {
   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [openFormsBackup, setOpenFormsBackup] = useState(false);

   // array
   const [listContent, setListContent] = useState([]);

   // object
   const [detailContent, setDetailContent] = useState({});

   useEffect(() => {
      if (!isLoading) {
         var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
         tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
               placement: "top",
               customClass: "tooltip-dark",
            });
         });
      }
      return () => {};
   }, [isLoading]);

   const getData = () => {
      h.get("/getdata", true)
         .then((res) => {
            const { data } = res;
            if (data.status) {
               setListContent(data.content);
            } else {
               h.notification(data.status, data.msg_response);
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      refreshTable && getData();
      return () => setRefreshTable(false);
   }, [refreshTable]);

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   const propsBackup = { openFormsBackup, setOpenFormsBackup, detailContent, setDetailContent };

   return (
      <React.Fragment>
         <Suspense fallback={h.lazyLoadFile()}>
            <Backup {...propsBackup} />
         </Suspense>
         <Card className="shadow-sm">
            <Card.Body>
               <Table className="align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th className="text-center">id</th>
                        <th>hostname</th>
                        <th>username</th>
                        <th>password</th>
                        <th>database</th>
                        <th>db driver</th>
                        <th style={{ width: "5%" }} />
                     </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                     {!isLoading && h.arrLength(listContent)
                        ? listContent.map((row, index) => {
                             return (
                                <tr key={index}>
                                   <td className="text-center">{row.id}</td>
                                   <td>{row.hostname}</td>
                                   <td>{row.username}</td>
                                   <td>{row.password}</td>
                                   <td>{row.database}</td>
                                   <td>{row.dbdriver}</td>
                                   <td>
                                      <a
                                         href="#"
                                         data-bs-title="Backup database"
                                         data-bs-toggle="tooltip"
                                         onClick={(e) => {
                                            e.preventDefault();
                                            setDetailContent(row);
                                            setOpenFormsBackup(true);
                                         }}>
                                         <FontAwesomeIcon icon={faCloudArrowDown} />
                                      </a>
                                   </td>
                                </tr>
                             );
                          })
                        : isLoading
                        ? h.table_loading(7)
                        : h.table_empty(7)}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Lists;
