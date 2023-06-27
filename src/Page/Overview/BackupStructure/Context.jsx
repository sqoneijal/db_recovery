import React, { Suspense } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailContent as set_detailContent, openBackupStructure as set_openBackupStructure } from "Root/action";

const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   const { openBackupStructure, detailContent } = useSelector((state) => state.action);
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(set_openBackupStructure(false));
      dispatch(set_detailContent({}));
   };

   return (
      <React.Fragment>
         <Offcanvas show={openBackupStructure} onHide={handleClose} backdrop="static" style={{ width: "100%" }}>
            <Offcanvas.Header closeButton>
               <Offcanvas.Title>
                  Backup Structure Database{" "}
                  <span className="text-danger">
                     {h.parseObject(detailContent, "hostname")}@{h.parseObject(detailContent, "database")}
                  </span>
               </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               <Suspense fallback={h.lazyLoadFile()}>
                  <Lists />
               </Suspense>
            </Offcanvas.Body>
         </Offcanvas>
      </React.Fragment>
   );
};
export default Context;
