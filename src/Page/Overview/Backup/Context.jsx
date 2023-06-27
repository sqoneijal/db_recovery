import React, { Suspense, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
   totalTableDB as setTotalTableDB,
   isLoadingCountRows as set_isLoadingCountRows,
   keyHitungDataTable as set_keyHitungDataTable,
   detailContent as set_detailContent,
} from "Root/action";

const Lists = React.lazy(() => import("./Lists"));

const Context = ({ openFormsBackup, setOpenFormsBackup }) => {
   const { isLoadingCountRows, tableCountLoading, totalTableDB, keyHitungDataTable, detailContent } = useSelector((state) => state.action);
   const dispatch = useDispatch();

   // bool
   const [isLoadingConnect, setIsLoadingConnect] = useState(true);
   const [isLoadingBackup, setIsLoadingBackup] = useState(false);

   // array
   const [listTable, setListTable] = useState([]);
   const [selectedTable, setSelectedTable] = useState([]);

   // object
   const [downloadProgress, setDownloadProgress] = useState({});

   const handleClose = () => {
      setSelectedTable([]);
      setOpenFormsBackup(false);
      setIsLoadingConnect(true);
      dispatch(set_detailContent({}));
      setListTable([]);
      dispatch(setTotalTableDB(0));
      dispatch(set_isLoadingCountRows(true));
      dispatch(set_keyHitungDataTable(0));
      // dispatch(abortRequest(true));
   };

   const connectToDB = (formData = {}) => {
      setIsLoadingConnect(true);
      h.post("/connecttodb", formData, {}, true)
         .then((res) => {
            const { data } = res;
            setListTable(data);
            dispatch(setTotalTableDB(data.length));
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingConnect(false);
         });
   };

   useEffect(() => {
      openFormsBackup && h.objLength(detailContent) && connectToDB(detailContent);
      return () => {};
   }, [detailContent, openFormsBackup]);

   const getCountRows = (value) => {
      return listTable.findIndex((e) => e.tablename === value);
   };

   const handleBackup = (key = 0, page = 0) => {
      if (typeof selectedTable[key] !== "undefined") {
         setIsLoadingBackup(true);

         let formData = {
            hostname: detailContent.hostname,
            username: detailContent.username,
            password: detailContent.password,
            database: detailContent.database,
            dbdriver: detailContent.dbdriver,
            port: detailContent.port,
            tablename: selectedTable[key],
            page: page,
            total_row: listTable[getCountRows(selectedTable[key])].count,
         };

         h.post("/handlebackup", formData, {}, true)
            .then((res) => {
               const { data } = res;
               if (data.status) {
                  if (data.next_row) {
                     setDownloadProgress({
                        tablename: selectedTable[key],
                        progress: (((page * 5000) / listTable[getCountRows(selectedTable[key])].count) * 100).toFixed(0),
                     });
                     handleBackup(key, page + 1);
                  } else {
                     let update_list = [];
                     listTable.map((row) => {
                        if (row.tablename === selectedTable[key]) {
                           update_list.push(Object.assign(row, { status: "complete" }));
                        } else {
                           update_list.push(row);
                        }
                     });
                     setListTable(update_list);

                     handleBackup(key + 1, 0);
                  }
               } else {
                  let update_list = [];
                  listTable.map((row) => {
                     if (row.tablename === selectedTable[key]) {
                        update_list.push(Object.assign(row, { status: "fail" }));
                     } else {
                        update_list.push(row);
                     }
                  });
                  setListTable(update_list);
                  handleBackup(key + 1, 0);
                  h.notification(false, data.msg_response);
               }
            })
            .catch((e) => {
               handleBackup(key, page);
            });
      } else {
         setDownloadProgress({});
         setIsLoadingBackup(false);
         setSelectedTable([]);
         h.notification(true, "Backup database selesai dilakukan.");
      }
   };

   const propsLists = {
      isLoadingConnect,
      listTable,
      setListTable,
      selectedTable,
      setSelectedTable,
      downloadProgress,
      isLoadingBackup,
      detailContent,
   };

   return (
      <React.Fragment>
         <Offcanvas show={openFormsBackup} onHide={handleClose} backdrop="static" style={{ width: "60%" }}>
            <Offcanvas.Header closeButton>
               <Offcanvas.Title>
                  Backup Database [{" "}
                  <span className="text-danger">
                     {h.parseObject(detailContent, "hostname")}@{h.parseObject(detailContent, "database")}
                  </span>{" "}
                  ]{" "}
                  {isLoadingCountRows && (
                     <span>
                        <span className="text-success">
                           ({keyHitungDataTable}/{totalTableDB})
                        </span>{" "}
                        Menghitung jumlah data table : <span className="text-danger">{tableCountLoading}...</span>
                     </span>
                  )}
               </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               <Suspense fallback={h.lazyLoadFile()}>
                  <Lists {...propsLists} />
               </Suspense>
            </Offcanvas.Body>
            {!isLoadingCountRows && h.arrLength(selectedTable) && (
               <div className="offcanvas-footer">
                  {h.buttons("Backup database", isLoadingBackup, { onClick: () => (isLoadingBackup ? null : handleBackup()) })}
               </div>
            )}
         </Offcanvas>
      </React.Fragment>
   );
};
export default Context;
