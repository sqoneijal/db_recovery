import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

/* registerRoute(
   ({ url }) => url.origin === "https://fonts.googleapis.com",
   new StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
   })
);

registerRoute(
   ({ url }) => url.origin === "https://fonts.gstatic.com" || url.pathname === "/s/nunito/v25/XRXV3I6Li01BKofINeaB.woff2",
   new CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
         new CacheableResponsePlugin({ statuses: [0, 200] }),
         new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            maxEntries: 30,
         }),
      ],
   })
);

registerRoute(
   ({ request }) => request.destination === "image",
   new CacheFirst({
      cacheName: "images",
      plugins: [
         new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            maxEntries: 60,
         }),
      ],
   })
);
 */
