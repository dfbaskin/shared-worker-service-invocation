(()=>{"use strict";var r,e,t={325:(r,e,t)=>{var a=t(893),n=t(810),o=t(515),c=t(530),i=t(479);function s(){return f((0,o.Tc)("b-service"))}async function f(r){const e=(0,i.bJ)();return await r.setMetaData(e.getSpanMetaData()),r}var p=t(440);var u=t(758);(0,i.XD)({serviceName:"shared-worker-one"});const m=(0,i.kQ)("initialize");try{const r=globalThis,{getMetaData:e,setMetaData:t}=(0,p.d)(),m=function(r){function e(){return{value:"A-service",timestamp:(new Date).toISOString(),workerId:(0,a.r)()}}function t(e,t){const a=(0,i.kQ)(`A-${e}`,{spanMetaData:r()}),n=a.withSpan(t);return a.endSpan(),n}async function c(e,t){const a=(0,i.kQ)(`A-${e}`,{spanMetaData:r()}),n=await a.withSpan(t);return a.endSpan(),n}return{doSomething:()=>t("doSomething",(()=>(0,n.A)(Object.assign({},e())))),chainForward:async()=>c("chainForward",(async()=>{const r=await s();return await r.chainForward({a:e(),order:["a"]})})),chainBackward:async r=>t("chainBackward",(()=>Object.assign({},r,{a:e(),order:[...r.order,"a"]}))),transformFromB:async()=>c("transformFromB",(async()=>{const r=await s(),e=await r.doSomething();return(0,n.A)({fromB:e,message:"Transformed by Service A"})})),transformFromC:async()=>c("transformFromC",(async()=>{const r=await f((0,o.Tc)("c-service")),e=await r.doSomething();return(0,n.A)({fromC:e,message:"Transformed by Service A"})})),transformFromD:async()=>c("transformFromD",(async()=>{const r=await f((0,o.Tc)("d-service")),e=await r.doSomething();return(0,n.A)({fromD:e,message:"Transformed by Service A"})}))}}(e);r.onconnect=r=>{const[e]=r.ports;u.Jj({exposeServiceOnPort:(0,c.MP)({"a-service":m},{"a-service":t}),mapRemoteServiceOnPort:(0,c.Vw)(),workerInfo:()=>({title:"Worker One"})},e)}}catch(v){console.error(v),m.setSpanError(v)}m.endSpan()}},a={};function n(r){var e=a[r];if(void 0!==e)return e.exports;var o=a[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.m=t,n.x=()=>{var r=n.O(void 0,[526],(()=>n(325)));return r=n.O(r)},r=[],n.O=(e,t,a,o)=>{if(!t){var c=1/0;for(p=0;p<r.length;p++){for(var[t,a,o]=r[p],i=!0,s=0;s<t.length;s++)(!1&o||c>=o)&&Object.keys(n.O).every((r=>n.O[r](t[s])))?t.splice(s--,1):(i=!1,o<c&&(c=o));if(i){r.splice(p--,1);var f=a();void 0!==f&&(e=f)}}return e}o=o||0;for(var p=r.length;p>0&&r[p-1][2]>o;p--)r[p]=r[p-1];r[p]=[t,a,o]},n.d=(r,e)=>{for(var t in e)n.o(e,t)&&!n.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:e[t]})},n.f={},n.e=r=>Promise.all(Object.keys(n.f).reduce(((e,t)=>(n.f[t](r,e),e)),[])),n.u=r=>r+".19c7fda35cc18515.js",n.miniCssF=r=>{},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),n.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r;n.g.importScripts&&(r=n.g.location+"");var e=n.g.document;if(!r&&e&&(e.currentScript&&(r=e.currentScript.src),!r)){var t=e.getElementsByTagName("script");if(t.length)for(var a=t.length-1;a>-1&&!r;)r=t[a--].src}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=r})(),(()=>{var r={325:1};n.f.i=(e,t)=>{r[e]||importScripts(n.p+n.u(e))};var e=self.webpackChunk=self.webpackChunk||[],t=e.push.bind(e);e.push=e=>{var[a,o,c]=e;for(var i in o)n.o(o,i)&&(n.m[i]=o[i]);for(c&&c(n);a.length;)r[a.pop()]=1;t(e)}})(),e=n.x,n.x=()=>n.e(526).then(e);n.x()})();