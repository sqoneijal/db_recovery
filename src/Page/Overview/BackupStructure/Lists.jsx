import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Lists = () => {
   const { detailContent } = useSelector((state) => state.action);
   console.log(detailContent);

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getStructureTable = (detailContent = {}) => {
      let formData = {
         hostname: detailContent.hostname,
         username: detailContent.username,
         password: detailContent.password,
         database: detailContent.database,
         dbdriver: detailContent.dbdriver,
         port: detailContent.port,
      };

      setIsLoading(true);
      h.post("/getstructuretable", formData, {}, true)
         .then((res) => {
            const { data, status } = res;
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      if (h.objLength(detailContent)) {
         getStructureTable(detailContent);
      }
      return () => {};
   }, [detailContent]);

   return <React.Fragment>Lists</React.Fragment>;
};
export default Lists;
