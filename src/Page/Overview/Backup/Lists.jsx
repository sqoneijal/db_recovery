import React, { useEffect } from "react";
import { Table } from "react-bootstrap";

const Lists = ({
   isLoadingConnect,
   listTable,
   setListTable,
   setIsLoadingCountRows,
   selectedTable,
   setSelectedTable,
   downloadProgress,
   isLoadingBackup,
   detailContent,
}) => {
   const countDataRows = (listTable, key) => {
      if (typeof listTable[key] !== "undefined") {
         let formData = {
            tablename: listTable[key].tablename,
            key: key,
            hostname: detailContent.hostname,
            username: detailContent.username,
            password: detailContent.password,
            database: detailContent.database,
            dbdriver: detailContent.dbdriver,
            port: detailContent.port,
         };

         h.post("/countdatarows", formData, {}, true)
            .then((res) => {
               const { data } = res;
               if (data.next) {
                  let update_content = [];
                  listTable.map((row) => {
                     if (row.count === listTable[key].count) {
                        update_content.push(Object.assign(row, { count: data.count, old_count: data.old_count }));
                     } else {
                        update_content.push(row);
                     }
                  });
                  setListTable(update_content);
                  countDataRows(listTable, key + 1);
               }
            })
            .catch((e) => {
               h.notification(false, h.error_code_http(e.response.status), e.code);
            });
      } else {
         setIsLoadingCountRows(false);
      }
   };

   useEffect(() => {
      !isLoadingConnect && h.arrLength(listTable) && countDataRows(listTable, 0);
      return () => {};
   }, [isLoadingConnect]);

   const handleSelectAll = (e) => {
      const { checked } = e.target;
      if (checked) {
         setSelectedTable([]);
         let select_all = [];
         listTable.map((row) => {
            if (row.status !== "complete") select_all.push(row.tablename);
         });
         setSelectedTable(select_all);

         let update_list = [];
         listTable.map((row) => {
            if (row.status !== "complete") update_list.push(Object.assign(row, { status: "wait" }));
            else update_list.push(row);
         });
         setListTable(update_list);
      } else {
         setSelectedTable([]);
         let update_list = [];
         listTable.map((row) => {
            if (row.status !== "complete") update_list.push(Object.assign(row, { status: "skip" }));
            else update_list.push(row);
         });
         setListTable(update_list);
      }
   };

   const handleSelectTable = (e) => {
      const { checked, value } = e.target;
      if (checked) {
         let update_list = [];
         listTable.map((row) => {
            if (row.tablename === value && row.status !== "complete") {
               update_list.push(Object.assign(row, { status: "wait" }));
            } else {
               update_list.push(row);
            }
         });
         setListTable(update_list);
         setSelectedTable((prev) => prev.concat(value));
      } else {
         let update = [];
         selectedTable.map((table) => {
            if (table !== value) {
               update.push(table);
            }
         });
         setSelectedTable(update);

         let update_list = [];
         listTable.map((row) => {
            if (row.tablename === value && row.status !== "complete") {
               update_list.push(Object.assign(row, { status: "skip" }));
            } else {
               update_list.push(row);
            }
         });
         setListTable(update_list);
      }
   };

   return (
      <React.Fragment>
         <Table className="align-middle table-row-dashed fs-6 gy-5">
            <thead>
               <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                  <th className="text-center" style={{ width: "2%" }}>
                     <input type="checkbox" onChange={handleSelectAll} disabled={isLoadingBackup} />
                  </th>
                  <th className="text-center" style={{ width: "2%" }}>
                     no
                  </th>
                  <th>table name</th>
                  <th className="text-center">count</th>
                  <th className="text-center">status</th>
               </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
               {!isLoadingConnect && h.arrLength(listTable)
                  ? listTable.map((row, index) => {
                       return (
                          <tr key={index}>
                             <td className="text-center">
                                {row.status !== "complete" && (
                                   <input
                                      type="checkbox"
                                      disabled={isLoadingBackup}
                                      value={row.tablename}
                                      onChange={handleSelectTable}
                                      checked={selectedTable.includes(row.tablename)}
                                   />
                                )}
                             </td>
                             <td className="text-center">{index + 1}</td>
                             <td>{row.tablename}</td>
                             <td className="text-center">
                                {row.count === row.tablename ? h.span_loading() : h.compare_count(row.old_count, row.count)}
                             </td>
                             <td className="text-center">
                                {(() => {
                                   if (h.parseObject(downloadProgress, "tablename") === row.tablename) {
                                      return h.status_syncron("progress", downloadProgress.progress);
                                   } else {
                                      return h.status_syncron(row.status);
                                   }
                                })()}
                             </td>
                          </tr>
                       );
                    })
                  : isLoadingConnect
                  ? h.table_loading(5)
                  : h.table_empty(5)}
            </tbody>
         </Table>
      </React.Fragment>
   );
};
export default Lists;
