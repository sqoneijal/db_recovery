(()=>{"use strict";var e,r,n,t={},o={};function i(e){var r=o[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var n=o[e]={id:e,loaded:!1,exports:{}};try{var d={id:e,module:n,factory:t[e],require:i};i.i.forEach((function(e){e(d)})),n=d.module,d.factory.call(n.exports,n,n.exports,d.require)}catch(e){throw n.error=e,e}return n.loaded=!0,n.exports}i.m=t,i.c=o,i.i=[],e=[],i.O=(r,n,t,o)=>{if(!n){var d=1/0;for(u=0;u<e.length;u++){for(var[n,t,o]=e[u],a=!0,c=0;c<n.length;c++)(!1&o||d>=o)&&Object.keys(i.O).every((e=>i.O[e](n[c])))?n.splice(c--,1):(a=!1,o<d&&(d=o));if(a){e.splice(u--,1);var l=t();void 0!==l&&(r=l)}}return r}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,t,o]},i.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return i.d(r,{a:r}),r},i.d=(e,r)=>{for(var n in r)i.o(r,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((r,n)=>(i.f[n](e,r),r)),[])),i.u=e=>(736===e?"vendor":e)+"."+i.h()+".js",i.hu=e=>e+"."+i.h()+".hot-update.js",i.miniCssF=e=>{},i.hmrF=()=>"runtime."+i.h()+".hot-update.json",i.h=()=>"ab566fd7acd0763f24de",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r={},n="db_recovery:",i.l=(e,t,o,d)=>{if(r[e])r[e].push(t);else{var a,c;if(void 0!==o)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var s=l[u];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==n+o){a=s;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",n+o),a.src=e),r[e]=[t];var f=(n,t)=>{a.onerror=a.onload=null,clearTimeout(p);var o=r[e];if(delete r[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((e=>e(t))),n)return n(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),c&&document.head.appendChild(a)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e,r,n,t={},o=i.c,d=[],a=[],c="idle",l=0,u=[];function s(e){c=e;for(var r=[],n=0;n<a.length;n++)r[n]=a[n].call(null,e);return Promise.all(r)}function f(){0==--l&&s("ready").then((function(){if(0===l){var e=u;u=[];for(var r=0;r<e.length;r++)e[r]()}}))}function p(e){if("idle"!==c)throw new Error("check() is only allowed in idle status");return s("check").then(i.hmrM).then((function(n){return n?s("prepare").then((function(){var t=[];return r=[],Promise.all(Object.keys(i.hmrC).reduce((function(e,o){return i.hmrC[o](n.c,n.r,n.m,e,r,t),e}),[])).then((function(){return r=function(){return e?v(e):s("ready").then((function(){return t}))},0===l?r():new Promise((function(e){u.push((function(){e(r())}))}));var r}))})):s(m()?"ready":"idle").then((function(){return null}))}))}function h(e){return"ready"!==c?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+c+")")})):v(e)}function v(e){e=e||{},m();var t=r.map((function(r){return r(e)}));r=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return s("abort").then((function(){throw o[0]}));var i=s("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var d,a=s("apply"),c=function(e){d||(d=e)},l=[];return t.forEach((function(e){if(e.apply){var r=e.apply(c);if(r)for(var n=0;n<r.length;n++)l.push(r[n])}})),Promise.all([i,a]).then((function(){return d?s("fail").then((function(){throw d})):n?v(e).then((function(e){return l.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):s("idle").then((function(){return l}))}))}function m(){if(n)return r||(r=[]),Object.keys(i.hmrI).forEach((function(e){n.forEach((function(n){i.hmrI[e](n,r)}))})),n=void 0,!0}i.hmrD=t,i.i.push((function(u){var v,m,y,g,b=u.module,E=function(r,n){var t=o[n];if(!t)return r;var i=function(i){if(t.hot.active){if(o[i]){var a=o[i].parents;-1===a.indexOf(n)&&a.push(n)}else d=[n],e=i;-1===t.children.indexOf(i)&&t.children.push(i)}else console.warn("[HMR] unexpected require("+i+") from disposed module "+n),d=[];return r(i)},a=function(e){return{configurable:!0,enumerable:!0,get:function(){return r[e]},set:function(n){r[e]=n}}};for(var u in r)Object.prototype.hasOwnProperty.call(r,u)&&"e"!==u&&Object.defineProperty(i,u,a(u));return i.e=function(e){return function(e){switch(c){case"ready":s("prepare");case"prepare":return l++,e.then(f,f),e;default:return e}}(r.e(e))},i}(u.require,u.id);b.hot=(v=u.id,m=b,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:y=e!==v,_requireSelf:function(){d=m.parents.slice(),e=y?void 0:v,i(v)},active:!0,accept:function(e,r,n){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._acceptedDependencies[e[t]]=r||function(){},g._acceptedErrorHandlers[e[t]]=n;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,c){case"idle":r=[],Object.keys(i.hmrI).forEach((function(e){i.hmrI[e](v,r)})),s("ready");break;case"ready":Object.keys(i.hmrI).forEach((function(e){i.hmrI[e](v,r)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(v)}},check:p,apply:h,status:function(e){if(!e)return c;a.push(e)},addStatusHandler:function(e){a.push(e)},removeStatusHandler:function(e){var r=a.indexOf(e);r>=0&&a.splice(r,1)},data:t[v]},e=void 0,g),b.parents=d,b.children=[],d=[],u.require=E})),i.hmrC={},i.hmrI={}})(),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var r=i.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");if(n.length)for(var t=n.length-1;t>-1&&!e;)e=n[t--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{if("undefined"!=typeof document){var e=(e,r,n,t,o)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";return i.onerror=i.onload=n=>{if(i.onerror=i.onload=null,"load"===n.type)t();else{var d=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.href||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=d,c.request=a,i.parentNode&&i.parentNode.removeChild(i),o(c)}},i.href=r,n?n.parentNode.insertBefore(i,n.nextSibling):document.head.appendChild(i),i},r=(e,r)=>{for(var n=document.getElementsByTagName("link"),t=0;t<n.length;t++){var o=(d=n[t]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(o===e||o===r))return d}var i=document.getElementsByTagName("style");for(t=0;t<i.length;t++){var d;if((o=(d=i[t]).getAttribute("data-href"))===e||o===r)return d}},n=[],t=[],o=e=>({dispose:()=>{for(var e=0;e<n.length;e++){var r=n[e];r.parentNode&&r.parentNode.removeChild(r)}n.length=0},apply:()=>{for(var e=0;e<t.length;e++)t[e].rel="stylesheet";t.length=0}});i.hmrC.miniCss=(d,a,c,l,u,s)=>{u.push(o),d.forEach((o=>{var d=i.miniCssF(o),a=i.p+d,c=r(d,a);c&&l.push(new Promise(((r,i)=>{var d=e(o,a,c,(()=>{d.as="style",d.rel="preload",r()}),i);n.push(c),t.push(d)})))}))}}})(),(()=>{var e,r=i.hmrS_jsonp=i.hmrS_jsonp||{666:0};i.f.j=(e,n)=>{var t=i.o(r,e)?r[e]:void 0;if(0!==t)if(t)n.push(t[2]);else if(666!=e){var o=new Promise(((n,o)=>t=r[e]=[n,o]));n.push(t[2]=o);var d=i.p+i.u(e),a=new Error;i.l(d,(n=>{if(i.o(r,e)&&(0!==(t=r[e])&&(r[e]=void 0),t)){var o=n&&("load"===n.type?"missing":n.type),d=n&&n.target&&n.target.src;a.message="Loading chunk "+e+" failed.\n("+o+": "+d+")",a.name="ChunkLoadError",a.type=o,a.request=d,t[1](a)}}),"chunk-"+e,e)}else r[e]=0};var n,t,o,d,a={};function c(r,n){return e=n,new Promise(((e,n)=>{a[r]=e;var t=i.p+i.hu(r),o=new Error;i.l(t,(e=>{if(a[r]){a[r]=void 0;var t=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;o.message="Loading hot update chunk "+r+" failed.\n("+t+": "+i+")",o.name="ChunkLoadError",o.type=t,o.request=i,n(o)}}))}))}function l(e){function a(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),d=o.id,a=o.chain,l=i.c[d];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:d};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:d};for(var u=0;u<l.parents.length;u++){var s=l.parents[u],f=i.c[s];if(f){if(f.hot._declinedDependencies[d])return{type:"declined",chain:a.concat([s]),moduleId:d,parentId:s};-1===r.indexOf(s)&&(f.hot._acceptedDependencies[d]?(n[s]||(n[s]=[]),c(n[s],[d])):(delete n[s],r.push(s),t.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function c(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}i.f&&delete i.f.jsonpHmr,n=void 0;var l={},u=[],s={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in t)if(i.o(t,p)){var h,v=t[p],m=!1,y=!1,g=!1,b="";switch((h=v?a(p):{type:"disposed",moduleId:p}).chain&&(b="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of self decline: "+h.moduleId+b));break;case"declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+b));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(h),e.ignoreUnaccepted||(m=new Error("Aborted because "+p+" is not accepted"+b));break;case"accepted":e.onAccepted&&e.onAccepted(h),y=!0;break;case"disposed":e.onDisposed&&e.onDisposed(h),g=!0;break;default:throw new Error("Unexception type "+h.type)}if(m)return{error:m};if(y)for(p in s[p]=v,c(u,h.outdatedModules),h.outdatedDependencies)i.o(h.outdatedDependencies,p)&&(l[p]||(l[p]=[]),c(l[p],h.outdatedDependencies[p]));g&&(c(u,[h.moduleId]),s[p]=f)}t=void 0;for(var E,_=[],w=0;w<u.length;w++){var k=u[w],I=i.c[k];I&&(I.hot._selfAccepted||I.hot._main)&&s[k]!==f&&!I.hot._selfInvalidated&&_.push({module:k,require:I.hot._requireSelf,errorHandler:I.hot._selfAccepted})}return{dispose:function(){var e;o.forEach((function(e){delete r[e]})),o=void 0;for(var n,t=u.slice();t.length>0;){var d=t.pop(),a=i.c[d];if(a){var c={},s=a.hot._disposeHandlers;for(w=0;w<s.length;w++)s[w].call(null,c);for(i.hmrD[d]=c,a.hot.active=!1,delete i.c[d],delete l[d],w=0;w<a.children.length;w++){var f=i.c[a.children[w]];f&&((e=f.parents.indexOf(d))>=0&&f.parents.splice(e,1))}}}for(var p in l)if(i.o(l,p)&&(a=i.c[p]))for(E=l[p],w=0;w<E.length;w++)n=E[w],(e=a.children.indexOf(n))>=0&&a.children.splice(e,1)},apply:function(r){for(var n in s)i.o(s,n)&&(i.m[n]=s[n]);for(var t=0;t<d.length;t++)d[t](i);for(var o in l)if(i.o(l,o)){var a=i.c[o];if(a){E=l[o];for(var c=[],f=[],p=[],h=0;h<E.length;h++){var v=E[h],m=a.hot._acceptedDependencies[v],y=a.hot._acceptedErrorHandlers[v];if(m){if(-1!==c.indexOf(m))continue;c.push(m),f.push(y),p.push(v)}}for(var g=0;g<c.length;g++)try{c[g].call(null,E)}catch(n){if("function"==typeof f[g])try{f[g](n,{moduleId:o,dependencyId:p[g]})}catch(t){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:o,dependencyId:p[g],error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:o,dependencyId:p[g],error:n}),e.ignoreErrored||r(n)}}}for(var b=0;b<_.length;b++){var w=_[b],k=w.module;try{w.require(k)}catch(n){if("function"==typeof w.errorHandler)try{w.errorHandler(n,{moduleId:k,module:i.c[k]})}catch(t){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:k,error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:k,error:n}),e.ignoreErrored||r(n)}}return u}}}self.webpackHotUpdatedb_recovery=(r,n,o)=>{for(var c in n)i.o(n,c)&&(t[c]=n[c],e&&e.push(c));o&&d.push(o),a[r]&&(a[r](),a[r]=void 0)},i.hmrI.jsonp=function(e,r){t||(t={},d=[],o=[],r.push(l)),i.o(t,e)||(t[e]=i.m[e])},i.hmrC.jsonp=function(e,a,u,s,f,p){f.push(l),n={},o=a,t=u.reduce((function(e,r){return e[r]=!1,e}),{}),d=[],e.forEach((function(e){i.o(r,e)&&void 0!==r[e]?(s.push(c(e,p)),n[e]=!0):n[e]=!1})),i.f&&(i.f.jsonpHmr=function(e,r){n&&i.o(n,e)&&!n[e]&&(r.push(c(e)),n[e]=!0)})},i.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(i.p+i.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))},i.O.j=e=>0===r[e];var u=(e,n)=>{var t,o,[d,a,c]=n,l=0;if(d.some((e=>0!==r[e]))){for(t in a)i.o(a,t)&&(i.m[t]=a[t]);if(c)var u=c(i)}for(e&&e(n);l<d.length;l++)o=d[l],i.o(r,o)&&r[o]&&r[o][0](),r[o]=0;return i.O(u)},s=self.webpackChunkdb_recovery=self.webpackChunkdb_recovery||[];s.forEach(u.bind(null,0)),s.push=u.bind(null,s.push.bind(s))})()})();