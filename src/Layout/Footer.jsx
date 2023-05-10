import React from "react";

const Footer = () => {
   return (
      <React.Fragment>
         <div className="footer pt-10 pb-5 d-flex flex-column flex-md-row flex-stack" id="kt_footer">
            <div className="text-dark order-2 order-md-1">
               <span className="text-muted fw-semibold me-1">{new Date().getFullYear()}&copy;</span>
               <a href="mailto:sqone.developer@gmail.com" target="_blank" className="text-gray-800 text-hover-primary">
                  Sqone Developer
               </a>
            </div>
            <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
               <li className="menu-item">
                  <a href="https://www.facebook.com/sqone.developer" target="_blank" className="menu-link px-2">
                     Facebook
                  </a>
               </li>
               <li className="menu-item">
                  <a href="https://t.me/sqoneijal" target="_blank" className="menu-link px-2">
                     Telegram
                  </a>
               </li>
            </ul>
         </div>
      </React.Fragment>
   );
};
export default Footer;
