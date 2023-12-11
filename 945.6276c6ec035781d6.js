(()=>{"use strict";var r,n,e={945:(r,n,e)=>{var t=e(9675),o=e(3810),c=e(7515),a=e(3530),i=e(2165),u=e(8734);const s=(0,i.Ye)((function(r){const n=(0,u.bJ)();return(0,i.AO)(r.setMetaData(n.getSpanMetaData()),(function(){return r}))}));function f(){return s((0,c.Tc)("a-service"))}function m(){return s((0,c.Tc)("b-service"))}function d(){return s((0,c.Tc)("c-service"))}function p(){return s((0,c.Tc)("d-service"))}var h=e(1440);var v=e(758);(0,u.XD)({serviceName:"shared-worker-three"});const g=(0,u.kQ)("initialize");try{const r=globalThis,{getMetaData:n,setMetaData:e}=(0,h.d)(),{getMetaData:c,setMetaData:s}=(0,h.d)(),g=function(r){function n(){return{value:"C-service",timestamp:(new Date).toISOString(),workerId:(0,t.r)()}}const e=(0,i.Ye)((function(n,e){const t=(0,u.kQ)(`C-${n}`,{spanMetaData:r()});return(0,i.AO)(t.withSpan(e),(function(r){return t.endSpan(),r}))}));return{doSomething:()=>function(n,e){const t=(0,u.kQ)(`C-${n}`,{spanMetaData:r()}),o=t.withSpan(e);return t.endSpan(),o}("doSomething",(()=>(0,o.A)(Object.assign({},n())))),chainForward:(0,i.Ye)((function(r){return e("chainForward",(function(){return(0,i.cp)(p,(function(e){return(0,i.AO)(e.chainForward(Object.assign({},r,{c:n(),order:[...r.order,"c"]})))}))}))})),chainBackward:(0,i.Ye)((function(r){return e("chainBackward",(function(){return(0,i.cp)(m,(function(e){return(0,i.AO)(e.chainBackward(Object.assign({},r,{c:n(),order:[...r.order,"c"]})))}))}))})),transformFromA:(0,i.Ye)((function(){return e("transformFromA",(function(){return(0,i.cp)(f,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromA:r,message:"Transformed by Service C"})}))}))}))})),transformFromB:(0,i.Ye)((function(){return e("transformFromB",(function(){return(0,i.cp)(m,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromB:r,message:"Transformed by Service C"})}))}))}))})),transformFromD:(0,i.Ye)((function(){return e("transformFromD",(function(){return(0,i.cp)(p,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromD:r,message:"Transformed by Service C"})}))}))}))}))}}(n),S=function(r){function n(){return{value:"D-service",timestamp:(new Date).toISOString(),workerId:(0,t.r)()}}function e(n,e){const t=(0,u.kQ)(`D-${n}`,{spanMetaData:r()}),o=t.withSpan(e);return t.endSpan(),o}const c=(0,i.Ye)((function(n,e){const t=(0,u.kQ)(`D-${n}`,{spanMetaData:r()});return(0,i.AO)(t.withSpan(e),(function(r){return t.endSpan(),r}))}));return{doSomething:()=>e("doSomething",(()=>(0,o.A)(Object.assign({},n())))),chainForward:(0,i.Ye)((function(r){return e("chainForward",(()=>Object.assign({},r,{d:n(),order:[...r.order,"d"]})))})),chainBackward:(0,i.Ye)((function(){return c("chainBackward",(function(){return(0,i.cp)(d,(function(r){return(0,i.AO)(r.chainBackward({d:n(),order:["d"]}))}))}))})),transformFromA:(0,i.Ye)((function(){return c("transformFromA",(function(){return(0,i.cp)(f,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromA:r,message:"Transformed by Service D"})}))}))}))})),transformFromB:(0,i.Ye)((function(){return c("transformFromB",(function(){return(0,i.cp)(m,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromB:r,message:"Transformed by Service D"})}))}))}))})),transformFromC:(0,i.Ye)((function(){return c("transformFromC",(function(){return(0,i.cp)(d,(function(r){return(0,i.AO)(r.doSomething(),(function(r){return(0,o.A)({fromC:r,message:"Transformed by Service D"})}))}))}))}))}}(c);r.onconnect=r=>{const[n]=r.ports;v.Jj({exposeServiceOnPort:(0,a.MP)({"c-service":g,"d-service":S},{"c-service":e,"d-service":s}),mapRemoteServiceOnPort:(0,a.Vw)(),workerInfo:()=>({title:"Worker Three"})},n)}}catch(S){console.error(S),g.setSpanError(S)}g.endSpan()}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}o.m=e,o.x=()=>{var r=o.O(void 0,[390],(()=>o(945)));return r=o.O(r)},r=[],o.O=(n,e,t,c)=>{if(!e){var a=1/0;for(f=0;f<r.length;f++){for(var[e,t,c]=r[f],i=!0,u=0;u<e.length;u++)(!1&c||a>=c)&&Object.keys(o.O).every((r=>o.O[r](e[u])))?e.splice(u--,1):(i=!1,c<a&&(a=c));if(i){r.splice(f--,1);var s=t();void 0!==s&&(n=s)}}return n}c=c||0;for(var f=r.length;f>0&&r[f-1][2]>c;f--)r[f]=r[f-1];r[f]=[e,t,c]},o.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return o.d(n,{a:n}),n},o.d=(r,n)=>{for(var e in n)o.o(n,e)&&!o.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:n[e]})},o.f={},o.e=r=>Promise.all(Object.keys(o.f).reduce(((n,e)=>(o.f[e](r,n),n)),[])),o.u=r=>r+".07623b40a3aaa585.js",o.miniCssF=r=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),o.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),(()=>{var r;o.g.importScripts&&(r=o.g.location+"");var n=o.g.document;if(!r&&n&&(n.currentScript&&(r=n.currentScript.src),!r)){var e=n.getElementsByTagName("script");if(e.length)for(var t=e.length-1;t>-1&&!r;)r=e[t--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=r})(),(()=>{var r={945:1};o.f.i=(n,e)=>{r[n]||importScripts(o.p+o.u(n))};var n=self.webpackChunk=self.webpackChunk||[],e=n.push.bind(n);n.push=n=>{var[t,c,a]=n;for(var i in c)o.o(c,i)&&(o.m[i]=c[i]);for(a&&a(o);t.length;)r[t.pop()]=1;e(n)}})(),n=o.x,o.x=()=>o.e(390).then(n);o.x()})();