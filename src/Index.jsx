import React, { Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import registerServiceWorker from "./serviceWorkerRegistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Modal, Container } from "react-bootstrap";

import "./assets/css/style.css";
import "./assets/css/custom.css";

const LayoutHeaderBase = React.lazy(() => import("./Layout/Header/Base"));
const LayoutAside = React.lazy(() => import("./Layout/Aside"));
const LayoutToolbar = React.lazy(() => import("./Layout/Toolbar"));
const LayoutFooter = React.lazy(() => import("./Layout/Footer"));

import Overview from "./Page/Overview/Context";
import Database from "./Page/Database/Context";

const Index = () => {
   // bool
   const [isLoadingAppCheckUpdate, setIsLoadingAppCheckUpdate] = useState(true);
   const [openModalUpdateApp, setOpenModalUpdateApp] = useState(false);

   // array
   const [asideNav, setAsideNav] = useState([]);
   const [position, setPosition] = useState([]);

   // string
   const [button, setButton] = useState("");

   useEffect(() => {
      let body = document.body;
      if (h.arrLength(asideNav)) {
         body.classList.add("aside-enabled");
      } else {
         body.classList.remove("aside-enabled");
      }
      return () => {};
   }, [asideNav]);

   const checkAppUpdate = () => {
      h.get("/checkappupdate", {}, true)
         .then((res) => {
            const { data } = res;
            if (h.objLength(data)) {
               if (h.parseObject(data, "update") === "available") {
                  setOpenModalUpdateApp(true);
               }
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingAppCheckUpdate(false);
         });
   };

   useEffect(() => {
      checkAppUpdate();
      return () => {};
   }, []);

   const propsGlobal = { position, setPosition, button, setButton, preLoader };
   const propsModalUpdateApp = { openModalUpdateApp, setOpenModalUpdateApp };

   return (
      <React.Fragment>
         <ModalUpdateApp {...propsModalUpdateApp} />
         {isLoadingAppCheckUpdate ? (
            preLoader()
         ) : (
            <BrowserRouter basename="/">
               <div className="page d-flex flex-column flex-column-fluid">
                  <Suspense fallback={<div className="header align-items-stretch">{h.placeholder()}</div>}>
                     <LayoutHeaderBase {...propsGlobal} />
                  </Suspense>
                  <Container fluid id="kt_content_container" className="d-flex flex-column-fluid align-items-stretch">
                     {h.arrLength(asideNav) && (
                        <Suspense fallback={<div className="aside">{h.placeholder()}</div>}>
                           <LayoutAside />
                        </Suspense>
                     )}
                     <div className="wrapper d-flex flex-column flex-row-fluid mt-5 mt-lg-10" id="kt_wrapper">
                        <div className="content flex-column-fluid" id="kt_content">
                           <Suspense fallback={<div className="toolbar d-flex flex-stack flex-wrap mb-5 mb-lg-7">{h.placeholder()}</div>}>
                              <LayoutToolbar {...propsGlobal} />
                           </Suspense>
                           <div className="post" id="kt_post">
                              <Routes>
                                 <Route path="/" element={<Overview {...propsGlobal} />} loader={h.lazyLoadFile()} />
                                 <Route path="database" element={<Database {...propsGlobal} />} loader={h.lazyLoadFile()} />
                              </Routes>
                           </div>
                        </div>
                        <Suspense fallback={<div className="footer pt-10 pb-5 d-flex flex-column flex-md-row flex-stack">{h.placeholder()}</div>}>
                           <LayoutFooter />
                        </Suspense>
                     </div>
                  </Container>
               </div>
            </BrowserRouter>
         )}
      </React.Fragment>
   );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Index />);

registerServiceWorker();

const preLoader = () => {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            transition: "none",
            flexDirection: "column",
         }}>
         <span
            style={{
               color: "#009ef7",
               transition: "none",
               border: "0.185rem solid currentcolor",
               borderRightColor: "transparent",
               display: "inline-block",
               width: "2rem",
               height: "2rem",
               verticalAlign: "-0.125em",
               borderRadius: "50%",
               animation: "0.65s linear infinite spinner-border",
            }}
         />
         <span style={{ color: "#A1A5B7", transition: "none", fontWeight: 500, fontSize: "1.075rem", marginTop: "1.25rem" }}>Loading...</span>
      </div>
   );
};

const ModalUpdateApp = ({ openModalUpdateApp, setOpenModalUpdateApp }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   const clearProps = () => {
      setOpenModalUpdateApp(false);
   };

   /* const submit = (file = []) => {
      let formData = { file: JSON.stringify(file) };
      h.post("/upgradeapp", formData, {}, true)
         .then((res) => {
            const { data } = res;
            data.status && location.reload();
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         });
   };

   const getManifestUpgrade = (e) => {
      e.preventDefault();
      setIsSubmit(true);
      h.get("/getmanifestupgrade", {}, true)
         .then((res) => {
            const { data } = res;
            if (h.arrLength(data)) submit(data, 0);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         });
   }; */

   const submit = (e) => {
      e.preventDefault();
      h.get("/upgradeapp", {}, true)
         .then((res) => {
            const { data } = res;
            h.log(data);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
            setIsSubmit(false);
         })
         .then(() => {});
   };

   return (
      <Modal show={openModalUpdateApp} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Versi terbaru telah tersedia</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {isSubmit ? (
               <React.Fragment>
                  <h3>INFORMASI !!!</h3>
                  <p>Jangan keluar dari halaman ini. Selama proses upgrade berlangsung</p>
                  <p>{h.span_loading()}</p>
               </React.Fragment>
            ) : (
               <React.Fragment>
                  <h3>Apakah anda ingin melakukan upgrade.</h3>
                  <p>Tekan tombol upgrade untuk melakukan upgrade aplikasi ini.</p>
               </React.Fragment>
            )}
         </Modal.Body>
         <Modal.Footer>
            {h.buttons("Upgrade", isSubmit, { onClick: isSubmit ? null : submit })}
            {!isSubmit && h.buttons("Batal", false, { variant: "danger", onClick: clearProps })}
         </Modal.Footer>
      </Modal>
   );
};
