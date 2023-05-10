(() => {
   "use strict";
   var e = {
         895: () => {
            try {
               self["workbox:cacheable-response:6.5.3"] && _();
            } catch (e) {}
         },
         913: () => {
            try {
               self["workbox:core:6.5.3"] && _();
            } catch (e) {}
         },
         550: () => {
            try {
               self["workbox:expiration:6.5.3"] && _();
            } catch (e) {}
         },
         977: () => {
            try {
               self["workbox:precaching:6.5.3"] && _();
            } catch (e) {}
         },
         80: () => {
            try {
               self["workbox:routing:6.5.3"] && _();
            } catch (e) {}
         },
         873: () => {
            try {
               self["workbox:strategies:6.5.3"] && _();
            } catch (e) {}
         },
      },
      t = {};
   function s(r) {
      var n = t[r];
      if (void 0 !== n) {
         if (void 0 !== n.error) throw n.error;
         return n.exports;
      }
      var a = (t[r] = { exports: {} });
      try {
         e[r](a, a.exports, s);
      } catch (e) {
         throw ((a.error = e), e);
      }
      return a.exports;
   }
   (() => {
      s(913);
      const e = (e, ...t) => {
         let s = e;
         return t.length > 0 && (s += ` :: ${JSON.stringify(t)}`), s;
      };
      class t extends Error {
         constructor(t, s) {
            super(e(t, s)), (this.name = t), (this.details = s);
         }
      }
      const r = new Set();
      const n = {
            googleAnalytics: "googleAnalytics",
            precache: "precache-v2",
            prefix: "workbox",
            runtime: "runtime",
            suffix: "undefined" != typeof registration ? registration.scope : "",
         },
         a = (e) => [n.prefix, e, n.suffix].filter((e) => e && e.length > 0).join("-"),
         i = (e) => e || a(n.precache),
         o = (e) => e || a(n.runtime);
      function c(e, t) {
         const s = new URL(e);
         for (const e of t) s.searchParams.delete(e);
         return s.href;
      }
      let h;
      class l {
         constructor() {
            this.promise = new Promise((e, t) => {
               (this.resolve = e), (this.reject = t);
            });
         }
      }
      const u = (e) => new URL(String(e), location.href).href.replace(new RegExp(`^${location.origin}`), "");
      function f(e, t) {
         const s = t();
         return e.waitUntil(s), s;
      }
      async function d(e, s) {
         let r = null;
         if (e.url) {
            r = new URL(e.url).origin;
         }
         if (r !== self.location.origin) throw new t("cross-origin-copy-response", { origin: r });
         const n = e.clone(),
            a = { headers: new Headers(n.headers), status: n.status, statusText: n.statusText },
            i = s ? s(a) : a,
            o = (function () {
               if (void 0 === h) {
                  const e = new Response("");
                  if ("body" in e)
                     try {
                        new Response(e.body), (h = !0);
                     } catch (e) {
                        h = !1;
                     }
                  h = !1;
               }
               return h;
            })()
               ? n.body
               : await n.blob();
         return new Response(o, i);
      }
      s(977);
      function p(e) {
         if (!e) throw new t("add-to-cache-list-unexpected-type", { entry: e });
         if ("string" == typeof e) {
            const t = new URL(e, location.href);
            return { cacheKey: t.href, url: t.href };
         }
         const { revision: s, url: r } = e;
         if (!r) throw new t("add-to-cache-list-unexpected-type", { entry: e });
         if (!s) {
            const e = new URL(r, location.href);
            return { cacheKey: e.href, url: e.href };
         }
         const n = new URL(r, location.href),
            a = new URL(r, location.href);
         return n.searchParams.set("__WB_REVISION__", s), { cacheKey: n.href, url: a.href };
      }
      class g {
         constructor() {
            (this.updatedURLs = []),
               (this.notUpdatedURLs = []),
               (this.handlerWillStart = async ({ request: e, state: t }) => {
                  t && (t.originalRequest = e);
               }),
               (this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: s }) => {
                  if ("install" === e.type && t && t.originalRequest && t.originalRequest instanceof Request) {
                     const e = t.originalRequest.url;
                     s ? this.notUpdatedURLs.push(e) : this.updatedURLs.push(e);
                  }
                  return s;
               });
         }
      }
      class y {
         constructor({ precacheController: e }) {
            (this.cacheKeyWillBeUsed = async ({ request: e, params: t }) => {
               const s = (null == t ? void 0 : t.cacheKey) || this._precacheController.getCacheKeyForURL(e.url);
               return s ? new Request(s, { headers: e.headers }) : e;
            }),
               (this._precacheController = e);
         }
      }
      s(873);
      function w(e) {
         return "string" == typeof e ? new Request(e) : e;
      }
      class m {
         constructor(e, t) {
            (this._cacheKeys = {}),
               Object.assign(this, t),
               (this.event = t.event),
               (this._strategy = e),
               (this._handlerDeferred = new l()),
               (this._extendLifetimePromises = []),
               (this._plugins = [...e.plugins]),
               (this._pluginStateMap = new Map());
            for (const e of this._plugins) this._pluginStateMap.set(e, {});
            this.event.waitUntil(this._handlerDeferred.promise);
         }
         async fetch(e) {
            const { event: s } = this;
            let r = w(e);
            if ("navigate" === r.mode && s instanceof FetchEvent && s.preloadResponse) {
               const e = await s.preloadResponse;
               if (e) return e;
            }
            const n = this.hasCallback("fetchDidFail") ? r.clone() : null;
            try {
               for (const e of this.iterateCallbacks("requestWillFetch")) r = await e({ request: r.clone(), event: s });
            } catch (e) {
               if (e instanceof Error) throw new t("plugin-error-request-will-fetch", { thrownErrorMessage: e.message });
            }
            const a = r.clone();
            try {
               let e;
               e = await fetch(r, "navigate" === r.mode ? void 0 : this._strategy.fetchOptions);
               for (const t of this.iterateCallbacks("fetchDidSucceed")) e = await t({ event: s, request: a, response: e });
               return e;
            } catch (e) {
               throw (n && (await this.runCallbacks("fetchDidFail", { error: e, event: s, originalRequest: n.clone(), request: a.clone() })), e);
            }
         }
         async fetchAndCachePut(e) {
            const t = await this.fetch(e),
               s = t.clone();
            return this.waitUntil(this.cachePut(e, s)), t;
         }
         async cacheMatch(e) {
            const t = w(e);
            let s;
            const { cacheName: r, matchOptions: n } = this._strategy,
               a = await this.getCacheKey(t, "read"),
               i = Object.assign(Object.assign({}, n), { cacheName: r });
            s = await caches.match(a, i);
            for (const e of this.iterateCallbacks("cachedResponseWillBeUsed"))
               s = (await e({ cacheName: r, matchOptions: n, cachedResponse: s, request: a, event: this.event })) || void 0;
            return s;
         }
         async cachePut(e, s) {
            const n = w(e);
            var a;
            await ((a = 0), new Promise((e) => setTimeout(e, a)));
            const i = await this.getCacheKey(n, "write");
            if (!s) throw new t("cache-put-with-no-response", { url: u(i.url) });
            const o = await this._ensureResponseSafeToCache(s);
            if (!o) return !1;
            const { cacheName: h, matchOptions: l } = this._strategy,
               f = await self.caches.open(h),
               d = this.hasCallback("cacheDidUpdate"),
               p = d
                  ? await (async function (e, t, s, r) {
                       const n = c(t.url, s);
                       if (t.url === n) return e.match(t, r);
                       const a = Object.assign(Object.assign({}, r), { ignoreSearch: !0 }),
                          i = await e.keys(t, a);
                       for (const t of i) if (n === c(t.url, s)) return e.match(t, r);
                    })(f, i.clone(), ["__WB_REVISION__"], l)
                  : null;
            try {
               await f.put(i, d ? o.clone() : o);
            } catch (e) {
               if (e instanceof Error)
                  throw (
                     ("QuotaExceededError" === e.name &&
                        (await (async function () {
                           for (const e of r) await e();
                        })()),
                     e)
                  );
            }
            for (const e of this.iterateCallbacks("cacheDidUpdate"))
               await e({ cacheName: h, oldResponse: p, newResponse: o.clone(), request: i, event: this.event });
            return !0;
         }
         async getCacheKey(e, t) {
            const s = `${e.url} | ${t}`;
            if (!this._cacheKeys[s]) {
               let r = e;
               for (const e of this.iterateCallbacks("cacheKeyWillBeUsed"))
                  r = w(await e({ mode: t, request: r, event: this.event, params: this.params }));
               this._cacheKeys[s] = r;
            }
            return this._cacheKeys[s];
         }
         hasCallback(e) {
            for (const t of this._strategy.plugins) if (e in t) return !0;
            return !1;
         }
         async runCallbacks(e, t) {
            for (const s of this.iterateCallbacks(e)) await s(t);
         }
         *iterateCallbacks(e) {
            for (const t of this._strategy.plugins)
               if ("function" == typeof t[e]) {
                  const s = this._pluginStateMap.get(t),
                     r = (r) => {
                        const n = Object.assign(Object.assign({}, r), { state: s });
                        return t[e](n);
                     };
                  yield r;
               }
         }
         waitUntil(e) {
            return this._extendLifetimePromises.push(e), e;
         }
         async doneWaiting() {
            let e;
            for (; (e = this._extendLifetimePromises.shift()); ) await e;
         }
         destroy() {
            this._handlerDeferred.resolve(null);
         }
         async _ensureResponseSafeToCache(e) {
            let t = e,
               s = !1;
            for (const e of this.iterateCallbacks("cacheWillUpdate"))
               if (((t = (await e({ request: this.request, response: t, event: this.event })) || void 0), (s = !0), !t)) break;
            return s || (t && 200 !== t.status && (t = void 0)), t;
         }
      }
      class _ {
         constructor(e = {}) {
            (this.cacheName = o(e.cacheName)),
               (this.plugins = e.plugins || []),
               (this.fetchOptions = e.fetchOptions),
               (this.matchOptions = e.matchOptions);
         }
         handle(e) {
            const [t] = this.handleAll(e);
            return t;
         }
         handleAll(e) {
            e instanceof FetchEvent && (e = { event: e, request: e.request });
            const t = e.event,
               s = "string" == typeof e.request ? new Request(e.request) : e.request,
               r = "params" in e ? e.params : void 0,
               n = new m(this, { event: t, request: s, params: r }),
               a = this._getResponse(n, s, t);
            return [a, this._awaitComplete(a, n, s, t)];
         }
         async _getResponse(e, s, r) {
            let n;
            await e.runCallbacks("handlerWillStart", { event: r, request: s });
            try {
               if (((n = await this._handle(s, e)), !n || "error" === n.type)) throw new t("no-response", { url: s.url });
            } catch (t) {
               if (t instanceof Error)
                  for (const a of e.iterateCallbacks("handlerDidError")) if (((n = await a({ error: t, event: r, request: s })), n)) break;
               if (!n) throw t;
            }
            for (const t of e.iterateCallbacks("handlerWillRespond")) n = await t({ event: r, request: s, response: n });
            return n;
         }
         async _awaitComplete(e, t, s, r) {
            let n, a;
            try {
               n = await e;
            } catch (a) {}
            try {
               await t.runCallbacks("handlerDidRespond", { event: r, request: s, response: n }), await t.doneWaiting();
            } catch (e) {
               e instanceof Error && (a = e);
            }
            if ((await t.runCallbacks("handlerDidComplete", { event: r, request: s, response: n, error: a }), t.destroy(), a)) throw a;
         }
      }
      class v extends _ {
         constructor(e = {}) {
            (e.cacheName = i(e.cacheName)),
               super(e),
               (this._fallbackToNetwork = !1 !== e.fallbackToNetwork),
               this.plugins.push(v.copyRedirectedCacheableResponsesPlugin);
         }
         async _handle(e, t) {
            const s = await t.cacheMatch(e);
            return s || (t.event && "install" === t.event.type ? await this._handleInstall(e, t) : await this._handleFetch(e, t));
         }
         async _handleFetch(e, s) {
            let r;
            const n = s.params || {};
            if (!this._fallbackToNetwork) throw new t("missing-precache-entry", { cacheName: this.cacheName, url: e.url });
            {
               0;
               const t = n.integrity,
                  a = e.integrity,
                  i = !a || a === t;
               if (((r = await s.fetch(new Request(e, { integrity: "no-cors" !== e.mode ? a || t : void 0 }))), t && i && "no-cors" !== e.mode)) {
                  this._useDefaultCacheabilityPluginIfNeeded();
                  await s.cachePut(e, r.clone());
                  0;
               }
            }
            return r;
         }
         async _handleInstall(e, s) {
            this._useDefaultCacheabilityPluginIfNeeded();
            const r = await s.fetch(e);
            if (!(await s.cachePut(e, r.clone()))) throw new t("bad-precaching-response", { url: e.url, status: r.status });
            return r;
         }
         _useDefaultCacheabilityPluginIfNeeded() {
            let e = null,
               t = 0;
            for (const [s, r] of this.plugins.entries())
               r !== v.copyRedirectedCacheableResponsesPlugin && (r === v.defaultPrecacheCacheabilityPlugin && (e = s), r.cacheWillUpdate && t++);
            0 === t ? this.plugins.push(v.defaultPrecacheCacheabilityPlugin) : t > 1 && null !== e && this.plugins.splice(e, 1);
         }
      }
      (v.defaultPrecacheCacheabilityPlugin = { cacheWillUpdate: async ({ response: e }) => (!e || e.status >= 400 ? null : e) }),
         (v.copyRedirectedCacheableResponsesPlugin = { cacheWillUpdate: async ({ response: e }) => (e.redirected ? await d(e) : e) });
      class R {
         constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: s = !0 } = {}) {
            (this._urlsToCacheKeys = new Map()),
               (this._urlsToCacheModes = new Map()),
               (this._cacheKeysToIntegrities = new Map()),
               (this._strategy = new v({ cacheName: i(e), plugins: [...t, new y({ precacheController: this })], fallbackToNetwork: s })),
               (this.install = this.install.bind(this)),
               (this.activate = this.activate.bind(this));
         }
         get strategy() {
            return this._strategy;
         }
         precache(e) {
            this.addToCacheList(e),
               this._installAndActiveListenersAdded ||
                  (self.addEventListener("install", this.install),
                  self.addEventListener("activate", this.activate),
                  (this._installAndActiveListenersAdded = !0));
         }
         addToCacheList(e) {
            const s = [];
            for (const r of e) {
               "string" == typeof r ? s.push(r) : r && void 0 === r.revision && s.push(r.url);
               const { cacheKey: e, url: n } = p(r),
                  a = "string" != typeof r && r.revision ? "reload" : "default";
               if (this._urlsToCacheKeys.has(n) && this._urlsToCacheKeys.get(n) !== e)
                  throw new t("add-to-cache-list-conflicting-entries", { firstEntry: this._urlsToCacheKeys.get(n), secondEntry: e });
               if ("string" != typeof r && r.integrity) {
                  if (this._cacheKeysToIntegrities.has(e) && this._cacheKeysToIntegrities.get(e) !== r.integrity)
                     throw new t("add-to-cache-list-conflicting-integrities", { url: n });
                  this._cacheKeysToIntegrities.set(e, r.integrity);
               }
               if ((this._urlsToCacheKeys.set(n, e), this._urlsToCacheModes.set(n, a), s.length > 0)) {
                  const e = `Workbox is precaching URLs without revision info: ${s.join(
                     ", "
                  )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                  console.warn(e);
               }
            }
         }
         install(e) {
            return f(e, async () => {
               const t = new g();
               this.strategy.plugins.push(t);
               for (const [t, s] of this._urlsToCacheKeys) {
                  const r = this._cacheKeysToIntegrities.get(s),
                     n = this._urlsToCacheModes.get(t),
                     a = new Request(t, { integrity: r, cache: n, credentials: "same-origin" });
                  await Promise.all(this.strategy.handleAll({ params: { cacheKey: s }, request: a, event: e }));
               }
               const { updatedURLs: s, notUpdatedURLs: r } = t;
               return { updatedURLs: s, notUpdatedURLs: r };
            });
         }
         activate(e) {
            return f(e, async () => {
               const e = await self.caches.open(this.strategy.cacheName),
                  t = await e.keys(),
                  s = new Set(this._urlsToCacheKeys.values()),
                  r = [];
               for (const n of t) s.has(n.url) || (await e.delete(n), r.push(n.url));
               return { deletedURLs: r };
            });
         }
         getURLsToCacheKeys() {
            return this._urlsToCacheKeys;
         }
         getCachedURLs() {
            return [...this._urlsToCacheKeys.keys()];
         }
         getCacheKeyForURL(e) {
            const t = new URL(e, location.href);
            return this._urlsToCacheKeys.get(t.href);
         }
         getIntegrityForCacheKey(e) {
            return this._cacheKeysToIntegrities.get(e);
         }
         async matchPrecache(e) {
            const t = e instanceof Request ? e.url : e,
               s = this.getCacheKeyForURL(t);
            if (s) {
               return (await self.caches.open(this.strategy.cacheName)).match(s);
            }
         }
         createHandlerBoundToURL(e) {
            const s = this.getCacheKeyForURL(e);
            if (!s) throw new t("non-precached-url", { url: e });
            return (t) => ((t.request = new Request(e)), (t.params = Object.assign({ cacheKey: s }, t.params)), this.strategy.handle(t));
         }
      }
      let b;
      const C = () => (b || (b = new R()), b);
      s(80);
      const L = (e) => (e && "object" == typeof e ? e : { handle: e });
      class q {
         constructor(e, t, s = "GET") {
            (this.handler = L(t)), (this.match = e), (this.method = s);
         }
         setCatchHandler(e) {
            this.catchHandler = L(e);
         }
      }
      class U extends q {
         constructor(e, t, s) {
            super(
               ({ url: t }) => {
                  const s = e.exec(t.href);
                  if (s && (t.origin === location.origin || 0 === s.index)) return s.slice(1);
               },
               t,
               s
            );
         }
      }
      class k {
         constructor() {
            (this._routes = new Map()), (this._defaultHandlerMap = new Map());
         }
         get routes() {
            return this._routes;
         }
         addFetchListener() {
            self.addEventListener("fetch", (e) => {
               const { request: t } = e,
                  s = this.handleRequest({ request: t, event: e });
               s && e.respondWith(s);
            });
         }
         addCacheListener() {
            self.addEventListener("message", (e) => {
               if (e.data && "CACHE_URLS" === e.data.type) {
                  const { payload: t } = e.data;
                  0;
                  const s = Promise.all(
                     t.urlsToCache.map((t) => {
                        "string" == typeof t && (t = [t]);
                        const s = new Request(...t);
                        return this.handleRequest({ request: s, event: e });
                     })
                  );
                  e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
               }
            });
         }
         handleRequest({ request: e, event: t }) {
            const s = new URL(e.url, location.href);
            if (!s.protocol.startsWith("http")) return void 0;
            const r = s.origin === location.origin,
               { params: n, route: a } = this.findMatchingRoute({ event: t, request: e, sameOrigin: r, url: s });
            let i = a && a.handler;
            const o = e.method;
            if ((!i && this._defaultHandlerMap.has(o) && (i = this._defaultHandlerMap.get(o)), !i)) return void 0;
            let c;
            try {
               c = i.handle({ url: s, request: e, event: t, params: n });
            } catch (e) {
               c = Promise.reject(e);
            }
            const h = a && a.catchHandler;
            return (
               c instanceof Promise &&
                  (this._catchHandler || h) &&
                  (c = c.catch(async (r) => {
                     if (h) {
                        0;
                        try {
                           return await h.handle({ url: s, request: e, event: t, params: n });
                        } catch (e) {
                           e instanceof Error && (r = e);
                        }
                     }
                     if (this._catchHandler) return this._catchHandler.handle({ url: s, request: e, event: t });
                     throw r;
                  })),
               c
            );
         }
         findMatchingRoute({ url: e, sameOrigin: t, request: s, event: r }) {
            const n = this._routes.get(s.method) || [];
            for (const a of n) {
               let n;
               const i = a.match({ url: e, sameOrigin: t, request: s, event: r });
               if (i)
                  return (
                     (n = i),
                     ((Array.isArray(n) && 0 === n.length) || (i.constructor === Object && 0 === Object.keys(i).length) || "boolean" == typeof i) &&
                        (n = void 0),
                     { route: a, params: n }
                  );
            }
            return {};
         }
         setDefaultHandler(e, t = "GET") {
            this._defaultHandlerMap.set(t, L(e));
         }
         setCatchHandler(e) {
            this._catchHandler = L(e);
         }
         registerRoute(e) {
            this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
         }
         unregisterRoute(e) {
            if (!this._routes.has(e.method)) throw new t("unregister-route-but-not-found-with-method", { method: e.method });
            const s = this._routes.get(e.method).indexOf(e);
            if (!(s > -1)) throw new t("unregister-route-route-not-registered");
            this._routes.get(e.method).splice(s, 1);
         }
      }
      let T;
      const K = () => (T || ((T = new k()), T.addFetchListener(), T.addCacheListener()), T);
      class x extends q {
         constructor(e, t) {
            super(({ request: s }) => {
               const r = e.getURLsToCacheKeys();
               for (const n of (function* (
                  e,
                  {
                     ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/],
                     directoryIndex: s = "index.html",
                     cleanURLs: r = !0,
                     urlManipulation: n,
                  } = {}
               ) {
                  const a = new URL(e, location.href);
                  (a.hash = ""), yield a.href;
                  const i = (function (e, t = []) {
                     for (const s of [...e.searchParams.keys()]) t.some((e) => e.test(s)) && e.searchParams.delete(s);
                     return e;
                  })(a, t);
                  if ((yield i.href, s && i.pathname.endsWith("/"))) {
                     const e = new URL(i.href);
                     (e.pathname += s), yield e.href;
                  }
                  if (r) {
                     const e = new URL(i.href);
                     (e.pathname += ".html"), yield e.href;
                  }
                  if (n) {
                     const e = n({ url: a });
                     for (const t of e) yield t.href;
                  }
               })(s.url, t)) {
                  const t = r.get(n);
                  if (t) {
                     return { cacheKey: t, integrity: e.getIntegrityForCacheKey(t) };
                  }
               }
            }, e.strategy);
         }
      }
      function E(e) {
         const s = C();
         !(function (e, s, r) {
            let n;
            if ("string" == typeof e) {
               const t = new URL(e, location.href);
               n = new q(({ url: e }) => e.href === t.href, s, r);
            } else if (e instanceof RegExp) n = new U(e, s, r);
            else if ("function" == typeof e) n = new q(e, s, r);
            else {
               if (!(e instanceof q))
                  throw new t("unsupported-route-type", { moduleName: "workbox-routing", funcName: "registerRoute", paramName: "capture" });
               n = e;
            }
            K().registerRoute(n);
         })(new x(s, e));
      }
      s(895);
      const I = (e, t) => t.some((t) => e instanceof t);
      let D, P;
      const N = new WeakMap(),
         M = new WeakMap(),
         O = new WeakMap(),
         W = new WeakMap(),
         B = new WeakMap();
      let S = {
         get(e, t, s) {
            if (e instanceof IDBTransaction) {
               if ("done" === t) return M.get(e);
               if ("objectStoreNames" === t) return e.objectStoreNames || O.get(e);
               if ("store" === t) return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
            }
            return F(e[t]);
         },
         set: (e, t, s) => ((e[t] = s), !0),
         has: (e, t) => (e instanceof IDBTransaction && ("done" === t || "store" === t)) || t in e,
      };
      function j(e) {
         return e !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype
            ? (P || (P = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e)
               ? function (...t) {
                    return e.apply(H(this), t), F(N.get(this));
                 }
               : function (...t) {
                    return F(e.apply(H(this), t));
                 }
            : function (t, ...s) {
                 const r = e.call(H(this), t, ...s);
                 return O.set(r, t.sort ? t.sort() : [t]), F(r);
              };
      }
      function A(e) {
         return "function" == typeof e
            ? j(e)
            : (e instanceof IDBTransaction &&
                 (function (e) {
                    if (M.has(e)) return;
                    const t = new Promise((t, s) => {
                       const r = () => {
                             e.removeEventListener("complete", n), e.removeEventListener("error", a), e.removeEventListener("abort", a);
                          },
                          n = () => {
                             t(), r();
                          },
                          a = () => {
                             s(e.error || new DOMException("AbortError", "AbortError")), r();
                          };
                       e.addEventListener("complete", n), e.addEventListener("error", a), e.addEventListener("abort", a);
                    });
                    M.set(e, t);
                 })(e),
              I(e, D || (D = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(e, S) : e);
      }
      function F(e) {
         if (e instanceof IDBRequest)
            return (function (e) {
               const t = new Promise((t, s) => {
                  const r = () => {
                        e.removeEventListener("success", n), e.removeEventListener("error", a);
                     },
                     n = () => {
                        t(F(e.result)), r();
                     },
                     a = () => {
                        s(e.error), r();
                     };
                  e.addEventListener("success", n), e.addEventListener("error", a);
               });
               return (
                  t
                     .then((t) => {
                        t instanceof IDBCursor && N.set(t, e);
                     })
                     .catch(() => {}),
                  B.set(t, e),
                  t
               );
            })(e);
         if (W.has(e)) return W.get(e);
         const t = A(e);
         return t !== e && (W.set(e, t), B.set(t, e)), t;
      }
      const H = (e) => B.get(e);
      const $ = ["get", "getKey", "getAll", "getAllKeys", "count"],
         G = ["put", "add", "delete", "clear"],
         V = new Map();
      function J(e, t) {
         if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
         if (V.get(t)) return V.get(t);
         const s = t.replace(/FromIndex$/, ""),
            r = t !== s,
            n = G.includes(s);
         if (!(s in (r ? IDBIndex : IDBObjectStore).prototype) || (!n && !$.includes(s))) return;
         const a = async function (e, ...t) {
            const a = this.transaction(e, n ? "readwrite" : "readonly");
            let i = a.store;
            return r && (i = i.index(t.shift())), (await Promise.all([i[s](...t), n && a.done]))[0];
         };
         return V.set(t, a), a;
      }
      S = ((e) => ({ ...e, get: (t, s, r) => J(t, s) || e.get(t, s, r), has: (t, s) => !!J(t, s) || e.has(t, s) }))(S);
      s(550);
      var Q;
      self.addEventListener("activate", () => self.clients.claim()),
         self.skipWaiting(),
         (function (e) {
            C().precache(e);
         })([
            { revision: null, url: "/bundle/149.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/15.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/191.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/1f658a3b240a5acc215e.svg" },
            { revision: null, url: "/bundle/208.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/28.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/349.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/358.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/361.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/375.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/4c08f7ed24129bc39420.svg" },
            { revision: null, url: "/bundle/51.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/64.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/655.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/658.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/689.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/7ef0f746c54db2b33a15.svg" },
            { revision: null, url: "/bundle/809.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/814.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/92887b5ea1048c871883.png" },
            { revision: "f2e54212fa0ed750f4adfc230c62ad9a", url: "/bundle/index.html" },
            { revision: null, url: "/bundle/main.398f6fee54bc0faaa3c9.js" },
            { revision: "7f056457b8b5fbddc9f4996999673be5", url: "/bundle/main.398f6fee54bc0faaa3c9.js.LICENSE.txt" },
            { revision: "13b27ec1cbd319a48070b677f9856b61", url: "/bundle/main.css" },
            { revision: null, url: "/bundle/runtime.398f6fee54bc0faaa3c9.js" },
            { revision: null, url: "/bundle/vendor.398f6fee54bc0faaa3c9.js" },
            { revision: "872ed62d379c06625f11483b91c870d1", url: "/bundle/vendor.398f6fee54bc0faaa3c9.js.LICENSE.txt" },
         ]),
         E(Q);
   })();
})();