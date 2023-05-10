import { Workbox } from "workbox-window";

export default function registerServiceWorker() {
   if ("production" !== process.env.NODE_ENV) {
      return;
   }

   if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");

      wb.addEventListener("installed", (event) => {
         if (event.isUpdate) {
            caches.keys().then((cacheNames) => {
               cacheNames.forEach((cacheName) => {
                  caches.delete(cacheName);
               });
            });

            Swal.fire({
               text: "Versi terbaru telah tersedia, klik tombol OK untuk refresh!",
               icon: "question",
               showCancelButton: false,
               buttonsStyling: false,
               confirmButtonText: "OK",
               allowOutsideClick: false,
               customClass: {
                  confirmButton: "btn btn-sm fw-bold btn-primary btn-light-primary",
               },
            }).then((res) => {
               if (res) {
                  window.location.reload(true);
               }
            });
         }
      });

      wb.register();
   }
}
