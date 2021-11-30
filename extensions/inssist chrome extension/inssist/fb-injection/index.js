!function(){var t={createName:function(t,n){return`${t}|${JSON.stringify(n)}`},getName:n,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||n()===t)}};function n(){return window.self.name.split("|")[0]||null}async function e(){o()||await new Promise((t=>{document.addEventListener("readystatechange",(function n(){o()&&(document.removeEventListener("readystatechange",n),t())}))}))}function o(){return"interactive"===document.readyState||"complete"===document.readyState}var i=document.documentElement,s={},r={},a={},c={},l=1;c={nextValue:function(){return(l=(9301*l+49297)%233280)/233280},seed:function(t){l=t}};var d,u,p,h="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function f(){p=!1}function g(t){if(t){if(t!==d){if(t.length!==h.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. You submitted "+t.length+" characters: "+t);var n=t.split("").filter((function(t,n,e){return n!==e.lastIndexOf(t)}));if(n.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. These characters were not unique: "+n.join(", "));d=t,f()}}else d!==h&&(d=h,f())}function m(){return p||(p=function(){d||g(h);for(var t,n=d.split(""),e=[],o=c.nextValue();n.length>0;)o=c.nextValue(),t=Math.floor(o*n.length),e.push(n.splice(t,1)[0]);return e.join("")}())}a={get:function(){return d||h},characters:function(t){return g(t),d},seed:function(t){c.seed(t),u!==t&&(f(),u=t)},lookup:function(t){return m()[t]},shuffled:m};var _,b,y={},v={},w="object"==typeof window&&(window.crypto||window.msCrypto);b=w&&w.getRandomValues?function(t){return w.getRandomValues(new Uint8Array(t))}:function(t){for(var n=[],e=0;e<t;e++)n.push(Math.floor(256*Math.random()));return n},_=b;var P;P=function(t,n,e){for(var o=(2<<Math.log(n.length-1)/Math.LN2)-1,i=-~(1.6*o*e/n.length),s="";;)for(var r=t(i),a=i;a--;)if((s+=n[r[a]&o]||"").length===+e)return s},v=function(t){for(var n,e=0,o="";!n;)o+=P(_,a.get(),1),n=t<Math.pow(16,e+1),e++;return o};var T,S;y=function(t){var n="",e=Math.floor(.001*(Date.now()-1567752802062));return e===S?T++:(T=0,S=e),n+=v(7),n+=v(t),T>0&&(n+=v(T)),n+=v(e)};var E;E=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+a.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)};var x,C=!1;var O=(C||(C=!0,x={},x=0),x||0);function M(){return y(O)}var L=M;(r=M).generate=L;var I=function(t){return a.seed(t),r};r.seed=I;var k=function(t){return O=t,r};r.worker=k;var F=function(t){return void 0!==t&&a.characters(t),a.shuffled()};function A(t){return Array.isArray(t)?t:[t]}function D(t,n=document){t=A(t);for(const e of t){const t=n.querySelector(e);if(t)return t}return null}function R(t,n=document){t=A(t);for(const e of t){const t=n.querySelectorAll(e);if(t.length)return Array.from(t)}return[]}r.characters=F,r.isValid=E,s=r;var B={on:function(t,n){j();($[t]||($[t]=[])).push(n)},off:function(t,n){const e=$[t];if(!e)return;for(;;){const t=e.findIndex((t=>t===n));if(-1===t)break;e.splice(t,1)}},send:function(t,...n){let e;const o=n[n.length-1];"function"==typeof o?(e=o,n=n.slice(0,-1)):e=null;return new Promise((o=>{chrome.runtime.sendMessage({[N]:t,[H]:n},(t=>{chrome.runtime.lastError||t!==q&&(e&&e(t),o(t))}))}))}};const q="__chromeBus.EMPTY_RESPONSE",$={},N="__chromeBus.name",H="__chromeBus.args";function j(){const t=j;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,n,e)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],s=$[o]||[];return 0===s.length?(e(q),!0):((async()=>{const t=await Promise.all(s.map((t=>t(...i)))),n=t[t.length-1];e(n)})(),!!e)})))}var z={init:function(){B.on("iframe-bus",((t,...n)=>J(t,...n))),W("chrome-bus",((t,...n)=>B.send(t,...n)))},on:W,once:X,off:K,send:J,wait:async function(t){return await new Promise((n=>{X(t,n)}))}};const V="__iframeBus.name",U="__iframeBus.args",G="__iframeBus.callbackId",Y=parent!==window;function W(t,n){const e=Q(t),o=n["__iframeBus.handlers"]||(n["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===e){const e=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,s=await n(...e);i&&J(`${t}:response-${i}`,s)}},window.addEventListener("message",o[t])}function X(t,n){W(t,(function e(...o){return K(t,e),n(...o)}))}function K(t,n){const e=n["__iframeBus.handlers"]||(n["__iframeBus.handlers"]={});window.removeEventListener("message",e[t])}async function J(t,...n){let e;const o=n[n.length-1];"function"==typeof o?(e=o,n=n.slice(0,-1)):e=null;const i=t.includes(":response-"),r=Q(t),a=i?null:s.generate();if(Y?parent.postMessage({[V]:r,[U]:n,[G]:a},"*"):R("iframe").forEach((t=>{t.contentWindow.postMessage({[V]:r,[U]:n,[G]:a},"*")})),!i)return new Promise((n=>{const o=i=>{e&&e(i),K(`${t}:response-${a}`,o),n(i)};W(`${t}:response-${a}`,o)}))}function Q(t){return"iframe-bus."+t}function Z(...t){const n=function(t,...n){let e=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=A(n[e]).map((n=>t.split("###").join(n))).join(",\n");return e+=1,o})).join("\n")}(...t);document.head.insertAdjacentHTML("afterbegin",n)}var tt=Object.assign((function(t,n=!1){0===nt.length&&(et=new MutationObserver((t=>{for(const n of nt){if(et.disconnect(),n(t),!et)return;et.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),et.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));nt.push(t),n&&t()}),{off:function(t){const n=nt.indexOf(t);if(-1===n)return;nt.splice(n,1),0===nt.length&&(et.disconnect(),et=null)}});const nt=[];let et;var ot={getConfig:function n(){const e=n;if(!e.config){const n=t.getParams();e.config=n.fusionConfig}return e.config}};var it={initForIg:function(){st()},initForFcs:function(){st(),function(){const t=ot.getConfig().fcsSelectors;tt((function t(n){const o=D("body");if(!o)return;tt.off(t);new MutationObserver(e).observe(o,{childList:!0,subtree:!0}),e(n)}));let n=!1;function e(e){if(n)return;const o=e.map((t=>Array.from(t.addedNodes))).flat();if(0===o.length)return;const i=window.inssist.theme.emojiRegex,s=(D("body").innerText.match(i)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===s.length)return;const r=[],a=Array.from(new Set(s)),c=["input","textarea","[contenteditable]",t.sidePanel.postPreviewCaption].map((t=>R(t))).flat();o.forEach((t=>{let n;if(n=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!n)return;const e=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);for(;;){const t=e.nextNode();if(!t)break;const n=t.textContent;if(!a.some((t=>n.includes(t))))continue;if(c.some((n=>n.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(r.includes(o)||r.push(o))}})),requestAnimationFrame((()=>{n=!0,r.forEach((t=>{if(!document.body.contains(t))return;let n=t.innerHTML;a.forEach((t=>{const e=`<span class="emoji">${t}</span>`;n=n.split(e).join("__$%#^__").split(t).join(e).split("__$%#^__").join(e)})),t.innerHTML=n})),n=!1}))}}()}};function st(){Z`
    <style>
      .theme-night .emoji {
        filter: url(#theme-reverse-filter);
      }

      .theme-night input,
      .theme-night textarea,
      .theme-night [contenteditable] {
        filter: url(#theme-filter);
        color: #a0a0a0 !important;
        background: transparent !important;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .theme-night input::placeholder,
      .theme-night textarea::placeholder {
        color: rgba(255, 255, 255, 0.33);
      }
    </style>
  `}var rt={initForIg:function(){at(),it.initForIg()},initForFcs:function(){at(),it.initForFcs()}};function at(){!async function(){ct(await z.send("theme.get-theme"))}(),async function(){z.on("theme.switch-theme",(t=>{ct(t)}))}()}function ct(t){t&&(i.classList.remove("theme-day"),i.classList.remove("theme-night"),i.classList.add("theme-"+t))}var lt={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]};function dt(){const t=[];return Object.assign(n,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");n(t)},clear:function(){t.length=0},off:function(n){const e=t.indexOf(n);-1!==e&&t.splice(e,1)},isEmpty:function(){return 0===t.length}});function n(...n){"function"==typeof n[0]?t.push(n[0]):t.forEach((t=>t(...n)))}}const ut=dt();var pt={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(n,e){const o=this;e=ht(e);let i=0;const s={},r=new URL(e);Array.from(r.searchParams).forEach((([t,n])=>{s[t]=n}));const a=dt();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&a(o)})),ut({url:e,query:s,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),e=ht(t)},onResponse:a}),t.call(o,n,e)}},onRequest:ut.handle};function ht(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}async function ft(t,n=null){let e,o;return"number"==typeof n?(e=n,o=100):n?(e=n.timeout||3e4,o=n.frequency||100):(e=3e4,o=100),new Promise(((n,i)=>{const s=t();if(s)return void n(s);const r=setInterval((()=>{const e=t();e&&(clearInterval(r),n(e))}),o);setTimeout((()=>{clearInterval(r),n(null)}),e)}))}function gt(){let t;const n=new Promise((n=>{t=n}));return Object.defineProperty(n,"resolve",{get:()=>t}),n}var mt={createError:function({message:t,details:n={}}){return{message:t,details:n,[_t]:!0}},throwError:function({message:t,details:n={}}){throw bt({message:t,details:n,critical:!0}),new Error(t)},sendError:bt,isKnownError:function(t){return t&&t[_t]},getLightweightPageHtml:yt};const _t=Symbol("isScheduleInjectionError");async function bt({message:t,details:n={},critical:e=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=!!D(ot.getConfig().fcsSelectors.general.pandaErrorImage);z.send("schedule.fcs-error",{message:"schedule injection → "+t,critical:e,details:{...n,isNetworkOk:o,isPandaError:i,html:yt()}})}function yt(){const t=D("body > div"),n=document.createElement("div");return n.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),R('[role="cell"]:nth-child(n + 4)',n).forEach((t=>t.remove())),n.innerHTML}var vt='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>",""),wt={init:function(){z.on("schedule.fcs-get-report",Tt)},set:function(t,n){Pt[t]=n},log:function(t){Pt.log.push(t);const n="string"==typeof t?t:JSON.stringify(t);console.log("%cschedule injection startup %c"+n,"color: #b99610","color: #b99610; font-weight: bold;")}};const Pt={log:[]};function Tt(){return{...Pt,html:mt.getLightweightPageHtml()}}var St={init:async function(){wt.log("start"),Et=ot.getConfig().fcsSelectors;try{await async function(){wt.log("fallback enabled?");const t=await z.send("schedule.is-fallback-enabled");if(wt.log(t?"yes":"no"),!t)return;throw Z`
    <style>
      ${vt}
    </style>
  `,Ct}(),await async function(){var t;await e();const n=document.documentElement.innerHTML;if(!n.toLowerCase().includes("bizsitepage"))return wt.log("is user connected?"),wt.log("no (not logged in)"),void(lt.user=null);wt.log("waiting for ig profiles data...");const o=n.split("<body")[1].split("requireLazy")[0];wt.log(o);const i=setTimeout((()=>{wt.log("actions before init"),wt.log(window.inssist.schedule.actionsBeforeInit)}),5e3),s=window.inssist.schedule.waitForInit;await s(),clearTimeout(i);const r=window.inssist.schedule.requireModule,a=await r("MediaManagerInstagramProfilesDataStore",3e4);if(!a){let t;const n=mt.getLightweightPageHtml();throw t=n.includes("/checkpoint/")?"account locked":n.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===n?"empty html":n.includes('role="progressbar"')?"spinner":"unknown",mt.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}wt.log("ig profiles data received"),wt.log("is user connected?");if(!await ft((()=>{const t=a.getState().toJS();return t[0]&&"LOADING"!==t[0].operation})))throw mt.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let c=null;const l=a.getState().toJS(),d=(null==l||null===(t=l[0])||void 0===t?void 0:t.value)||[];if(d.length>0){const t=await z.send("schedule.get-ig-username");c=d.find((n=>n.username===t))||null}lt.user=c,wt.log(c?"yes":"no")}(),function(){const t=()=>{const t=D(Et.welcome.getStartedButton);t&&(t.click(),location.reload())};tt(t),setTimeout((()=>{tt.off(t)}),3e4)}();const t=!!lt.user;await z.send("schedule.fcs-connection-status",t)}catch(t){t===Ct||(mt.isKnownError(t)?mt.sendError({message:t.message,details:t.details,critical:!0}):mt.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}wt.log("end"),xt.resolve()},waitForInit:async function(){return xt}};let Et;const xt=gt(),Ct=new Error("fallback enabled");let Ot;var Mt=Ot={init:async function(){const t=ot.getConfig().fcs;if(await St.waitForInit(),!lt.user)return;try{const n=await It(t.MediaManagerDispatcher),e=await It(t.MediaManagerInstagramVideoComposerDispatcher);Object.assign(Ot.main,n),Object.assign(Ot.composer,e)}catch(t){mt.isKnownError(t)?mt.sendError({message:t.message,details:t.details,critical:!0}):mt.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}Lt.resolve()},waitForInit:async function(){return Lt},main:{},composer:{}};const Lt=gt();async function It(t){const n=await ft((()=>window.require));if(!n)throw mt.createError({message:"initDispatcher: failed to get window.require"});const e=await ft((()=>n(t)));if(!e)throw mt.createError({message:"initDispatcher: failed to require "+t});const o=[],i=e.dispatch;return e.dispatch=(...t)=>{if(t[0])for(const n of o)n(t[0]);return i.call(e,...t)},{dispatch:e.dispatch,onDispatch:t=>{o.push(t)}}}async function kt(t,...n){return new Promise((e=>{t(...n,e)}))}var Ft=Object.assign((function(t,n={}){document.addEventListener("click",t,n)}),{off:function(t,n={}){document.removeEventListener("click",t,n)}});function At(t,n){let e;e="function"==typeof n?t.findIndex(n):t.indexOf(n),-1!==e&&t.splice(e,1)}var Dt='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),Rt={init:async function(){Bt=ot.getConfig().fcs,await Mt.waitForInit(),Mt.composer.onDispatch((async t=>{if(!t||t.type!==Bt.UPDATE_CAPTION)return;if(!lt.selectedPostId)return;const n=window.inssist.schedule.requireModule,e=(await n(Bt.MediaManagerInstagramComposerMetaDataStore)).getState().captionEditorState;e&&(qt[lt.selectedPostId]=e)}))},restoreCaptionForCurrentPost:async function(){if(!lt.selectedPostId)return;const t=window.inssist.schedule.requireModule,n=await t(Bt.MediaManagerInstagramComposerMetaDataActions),e=qt[lt.selectedPostId];if(!e)return;n.updateCaption(e)}};let Bt;const qt={};var $t={init:async function(){if(Nt=ot.getConfig().fcsSelectors,Ht=ot.getConfig().fcs,Xt(),Kt(),z.on("schedule.fcs-go-to",jt),z.on("schedule.fcs-open-post",zt),z.on("schedule.fcs-open-new-post-form",Vt),z.on("schedule.fcs-refresh-data",Wt),z.on("schedule.fcs-refresh-page",Ut),z.on("schedule.fcs-check-critical-vars",Gt),await St.waitForInit(),await Mt.waitForInit(),!lt.user)return;Z`
    <style>
      ${Dt}

      ${Nt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${Nt.sidePanel.save} {
        max-width: none;
      }

      ${Nt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${Nt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }
    </style>
  `,Z`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,Z`
    <style>
      /* dark background on panels */
      .theme-night #creator_studio_sliding_tray_root ._6lsf,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {
        background-color: #d4d5d9 !important;
      }
      /* extra padding for the side panel content */
      .theme-night #creator_studio_sliding_tray_root ._6lsf {
        padding-top: 10px !important;
      }
      /* dark background on input and textarea elements */
      .theme-night ._8525 ._7-2a,
      .theme-night ._36g4 {
        background-color: #f2f3f5 !important;
      }
      /* white color on buttons */
      .theme-night div.uiOverlayFooter a[action='cancel'],
      .theme-night div.uiOverlayFooter button[action='confirm'],
      .theme-night #creator_studio_sliding_tray_root button[type="button"] {
        color: black !important;
      }
      /* white color on schedule dropdown button and carousel paginators */
      .theme-night div._8122 > button > div > i,
      .theme-night div._80qf[role="button"] > i,
      .theme-night div._80qi[role="button"] > i,
      .theme-night a._50z2[role="button"],
      .theme-night a._50z1[role="button"] {
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      /* modal window background */
      .theme-night .ModalLayout {
        filter: url(#theme-reverse-filter);
        background: #000;
      }


      .theme-night ${Nt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${Nt.sidePanel.postPreviewCaption},
      .theme-night ${Nt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${Nt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${Nt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${Nt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,Z`
    <style>
      ${Nt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,Ft((t=>{if(!t.target.closest(Nt.sidePanel.locationRoot))return;const n=D(Nt.sidePanel.locationInput);n?n.focus():mt.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),Z`
    <style>
      ${Nt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${Nt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${Nt.sidePanel.doneButton} {
        display: none;
      }

      ${Nt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,tt((()=>{R(Nt.confirmDialog.yes).forEach((t=>{t.click()}))})),tt((()=>{R(Nt.tooltip.bubble).forEach((t=>{const n=t.closest(Nt.tooltip.root);if(!n)return;const e=t.closest(Nt.tooltip.bubbleWrap);if(!e)return;const o=D("#"+n.dataset.ownerid);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&e.classList.contains("uiContextualLayerLeft")){e.classList.remove("uiContextualLayerLeft"),e.classList.add("uiContextualLayerRight"),e.style.left=0,e.style.right=null,n.style.left=i.left+i.width+"px",n.style.right=null;const o=t.offsetWidth,s=t.offsetHeight;if(o>s)return;t.style.width=Math.round(.75*s)+"px"}}))})),async function(){const t=window.inssist.schedule.requireModule,n=await t(Ht.MediaManagerDispatcher),e=n.dispatch;n.dispatch=(...t)=>{const o=t[0];if(o.type!==Ht.CLOSE_COMPOSER||o.fromInssist)return e.call(n,...t)}}(),pt.onRequest((({xhr:t,url:n,query:e,modifyUrl:o})=>{if(!n.includes(Ht["/media_manager/content_library"])&&!n.includes(Ht["/media_manager/media_manager_instagram_content"]))return;const i=new URL(n),s=e[Ht.post_type];s===Ht.POST_TYPE_IGTV?(i.searchParams.set(Ht.post_status,Ht.POST_STATUS_DRAFT),i.searchParams.set(Ht.limit,1),o(i.toString())):s===Ht.POST_TYPE_VIDEOS?(i.searchParams.set(Ht.post_type,Ht.POST_TYPE_ALL),i.searchParams.set(Ht.post_status,Ht.POST_STATUS_PUBLISHED),i.searchParams.set(Ht.limit,100),o(i.toString())):s===Ht.POST_TYPE_PHOTOS?(i.searchParams.set(Ht.post_type,Ht.POST_TYPE_ALL),i.searchParams.set(Ht.post_status,Ht.POST_STATUS_SCHEDULED),i.searchParams.set(Ht.limit,500),o(i.toString())):s===Ht.POST_TYPE_CAROUSELS&&(i.searchParams.set(Ht.post_type,Ht.POST_TYPE_ALL),i.searchParams.set(Ht.post_status,Ht.POST_STATUS_DRAFT),i.searchParams.set(Ht.limit,500),o(i.toString()))})),await async function(t){const n=window.inssist.schedule.requireModule,e=await n(Ht.immutable);Mt.main.dispatch({type:Ht.SELECT_IG_PROFILES,[Ht.selectedProfileIDs]:e.List([t.id])})}(lt.user),Jt(),Mt.composer.onDispatch((t=>{t.type===Ht.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(lt.crosspostToFb=t.value)})),Mt.main.onDispatch((t=>{t.type===Ht.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Ht.rowsByIDs]).forEach((t=>{At(lt.allPosts,(n=>n.id===t.id)),lt.allPosts.push(t)}))})),Mt.main.onDispatch((t=>{if(t.type!==Ht.PUSH_NOTIFICATION)return;if(!(Ht.isSuccess in t[Ht.notificationData]))return;if(t[Ht.notificationData][Ht.isSuccess])return;const n=t[Ht.notificationData][Ht.notificationDataLabel].toString();z.send("schedule.fcs-notification-error-appeared",n)})),function(){const t=Symbol("handled");tt((()=>{const n=D(Nt.sidePanel.editPostBottomRow);n&&(n[t]||lt.selectedPostId&&(n[t]=!0,n.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),Ft((t=>{t.target.closest(".delete-post-button")&&z.send("schedule.delete-post",lt.selectedPostId)})),Z`
    <style>
      .delete-post-button {
        height: 36px;
        line-height: 34px;
        font-size: 16px;
        color: #E34E21;
        background: #F5F5F5;
        font-weight: 600;
        padding: 0 22px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #EFEFEF;
        transition: filter 0.3s;
        white-space: nowrap;
      }
      .delete-post-button:hover {
        filter: brightness(95%);
      }
      .delete-post-button:active {
        filter: brightness(90%);
      }

      /* show uploading progress near delete post button */
      .delete-post-button + *:not(:last-child) {
        margin-right: auto;
        margin-left: 24px;
      }

      .delete-post-button__icon {
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    </style>
  `}(),Wt()}};let Nt,Ht;function jt(t){location.href=t}async function zt(t){const n=window.inssist.schedule.requireModule,e=await n(Ht.queryIGMediaData),o=await n(Ht.MediaManagerInstagramContentActions);await Yt(),lt.selectedPostId=t;const i=await kt(e,t);"POSTED"===i.postStatus?(o.setShouldShowPostDetailTray(!0,i),Rt.restoreCaptionForCurrentPost()):(await Jt(),o.editPost(i),Rt.restoreCaptionForCurrentPost())}async function Vt({postMode:t="publish",localPostId:n=null,localPostFiles:e=[]}){const o=Vt;lt.crosspostToFb=!1,lt.selectedPostId=n||null,await Yt();const i=window.inssist.schedule.requireModule;await Jt();(await i(Ht.MediaManagerInstagramComposerRootActions)).openComposer(),Mt.main.dispatch({type:Ht.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:lt.user}),Mt.composer.dispatch({type:Ht.SWITCH_POST_MODE,[Ht.isEditComposer]:!1,[Ht.postMode]:t}),Rt.restoreCaptionForCurrentPost(),0!==e.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{Mt.composer.dispatch({type:Ht.FILES_ADDED,[Ht.files]:e})}),200))}function Ut(){location.reload()}async function Gt(){return!!window.require}async function Yt(){const t=window.inssist.schedule.requireModule;(await t(Ht.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),Mt.composer.dispatch({type:Ht.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),Mt.composer.dispatch({type:Ht.CLOSE_COMPOSER,fromInssist:!0})}function Wt(){const t=Wt,n=Mt.main;t.init||(t.init=!0,t.lastPostCount=0,n.onDispatch((e=>{if(t.refreshing&&e.type===Ht.SET_CONTENT_LIBRARY_DATA){const o=e.queryParameters.toJS().postType;if(!(o===Ht.POST_TYPE_VIDEOS||o===Ht.POST_TYPE_PHOTOS||o===Ht.POST_TYPE_CAROUSELS||o===Ht.POST_TYPE_IGTV))return;if(o===Ht.POST_TYPE_IGTV)return void n.dispatch({type:Ht.SELECT_CONTENT_TABLE,contentTable:Ht.INSTAGRAM_VIDEO_POSTS,source:Ht.instagram_content_library_posts});o===Ht.POST_TYPE_VIDEOS&&n.dispatch({type:Ht.SELECT_CONTENT_TABLE,contentTable:Ht.INSTAGRAM_PHOTO_POSTS,source:Ht.instagram_content_library_posts}),o===Ht.POST_TYPE_PHOTOS&&n.dispatch({type:Ht.SELECT_CONTENT_TABLE,contentTable:Ht.INSTAGRAM_CAROUSEL_POSTS,source:Ht.instagram_content_library_posts});const i=e.data.data.toJS();for(const t of i)At(lt.allPosts,(n=>n.id===t.id)),lt.allPosts.push(t);if(o===Ht.POST_TYPE_CAROUSELS){if(t.lastPostCount-lt.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void Wt();t.lastPostCount=lt.allPosts.length,z.send("schedule.apply-fcs-posts",lt.allPosts),t.refreshing=!1}}}))),t.refreshing||(lt.allPosts.length=[],t.refreshing=!0,n.dispatch({type:Ht.SELECT_CONTENT_TABLE,contentTable:Ht.INSTAGRAM_IGTV_POSTS,source:Ht.instagram_content_library_posts}),n.dispatch({type:Ht.REFRESH_TAB,tab:Ht.instagram_content_posts}))}function Xt(){tt((()=>{R("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function Kt(){history.pushState=history.replaceState}async function Jt(){const t=window.inssist.schedule.requireModule,n=await t(Ht.MediaManagerLazyLoadActions);await kt(n.lazyLoadSection,Ht.INSTAGRAM_COMPOSER)}var Qt={init:async function(){if(await St.waitForInit(),await Mt.waitForInit(),!lt.user)return;Zt=ot.getConfig().fcsSelectors,tn=ot.getConfig().fcs,Ft((t=>{t.target.closest(Zt.upload.root)&&(t.target.closest("input")||t.target.closest("button")||nn(D(Zt.upload.button)))})),Z`
    <style>
      ${Zt.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${Zt.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");tt((()=>{const n=D(Zt.upload.addContentButton);if(!n)return;const e=D(Zt.sidePanel.mediaList);if(!e)return;const o=D(".add-media");o&&(o.style.display=e.childElementCount<10?null:"none"),e[t]||0!==e.childElementCount&&(e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),D(".add-media").addEventListener("click",(()=>{nn(n)})))})),Z`
    <style>
      ${Zt.upload.addContentButtonWrap} {
        visibility: hidden;
        position: fixed;
        left: -10000px;
      }

      .add-media {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #FFF;
        background: #A5AAAF;
        margin-top: 12px;
        margin-left: 0 !important;
        margin-right: 16px !important;
        float: left;
      }

      .add-media__icon {
        font-size: 25px;
        margin-right: 8px;
      }
    </style>
  `}(),Z`
    <style>
      ${Zt.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,tt((()=>{R(Zt.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),Z`
    <style>
      ${Zt.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${Zt.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");tt((()=>{R(Zt.sidePanel.mediaPreviewVideo).forEach((n=>{n[t]||(n[t]=!0,n.setAttribute("disablePictureInPicture",""),n.setAttribute("controlslist","nodownload"))}))})),Z`
    <style>
      ${Zt.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");tt((()=>{const n=D(".add-media");if(!n)return;const e=D(Zt.sidePanel.mediaList);if(!e)return;const o=D(".reverse-media-list-button");if(o&&(o.style.display=e.childElementCount>1?null:"none"),n[t])return;n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');D(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,n=(await t(tn.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),e=Object.keys(n);if(e.length<2)return;e.forEach(((t,n)=>{Mt.composer.dispatch({type:tn.SUBMIT_MEDIA_ORDER,[tn.mediaOrderId]:t,[tn.prevIndex]:0,[tn.newIndexString]:String(e.length-n),[tn.totalMedia]:e.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),Z`
    <style>
      #creator_studio_sliding_tray_root button[type="button"].reverse-media-list-button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #1BA2F9 !important;
        background: #F5F5F5 !important;
        border: 1px solid #EFEFEF !important;
        margin-top: 12px;
        margin-left: 0;
        float: left;
      }

      .reverse-media-list-button__icon {
        position: relative;
        top: 3px;
        font-size: 17px;
        margin-right: 8px;
      }
    </style>
  `}(),async function(){const t=window.inssist.schedule.requireModule,n=await t(tn.ImageExifRotation);if(!n)return;n.getRotation=(t,n)=>(n&&"function"==typeof n&&n(0),0)}()}};let Zt,tn;function nn(t){t||mt.throwError({message:"startUpload: failed to find upload button"}),t.click();const n=D(Zt.upload.input);n||mt.throwError({message:"startUpload: failed to find upload input"});const e=n.closest(Zt.tooltip.root);e||mt.throwError({message:"startUpload: failed to find upload tooltip"}),e.style.opacity=0,e.style.pointerEvents="none",n.click()}var en={init:async function(){if(on=ot.getConfig().fcsSelectors,sn=ot.getConfig().fcs,await St.waitForInit(),await Mt.waitForInit(),!lt.user)return;(function(){let t,n;tt((()=>{t=R(on.sidePanel.mediaPreview),n=D(on.sidePanel.mediaPreviewVideo)})),pt.onRequest((({url:e,onResponse:o})=>{if(!function(t){return t.includes(sn["/media/manager/instagram_composer/create_post"])}(e))return;let i,s;i=t.length>1?"carousel":n?"video":"photo",t.length?s=t[0].getAttribute("src"):console.error("failed to find media preview image"),z.send("schedule.fcs-create-post-request",{type:i,image:s,crosspostToFb:lt.crosspostToFb,localPostId:lt.selectedPostId||null}),o((()=>{z.send("schedule.fcs-create-post-response",{image:s})}))})),pt.onRequest((({url:t,query:n,onResponse:e})=>{if(!function(t){return t.includes(sn["/media/manager/instagram_media/edit/save"])}(t))return;const o=lt.selectedPostId;let i,s;"true"===n[sn["edit_data[save_as_draft]"]]?(i=null,s="draft"):"true"===n[sn["edit_data[save_as_scheduled]"]]?(i=rn,s="scheduled"):(i=null,s="posted"),z.send("schedule.fcs-edit-post-request",{postId:o,status:s,on:i}),e((t=>{z.send("schedule.fcs-edit-post-response",{postId:o})}))}))})(),function(){const t=10;Z`
    <style>
      ${on.dateDialog.root} {
        position: fixed;
        left: 10000px;
      }
    </style>
  `;let n=!1;tt((()=>{const t=D(on.dateDialog.rootOpen);(!n&&t||n&&!t)&&(n=!n,z.send("schedule.fcs-date-dialog-toggled",n))}));const e=Symbol("handled");tt((()=>{const n=D(on.sidePanel.save);n&&(n[e]||n.nextElementSibling&&(n[e]=!0,n.addEventListener("click",(n=>{const e=Date.now()+6e4*t;"schedule"===an&&(!rn||rn<e)&&(n.preventDefault(),n.stopPropagation(),z.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await z.send("schedule.has-pro"),n=Symbol("handled");tt((()=>{const e=D(on.sidePanel.save);if(!e)return;if(e[n])return;e[n]=!0;let o=!0;e.addEventListener("click",(n=>{o?(n.preventDefault(),n.stopPropagation(),(async()=>{if(await t())return o=!1,void e.click();const n=D(on.sidePanel.dateDialogTrigger);n&&n.click(),z.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),z.on("schedule.fcs-date-dialog-get-timezone",cn),z.on("schedule.fcs-date-dialog-select-option",ln),z.on("schedule.fcs-date-dialog-set-selected-option",dn),z.on("schedule.fcs-date-dialog-set-publish-time",un)}};let on,sn,rn=null,an=null;function cn(){const t=window.require(sn.DateTime).localNow().getTimezoneID();return window.require(sn.TimezoneNamesData).zoneNames[t]}function ln(t){const n={"publish-now":sn.postModePublish,"save-as-draft":sn.postModeDraft,schedule:sn.postModeSchedule}[t],e={type:sn.SWITCH_POST_MODE,[sn.postMode]:n};Mt.composer.dispatch({...e,[sn.isEditComposer]:!1}),Mt.composer.dispatch({...e,[sn.isEditComposer]:!0})}function dn(t){an=t}function un(t){if(rn=t,!rn)return;const n={type:sn.SELECT_SCHEDULED_DATE,[sn.scheduledDate]:new Date(rn)};Mt.composer.dispatch({...n,[sn.isEditComposer]:!1}),Mt.composer.dispatch({...n,[sn.isEditComposer]:!0})}var pn={init:async function(){if(await St.waitForInit(),!lt.user)return;if(lt.user.connectedPageInfo)return;hn=ot.getConfig().fcsSelectors,function(){const t=Symbol("handled");tt((async()=>{const n=D(hn.sidePanel.sidebar);if(!n)return;if(n[t])return;n[t]=!0;const e=D(hn.sidePanel.body);if(!e)return;i.classList.remove("crossposting--tab-open"),i.classList.remove("crossposting--connecting");if(!await z.send("schedule.is-creating-post"))return;n.insertAdjacentHTML("beforeend",'\n      <div class="crossposting-tab">\n        <div class="crossposting-tab__header">\n          <svg class="crossposting-tab__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\n            <path d="M500 10C230.5 10 10 230.5 10 500s220.5 490 490 490V622.5H377.5V500H500v-91.9c0-85.8 67.4-153.1 153.1-153.1h153.1v122.5H653.1c-18.4 0-30.6 12.3-30.6 30.6V500h168.4l-30.6 122.5H622.5v352.2C833.8 919.6 990 729.7 990 500c0-269.5-220.5-490-490-490z" fill="currentColor"/>\n          </svg>\n          <div class="crossposting-tab__title">\n            Setup FB Crossposting\n          </div>\n        </div>\n        <div class="crossposting-tab__decription">\n          Crosspost the same content to Instagram and\n          a Facebook page by connecting Instagram to FB.\n        </div>\n      </div>\n    '),e.insertAdjacentHTML("afterbegin",'\n      <div class="crossposting-body">\n        <div class="crossposting-body__title">\n          Setup FB Crossposting\n        </div>\n        <div class="crossposting-body__instruction">\n          To enable cross-posting, connect your Instagram account to a Facebook page:\n          <ol class="crossposting-body__list">\n            <li class="crossposting-body__list-item">\n              Login to <a href="https://facebook.com" target="_blank">Facebook.com</a>\n              in Browser\n            </li>\n            <li class="crossposting-body__list-item">\n              Connect Instagram account to the Facebook page. You can do that with Instagram Mobile App:\n              <div class="crossposting-body__path">\n                Settings → Business / Creator → Connect a Facebook Page\n              </div>\n              Or from <a href="https://facebook.com" target="_blank">Facebook website</a>\n              by navigating to your Facebook page settings:\n              <div class="crossposting-body__path">\n                Page Settings → Instagram → Connect\n              </div>\n            </li>\n            <li class="crossposting-body__list-item">\n              Click “Verify Connection” below.\n            </li>\n          </ol>\n        </div>\n        <div class="crossposting-body__footer">\n          <button class="crossposting-body__button">\n            VERIFY CONNECTION\n          </button>\n          <svg class="crossposting-body__spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">\n            <path d="M10 0a10.363 10.363 0 011.635.133A10.009 10.009 0 1110 0z" fill="#d8dadd"/>\n            <path d="M9.801 10.2V0a10.493 10.493 0 012.545.312 10.352 10.352 0 012.314.888 10.373 10.373 0 013.623 3.178L9.801 10.2z" fill="#1ba2f9"/>\n            <circle cx="8" cy="8" r="8" transform="translate(2 2)" fill="#fff"/>\n          </svg>\n        </div>\n      </div>\n    ');D(".crossposting-tab").addEventListener("click",(()=>{i.classList.add("crossposting--tab-open")}));D(".crossposting-body__button").addEventListener("click",(async()=>{i.classList.add("crossposting--connecting"),await z.send("chrome-bus","schedule.connect-to-fcs-with-crossposting"),i.classList.remove("crossposting--connecting")}))})),document.addEventListener("click",(t=>{t.target.closest(hn.sidePanel.sidebarTab)&&i.classList.remove("crossposting--tab-open")})),Z`
    <style>
      ${hn.sidePanel.body} {
        position: relative;
      }

      html.crossposting--tab-open ${hn.sidePanel.bodyContent} {
        display: none;
      }

      .crossposting-tab {
        padding: 12px 16px 20px 16px;
        border-left: 2px solid transparent;
        line-height: 17px;
        cursor: pointer;
        user-select: none;
      }
      .crossposting-tab:hover {
        background: #f5f6f7;
        border-left-color: #bec3c9;
      }
      .crossposting--tab-open .crossposting-tab {
        border-left-color: #3578e5;
        background: #fff;
      }

      .crossposting-tab__header {
        display: flex;
        align-items: center;
      }

      .crossposting-tab__icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        color: rgba(0, 0, 0, 0.45);
        margin-right: 8px;
        position: relative;
        top: -2px;
      }
      .crossposting--tab-open .crossposting-tab__icon {
        color: #1461cc;
      }

      .crossposting-tab__title {
        color: rgba(0, 0, 0, 0.45);
        font-weight: 700;
        font-size: 14px;
      }
      .crossposting--tab-open .crossposting-tab__title {
        color: #1461cc;
      }

      .crossposting-tab__decription {
        margin-top: 4px;
        color: rgba(0, 0, 0, 0.55);
        font-size: 14px;
        line-height: 20px;
      }

      .crossposting-body {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff !important;
        padding: 0 24px;
      }
      html:not(.crossposting--tab-open) .crossposting-body {
        display: none;
      }

      .crossposting-body__title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 20px;
      }

      .crossposting-body__instruction {
        margin-bottom: 24px;
        font-size: 14px;
        line-height: 20px;
      }

      .crossposting-body__instruction a {
        color: #1BA2F9 !important;
      }
      .theme-night .crossposting-body__instruction a {
        filter: url(#theme-reverse-filter);
      }

      .crossposting-body__list {
        padding-left: 23px;
        margin-top: 12px;
        margin-bottom: 0;
      }

      .crossposting-body__list-item {
        margin-bottom: 12px;
      }
      .crossposting-body__list-item:last-child {
        margin-bottom: 0;
      }

      .crossposting-body__path {
        margin: 5px 0 10px;
        font-size: 13px;
        font-weight: 500;
      }
      .crossposting-body__path:last-child {
        margin-bottom: 0;
      }

      .crossposting-body__footer {
        display: flex;
        align-items: center;
      }

      .crossposting-body__button {
        color: #fff;
        background: #1BA2F9;
        border: none;
        font-size: 16px;
        border-radius: 4px;
        padding: 8px 16px;
        font-weight: 500;
        cursor: pointer;
      }
      .crossposting--connecting .crossposting-body__button {
        opacity: 0.6;
        pointer-events: none;
      }
      .theme-night .crossposting-body__button {
        filter: url(#theme-reverse-filter);
      }

      .crossposting-body__spinner {
        margin-left: 16px;
        display: none;
        animation-name: -crossposting-body__spin;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .crossposting--connecting .crossposting-body__spinner {
        display: block;
      }
      .theme-night .crossposting-body__spinner {
        filter: url(#theme-reverse-filter);
      }
      .theme-night .crossposting-body__spinner path:first-child {
        fill: #000;
      }
      .theme-night .crossposting-body__spinner circle {
        fill: #303134;
      }

      @keyframes -crossposting-body__spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      html.crossposting--tab-open ${hn.sidePanel.sidebarTab}  {
        border-left-color: transparent !important;
        background: transparent !important;
      }
      html.crossposting--tab-open ${hn.sidePanel.sidebarTab}:hover {
        background: #f5f6f7 !important;
        border-left-color: #bec3c9 !important;
      }

      html.crossposting--tab-open ${hn.sidePanel.sidebarTabIcon} {
        filter: grayscale(1);
      }

      html.crossposting--tab-open ${hn.sidePanel.sidebarTabTitle} {
        color: rgba(0,0,0,0.45) !important;
      }
    </style>
  `}()}};let hn;var fn={init:async function(){if(await St.waitForInit(),await Mt.waitForInit(),!lt.user)return;gn=ot.getConfig().fcsSelectors,mn=ot.getConfig().fcs,Z`
    <style>
      ${gn.sidePanel.postToFbRoot} {
        display: none;
      }
    </style>
  `;const t=lt.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const n=Symbol("handled");tt((()=>{const t=D(gn.sidePanel.postToFbCheckboxRow);if(!t)return;const n=!!D(gn.sidePanel.mediaList);t.style.opacity=n?null:.5}),!0),tt((()=>{const e=D(gn.sidePanel.postToFbTitle);e&&!e[n]&&(e[n]=!0,e.innerText="Clone to Facebook");const o=D(gn.sidePanel.postToFbBody);o&&!o[n]&&(o[n]=!0,o.innerHTML=`\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="${t.url}/publishing_tools"\n            target="_blank">\n            Facebook Publishing Tools</a>.\n        </div>\n      `)}),!0),tt((()=>{const t=D(gn.sidePanel.postToFbCheckboxRow);if(!t)return;if(t[n])return;t[n]=!0;const e=D(gn.sidePanel.postToFbCheckboxButton);e&&t.addEventListener("click",(t=>{t.target.closest(gn.sidePanel.postToFbCheckboxButton)||e.click()}))})),Z`
    <style>
      ${gn.sidePanel.postToFbRoot} {
        display: block !important;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${gn.sidePanel.postToFbPublishTypeButton} {
        display: none;
      }

      ${gn.sidePanel.postToFbCheckboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${gn.sidePanel.postToFbCheckboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${gn.sidePanel.postToFbCheckboxButton} {
        border-color: #464646 !important;
      }

      ${gn.sidePanel.postToFbCheckboxText} {
        pointer-events: none;
      }

      ${gn.sidePanel.postToFbBody} {
        margin-top: 10px;
        margin-left: 0;
      }

      .post-to-fb__text {
        line-height: 19px;
        width: 380px;
      }

      .post-to-fb__link {
        color: #1BA2F9;
        text-decoration: none !important;
      }
    </style>
  `}(t),function(){let t,n;z.on("schedule.fcs-date-dialog-set-selected-option",(n=>{t=n,e()})),z.on("schedule.fcs-date-dialog-set-publish-time",(t=>{n=t,e()})),Mt.composer.onDispatch((t=>{t.type===mn.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&e()}));const e=()=>{"save-as-draft"===t?Mt.composer.dispatch({type:mn.SWITCH_CROSSPOST_POST_MODE,[mn.postMode]:mn.postModeDraft}):"publish-now"===t?Mt.composer.dispatch({type:mn.SWITCH_CROSSPOST_POST_MODE,[mn.postMode]:mn.postModePublish}):"schedule"===t&&(Mt.composer.dispatch({type:mn.SWITCH_CROSSPOST_POST_MODE,[mn.postMode]:mn.postModeSchedule}),n&&Mt.composer.dispatch({type:mn.SELECT_CROSSPOST_SCHEDULED_DATE,[mn.scheduledDate]:new Date(n)}))}}(),function(t){const n=Symbol("handled");tt((async()=>{const e=D(".delete-post-button");if(!e)return;if(e[n])return;e[n]=!0;const o=await z.send("schedule.get-post",lt.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?t.url+"/publishing_tools?section=DRAFTS":"scheduled"===o.status?t.url+"/publishing_tools?section=SCHEDULED_POSTS":t.url+"/publishing_tools",e.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),Z`
    <style>
      .manage-fb-posts-link {
        margin-left: 30px;
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        color: #1BA2F9;
        text-decoration: none !important;
        -webkit-font-smoothing: antialiased;
      }
    </style>
  `}(t))}};let gn,mn;function _n(t,n=null){try{const e=t();return e instanceof Promise?new Promise(((t,o)=>{e.then(t).catch((e=>{e&&console.error(e),t(n)}))})):e}catch(t){return console.error(t),n}}var bn={init:async function(){yn=ot.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...n){const e=n[1];return(null==e?void 0:e.includes("/media/manager/instagram_composer/video_upload/"))&&(vn.uploadRequestStarted=!0,vn.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{vn.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...n)}}(),function(){let t=null;tt((()=>{const n=D(yn.sidePanel.uploadProgress);if(n){if("99.9%"===n.innerText){if(t)return;t=setInterval((()=>{document.body.contains(n)?z.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:_n((()=>t("gkx")("1509806")),"failed"),asyncUpload:_n((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:_n((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:vn.uploadResponseTexts,uploadRequestStarted:vn.uploadRequestStarted}}()):(clearInterval(t),t=null,vn.uploadRequestStarted=!1)}),1e3)}if("100%"===n.innerText){if(!t)return;clearInterval(t),t=null,vn.uploadRequestStarted=!1,z.send("chrome-bus","schedule.upload-100")}}}))}()}};let yn;const vn={uploadResponseTexts:[],uploadRequestStarted:!1};var wn={init:async function(){const t=window.inssist.schedule.requireModule;if(Pn=await t("MediaManagerDispatcher"),Tn=await t("MediaManagerMediaCroppingActions"),Sn=await t("MediaManagerMediaCroppingRatioSettings"),En=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Pn&&Tn&&Sn&&En))return;(async function(){const t=Tn.openDialog;Tn.openDialog=(...n)=>{try{const t=n[4];t.push(Sn.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call(Tn,...n)}})(),function(){let t;const n=En.prototype.render;En.prototype.render=function(...e){return t=this,n.call(this,...e)};const e=Pn.dispatch;Pn.dispatch=n=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===n.type)try{const e=n.dimensions,o=e.width/e.height;if(o<.8){const n=Math.floor(e.width/.8);e.height=n,t.setState({height:n})}else if(o>1.91){const n=Math.floor(1.91*e.height);e.width=n,t.setState({width:n})}}catch(t){console.error("failed to automatically adjust ratio",t)}return e.call(Pn,n)}}()}};let Pn,Tn,Sn,En;var xn={init:async function(){window.ctx=lt,pt.init(),wt.init(),Mt.init(),St.init(),$t.init(),Qt.init(),en.init(),pn.init(),fn.init(),Rt.init(),bn.init(),wn.init()}};var Cn={init:function(){window.addEventListener("focus",On),window.addEventListener("blur",Mn)}};function On(){z.send("dnd-iframe-fix.focus")}function Mn(){z.send("dnd-iframe-fix.blur")}({init:async function(){t.isIframe("inssist-fcs")&&(await e(),rt.initForFcs(),Cn.init(),xn.init())}}).init()}();