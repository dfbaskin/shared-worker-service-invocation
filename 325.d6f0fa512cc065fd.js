(()=>{"use strict";var r,e,n={1325:(r,e,n)=>{var t=n(9675),o=n(3810),a=n(7515),i=n(3530),c=n(2165),u=n(8734);const s=(0,c.Ye)((function(r){const e=(0,u.bJ)();return(0,c.AO)(r.setMetaData(e.getSpanMetaData()),(function(){return r}))}));function f(){return s((0,a.Tc)("b-service"))}function p(){return s((0,a.Tc)("c-service"))}function m(){return s((0,a.Tc)("d-service"))}var v=n(1440);var d=n(758);(0,u.XD)({serviceName:"shared-worker-one"});const h=(0,u.kQ)("initialize");try{const r=globalThis,{getMetaData:e,setMetaData:n}=(0,v.d)(),a=function(r){function e(){return{value:"A-service",timestamp:(new Date).toISOString(),workerId:(0,t.r)()}}function n(e,n){const t=(0,u.kQ)(`A-${e}`,{spanMetaData:r()}),o=t.withSpan(n);return t.endSpan(),o}const a=(0,c.Ye)((function(e,n){const t=(0,u.kQ)(`A-${e}`,{spanMetaData:r()});return(0,c.AO)(t.withSpan(n),(function(r){return t.endSpan(),r}))}));return{doSomething:()=>n("doSomething",(()=>(0,o.A)(Object.assign({},e())))),chainForward:(0,c.Ye)((function(){return a("chainForward",(function(){return(0,c.cp)(f,(function(r){return(0,c.AO)(r.chainForward({a:e(),order:["a"]}))}))}))})),chainBackward:(0,c.Ye)((function(r){return n("chainBackward",(()=>Object.assign({},r,{a:e(),order:[...r.order,"a"]})))})),transformFromB:(0,c.Ye)((function(){return a("transformFromB",(function(){return(0,c.cp)(f,(function(r){return(0,c.AO)(r.doSomething(),(function(r){return(0,o.A)({fromB:r,message:"Transformed by Service A"})}))}))}))})),transformFromC:(0,c.Ye)((function(){return a("transformFromC",(function(){return(0,c.cp)(p,(function(r){return(0,c.AO)(r.doSomething(),(function(r){return(0,o.A)({fromC:r,message:"Transformed by Service A"})}))}))}))})),transformFromD:(0,c.Ye)((function(){return a("transformFromD",(function(){return(0,c.cp)(m,(function(r){return(0,c.AO)(r.doSomething(),(function(r){return(0,o.A)({fromD:r,message:"Transformed by Service A"})}))}))}))}))}}(e);r.onconnect=r=>{const[e]=r.ports;d.Jj({exposeServiceOnPort:(0,i.MP)({"a-service":a},{"a-service":n}),mapRemoteServiceOnPort:(0,i.Vw)(),workerInfo:()=>({title:"Worker One"})},e)}}catch(l){console.error(l),h.setSpanError(l)}h.endSpan()}},t={};function o(r){var e=t[r];if(void 0!==e)return e.exports;var a=t[r]={exports:{}};return n[r](a,a.exports,o),a.exports}o.m=n,o.x=()=>{var r=o.O(void 0,[390],(()=>o(1325)));return r=o.O(r)},r=[],o.O=(e,n,t,a)=>{if(!n){var i=1/0;for(f=0;f<r.length;f++){for(var[n,t,a]=r[f],c=!0,u=0;u<n.length;u++)(!1&a||i>=a)&&Object.keys(o.O).every((r=>o.O[r](n[u])))?n.splice(u--,1):(c=!1,a<i&&(i=a));if(c){r.splice(f--,1);var s=t();void 0!==s&&(e=s)}}return e}a=a||0;for(var f=r.length;f>0&&r[f-1][2]>a;f--)r[f]=r[f-1];r[f]=[n,t,a]},o.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return o.d(e,{a:e}),e},o.d=(r,e)=>{for(var n in e)o.o(e,n)&&!o.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},o.f={},o.e=r=>Promise.all(Object.keys(o.f).reduce(((e,n)=>(o.f[n](r,e),e)),[])),o.u=r=>r+".07623b40a3aaa585.js",o.miniCssF=r=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),o.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r;o.g.importScripts&&(r=o.g.location+"");var e=o.g.document;if(!r&&e&&(e.currentScript&&(r=e.currentScript.src),!r)){var n=e.getElementsByTagName("script");if(n.length)for(var t=n.length-1;t>-1&&!r;)r=n[t--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=r})(),(()=>{var r={325:1};o.f.i=(e,n)=>{r[e]||importScripts(o.p+o.u(e))};var e=self.webpackChunk=self.webpackChunk||[],n=e.push.bind(e);e.push=e=>{var[t,a,i]=e;for(var c in a)o.o(a,c)&&(o.m[c]=a[c]);for(i&&i(o);t.length;)r[t.pop()]=1;n(e)}})(),e=o.x,o.x=()=>o.e(390).then(e);o.x()})();