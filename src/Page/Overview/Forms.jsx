import React, { useEffect, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";

const Forms = ({ openForms, setOpenForms, detailContent, setDetailContent, pageType, setPageType, setRefreshTable }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   const submit = (e) => {
      e.preventDefault();
      let formData = { pageType: pageType };
      Object.keys(input).map((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      h.post("/submit", formData, {}, true)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            h.notification(data.status, data.msg_response);

            if (data.status) {
               handleClose();
               setRefreshTable(true);
            }
         })
         .catch((e) => {
            h.notification(false, h.error_code_http(e.response.status), e.code);
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   const handleClose = () => {
      setOpenForms(false);
      setDetailContent({});
      setPageType("insert");
   };

   return (
      <React.Fragment>
         <Offcanvas show={openForms} onHide={handleClose} backdrop="static" style={{ width: "50%" }}>
            <Offcanvas.Header closeButton>
               <Offcanvas.Title>{h.pageType(pageType)} Database</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="Hostname"
                     value={h.parseObject(input, "hostname")}
                     onChange={(e) => setInput((prev) => ({ ...prev, hostname: e.target.value }))}
                     isInvalid={h.is_invalid(errors.hostname)}
                  />
                  <Form.Label className="required">Hostname</Form.Label>
                  {h.msg_response(errors.hostname)}
               </Form.Floating>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="Username"
                     value={h.parseObject(input, "username")}
                     onChange={(e) => setInput((prev) => ({ ...prev, username: e.target.value }))}
                     isInvalid={h.is_invalid(errors.username)}
                  />
                  <Form.Label className="required">Username</Form.Label>
                  {h.msg_response(errors.username)}
               </Form.Floating>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="Password"
                     value={h.parseObject(input, "password")}
                     onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
                     isInvalid={h.is_invalid(errors.password)}
                  />
                  <Form.Label className="required">Password</Form.Label>
                  {h.msg_response(errors.password)}
               </Form.Floating>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="Database"
                     value={h.parseObject(input, "database")}
                     onChange={(e) => setInput((prev) => ({ ...prev, database: e.target.value }))}
                     isInvalid={h.is_invalid(errors.database)}
                  />
                  <Form.Label className="required">Database</Form.Label>
                  {h.msg_response(errors.database)}
               </Form.Floating>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="Port"
                     value={h.parseObject(input, "port")}
                     onChange={(e) => setInput((prev) => ({ ...prev, port: e.target.value }))}
                     isInvalid={h.is_invalid(errors.port)}
                  />
                  <Form.Label className="required">Port</Form.Label>
                  {h.msg_response(errors.port)}
               </Form.Floating>
               <Form.Floating className="mb-2">
                  <Form.Control
                     placeholder="DB Driver"
                     value={h.parseObject(input, "dbdriver")}
                     onChange={(e) => setInput((prev) => ({ ...prev, dbdriver: e.target.value }))}
                     isInvalid={h.is_invalid(errors.dbdriver)}
                     as="select">
                     {h.option_loading()}
                     <option value="MySQLi">MySQLi</option>
                     <option value="Postgre">Postgre</option>
                  </Form.Control>
                  <Form.Label className="required">DB Driver</Form.Label>
                  {h.msg_response(errors.dbdriver)}
               </Form.Floating>
            </Offcanvas.Body>
            <div className="offcanvas-footer">{h.buttons(`Simpan Data Database`, isSubmit, { onClick: submit })}</div>
         </Offcanvas>
      </React.Fragment>
   );
};
export default Forms;
