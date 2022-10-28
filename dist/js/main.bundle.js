(()=>{"use strict";var e,t={1941:()=>{},2325:(e,t,s)=>{var o=s(7294),n=s(2788),i=s(308),r=s.n(i),a=s(3955),l=s.n(a),u=s(3105),c=s.n(u),d=s(8804),h=s.n(d),f=s(9734),p=s.n(f),y=s(894),g=s.n(y),b=s(4486),m=s.n(b),v=s(2525),C=s.n(v),x=s(3493),F=s.n(x),w=s(1966),K=s.n(w);const E=e=>{let t=e.offsetParent;const s=e.offsetHeight,o=e.offsetWidth;let n=e.offsetLeft,i=e.offsetTop;for(;t&&1===t.nodeType;)n+=t.offsetLeft-t.scrollLeft,i+=t.offsetTop-t.scrollTop,t=t.offsetParent;return{height:s,left:n,top:i,width:o}},P=e=>{const t=e&&e.parentElement;if(e&&t){const s=E(t),{height:o,left:n,top:i,width:r}=E(e);return{x:n-s.left,y:i-s.top,width:r,height:o,left:n,top:i}}return{x:0,y:0,width:0,height:0,left:0,top:0}},k="undefined"!=typeof window&&window.document,L=k?window.innerWidth:0,D=k?window.innerHeight:0;class M{constructor(){k&&(this.debugCtx=M.createCanvas("sn-debug","1010"),this.layoutsCtx=M.createCanvas("sn-layouts","1000"))}static createCanvas(e,t){const s=document.querySelector(`#${e}`)||document.createElement("canvas");s.setAttribute("id",e);const o=s.getContext("2d");return s.style.zIndex=t,s.style.position="fixed",s.style.top="0",s.style.left="0",document.body.appendChild(s),s.width=L,s.height=D,o}clear(){k&&this.debugCtx.clearRect(0,0,L,D)}clearLayouts(){k&&this.layoutsCtx.clearRect(0,0,L,D)}drawLayout(e,t,s){k&&(this.layoutsCtx.strokeStyle="green",this.layoutsCtx.strokeRect(e.left,e.top,e.width,e.height),this.layoutsCtx.font="8px monospace",this.layoutsCtx.fillStyle="red",this.layoutsCtx.fillText(t,e.left,e.top+10),this.layoutsCtx.fillText(s,e.left,e.top+25),this.layoutsCtx.fillText(`left: ${e.left}`,e.left,e.top+40),this.layoutsCtx.fillText(`top: ${e.top}`,e.left,e.top+55))}drawPoint(e,t,s="blue",o=10){k&&(this.debugCtx.strokeStyle=s,this.debugCtx.lineWidth=3,this.debugCtx.strokeRect(e-o/2,t-o/2,o,o))}}const A=M,B="left",N="right",R="up",S="down",I="enter",O="back",T={[B]:[37],[R]:[38],[N]:[39],[S]:[40],[I]:[13],[O]:[8]},j={leading:!0,trailing:!1};class ${constructor(){this.focusableComponents={},this.focusKey=null,this.parentsHavingFocusedChild=[],this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.pressedKeys={},this.paused=!1,this.keyDownEventListener=null,this.keyUpEventListener=null,this.keyMap=T,this.onKeyEvent=this.onKeyEvent.bind(this),this.pause=this.pause.bind(this),this.resume=this.resume.bind(this),this.setFocus=this.setFocus.bind(this),this.updateAllLayouts=this.updateAllLayouts.bind(this),this.navigateByDirection=this.navigateByDirection.bind(this),this.init=this.init.bind(this),this.setKeyMap=this.setKeyMap.bind(this),this.getCurrentFocusKey=this.getCurrentFocusKey.bind(this),this.debug=!1,this.visualDebugger=null,this.logIndex=0}static getCutoffCoordinate(e,t,s,o){const n=o.left,i=o.top,r=o.width,a=o.height,l=e?i:n,u=e?a:r;return t?s?l:l+u:s?l+u:l}static getRefCorners(e,t,s){const o=s.left,n=s.top,i=s.width,r=s.height,a={a:{x:0,y:0},b:{x:0,y:0}};switch(e){case R:{const e=t?n+r:n;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case S:{const e=t?n:n+r;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case B:{const e=t?o+i:o;a.a={x:e,y:n},a.b={x:e,y:n+r};break}case N:{const e=t?o:o+i;a.a={x:e,y:n},a.b={x:e,y:n+r};break}}return a}static isAdjacentSlice(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",l=o[a],u=n[a],c=i[a],d=r[a],h=.2*(u-l);return Math.max(0,Math.min(u,d)-Math.max(l,c))>=h}static getPrimaryAxisDistance(e,t,s){const{a:o}=e,{a:n}=t,i=s?"y":"x";return Math.abs(n[i]-o[i])}static getSecondaryAxisDistance(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",l=o[a],u=n[a],c=i[a],d=r[a],h=[];return h.push(Math.abs(c-l)),h.push(Math.abs(c-u)),h.push(Math.abs(d-l)),h.push(Math.abs(d-u)),Math.min(...h)}sortSiblingsByPriority(e,t,s,o){const n=s===S||s===R,i=$.getRefCorners(s,!1,t);return p()(e,(e=>{const t=$.getRefCorners(s,!0,e.layout),r=$.isAdjacentSlice(i,t,n),a=r?$.getPrimaryAxisDistance:$.getSecondaryAxisDistance,l=r?$.getSecondaryAxisDistance:$.getPrimaryAxisDistance,u=a(i,t,n),c=l(i,t,n),d=5*u+c,h=(d+1)/(r?5:1);return this.log("smartNavigate",`distance (primary, secondary, total weighted) for ${e.focusKey} relative to ${o} is`,u,c,d),this.log("smartNavigate",`priority for ${e.focusKey} relative to ${o} is`,h),this.visualDebugger&&(this.visualDebugger.drawPoint(t.a.x,t.a.y,"yellow",6),this.visualDebugger.drawPoint(t.b.x,t.b.y,"yellow",6)),h}))}init({debug:e=!1,visualDebug:t=!1,nativeMode:s=!1,throttle:o=0,throttleKeypresses:n=!1}={}){this.enabled||(this.enabled=!0,this.nativeMode=s,this.throttleKeypresses=n,this.debug=e,this.nativeMode||(Number.isInteger(o)&&o>0&&(this.throttle=o),this.bindEventHandlers(),t&&(this.visualDebugger=new A,this.startDrawLayouts())))}startDrawLayouts(){const e=()=>{requestAnimationFrame((()=>{this.visualDebugger.clearLayouts(),C()(this.focusableComponents,((e,t)=>{this.visualDebugger.drawLayout(e.layout,t,e.parentFocusKey)})),e()}))};e()}destroy(){this.enabled&&(this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.focusKey=null,this.parentsHavingFocusedChild=[],this.focusableComponents={},this.paused=!1,this.keyMap=T,this.unbindEventHandlers())}getEventType(e){return g()(this.getKeyMap(),(t=>t.includes(e)))}bindEventHandlers(){"undefined"!=typeof window&&window.addEventListener&&(this.keyDownEventListener=e=>{if(!0===this.paused)return;this.debug&&(this.logIndex+=1);const t=this.getEventType(e.keyCode);if(!t)return;this.pressedKeys[t]=this.pressedKeys[t]?this.pressedKeys[t]+1:1,e.preventDefault(),e.stopPropagation();const s={pressedKeys:this.pressedKeys};if(t===O&&this.focusKey)return void this.onBackPress(s);if(t===I&&this.focusKey)return void this.onEnterPress(s);!1===this.onArrowPress(t,s)?(this.log("keyDownEventListener","default navigation prevented"),this.visualDebugger&&this.visualDebugger.clear()):this.onKeyEvent(e)},this.throttle&&(this.keyDownEventListenerThrottled=F()(this.keyDownEventListener.bind(this),this.throttle,j)),this.keyUpEventListener=e=>{const t=this.getEventType(e.keyCode);Reflect.deleteProperty(this.pressedKeys,t),this.throttle&&!this.throttleKeypresses&&this.keyDownEventListenerThrottled.cancel(),t===I&&this.focusKey&&this.onEnterRelease()},window.addEventListener("keyup",this.keyUpEventListener),window.addEventListener("keydown",this.throttle?this.keyDownEventListenerThrottled:this.keyDownEventListener))}unbindEventHandlers(){"undefined"!=typeof window&&window.removeEventListener&&(window.removeEventListener("keydown",this.keyDownEventListener),this.keyDownEventListener=null,this.throttle&&(window.removeEventListener("keyup",this.keyUpEventListener),this.keyUpEventListener=null))}onBackPress(e){this.log("onBackPress",""),window.location.reload()}onEnterPress(e){const t=this.focusableComponents[this.focusKey];t?t.focusable?t.onEnterPress&&t.onEnterPress(e):this.log("onEnterPress","componentNotFocusable"):this.log("onEnterPress","noComponent")}onEnterRelease(){const e=this.focusableComponents[this.focusKey];e?e.focusable?e.onEnterRelease&&e.onEnterRelease():this.log("onEnterRelease","componentNotFocusable"):this.log("onEnterRelease","noComponent")}onArrowPress(e,t){const s=this.focusableComponents[this.focusKey];if(s)return s&&s.onArrowPress&&s.onArrowPress(e,t);this.log("onArrowPress","noComponent")}navigateByDirection(e,t){if(!0===this.paused||this.nativeMode)return;const s=[S,R,B,N];s.includes(e)?(this.log("navigateByDirection","direction",e),this.smartNavigate(e,null,t)):this.log("navigateByDirection",`Invalid direction. You passed: \`${e}\`, but you can use only these: `,s)}onKeyEvent(e){this.visualDebugger&&this.visualDebugger.clear();const t=g()(this.getKeyMap(),(t=>t.includes(e.keyCode)));this.smartNavigate(t,null,{event:e})}smartNavigate(e,t,s){if(this.nativeMode)return;this.log("smartNavigate","direction",e),this.log("smartNavigate","fromParentFocusKey",t),this.log("smartNavigate","this.focusKey",this.focusKey),t||C()(this.focusableComponents,(e=>{e.layoutUpdated=!1}));const o=this.focusableComponents[t||this.focusKey];if(this.log("smartNavigate","currentComponent",o?o.focusKey:void 0,o?o.node:void 0),o){this.updateLayout(o.focusKey);const{parentFocusKey:t,focusKey:n,layout:i}=o,r=e===S||e===R,a=e===S||e===N,l=$.getCutoffCoordinate(r,a,!1,i),u=c()(this.focusableComponents,(e=>{if(e.parentFocusKey===t&&e.focusable){this.updateLayout(e.focusKey);const t=$.getCutoffCoordinate(r,a,!0,e.layout);return a?t>=l:t<=l}return!1}));if(this.debug&&(this.log("smartNavigate","currentCutoffCoordinate",l),this.log("smartNavigate","siblings",`${u.length} elements:`,u.map((e=>e.focusKey)).join(", "),u.map((e=>e.node)))),this.visualDebugger){const t=$.getRefCorners(e,!1,i);this.visualDebugger.drawPoint(t.a.x,t.a.y),this.visualDebugger.drawPoint(t.b.x,t.b.y)}const d=this.sortSiblingsByPriority(u,i,e,n),f=h()(d);if(this.log("smartNavigate","nextComponent",f?f.focusKey:void 0,f?f.node:void 0),f)this.setFocus(f.focusKey,s);else{const o=this.focusableComponents[t];this.saveLastFocusedChildKey(o,n),o&&o.isFocusBoundary||this.smartNavigate(e,t,s)}}}saveLastFocusedChildKey(e,t){e&&(this.log("saveLastFocusedChildKey",`${e.focusKey} lastFocusedChildKey set`,t),e.lastFocusedChildKey=t)}log(e,t,...s){this.debug}getCurrentFocusKey(){return this.focusKey}getNextFocusKey(e){const t=this.focusableComponents[e];if(!t||this.nativeMode)return e;const s=c()(this.focusableComponents,(t=>t.parentFocusKey===e&&t.focusable));if(s.length>0){const{lastFocusedChildKey:e,preferredChildFocusKey:o}=t;if(this.log("getNextFocusKey","lastFocusedChildKey is",e),this.log("getNextFocusKey","preferredChildFocusKey is",o),e&&t.saveLastFocusedChild&&this.isParticipatingFocusableComponent(e))return this.log("getNextFocusKey","lastFocusedChildKey will be focused",e),this.getNextFocusKey(e);if(o&&this.isParticipatingFocusableComponent(o))return this.log("getNextFocusKey","preferredChildFocusKey will be focused",o),this.getNextFocusKey(o);s.forEach((e=>this.updateLayout(e.focusKey)));const{focusKey:n}=(e=>{const t=p()(e,(({layout:e})=>Math.abs(e.left)+Math.abs(e.top)));return h()(t)})(s);return this.log("getNextFocusKey","childKey will be focused",n),this.getNextFocusKey(n)}return this.log("getNextFocusKey","targetFocusKey",e),e}addFocusable({focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,saveLastFocusedChild:l,trackChildren:u,onUpdateFocus:c,onUpdateHasFocusedChild:d,preferredChildFocusKey:h,autoRestoreFocus:f,focusable:p,isFocusBoundary:y}){this.focusableComponents[e]={focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,onUpdateFocus:c,onUpdateHasFocusedChild:d,saveLastFocusedChild:l,trackChildren:u,preferredChildFocusKey:h,focusable:p,isFocusBoundary:y,autoRestoreFocus:f,lastFocusedChildKey:null,layout:{x:0,y:0,width:0,height:0,left:0,top:0,node:t},layoutUpdated:!1},this.nativeMode||(this.updateLayout(e),e===this.focusKey&&this.setFocus(e))}removeFocusable({focusKey:e}){const t=this.focusableComponents[e];if(t){const{parentFocusKey:s}=t;Reflect.deleteProperty(this.focusableComponents,e);const o=this.focusableComponents[s],n=e===this.focusKey;if(o&&o.lastFocusedChildKey===e&&(o.lastFocusedChildKey=null),this.nativeMode)return;n&&o&&o.autoRestoreFocus&&this.setFocus(s)}}getNodeLayoutByFocusKey(e){const t=this.focusableComponents[e];return t?(this.updateLayout(t.focusKey),t.layout):null}setCurrentFocusedKey(e,t){if(this.isFocusableComponent(this.focusKey)&&e!==this.focusKey){const e=this.focusableComponents[this.focusKey],s=this.focusableComponents[e.parentFocusKey];this.saveLastFocusedChildKey(s,this.focusKey),e.onUpdateFocus(!1),e.onBlur(this.getNodeLayoutByFocusKey(this.focusKey),t)}if(this.focusKey=e,this.isFocusableComponent(this.focusKey)){const e=this.focusableComponents[this.focusKey];e.onUpdateFocus(!0),e.onFocus(this.getNodeLayoutByFocusKey(this.focusKey),t)}}updateParentsHasFocusedChild(e,t){const s=[];let o=this.focusableComponents[e];for(;o;){const{parentFocusKey:e}=o,t=this.focusableComponents[e];if(t){const{focusKey:e}=t;s.push(e)}o=t}const n=K()(this.parentsHavingFocusedChild,s),i=K()(s,this.parentsHavingFocusedChild);m()(n,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!1),this.onIntermediateNodeBecameBlurred(e,t)})),m()(i,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!0),this.onIntermediateNodeBecameFocused(e,t)})),this.parentsHavingFocusedChild=s}updateParentsLastFocusedChild(e){let t=this.focusableComponents[e];for(;t;){const{parentFocusKey:e}=t,s=this.focusableComponents[e];s&&this.saveLastFocusedChildKey(s,t.focusKey),t=s}}getKeyMap(){return this.keyMap}setKeyMap(e){this.keyMap=Object.assign(Object.assign({},this.getKeyMap()),(e=>{const t={};return Object.entries(e).forEach((([e,s])=>{"number"==typeof s?t[e]=[s]:Array.isArray(s)&&(t[e]=s)})),t})(e))}isFocusableComponent(e){return!!this.focusableComponents[e]}isParticipatingFocusableComponent(e){return this.isFocusableComponent(e)&&this.focusableComponents[e].focusable}onIntermediateNodeBecameFocused(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onFocus(this.getNodeLayoutByFocusKey(e),t)}onIntermediateNodeBecameBlurred(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onBlur(this.getNodeLayoutByFocusKey(e),t)}pause(){this.paused=!0}resume(){this.paused=!1}setFocus(e,t={}){if(!this.enabled)return;this.log("setFocus","focusKey",e);const s=this.focusKey,o=this.getNextFocusKey(e);this.log("setFocus","newFocusKey",o),this.setCurrentFocusedKey(o,t),this.updateParentsHasFocusedChild(o,t),this.updateParentsLastFocusedChild(s)}updateAllLayouts(){this.nativeMode||C()(this.focusableComponents,((e,t)=>{this.updateLayout(t)}))}updateLayout(e){const t=this.focusableComponents[e];if(!t||this.nativeMode||t.layoutUpdated)return;const{node:s}=t;t.layout=Object.assign(Object.assign({},P(s)),{node:s})}updateFocusable(e,{node:t,preferredChildFocusKey:s,focusable:o,isFocusBoundary:n,onEnterPress:i,onEnterRelease:r,onArrowPress:a,onFocus:l,onBlur:u}){if(this.nativeMode)return;const c=this.focusableComponents[e];c&&(c.preferredChildFocusKey=s,c.focusable=o,c.isFocusBoundary=n,c.onEnterPress=i,c.onEnterRelease=r,c.onArrowPress=a,c.onFocus=l,c.onBlur=u,t&&(c.node=t))}isNativeMode(){return this.nativeMode}}const H=new $,{init:U,destroy:Z,setKeyMap:z}=H,_=(0,o.createContext)("SN:ROOT"),q=e=>{const t=(0,o.useRef)(e),s=(0,o.useRef)(),n=(0,o.useRef)(!1),i=(0,o.useRef)(!1),[,r]=(0,o.useState)(0);n.current&&(i.current=!0),(0,o.useEffect)((()=>(n.current||(s.current=t.current(),n.current=!0),r((e=>e+1)),()=>{i.current&&s.current&&s.current()})),[])},W=({focusable:e=!0,saveLastFocusedChild:t=!0,trackChildren:s=!1,autoRestoreFocus:n=!0,isFocusBoundary:i=!1,focusKey:a,preferredChildFocusKey:u,onEnterPress:c=r(),onEnterRelease:d=r(),onArrowPress:h=(()=>!0),onFocus:f=r(),onBlur:p=r(),extraProps:y}={})=>{const g=(0,o.useCallback)((e=>{c(y,e)}),[c,y]),b=(0,o.useCallback)((()=>{d(y)}),[d,y]),m=(0,o.useCallback)(((e,t)=>h(e,y,t)),[y,h]),v=(0,o.useCallback)(((e,t)=>{f(e,y,t)}),[y,f]),C=(0,o.useCallback)(((e,t)=>{p(e,y,t)}),[y,p]),x=(0,o.useRef)(null),[F,w]=(0,o.useState)(!1),[K,E]=(0,o.useState)(!1),P=(0,o.useContext)(_),k=(0,o.useMemo)((()=>a||l()("sn:focusable-item-")),[a]),L=(0,o.useCallback)((()=>{H.setFocus(k)}),[k]);return q((()=>{const o=x.current;return H.addFocusable({focusKey:k,node:o,parentFocusKey:P,preferredChildFocusKey:u,onEnterPress:g,onEnterRelease:b,onArrowPress:m,onFocus:v,onBlur:C,onUpdateFocus:(e=!1)=>w(e),onUpdateHasFocusedChild:(e=!1)=>E(e),saveLastFocusedChild:t,trackChildren:s,isFocusBoundary:i,autoRestoreFocus:n,focusable:e}),()=>{H.removeFocusable({focusKey:k})}})),(0,o.useEffect)((()=>{const t=x.current;H.updateFocusable(k,{node:t,preferredChildFocusKey:u,focusable:e,isFocusBoundary:i,onEnterPress:g,onEnterRelease:b,onArrowPress:m,onFocus:v,onBlur:C})}),[k,u,e,i,g,b,m,v,C]),{ref:x,focusSelf:L,focused:F,hasFocusedChild:K,focusKey:k,setFocus:H.isNativeMode()?r():H.setFocus,navigateByDirection:H.navigateByDirection,pause:H.pause,resume:H.resume,updateAllLayouts:H.updateAllLayouts,getCurrentFocusKey:H.getCurrentFocusKey}},J=(0,o.createContext)({page:0,setPage:e=>{},showContent:!1,setShowContent:e=>{}});var Y=s(1871),X=function(e,t,s,o){return new(s||(s=Promise))((function(n,i){function r(e){try{l(o.next(e))}catch(e){i(e)}}function a(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,a)}l((o=o.apply(e,t||[])).next())}))};const G=e=>{const{iconName:t,size:s,color:n}=e,i=o.createElement(Y[t]);return o.createElement("div",{style:{fontSize:s,color:n}},i)},Q=[{title:"Menu1"},{title:"Menu2"}],V=n.ZP.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `,ee=n.ZP.div`
    width: 64px;
    height: 64px;
    margin:16px;
    margin-bottom:8px;
    padding: 8px;
    border-color: white;
    background-color: ${({focused:e})=>e?"#0e4181":"#000000"};
    border-radius: 7px;
  `,te=n.ZP.div`
    flex: 1;
    margin:12px;
    max-width: ${({hasFocusedChild:e})=>"140px"};
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({hasFocusedChild:e})=>"#000000"};
    padding-top: 37px;
    position:relative;
    height:1200px;
  `;function se(e){const{setPage:t}=(0,o.useContext)(J),s=(0,o.useCallback)((e=>{}),null),n=(0,o.useCallback)((e=>{t(e.index)}),null),{ref:i,focused:r}=W({onFocus:s,onEnterPress:n,extraProps:{index:e.index}});return o.createElement("div",null,o.createElement(ee,{ref:i,focused:r},o.createElement(G,{iconName:e.icon,size:64,color:"white"}))," ",e.title)}function oe({focusKey:e}){const{ref:t,focusSelf:s,hasFocusedChild:n,focusKey:i,setFocus:r}=W({focusable:!0,saveLastFocusedChild:!0,trackChildren:!0,autoRestoreFocus:!0,isFocusBoundary:!1,focusKey:e,preferredChildFocusKey:null,onEnterPress:()=>{},onEnterRelease:()=>{},onArrowPress:()=>!0,onFocus:()=>{},onBlur:()=>{}});(0,o.useEffect)((()=>{s()}),[s]);const[a,l]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(()=>{X(this,void 0,void 0,(function*(){try{const e=yield fetch("https://stone-bronzed-river.glitch.me/menu.json"),t=yield e.json();l(t)}catch(e){l(Q)}}))})()}),[]),o.createElement(_.Provider,{value:i},o.createElement(te,{ref:t,hasFocusedChild:n},o.createElement(V,{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU"}),a.length>0?o.createElement("div",null,a.map(((e,t,s)=>n?o.createElement(se,{icon:e.icon,key:t,index:t,menuFocus:n,title:e.title}):o.createElement(se,{icon:e.icon,key:t,index:t,menuFocus:n,title:""})))):o.createElement("div",null)))}const ne=n.ZP.div`
    margin-bottom: 37px;
  `,ie=n.ZP.div`
    color: white;
    margin-bottom: 22px;
    text-align: left;
    font-size: 27px;
    font-weight: 700;
    font-family: 'Arial';
    padding-left: 60px;
  `,re=n.ZP.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 0px;
  `,ae=n.ZP.div`
    display: flex;
    flex-direction: row;
 `,le=n.ZP.div`
    width: ${({width:e})=>e};
    height: ${({height:e})=>e};
    background-image: url('${({backgroundImage:e})=>e}');
    background-size: cover;
    background-color: ${({color:e})=>e};
    border-color: ${({focused:e})=>e?"white":"black"};
    border-style: solid;
    border-width: ${({focused:e})=>"6px"};
    box-sizing: border-box;
    border-radius: 7px;
`,ue=n.ZP.div`
    color: white;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `,ce=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;function de({title:e,color:t,width:s,height:n,backgroundImage:i,description:r,onEnterPress:a,onFocus:l}){const{ref:u,focused:c}=W({onEnterPress:a,onFocus:l,extraProps:{title:e,color:t,backgroundImage:i,description:r}});return o.createElement(ce,{ref:u},o.createElement(le,{width:s,height:n,backgroundImage:i,color:t,focused:c}),o.createElement(ue,null,e))}function he({description:e,data:t,title:s,onAssetPress:n,onSelectAsset:i,onFocus:r}){const{ref:a,focusKey:l}=W({onFocus:r}),u=(0,o.useRef)(null),c=(0,o.useCallback)((({x:e},t)=>{i(t),u.current.scrollTo({left:e,behavior:"smooth"})}),[u]);return o.createElement(_.Provider,{value:l},o.createElement(ne,{ref:a},o.createElement(ie,null,s),o.createElement(re,{ref:u},o.createElement(ae,null,t.map((({title:e,description:t,color:s,backgroundImage:i,width:r,height:a},l)=>o.createElement(de,{backgroundImage:i,description:t,height:a,width:r,key:e+l,title:e,color:s,onEnterPress:n,onFocus:c})))))))}const fe=n.ZP.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,pe=n.ZP.div`
    height: 482px;
    margin-left: 932px;
    width: 852px;
    background-image: url('${({backgroundImage:e})=>e}');
    background-color: ${({color:e})=>e};
    margin-bottom: 37px;
    border-radius: 7px;
  `,ye=n.ZP.div`
    position:absolute;
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,ge=n.ZP.div`
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,be=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: white;
    font-size: 32px;
    font-weight: 400;
    font-family: 'Arial';
  `,me=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: grey;
    font-size: 28px;
    font-weight: 400;
    font-family: 'Arial';
  `,ve=({color:e,backgroundImage:t,title:s,description:n})=>o.createElement(fe,null,o.createElement(pe,{color:e?"red":"#565b6b",backgroundImage:t||""}),o.createElement(ye,null,o.createElement(ge,null,s||"Default selected title",o.createElement(be,null,n||"Default selected title"),o.createElement(me,null,'"2nd item of text"')))),Ce=n.ZP.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-left:16px;
  `,xe=n.ZP.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;function Fe(e){let t=[];e.data&&(t=e.data.pages[e.page].page.content);const{setShowContent:s}=(0,o.useContext)(J),{ref:n,focusKey:i}=W(),[r,a]=(0,o.useState)({title:"Default title",backgroundImage:"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",description:"A really exciting description for this."}),l=(0,o.useCallback)((e=>{s(!0)}),[]),u=(0,o.useCallback)((e=>{a(e)}),[]),c=(0,o.useCallback)((({y:e})=>{n.current.scrollTo({top:e,behavior:"smooth"})}),[n]);return o.createElement(_.Provider,{value:i},o.createElement(Ce,null,r?o.createElement(ve,{description:r.description,backgroundImage:r.backgroundImage,title:r.title,color:"",width:""}):o.createElement(ve,{description:"",backgroundImage:"",title:"",color:"",width:""}),o.createElement(xe,{ref:n},t.length>0?o.createElement("div",null,t.map(((e,t,s)=>o.createElement(he,{data:e.assets,key:e.title+t,title:e.title,description:e.description,onAssetPress:l,onSelectAsset:u,onFocus:c})))):o.createElement("div",null))))}var we=s(1721),Ke=s(6488),Ee=s(1174),Pe=s(5945);const ke=new Ke.S;U({debug:!1,visualDebug:!1});const Le=n.ZP.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`,De=n.vJ`
  ::-webkit-scrollbar {
    display: none;
  }
`;function Me(){const{isLoading:e,error:t,data:s,refetch:n}=(0,Ee.a)(["repoData"],(()=>we.ZP.get("https://stone-bronzed-river.glitch.me/data.json").then((e=>e.data)))),[i,r]=o.useState(0),[a,l]=o.useState(!1);if(e)return o.createElement("div",null,"Loading...");return o.createElement(J.Provider,{value:{page:i,setPage:r,showContent:a,setShowContent:l}},o.createElement(Le,null,o.createElement(De,null),o.createElement(oe,{focusKey:"MENU"}),o.createElement(Fe,{page:i,data:s})))}class Ae extends o.Component{constructor(e){super(e)}render(){return o.createElement(Pe.aH,{client:ke},o.createElement(o.StrictMode,null,o.createElement(Be,null,o.createElement(Me,null))))}}class Be extends o.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){alert(e),window.location.reload()}reload(){window.location.reload()}render(){return this.state.hasError?o.createElement("div",null,o.createElement("h1",null,"Sorry.. there was an error"),o.createElement("button",{onClick:this.reload},"Refresh Page")):this.props.children}}var Ne=s(745);new class{constructor(){this.render()}render(){(0,Ne.s)(document.getElementById("app")||document.createElement("div")).render(o.createElement(Ae,{app:this},null))}}}},s={};function o(e){var n=s[e];if(void 0!==n)return n.exports;var i=s[e]={id:e,loaded:!1,exports:{}};return t[e](i,i.exports,o),i.loaded=!0,i.exports}o.m=t,e=[],o.O=(t,s,n,i)=>{if(!s){var r=1/0;for(c=0;c<e.length;c++){for(var[s,n,i]=e[c],a=!0,l=0;l<s.length;l++)(!1&i||r>=i)&&Object.keys(o.O).every((e=>o.O[e](s[l])))?s.splice(l--,1):(a=!1,i<r&&(r=i));if(a){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[s,n,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,s)=>{var n,i,[r,a,l]=s,u=0;if(r.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(l)var c=l(o)}for(t&&t(s);u<r.length;u++)i=r[u],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},s=self.webpackChunkreact_typescript_webpack_starter=self.webpackChunkreact_typescript_webpack_starter||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),o.nc=void 0,o.O(void 0,[675],(()=>o(2325)));var n=o.O(void 0,[675],(()=>o(1941)));n=o.O(n)})();