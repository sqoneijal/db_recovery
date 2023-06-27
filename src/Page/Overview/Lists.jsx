import React, { Suspense, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowDown, faEye, faEyeSlash, faTrashAlt, faFolderTree } from "@fortawesome/free-solid-svg-icons";
import * as bootstrap from "bootstrap";
import { useDispatch } from "react-redux";
import { openBackupStructure, detailContent } from "Root/action";

const Backup = React.lazy(() => import("./Backup/Context"));
const BackupStructure = React.lazy(() => import("./BackupStructure/Context"));

const Lists = ({ refreshTable, setRefreshTable }) => {
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [openFormsBackup, setOpenFormsBackup] = useState(false);

   // array
   const [listContent, setListContent] = useState([]);

   // string
   const [show_pass, setShow_pass] = useState("");

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

   const propsBackup = { openFormsBackup, setOpenFormsBackup };

   return (
      <React.Fragment>
         <Suspense fallback={h.lazyLoadFile()}>
            <Backup {...propsBackup} />
            <BackupStructure />
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
                        <th style={{ width: "10%" }} />
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
                                   <td>
                                      {(() => {
                                         if (show_pass === index) {
                                            return (
                                               <React.Fragment>
                                                  {row.password}
                                                  <a
                                                     href="#"
                                                     onClick={(e) => {
                                                        e.preventDefault();
                                                        setShow_pass("");
                                                     }}>
                                                     <FontAwesomeIcon icon={faEyeSlash} className="mx-2" />
                                                  </a>
                                               </React.Fragment>
                                            );
                                         } else {
                                            return (
                                               <React.Fragment>
                                                  {h.hide_password(row.password.length)}
                                                  <a
                                                     href="#"
                                                     onClick={(e) => {
                                                        e.preventDefault();
                                                        setShow_pass(index);
                                                     }}>
                                                     <FontAwesomeIcon icon={faEye} className="mx-2" />
                                                  </a>
                                               </React.Fragment>
                                            );
                                         }
                                      })()}
                                   </td>
                                   <td>{row.database}</td>
                                   <td>{row.dbdriver}</td>
                                   <td className="text-end">
                                      <a
                                         href="#"
                                         data-bs-title="Backup database"
                                         data-bs-toggle="tooltip"
                                         className="btn btn-active-icon-success btn-active-text-success btn-sm p-0"
                                         style={{ marginRight: 10 }}
                                         onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(detailContent(row));
                                            setOpenFormsBackup(true);
                                         }}>
                                         <FontAwesomeIcon icon={faCloudArrowDown} />
                                      </a>
                                      <a
                                         href="#"
                                         data-bs-title="Backup table structure"
                                         data-bs-toggle="tooltip"
                                         className="btn btn-active-icon-success btn-active-text-success btn-sm p-0"
                                         style={{ marginRight: 10 }}
                                         onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(openBackupStructure(true));
                                            dispatch(detailContent(row));
                                         }}>
                                         <FontAwesomeIcon icon={faFolderTree} />
                                      </a>
                                      <a
                                         href="#"
                                         data-bs-title="Delete database"
                                         data-bs-toggle="tooltip"
                                         className="btn btn-active-icon-danger btn-active-text-danger btn-sm p-0"
                                         onClick={(e) => {
                                            e.preventDefault();
                                            h.confirmDelete({
                                               message: `Apakah anda yakin ingin menghapus database [ ${row.hostname}@${row.database} ]`,
                                            }).then((res) => {
                                               const { data } = res;
                                               if (data.status) {
                                                  let formData = { id: row.id };

                                                  h.post("/hapus", formData, {}, true)
                                                     .then((res) => {
                                                        const { data } = res;
                                                        data.status && getData();
                                                     })
                                                     .catch((e) => {
                                                        h.notification(false, h.error_code_http(e.response.status), e.code);
                                                     });
                                               } else {
                                                  h.notification(false, data.msg_response);
                                               }
                                            });
                                         }}>
                                         <FontAwesomeIcon icon={faTrashAlt} />
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
