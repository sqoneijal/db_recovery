import React, { Suspense } from "react";

const PageTitle = React.lazy(() => import("./PageTitle"));

const Toolbar = ({ position, button }) => {
   const propsPageTitle = { position };

   return (
      <React.Fragment>
         <div className="toolbar d-flex flex-stack flex-wrap mb-5 mb-lg-7" id="kt_toolbar">
            <Suspense fallback={<div className="page-title d-flex flex-column py-1">{h.placeholder()}</div>}>
               <PageTitle {...propsPageTitle} />
            </Suspense>
            {button && <div className="d-flex align-items-center py-1">{button}</div>}
         </div>
      </React.Fragment>
   );
};
export default Toolbar;
