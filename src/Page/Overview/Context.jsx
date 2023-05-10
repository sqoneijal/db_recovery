import React, { Suspense, useEffect, useState } from "react";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));

const Context = ({ setPosition, setButton }) => {
   // bool
   const [openForms, setOpenForms] = useState(false);

   // object
   const [detailContent, setDetailContent] = useState({});
   const [refreshTable, setRefreshTable] = useState(false);

   // string
   const [pageType, setPageType] = useState("insert");

   useEffect(() => {
      setPosition([document.title]);
      setButton(h.buttons("Tambah Database", false, { onClick: () => setOpenForms(true) }));
      return () => {};
   }, []);

   const propsLists = { refreshTable, setRefreshTable };
   const propsForms = { openForms, setOpenForms, detailContent, setDetailContent, pageType, setPageType, setRefreshTable };

   return (
      <React.Fragment>
         <Suspense fallback={h.lazyLoadFile()}>
            <Forms {...propsForms} />
         </Suspense>
         <Suspense fallback={h.lazyLoadFile()}>
            <Lists {...propsLists} />
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
