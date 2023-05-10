import React, { Suspense, useState } from "react";
import { Card, Table } from "react-bootstrap";

const FilterTable = React.lazy(() => import("./FilterTable"));
const BreadCrumbs = React.lazy(() => import("./BreadCrumbs"));
const ListsDatabase = React.lazy(() => import("./ListsDatabase"));
const ListsTable = React.lazy(() => import("./ListsTable"));
const ListsCSV = React.lazy(() => import("./ListsCSV"));

const Lists = ({ isLoading, listDatabase, total_items, setTotal_items, searchTable, setSearchTable }) => {
   // array
   const [breadCrumb, setBreadCrumb] = useState([]);
   const [daftarTable, setDaftarTable] = useState([]);
   const [daftarCSV, setDaftarCSV] = useState([]);

   // string
   const [isLoadingLoadTable, setIsLoadingLoadTable] = useState("");
   const [isLoadingLoadCSV, setIsLoadingLoadCSV] = useState("");
   const [selected_db, setSelected_db] = useState("");
   const [selected_table, setSelected_table] = useState("");

   const handleLoadTable = (database) => {
      let formData = { database: database };

      setIsLoadingLoadTable(database);
      h.post("/loadtable", formData)
         .then((res) => {
            const { data } = res;
            setDaftarTable(data);
            setTotal_items(data.length);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingLoadTable("");
         });
   };

   const handleLoadCSV = (tablename) => {
      let formData = { database: selected_db, tablename: tablename };

      setIsLoadingLoadCSV(tablename);
      h.post("/loadcsv", formData)
         .then((res) => {
            const { data } = res;
            setDaftarCSV(data);
            setTotal_items(data.length);
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsLoadingLoadCSV("");
         });
   };

   const propsBreadCrumbs = {
      isLoading,
      listDatabase,
      breadCrumb,
      setBreadCrumb,
      setDaftarTable,
      selected_db,
      setSelected_db,
      setSelected_table,
      total_items,
      setTotal_items,
      daftarTable,
      daftarCSV,
   };
   const propsListsDatabase = { isLoading, listDatabase, isLoadingLoadTable, setBreadCrumb, handleLoadTable, setSelected_db, searchTable };
   const propsListsTable = { daftarTable, setBreadCrumb, setSelected_table, handleLoadCSV, isLoadingLoadCSV, searchTable };
   const propsListsCSV = { daftarCSV, selected_db, selected_table, searchTable };
   const propsFilterTable = { setSearchTable };

   return (
      <React.Fragment>
         <Card className="shadow-sm card-flush">
            <Suspense fallback={<div className="card-header pt-8">{h.lazyLoadFile()}</div>}>
               <FilterTable {...propsFilterTable} />
            </Suspense>
            <Card.Body>
               <Suspense fallback={<div className="d-flex flex-stack">{h.lazyLoadFile()}</div>}>
                  <BreadCrumbs {...propsBreadCrumbs} />
               </Suspense>
               <div className="dataTables_wrapper dt-bootstrap4 no-footer"></div>
               <Table responsive className="align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>Name</th>
                        <th className="w-125px text-center">Size</th>
                        <th className="text-end">Last Modified</th>
                     </tr>
                  </thead>
                  {(() => {
                     if (selected_db && !selected_table) {
                        return (
                           <Suspense fallback={<tbody>{h.table_loading(4)}</tbody>}>
                              <ListsTable {...propsListsTable} />
                           </Suspense>
                        );
                     } else if (selected_db && selected_table) {
                        return (
                           <Suspense fallback={<tbody>{h.table_loading(4)}</tbody>}>
                              <ListsCSV {...propsListsCSV} />
                           </Suspense>
                        );
                     } else {
                        return (
                           <Suspense fallback={<tbody>{h.table_loading(4)}</tbody>}>
                              <ListsDatabase {...propsListsDatabase} />
                           </Suspense>
                        );
                     }
                  })()}
               </Table>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Lists;
