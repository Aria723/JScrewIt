!function(){"use strict";function i(r,a){o.keys(a).forEach(function(e){var t=o.getOwnPropertyDescriptor(a,e);if("value"in t){var n=t.value;e in r&&"object"==typeof n?i(r[e],n):r[e]=n}else o.defineProperty(r,e,t)})}function r(n,r,a,o){return function(t){function e(e){t[o](e,r,a)}Array.isArray(n)?n.forEach(e):e(n)}}var a,o,u;function n(e){var t,n=typeof e;try{t="string"==n?'"'+e+'"':0===e&&1/e<0?"-0":Array.isArray(e)?e.length?"[…]":"[]":"bigint"==n?e+"n":"symbol"!=n?String(e):e.toString()}catch(e){}return t}function c(e){e.removeAttribute("tabindex")}function M(e){e.setAttribute("tabindex",0)}function O(e){function t(){u.className="button focusable",i("off")}function n(e){e.target!==u&&a()&&t()}function r(e){!e.relatedTarget&&a()&&t()}function a(){return/\bactive\b/.test(u.className)}function o(){return!u.hasAttribute("tabindex")}function i(e){var t=art[e];art(document,t("mousemove",n),t("mouseout",r))}var u=art("SPAN",{className:"button focusable",get disabled(){return o()},set disabled(e){(e=!!e)!==o()&&(e?(art(u,c),a()&&(document.releaseCapture(),i("off")),u.blur()):art(u,M),u.className="",u.className="button focusable")}},M,art.on("click",function(e){o()&&e.stopImmediatePropagation(),e.preventDefault()}),art.on("keydown",function(e){13===e.keyCode&&(u.click(),e.preventDefault())}),art.on("keyup",function(e){32===e.keyCode&&(u.click(),e.preventDefault())}),art.on("mouseup",function(e){0===e.button&&a()&&(document.releaseCapture(),t())}),art("SPAN",e),art("SPAN"));return u.setCapture&&(u.firstChild.setAttribute("unselectable","on"),art(u,art.on("mousedown",function(e){0!==e.button||o()||a()||(u.setCapture(),u.className="active button focusable",i("on"))}))),u}function C(e,t){function r(){var e=document.body;e.removeChild(u),art(e,art.off("keydown",o),art.off("focus",a,!0)),void 0!==t&&t()}function n(){i.focus()}function a(e){i.contains(e.target)||n()}function o(e){var t=e.keyCode;if(13===t||27===t){var n=document.activeElement;!n.contains(i)&&n.contains(e.target)||(r(),e.preventDefault())}}var i=art("DIV",{style:{borderRadius:"25px",display:"inline-block",maxWidth:"500px",width:"100%"}},M,art("DIV",{className:"focusable",id:"modalBox",style:{background:"whitesmoke",border:"10px solid blue",borderRadius:"23px",margin:"2px"}},art("DIV",{style:{margin:"1.5em 1.5em .25em",overflow:"hidden"}},e,art("DIV",{style:{margin:"1.25em 0"}},art(O("OK"),{style:{maxWidth:"5em",width:"100%"}},art.on("click",r)))))),u=art("DIV",{style:{background:"rgba(0, 0, 0, .25)",overflow:"auto",position:"fixed",textAlign:"center",left:"0",top:"0",bottom:"0",width:"100%"}},art("DIV",{style:{display:"table",tableLayout:"fixed",width:"100%",height:"100%"}},art("DIV",{style:{display:"table-cell",verticalAlign:"middle"}},i)));art(document.body,u,art.on("focus",a,!0),art.on("keydown",o)),setTimeout(n)}o=Object,(u=window.art=function(e){var t;t=e instanceof Node?e:"function"==typeof e?e.call(u):document.createElement(e);for(var n=arguments.length,r=0;++r<n;){var a=arguments[r];if(a instanceof Node)t.appendChild(a);else if(null!=a){var o=typeof a;"object"==o?i(t,a):"function"==o?a.call(u,t):t.appendChild(document.createTextNode(a))}}return t}).off=function(e,t,n){return r(e,t,n,"removeEventListener")},u.on=function(e,t,n){return r(e,t,n,"addEventListener")},u.css=function(e,t){var n;!function(e){if(!a){var t=u("STYLE");u(document.head,t),a=t.sheet}a.insertRule(e,a.cssRules.length)}((n=t,e+"{"+o.keys(n).map(function(e){return e+":"+n[e]}).join(";")+"}"))},self.formatValue=function(e){var t;if(Array.isArray(e))try{t="["+e.map(n).join(", ")+"]"}catch(e){}else t=n(e);return t},self.formatValueType=function(e){var t;if(null!==e){var n=typeof e;if("function"==n||"object"==n||"undefined"==n){var r=Object.getPrototypeOf(e);if(r===Array.prototype)switch(e.length){case 0:t="an empty array";break;case 1:t="a one element array";break;default:t="an array"}else t=r===Date.prototype?"a date":r===RegExp.prototype?"a regular expression":"function"==n?"a function":"an object"}}return t},art.css(".button",{background:"#e0e0e0",color:"#212121",cursor:"default",display:"inline-block",position:"relative"}),art.css(".button, .button>:last-child",{"border-radius":".1em"}),art.css(".button.active, .button[tabindex]:active",{background:"#29b3e5"}),art.css(".button.active>:first-child, .button[tabindex]:active>:first-child",{left:".1em",top:".1em"}),art.css(".button.active>:last-child, .button[tabindex]:active>:last-child",{"border-color":"#0088b6"}),art.css(".button:not([tabindex])",{background:"#e9e9e9",color:"#707070"}),art.css(".button:not([tabindex])>:last-child",{"border-color":"#bababa"}),art.css(".button>:first-child",{display:"inline-block",margin:".15em .5em",position:"relative","user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-webkit-user-select":"none"}),art.css(".button>:last-child",{"border-color":"#707070","border-style":"solid","border-width":"1px",display:"inline-block",position:"absolute",left:"0",right:"0",top:"0",bottom:"0"}),art.css(".button[tabindex]:hover:not(.active):not(:active)",{background:"#a3f4ff"}),art.css(".button[tabindex]:hover:not(.active):not(:active)>:last-child",{"border-color":"#189fdd"}),art.css("#modalBox p:first-child",{"margin-top":"0"}),art.css("#modalBox p:last-child",{"margin-bottom":"0"}),art.css(".engine-selection-box",{background:"#f0f0f0"}),art.css(".engine-selection-box .even-field",{background:"#fff"}),art.css(".help-text",{"font-size":"11pt","text-align":"justify"}),art.css(".help-text code",{"white-space":"pre"}),art.css(".help-text dfn",{"font-style":"normal","font-weight":"bold"}),art.css(".help-text li",{margin:".5em 0"});var e="application/javascript";function s(){(Y=new Worker(w)).onmessage=t}function l(){URL.revokeObjectURL(w),w=void 0}function L(){var e,t=d();try{e=JScrewIt.encode(inputArea.value,t)}catch(e){return v(),void h(String(e))}g(e)}function P(){var e=d(),t={input:inputArea.value,options:e};k&&(Y.terminate(),s(),t.url=A),Y.postMessage(t),v(),y(!0),inputArea.onkeyup=null}function d(){return{features:q.canonicalNames}}function f(e){9!==e.keyCode&&P()}function V(e){if(F(e)){var t=outputArea.value.length;if((0!==outputArea.selectionStart||outputArea.selectionEnd!==t)&&(outputArea.selectionStart=0,outputArea.selectionEnd=t,"scrollTopMax"in outputArea)){var n=outputArea.scrollTop;art(outputArea,art.on("scroll",function(){outputArea.scrollTop=n},{once:!0}))}}}function p(){W.disabled=!1;var e=this.result;null!=e&&(inputArea.value=e),inputArea.oninput(),inputArea.disabled=!1}function j(){var t,e;try{e=(0,eval)(outputArea.value)}catch(e){t=art("P",String(e))}if(void 0!==e){var n=formatValue(e),r=formatValueType(e);t=n?art("DIV",art("P",r?"Evaluation result is "+r+":":"Evaluation result is"),art("P",{style:{overflowX:"auto"}},art("DIV",{style:{display:"inline-block",textAlign:"left",whiteSpace:"pre"}},n))):art("DIV",art("P","Evaluation result is "+r+"."))}if(null!=t){var a=this;C(t,function(){a.focus()})}}function t(e){var t=e.data,n=t.error;n?h(n):g(t.output),y(!1)}function F(e){var t,n=e.target;if("runtimeStyle"in n){var r=n.lastMainMouseButtonEventTimeStamp,a=0===e.button?e.timeStamp:void 0;t=(n.lastMainMouseButtonEventTimeStamp=a)-r<=500}else t=2<=e.detail&&0===e.button;return t&&e.preventDefault(),t}function m(){var e,t;if(document.querySelector("main>div").style.display="block",inputArea.value=inputArea.defaultValue,art(outputArea,art.on("mousedown",V),art.on("mouseup",F),art.on("input",B)),art(stats.parentNode,art(O("Run this"),{style:{bottom:"0",fontSize:"10pt",position:"absolute",right:"0"}},art.on("click",j))),e=X.COMPACT,q=X.AUTO.includes(e)?e:X.BROWSER,compMenu.value=q.name,compMenu.previousIndex=compMenu.selectedIndex,Y)(t=P)();else{var n=art(O("Encode"),art.on("click",L));art(controls,n),t=H,outputArea.value=""}if("undefined"!=typeof File){var r=art("INPUT",{accept:".js",style:{display:"none"},type:"file"},art.on("change",U)),a=HTMLInputElement.prototype.click.bind(r);W=art(O("Load file…"),art.on("click",a)),art(controls,W,r)}inputArea.oninput=t;var o,i,u,c,s,l,d,f,p,m,b,v,y,h,g,A,N,k,w,S,x=function(){var e=compMenu.selectedIndex,t=compMenu.options[e].value,n=t?X[t]:J.feature;!z&&X.areEqual(n,q)||(q=n,this()),e!==compMenu.previousIndex&&(compMenu.previousIndex=e,G.rollTo(+!t))}.bind(t);function E(){var e=+new Date;0<=((m=l+(e-d)*p/250)-c)*p&&(m=c,I()),i.height=1===m?"":o.scrollHeight*m+"px",u.display=0===m?"none":""}function I(){clearInterval(s),s=null,p=0}function D(e,t){return art("LABEL",{style:{display:"inline-table"}},art("SPAN",{style:{display:"table-cell",verticalAlign:"middle"}},art("INPUT",{style:{margin:"0 .25em 0 0"},type:"checkbox"},t)),art("SPAN",{style:{display:"table-cell"}},e))}function T(e){var t=art("DIV",{className:"help-text"});return t.innerHTML=e,art("SPAN",{className:"focusable",style:{background:"black",borderRadius:"1em",color:"white",cursor:"pointer",display:"inline-table",fontSize:"8pt",fontWeight:"bold",lineHeight:"10.5pt",position:"relative",textAlign:"center",top:"-1.5pt",width:"10.5pt"},title:"Learn more…"},"?",M,art.on("click",function(){C(t)}))}function _(){var t=b.checked;Array.prototype.forEach.call(h,function(e){e.checked=t})}function R(){var t=JScrewIt.Feature,e=Array.prototype.filter.call(h,function(e){return e.checked}).map(function(e){return++n,t[e.featureName]}),n=e.length;b.checked=n,b.indeterminate=n&&n<h.length,y=t.commonOf.apply(null,e)||t.DEFAULT,A.checked&&(y=y.restrict("web-worker",e)),g.checked&&(y=y.restrict("forced-strict-mode",e))}art(compMenu,art.on("change",x)),J=art((N=art(D("Select/deselect all"),{style:{margin:"0 0 .5em"}},art.on("change",_),art.on(["keyup","mouseup"],function(){setTimeout(function(){b.indeterminate||_()})})),k=art("TABLE",{style:{borderSpacing:"0",width:"100%"}}),w=D("Generate strict mode code"),S=D("Support web workers"),v=art("FIELDSET",{className:"engine-selection-box",get feature(){return y}},art("DIV",art("P",{style:{margin:".25em 0 .75em"}},"Select the engines you want your code to support."),N,k,art("HR"),art("DIV",S," ",T("<p>Web workers are part of a standard HTML technology used to perform background tasks in JavaScript.<p>Check the option <dfn>Support web workers</dfn> only if your code needs to run inside a web worker. To create or use a web worker in your code, this option is not required.")),art("DIV",w," ",T("<p>The option <dfn>Generate strict mode code</dfn> instructs JScrewIt to avoid optimizations that don't work in strict mode JavaScript code. Check this option only if your environment disallows non-strict code. You may want to do this for example in one of the following circumstances.<ul><li>To encode a string or a number and embed it in a JavaScript file in a place where strict mode code is expected, like in a scope containing a use strict directive or in a class body.<li>To encode a script and run it in Node.js with the option <code>--use_strict</code>.<li>To encode an ECMAScript module. Note that module support in JSFuck is <em>very</em> limited, as <code>import</code> and <code>export</code> statements don't work at all. If your module doesn't contain these statements, you can encode it using this option.</ul><p>In most other cases, this option is not required, even if your script contains a top level <code>\"use strict\"</code> statement.")),art.on("change",function(){var e;R(),(e=document.createEvent("Event")).initEvent("input",!0,!1),v.dispatchEvent(e)}))),[{name:"Chrome",versions:[{featureName:"CHROME_73",number:"73+"}]},{name:"Edge",versions:[{featureName:"CHROME_73",number:"79+"}]},{name:"Firefox",versions:[{featureName:"FF_ESR",number:"62–73"},{featureName:"FF_62",number:"74+"}]},{name:"Internet Explorer",versions:[{featureName:"IE_9",number:"9"},{featureName:"IE_10",number:"10"},{featureName:"IE_11",number:"11"},{featureName:"IE_11_WIN_10",number:"11 (W10)"}]},{name:"Safari",versions:[{featureName:"SAFARI_7_0",number:"7.0"},{featureName:"SAFARI_7_1",number:"7.1–8"},{featureName:"SAFARI_9",number:"9"},{featureName:"SAFARI_10",number:"10–11"},{featureName:"SAFARI_12",number:"12+"}]},{name:"Opera",versions:[{featureName:"CHROME_73",number:"60+"}]},{name:"Android Browser",versions:[{featureName:"ANDRO_4_0",number:"4.0"},{featureName:"ANDRO_4_1",number:"4.1–4.3"},{featureName:"ANDRO_4_4",number:"4.4"}]},{name:"Node.js",versions:[{featureName:"NODE_0_10",number:"0.10"},{featureName:"NODE_0_12",number:"0.12"},{featureName:"NODE_4",number:"4"},{featureName:"NODE_5",number:"5"},{featureName:"NODE_10",number:"10"},{featureName:"NODE_11",number:"11"},{featureName:"NODE_12",number:"12+"}]}].forEach(function(e,t){for(var n,r=e.versions,a=1&t?{className:"even-field"}:null,o=(r.length+2)/3^0,i=3*o,u=0;u<i;++u){var c=r[u];u%3||(n=art("TR",a),u||art(n,art("TD",{rowSpan:o,style:{padding:"0 .5em 0 0"}},e.name)),art(k,n));var s=c?D(c.number,{checked:!0,featureName:c.featureName}):null;art(n,art("TD",{style:{padding:"0 0 0 .5em",width:"6em"}},s))}}),b=N.querySelector("INPUT"),h=k.querySelectorAll("INPUT"),g=w.querySelector("INPUT"),A=S.querySelector("INPUT"),R(),v),art.on("input",x)),m=p=0,f=art("DIV"),(u=f.style).display="none",o=art("DIV",f,{container:f,rollTo:function(e){if(e===m)I();else{var t=m<e?1:-1;t!==p&&(l=m,d=+new Date,p=t),c=e,s=s||setInterval(E,0)}}}),(i=o.style).height="0",i.overflowY="hidden",G=o,art(G.container,art("DIV",{className:"frame"},art("SPAN","Custom Compatibility Selection"),J)),art(controls.parentNode,G),inputArea.selectionStart=2147483647,inputArea.focus()}function b(){document.addEventListener("DOMContentLoaded",m)}function U(){var e=this.files[0];if(e){inputArea.disabled=!0,inputArea.value="",W.disabled=!0;var t=new FileReader;t.addEventListener("loadend",p),t.readAsText(e)}}function H(){N&&B(!0)}function v(){N=!1,outputArea.value="",stats.textContent="…"}function y(e){k=e,outputArea.disabled=e}function h(e){C(art("P",e))}function g(e){outputArea.value=e,B()}function B(e){var t=outputArea.value.length,n=1===t?"1 char":t+" chars";z=!!e,e&&(Y&&(inputArea.onkeyup=f),n+=" – <i>out of sync</i>"),N=!0,stats.innerHTML=n}var q,J,A,W,z,N,G,k,Y,w,X=JScrewIt.Feature;!function(){var t;try{(t=new XMLHttpRequest).open("GET","lib/jscrewit.min.js",!0)}catch(e){t=void 0}if(t&&"undefined"!=typeof Worker){w=URL.createObjectURL(new Blob(['"use strict";self.onmessage=function(t){var r=t.data,e=r.url;null!=e&&importScripts(e);var s=r.input;if(null!=s){var n;try{n={output:JScrewIt.encode(s,r.options)}}catch(t){n={error:String(t)}}postMessage(n)}};'],{type:e}));try{s()}catch(e){l()}}Y?(t.onerror=function(){Y.terminate(),Y=void 0,l()},t.onload=function(){t.status<400?(A=URL.createObjectURL(t.response),Y.postMessage({url:A})):this.onerror()},t.onloadend=function(){("loading"===document.readyState?b:m)()},t.overrideMimeType(e),t.responseType="blob",t.send()):b()}()}();