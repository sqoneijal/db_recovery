"use strict";(self.webpackChunkdb_recovery=self.webpackChunkdb_recovery||[]).push([[809],{809:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var n=a(7294),s=a(5147),c=a(9797);const r=function(e){var t=e.isLoadingConnect,a=e.listTable,r=e.setListTable,l=e.setIsLoadingCountRows,o=e.selectedTable,u=e.setSelectedTable,m=e.downloadProgress,i=e.isLoadingBackup,d=e.detailContent,p=function e(t,a){if(void 0!==t[a]){var n={tablename:t[a].tablename,key:a,hostname:d.hostname,username:d.username,password:d.password,database:d.database,dbdriver:d.dbdriver,port:d.port};c.post("/countdatarows",n,{},!0).then((function(n){var s=n.data;if(s.next){var c=[];t.map((function(e){e.count===t[a].count?c.push(Object.assign(e,{count:s.count,old_count:s.old_count})):c.push(e)})),r(c),e(t,a+1)}})).catch((function(e){c.notification(!1,c.error_code_http(e.response.status),e.code)}))}else l(!1)};(0,n.useEffect)((function(){return!t&&c.arrLength(a)&&p(a,0),function(){}}),[t]);var b=function(e){var t=e.target,n=t.checked,s=t.value;if(n){var c=[];a.map((function(e){e.tablename===s&&"complete"!==e.status?c.push(Object.assign(e,{status:"wait"})):c.push(e)})),r(c),u((function(e){return e.concat(s)}))}else{var l=[];o.map((function(e){e!==s&&l.push(e)})),u(l);var m=[];a.map((function(e){e.tablename===s&&"complete"!==e.status?m.push(Object.assign(e,{status:"skip"})):m.push(e)})),r(m)}};return n.createElement(n.Fragment,null,n.createElement(s.Z,{className:"align-middle table-row-dashed fs-6 gy-5"},n.createElement("thead",null,n.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},n.createElement("th",{className:"text-center",style:{width:"2%"}},n.createElement("input",{type:"checkbox",onChange:function(e){if(e.target.checked){u([]);var t=[];a.map((function(e){"complete"!==e.status&&t.push(e.tablename)})),u(t);var n=[];a.map((function(e){"complete"!==e.status?n.push(Object.assign(e,{status:"wait"})):n.push(e)})),r(n)}else{u([]);var s=[];a.map((function(e){"complete"!==e.status?s.push(Object.assign(e,{status:"skip"})):s.push(e)})),r(s)}},disabled:i})),n.createElement("th",{className:"text-center",style:{width:"2%"}},"no"),n.createElement("th",null,"table name"),n.createElement("th",{className:"text-center"},"count"),n.createElement("th",{className:"text-center"},"status"))),n.createElement("tbody",{className:"text-gray-600 fw-semibold"},!t&&c.arrLength(a)?a.map((function(e,t){return n.createElement("tr",{key:t},n.createElement("td",{className:"text-center"},"complete"!==e.status&&n.createElement("input",{type:"checkbox",disabled:i,value:e.tablename,onChange:b,checked:o.includes(e.tablename)})),n.createElement("td",{className:"text-center"},t+1),n.createElement("td",null,e.tablename),n.createElement("td",{className:"text-center"},e.count===e.tablename?c.span_loading():c.compare_count(e.old_count,e.count)),n.createElement("td",{className:"text-center"},c.parseObject(m,"tablename")===e.tablename?c.status_syncron("progress",m.progress):c.status_syncron(e.status)))})):t?c.table_loading(5):c.table_empty(5))))}}}]);