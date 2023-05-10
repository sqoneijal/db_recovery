import React from "react";

const Aside = () => {
   return (
      <React.Fragment>
         <div id="kt_aside" className="aside">
            <div className="hover-scroll-overlay-y my-5 my-lg-5 w-100 ps-4 ps-lg-0 pe-4 me-1" id="kt_aside_menu_wrapper">
               <div className="menu menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-6 menu-rounded w-100" id="kt_aside_menu">
                  <div className="menu-item">
                     <div className="menu-content pb-2">
                        <span className="menu-section text-muted text-uppercase fs-7 fw-bold">Public</span>
                     </div>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link active">
                        <span className="menu-title">All Questions</span>
                        <span className="menu-badge">6,234</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=apps/devs/search" className="menu-link">
                        <span className="menu-title">Search</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=apps/devs/tag" className="menu-link">
                        <span className="menu-title">Tags</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=apps/devs/ask" className="menu-link">
                        <span className="menu-title">Ask Question</span>
                     </a>
                  </div>

                  <div className="menu-item pt-5">
                     <div className="menu-content pb-2">
                        <span className="menu-section text-muted text-uppercase fs-7 fw-bold">My Activity</span>
                     </div>
                  </div>

                  <div className="menu-item">
                     <a href="?page=apps/devs/question" className="menu-link">
                        <span className="menu-title">My Questions</span>
                        <span className="menu-badge">24</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Resolved</span>
                        <span className="menu-badge">120</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Enrolled</span>
                        <span className="menu-badge">10</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Saved</span>
                        <span className="menu-badge">6</span>
                     </a>
                  </div>

                  <div className="menu-item pt-5">
                     <div className="menu-content pb-2">
                        <span className="menu-section text-muted text-uppercase fs-7 fw-bold">Categories</span>
                     </div>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Metronic Admin</span>
                        <span className="menu-badge">1,400</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Backend Integration</span>
                        <span className="menu-badge">235</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Suggestions</span>
                        <span className="menu-badge">25</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Pre-sale Questions</span>
                        <span className="menu-badge">145</span>
                     </a>
                  </div>

                  <div className="menu-item">
                     <a href="?page=index" className="menu-link">
                        <span className="menu-title">Laravel Starter Kit</span>
                        <span className="menu-badge">750</span>
                     </a>
                  </div>

                  <div className="collapse" id="kt_aside_categories_more">
                     <div className="menu-item">
                        <a href="?page=index" className="menu-link">
                           <span className="menu-title">Blazor Integration</span>
                           <span className="menu-badge">100</span>
                        </a>
                     </div>

                     <div className="menu-item">
                        <a href="?page=index" className="menu-link">
                           <span className="menu-title">Django Dashboard</span>
                           <span className="menu-badge">90</span>
                        </a>
                     </div>

                     <div className="menu-item">
                        <a href="?page=index" className="menu-link">
                           <span className="menu-title">Rails CRUD</span>
                           <span className="menu-badge">14</span>
                        </a>
                     </div>

                     <div className="menu-item">
                        <a href="?page=index" className="menu-link">
                           <span className="menu-title">.NET Starter Kit</span>
                           <span className="menu-badge">30</span>
                        </a>
                     </div>
                  </div>

                  <div className="menu-item">
                     <div className="menu-link">
                        <a
                           hred="#"
                           className="menu-title text-muted fs-7"
                           id="kt_aside_categories_toggle"
                           data-bs-toggle="collapse"
                           data-bs-target="#kt_aside_categories_more">
                           More Categories
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
export default Aside;
