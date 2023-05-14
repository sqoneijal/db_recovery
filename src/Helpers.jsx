import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import table_empty_png from "Root/assets/image/table_empty.png";
import axios from "axios";
import Swal from "sweetalert2";

export const status_syncron = (key, progress = 0) => {
   const config = {
      wait: <span className="badge text-warning">Queued</span>,
      skip: <span className="badge text-warning">Skip</span>,
      fail: <span className="badge text-danger">Failed</span>,
      complete: <span className="badge text-success">Complete</span>,
      progress: <span className="badge text-info">{progress}%</span>,
   };
   return parseObject(config, key);
};

export const post = async (url, form = [], config = {}, dynamic = false) => {
   let formData = new FormData();

   parseObject(window.user, "username") && formData.append("user_modified", window.user.username);
   Object.keys(form).map((data) => formData.append(data, form[data]));

   axios.create();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return await axios.post(dynamic ? url : `${window.location.pathname}${url}`, formData, config);
};

export const get = async (url, dynamic = false) => {
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return await axios.get(dynamic ? url : `${window.location.pathname}${url}`);
};

export const log = (data) => {
   console.clear();
   console.log(data);
};

export const lazyLoadFile = () => {
   return (
      <Row>
         <Col sm={12} className="text-center">
            <span className="text-gray-600">
               Loading... <span className="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
         </Col>
      </Row>
   );
};

export const placeholder = (height = "auto") => {
   return <div className="placeholder" style={{ height: height }} />;
};

export const error_code_http = (code) => {
   const config = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      122: "Request-URI too long",
      127: "Network Authentication Required",
      150: "Continue",
      151: "Switching Protocols",
      152: "Processing",
      153: "Early Hints",
      158: "Request-URI too long",
      159: "Network Authentication Required",
      180: "Continue",
      181: "Switching Protocols",
      182: "Processing",
      183: "Early Hints",
      188: "Request-URI too long",
      189: "Network Authentication Required",
      199: "Network Authentication Required",
      200: "OK",
      201: "Created",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      250: "Continue",
      251: "Switching Protocols",
      252: "Processing",
      253: "Early Hints",
      258: "Request-URI too long",
      259: "Network Authentication Required",
      299: "Network Authentication Required",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      310: "Too many Redirect",
      399: "Client Closed Request",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
      599: "Network Authentication Required",
   };

   if (typeof config[code] !== "undefined") {
      return config[code];
   } else {
      return "Terjadi sesuatu kesalahan";
   }
};

export const notification = (status, msg_response, code) => {
   return Swal.fire({
      icon: status ? "success" : "warning",
      text: msg_response,
      confirmButtonText: "<i className='fa fa-thumbs-up text-white'></i> Ok, Dimengerti",
   });
};

export const buttons = (label, isLoading = false, init = {}) => {
   return (
      <Button type="submit" {...init} disabled={isLoading} size="sm" className={`fw-bold border-0 ${parseObject(init, "className")}`}>
         {(() => {
            if (isLoading) {
               return (
                  <span className="indicator-label">
                     Loading... <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
               );
            } else {
               return <span className="indicator-label">{label}</span>;
            }
         })()}
      </Button>
   );
};

export const parseObject = (content = {}, key) => {
   if (typeof content[key] !== "undefined") return content[key];
   else return "";
};

export const arrLength = (content = []) => {
   return content.length > 0 ? true : false;
};

export const table_empty = (colSpan = 0) => {
   return (
      <tr>
         <td colSpan={colSpan} className="text-center">
            <div className="d-flex flex-column flex-center">
               <img src={table_empty_png} className="mw-400px" />
            </div>
         </td>
      </tr>
   );
};

export const spinner = () => {
   return <span className="spinner-border spinner-border-sm align-middle ms-2" />;
};

export const span_loading = () => {
   return (
      <React.Fragment>
         <span className="indicator-label">
            Loading... <span className="spinner-border spinner-border-sm align-middle ms-2" />
         </span>
      </React.Fragment>
   );
};

export const table_loading = (colSpan = 0) => {
   return (
      <tr>
         <td colSpan={colSpan} className="text-center">
            <span className="spinner-border w-15px h-15px text-muted align-middle me-2" />
            <span className="text-gray-600">Loading...</span>
         </td>
      </tr>
   );
};

export const pageType = (page) => {
   const config = {
      insert: "Tambah",
      update: "Perbaharui",
   };
   return parseObject(config, page);
};

export const is_invalid = (key) => {
   return key ? true : false;
};

export const msg_response = (msg) => {
   return msg ? <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback> : "";
};

export const option_loading = (isLoading = false) => {
   return <option value="">{isLoading ? "Loading..." : "--pilih--"}</option>;
};

export const objLength = (content = {}) => {
   return Object.keys(content).length > 0 ? true : false;
};

export const serialize = (obj) => {
   let str = [];
   for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   }
   return str.join("&");
};

export const hide_password = (length) => {
   let text = "";
   for (let i = 0; i < length; i++) {
      text += "*";
   }
   return text;
};

export const confirmDelete = ({ ...content }) => {
   return Swal.fire({
      text: parseObject(content, "message") ? content.message : "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Iya, hapus!",
      cancelButtonText: "Tidak",
      customClass: {
         confirmButton: "btn btn-sm fw-bold btn-danger",
         cancelButton: "btn btn-sm fw-bold btn-primary",
      },
   }).then((res) => {
      if (res.isConfirmed) {
         return { data: { status: true } };
      } else {
         return { data: { status: false, msg_response: "Data batal dihapus." } };
      }
   });
};

export const toInt = (string) => {
   if (isNaN(parseFloat(string))) {
      return 0;
   } else {
      return parseFloat(string);
   }
};

export const compare_count = (old_count, new_count) => {
   if (toInt(new_count) > toInt(old_count)) {
      return (
         <span className="fw-bold">
            {new_count} / <span className="text-success">+{toInt(new_count) - toInt(old_count)}</span>
         </span>
      );
   } else if (toInt(old_count) > toInt(new_count)) {
      return (
         <span className="fw-bold">
            {new_count} / <span className="text-danger">-{toInt(old_count) - toInt(new_count)}</span>
         </span>
      );
   } else {
      return <span className="fw-bold">{new_count}</span>;
   }
};
