import React, { Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import registerServiceWorker from "./serviceWorkerRegistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/css/style.css";
import "./assets/css/custom.css";
import { Container } from "react-bootstrap";

const LayoutHeaderBase = React.lazy(() => import("./Layout/Header/Base"));
const LayoutAside = React.lazy(() => import("./Layout/Aside"));
const LayoutToolbar = React.lazy(() => import("./Layout/Toolbar"));
const LayoutFooter = React.lazy(() => import("./Layout/Footer"));

import Overview from "./Page/Overview/Context";

const Index = () => {
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

   const propsGlobal = { position, setPosition, button, setButton, preLoader };

   return (
      <React.Fragment>
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
