import React, { Suspense, useEffect, useState } from "react";

const Lists = React.lazy(() => import("./Lists"));

const Context = ({ setPosition }) => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [listDatabase, setListDatabase] = useState([]);

   // string
   const [total_items, setTotal_items] = useState(0);
   const [searchTable, setSearchTable] = useState("");

   useEffect(() => {
      setPosition([document.title]);
      return () => {};
   }, []);

   const getData = () => {
      h.get("/getdata")
         .then((res) => {
            const { data } = res;
            setTotal_items(data.content.length);
            setListDatabase(data.content);
            if (!data.status) h.notification(data.status, data.msg_response);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   const propsLists = { isLoading, setIsLoading, listDatabase, total_items, setTotal_items, searchTable, setSearchTable };

   return (
      <React.Fragment>
         <Suspense fallback={h.lazyLoadFile()}>
            <Lists {...propsLists} />
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
