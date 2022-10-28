(()=>{"use strict";var e,t={1941:()=>{},4810:(e,t,o)=>{var s=o(7294),n=o(2788),i=o(308),r=o.n(i),a=o(3955),l=o.n(a),c=o(3105),u=o.n(c),d=o(8804),h=o.n(d),f=o(9734),p=o.n(f),y=o(894),g=o.n(y),m=o(4486),b=o.n(m),v=o(2525),x=o.n(v),C=o(3493),F=o.n(C),w=o(1966),E=o.n(w);const K=e=>{let t=e.offsetParent;const o=e.offsetHeight,s=e.offsetWidth;let n=e.offsetLeft,i=e.offsetTop;for(;t&&1===t.nodeType;)n+=t.offsetLeft-t.scrollLeft,i+=t.offsetTop-t.scrollTop,t=t.offsetParent;return{height:o,left:n,top:i,width:s}},P=e=>{const t=e&&e.parentElement;if(e&&t){const o=K(t),{height:s,left:n,top:i,width:r}=K(e);return{x:n-o.left,y:i-o.top,width:r,height:s,left:n,top:i}}return{x:0,y:0,width:0,height:0,left:0,top:0}},k="undefined"!=typeof window&&window.document,L=k?window.innerWidth:0,A=k?window.innerHeight:0;class D{constructor(){k&&(this.debugCtx=D.createCanvas("sn-debug","1010"),this.layoutsCtx=D.createCanvas("sn-layouts","1000"))}static createCanvas(e,t){const o=document.querySelector(`#${e}`)||document.createElement("canvas");o.setAttribute("id",e);const s=o.getContext("2d");return o.style.zIndex=t,o.style.position="fixed",o.style.top="0",o.style.left="0",document.body.appendChild(o),o.width=L,o.height=A,s}clear(){k&&this.debugCtx.clearRect(0,0,L,A)}clearLayouts(){k&&this.layoutsCtx.clearRect(0,0,L,A)}drawLayout(e,t,o){k&&(this.layoutsCtx.strokeStyle="green",this.layoutsCtx.strokeRect(e.left,e.top,e.width,e.height),this.layoutsCtx.font="8px monospace",this.layoutsCtx.fillStyle="red",this.layoutsCtx.fillText(t,e.left,e.top+10),this.layoutsCtx.fillText(o,e.left,e.top+25),this.layoutsCtx.fillText(`left: ${e.left}`,e.left,e.top+40),this.layoutsCtx.fillText(`top: ${e.top}`,e.left,e.top+55))}drawPoint(e,t,o="blue",s=10){k&&(this.debugCtx.strokeStyle=o,this.debugCtx.lineWidth=3,this.debugCtx.strokeRect(e-s/2,t-s/2,s,s))}}const M=D,B="left",N="right",S="up",R="down",Z="enter",I="back",$={[B]:[37],[S]:[38],[N]:[39],[R]:[40],[Z]:[13],[I]:[8]},T={leading:!0,trailing:!1};class O{constructor(){this.focusableComponents={},this.focusKey=null,this.parentsHavingFocusedChild=[],this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.pressedKeys={},this.paused=!1,this.keyDownEventListener=null,this.keyUpEventListener=null,this.keyMap=$,this.onKeyEvent=this.onKeyEvent.bind(this),this.pause=this.pause.bind(this),this.resume=this.resume.bind(this),this.setFocus=this.setFocus.bind(this),this.updateAllLayouts=this.updateAllLayouts.bind(this),this.navigateByDirection=this.navigateByDirection.bind(this),this.init=this.init.bind(this),this.setKeyMap=this.setKeyMap.bind(this),this.getCurrentFocusKey=this.getCurrentFocusKey.bind(this),this.debug=!1,this.visualDebugger=null,this.logIndex=0}static getCutoffCoordinate(e,t,o,s){const n=s.left,i=s.top,r=s.width,a=s.height,l=e?i:n,c=e?a:r;return t?o?l:l+c:o?l+c:l}static getRefCorners(e,t,o){const s=o.left,n=o.top,i=o.width,r=o.height,a={a:{x:0,y:0},b:{x:0,y:0}};switch(e){case S:{const e=t?n+r:n;a.a={x:s,y:e},a.b={x:s+i,y:e};break}case R:{const e=t?n:n+r;a.a={x:s,y:e},a.b={x:s+i,y:e};break}case B:{const e=t?s+i:s;a.a={x:e,y:n},a.b={x:e,y:n+r};break}case N:{const e=t?s:s+i;a.a={x:e,y:n},a.b={x:e,y:n+r};break}}return a}static isAdjacentSlice(e,t,o){const{a:s,b:n}=e,{a:i,b:r}=t,a=o?"x":"y",l=s[a],c=n[a],u=i[a],d=r[a],h=.2*(c-l);return Math.max(0,Math.min(c,d)-Math.max(l,u))>=h}static getPrimaryAxisDistance(e,t,o){const{a:s}=e,{a:n}=t,i=o?"y":"x";return Math.abs(n[i]-s[i])}static getSecondaryAxisDistance(e,t,o){const{a:s,b:n}=e,{a:i,b:r}=t,a=o?"x":"y",l=s[a],c=n[a],u=i[a],d=r[a],h=[];return h.push(Math.abs(u-l)),h.push(Math.abs(u-c)),h.push(Math.abs(d-l)),h.push(Math.abs(d-c)),Math.min(...h)}sortSiblingsByPriority(e,t,o,s){const n=o===R||o===S,i=O.getRefCorners(o,!1,t);return p()(e,(e=>{const t=O.getRefCorners(o,!0,e.layout),r=O.isAdjacentSlice(i,t,n),a=r?O.getPrimaryAxisDistance:O.getSecondaryAxisDistance,l=r?O.getSecondaryAxisDistance:O.getPrimaryAxisDistance,c=a(i,t,n),u=l(i,t,n),d=5*c+u,h=(d+1)/(r?5:1);return this.log("smartNavigate",`distance (primary, secondary, total weighted) for ${e.focusKey} relative to ${s} is`,c,u,d),this.log("smartNavigate",`priority for ${e.focusKey} relative to ${s} is`,h),this.visualDebugger&&(this.visualDebugger.drawPoint(t.a.x,t.a.y,"yellow",6),this.visualDebugger.drawPoint(t.b.x,t.b.y,"yellow",6)),h}))}init({debug:e=!1,visualDebug:t=!1,nativeMode:o=!1,throttle:s=0,throttleKeypresses:n=!1}={}){this.enabled||(this.enabled=!0,this.nativeMode=o,this.throttleKeypresses=n,this.debug=e,this.nativeMode||(Number.isInteger(s)&&s>0&&(this.throttle=s),this.bindEventHandlers(),t&&(this.visualDebugger=new M,this.startDrawLayouts())))}startDrawLayouts(){const e=()=>{requestAnimationFrame((()=>{this.visualDebugger.clearLayouts(),x()(this.focusableComponents,((e,t)=>{this.visualDebugger.drawLayout(e.layout,t,e.parentFocusKey)})),e()}))};e()}destroy(){this.enabled&&(this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.focusKey=null,this.parentsHavingFocusedChild=[],this.focusableComponents={},this.paused=!1,this.keyMap=$,this.unbindEventHandlers())}getEventType(e){return g()(this.getKeyMap(),(t=>t.includes(e)))}bindEventHandlers(){"undefined"!=typeof window&&window.addEventListener&&(this.keyDownEventListener=e=>{if(!0===this.paused)return;this.debug&&(this.logIndex+=1);const t=this.getEventType(e.keyCode);if(!t)return;this.pressedKeys[t]=this.pressedKeys[t]?this.pressedKeys[t]+1:1,e.preventDefault(),e.stopPropagation();const o={pressedKeys:this.pressedKeys};if(t===I&&this.focusKey)return void this.onBackPress(o);if(t===Z&&this.focusKey)return void this.onEnterPress(o);!1===this.onArrowPress(t,o)?(this.log("keyDownEventListener","default navigation prevented"),this.visualDebugger&&this.visualDebugger.clear()):this.onKeyEvent(e)},this.throttle&&(this.keyDownEventListenerThrottled=F()(this.keyDownEventListener.bind(this),this.throttle,T)),this.keyUpEventListener=e=>{const t=this.getEventType(e.keyCode);Reflect.deleteProperty(this.pressedKeys,t),this.throttle&&!this.throttleKeypresses&&this.keyDownEventListenerThrottled.cancel(),t===Z&&this.focusKey&&this.onEnterRelease()},window.addEventListener("keyup",this.keyUpEventListener),window.addEventListener("keydown",this.throttle?this.keyDownEventListenerThrottled:this.keyDownEventListener))}unbindEventHandlers(){"undefined"!=typeof window&&window.removeEventListener&&(window.removeEventListener("keydown",this.keyDownEventListener),this.keyDownEventListener=null,this.throttle&&(window.removeEventListener("keyup",this.keyUpEventListener),this.keyUpEventListener=null))}onBackPress(e){this.log("onBackPress",""),window.location.reload()}onEnterPress(e){const t=this.focusableComponents[this.focusKey];t?t.focusable?t.onEnterPress&&t.onEnterPress(e):this.log("onEnterPress","componentNotFocusable"):this.log("onEnterPress","noComponent")}onEnterRelease(){const e=this.focusableComponents[this.focusKey];e?e.focusable?e.onEnterRelease&&e.onEnterRelease():this.log("onEnterRelease","componentNotFocusable"):this.log("onEnterRelease","noComponent")}onArrowPress(e,t){const o=this.focusableComponents[this.focusKey];if(o)return o&&o.onArrowPress&&o.onArrowPress(e,t);this.log("onArrowPress","noComponent")}navigateByDirection(e,t){if(!0===this.paused||this.nativeMode)return;const o=[R,S,B,N];o.includes(e)?(this.log("navigateByDirection","direction",e),this.smartNavigate(e,null,t)):this.log("navigateByDirection",`Invalid direction. You passed: \`${e}\`, but you can use only these: `,o)}onKeyEvent(e){this.visualDebugger&&this.visualDebugger.clear();const t=g()(this.getKeyMap(),(t=>t.includes(e.keyCode)));this.smartNavigate(t,null,{event:e})}smartNavigate(e,t,o){if(this.nativeMode)return;this.log("smartNavigate","direction",e),this.log("smartNavigate","fromParentFocusKey",t),this.log("smartNavigate","this.focusKey",this.focusKey),t||x()(this.focusableComponents,(e=>{e.layoutUpdated=!1}));const s=this.focusableComponents[t||this.focusKey];if(this.log("smartNavigate","currentComponent",s?s.focusKey:void 0,s?s.node:void 0),s){this.updateLayout(s.focusKey);const{parentFocusKey:t,focusKey:n,layout:i}=s,r=e===R||e===S,a=e===R||e===N,l=O.getCutoffCoordinate(r,a,!1,i),c=u()(this.focusableComponents,(e=>{if(e.parentFocusKey===t&&e.focusable){this.updateLayout(e.focusKey);const t=O.getCutoffCoordinate(r,a,!0,e.layout);return a?t>=l:t<=l}return!1}));if(this.debug&&(this.log("smartNavigate","currentCutoffCoordinate",l),this.log("smartNavigate","siblings",`${c.length} elements:`,c.map((e=>e.focusKey)).join(", "),c.map((e=>e.node)))),this.visualDebugger){const t=O.getRefCorners(e,!1,i);this.visualDebugger.drawPoint(t.a.x,t.a.y),this.visualDebugger.drawPoint(t.b.x,t.b.y)}const d=this.sortSiblingsByPriority(c,i,e,n),f=h()(d);if(this.log("smartNavigate","nextComponent",f?f.focusKey:void 0,f?f.node:void 0),f)this.setFocus(f.focusKey,o);else{const s=this.focusableComponents[t];this.saveLastFocusedChildKey(s,n),s&&s.isFocusBoundary||this.smartNavigate(e,t,o)}}}saveLastFocusedChildKey(e,t){e&&(this.log("saveLastFocusedChildKey",`${e.focusKey} lastFocusedChildKey set`,t),e.lastFocusedChildKey=t)}log(e,t,...o){this.debug}getCurrentFocusKey(){return this.focusKey}getNextFocusKey(e){const t=this.focusableComponents[e];if(!t||this.nativeMode)return e;const o=u()(this.focusableComponents,(t=>t.parentFocusKey===e&&t.focusable));if(o.length>0){const{lastFocusedChildKey:e,preferredChildFocusKey:s}=t;if(this.log("getNextFocusKey","lastFocusedChildKey is",e),this.log("getNextFocusKey","preferredChildFocusKey is",s),e&&t.saveLastFocusedChild&&this.isParticipatingFocusableComponent(e))return this.log("getNextFocusKey","lastFocusedChildKey will be focused",e),this.getNextFocusKey(e);if(s&&this.isParticipatingFocusableComponent(s))return this.log("getNextFocusKey","preferredChildFocusKey will be focused",s),this.getNextFocusKey(s);o.forEach((e=>this.updateLayout(e.focusKey)));const{focusKey:n}=(e=>{const t=p()(e,(({layout:e})=>Math.abs(e.left)+Math.abs(e.top)));return h()(t)})(o);return this.log("getNextFocusKey","childKey will be focused",n),this.getNextFocusKey(n)}return this.log("getNextFocusKey","targetFocusKey",e),e}addFocusable({focusKey:e,node:t,parentFocusKey:o,onEnterPress:s,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,saveLastFocusedChild:l,trackChildren:c,onUpdateFocus:u,onUpdateHasFocusedChild:d,preferredChildFocusKey:h,autoRestoreFocus:f,focusable:p,isFocusBoundary:y}){this.focusableComponents[e]={focusKey:e,node:t,parentFocusKey:o,onEnterPress:s,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,onUpdateFocus:u,onUpdateHasFocusedChild:d,saveLastFocusedChild:l,trackChildren:c,preferredChildFocusKey:h,focusable:p,isFocusBoundary:y,autoRestoreFocus:f,lastFocusedChildKey:null,layout:{x:0,y:0,width:0,height:0,left:0,top:0,node:t},layoutUpdated:!1},this.nativeMode||(this.updateLayout(e),e===this.focusKey&&this.setFocus(e))}removeFocusable({focusKey:e}){const t=this.focusableComponents[e];if(t){const{parentFocusKey:o}=t;Reflect.deleteProperty(this.focusableComponents,e);const s=this.focusableComponents[o],n=e===this.focusKey;if(s&&s.lastFocusedChildKey===e&&(s.lastFocusedChildKey=null),this.nativeMode)return;n&&s&&s.autoRestoreFocus&&this.setFocus(o)}}getNodeLayoutByFocusKey(e){const t=this.focusableComponents[e];return t?(this.updateLayout(t.focusKey),t.layout):null}setCurrentFocusedKey(e,t){if(this.isFocusableComponent(this.focusKey)&&e!==this.focusKey){const e=this.focusableComponents[this.focusKey],o=this.focusableComponents[e.parentFocusKey];this.saveLastFocusedChildKey(o,this.focusKey),e.onUpdateFocus(!1),e.onBlur(this.getNodeLayoutByFocusKey(this.focusKey),t)}if(this.focusKey=e,this.isFocusableComponent(this.focusKey)){const e=this.focusableComponents[this.focusKey];e.onUpdateFocus(!0),e.onFocus(this.getNodeLayoutByFocusKey(this.focusKey),t)}}updateParentsHasFocusedChild(e,t){const o=[];let s=this.focusableComponents[e];for(;s;){const{parentFocusKey:e}=s,t=this.focusableComponents[e];if(t){const{focusKey:e}=t;o.push(e)}s=t}const n=E()(this.parentsHavingFocusedChild,o),i=E()(o,this.parentsHavingFocusedChild);b()(n,(e=>{const o=this.focusableComponents[e];o&&o.trackChildren&&o.onUpdateHasFocusedChild(!1),this.onIntermediateNodeBecameBlurred(e,t)})),b()(i,(e=>{const o=this.focusableComponents[e];o&&o.trackChildren&&o.onUpdateHasFocusedChild(!0),this.onIntermediateNodeBecameFocused(e,t)})),this.parentsHavingFocusedChild=o}updateParentsLastFocusedChild(e){let t=this.focusableComponents[e];for(;t;){const{parentFocusKey:e}=t,o=this.focusableComponents[e];o&&this.saveLastFocusedChildKey(o,t.focusKey),t=o}}getKeyMap(){return this.keyMap}setKeyMap(e){this.keyMap=Object.assign(Object.assign({},this.getKeyMap()),(e=>{const t={};return Object.entries(e).forEach((([e,o])=>{"number"==typeof o?t[e]=[o]:Array.isArray(o)&&(t[e]=o)})),t})(e))}isFocusableComponent(e){return!!this.focusableComponents[e]}isParticipatingFocusableComponent(e){return this.isFocusableComponent(e)&&this.focusableComponents[e].focusable}onIntermediateNodeBecameFocused(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onFocus(this.getNodeLayoutByFocusKey(e),t)}onIntermediateNodeBecameBlurred(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onBlur(this.getNodeLayoutByFocusKey(e),t)}pause(){this.paused=!0}resume(){this.paused=!1}setFocus(e,t={}){if(!this.enabled)return;this.log("setFocus","focusKey",e);const o=this.focusKey,s=this.getNextFocusKey(e);this.log("setFocus","newFocusKey",s),this.setCurrentFocusedKey(s,t),this.updateParentsHasFocusedChild(s,t),this.updateParentsLastFocusedChild(o)}updateAllLayouts(){this.nativeMode||x()(this.focusableComponents,((e,t)=>{this.updateLayout(t)}))}updateLayout(e){const t=this.focusableComponents[e];if(!t||this.nativeMode||t.layoutUpdated)return;const{node:o}=t;t.layout=Object.assign(Object.assign({},P(o)),{node:o})}updateFocusable(e,{node:t,preferredChildFocusKey:o,focusable:s,isFocusBoundary:n,onEnterPress:i,onEnterRelease:r,onArrowPress:a,onFocus:l,onBlur:c}){if(this.nativeMode)return;const u=this.focusableComponents[e];u&&(u.preferredChildFocusKey=o,u.focusable=s,u.isFocusBoundary=n,u.onEnterPress=i,u.onEnterRelease=r,u.onArrowPress=a,u.onFocus=l,u.onBlur=c,t&&(u.node=t))}isNativeMode(){return this.nativeMode}}const j=new O,{init:z,destroy:H,setKeyMap:U}=j,_=(0,s.createContext)("SN:ROOT"),q=e=>{const t=(0,s.useRef)(e),o=(0,s.useRef)(),n=(0,s.useRef)(!1),i=(0,s.useRef)(!1),[,r]=(0,s.useState)(0);n.current&&(i.current=!0),(0,s.useEffect)((()=>(n.current||(o.current=t.current(),n.current=!0),r((e=>e+1)),()=>{i.current&&o.current&&o.current()})),[])},W=({focusable:e=!0,saveLastFocusedChild:t=!0,trackChildren:o=!1,autoRestoreFocus:n=!0,isFocusBoundary:i=!1,focusKey:a,preferredChildFocusKey:c,onEnterPress:u=r(),onEnterRelease:d=r(),onArrowPress:h=(()=>!0),onFocus:f=r(),onBlur:p=r(),extraProps:y}={})=>{const g=(0,s.useCallback)((e=>{u(y,e)}),[u,y]),m=(0,s.useCallback)((()=>{d(y)}),[d,y]),b=(0,s.useCallback)(((e,t)=>h(e,y,t)),[y,h]),v=(0,s.useCallback)(((e,t)=>{f(e,y,t)}),[y,f]),x=(0,s.useCallback)(((e,t)=>{p(e,y,t)}),[y,p]),C=(0,s.useRef)(null),[F,w]=(0,s.useState)(!1),[E,K]=(0,s.useState)(!1),P=(0,s.useContext)(_),k=(0,s.useMemo)((()=>a||l()("sn:focusable-item-")),[a]),L=(0,s.useCallback)((()=>{j.setFocus(k)}),[k]);return q((()=>{const s=C.current;return j.addFocusable({focusKey:k,node:s,parentFocusKey:P,preferredChildFocusKey:c,onEnterPress:g,onEnterRelease:m,onArrowPress:b,onFocus:v,onBlur:x,onUpdateFocus:(e=!1)=>w(e),onUpdateHasFocusedChild:(e=!1)=>K(e),saveLastFocusedChild:t,trackChildren:o,isFocusBoundary:i,autoRestoreFocus:n,focusable:e}),()=>{j.removeFocusable({focusKey:k})}})),(0,s.useEffect)((()=>{const t=C.current;j.updateFocusable(k,{node:t,preferredChildFocusKey:c,focusable:e,isFocusBoundary:i,onEnterPress:g,onEnterRelease:m,onArrowPress:b,onFocus:v,onBlur:x})}),[k,c,e,i,g,m,b,v,x]),{ref:C,focusSelf:L,focused:F,hasFocusedChild:E,focusKey:k,setFocus:j.isNativeMode()?r():j.setFocus,navigateByDirection:j.navigateByDirection,pause:j.pause,resume:j.resume,updateAllLayouts:j.updateAllLayouts,getCurrentFocusKey:j.getCurrentFocusKey}},J=(0,s.createContext)({page:0,setPage:e=>{},showContent:!1,setShowContent:e=>{}});var Y=o(1871),X=function(e,t,o,s){return new(o||(o=Promise))((function(n,i){function r(e){try{l(s.next(e))}catch(e){i(e)}}function a(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}l((s=s.apply(e,t||[])).next())}))};const G=e=>{const{iconName:t,size:o,color:n}=e,i=s.createElement(Y[t]);return s.createElement("div",{style:{fontSize:o,color:n}},i)},Q=[{title:"Menu1"},{title:"Menu2"}],V=n.ZP.img`
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
  `;function oe(e){const{setPage:t}=(0,s.useContext)(J),o=(0,s.useCallback)((e=>{}),null),n=(0,s.useCallback)((e=>{alert("menu press")}),null),{ref:i,focused:r}=W({onFocus:o,onEnterPress:n,extraProps:{index:e.index}});return s.createElement("div",null,s.createElement(ee,{ref:i,focused:r},s.createElement(G,{iconName:e.icon,size:64,color:"white"}))," ",e.title)}function se({focusKey:e}){const{ref:t,focusSelf:o,hasFocusedChild:n,focusKey:i,setFocus:r}=W({focusable:!0,saveLastFocusedChild:!0,trackChildren:!0,autoRestoreFocus:!0,isFocusBoundary:!1,focusKey:e,preferredChildFocusKey:null,onEnterPress:()=>{},onEnterRelease:()=>{},onArrowPress:()=>!0,onFocus:()=>{},onBlur:()=>{}});(0,s.useEffect)((()=>{o()}),[o]);const[a,l]=(0,s.useState)([]);return(0,s.useEffect)((()=>{(()=>{X(this,void 0,void 0,(function*(){try{const e=yield fetch("https://stone-bronzed-river.glitch.me/menu.json"),t=yield e.json();l(t)}catch(e){l(Q)}}))})()}),[]),s.createElement(_.Provider,{value:i},s.createElement(te,{ref:t,hasFocusedChild:n},s.createElement(V,{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU"}),a.length>0?s.createElement("div",null,a.map(((e,t,o)=>n?s.createElement(oe,{icon:e.icon,key:t,index:t,menuFocus:n,title:e.title}):s.createElement(oe,{icon:e.icon,key:t,index:t,menuFocus:n,title:""})))):s.createElement("div",null)))}const ne=n.ZP.div`
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
`,ce=n.ZP.div`
    color: white;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `,ue=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;function de({title:e,color:t,width:o,height:n,backgroundImage:i,description:r,onEnterPress:a,onFocus:l}){const{ref:c,focused:u}=W({onEnterPress:a,onFocus:l,extraProps:{title:e,color:t,backgroundImage:i,description:r}});return s.createElement(ue,{ref:c},s.createElement(le,{width:o,height:n,backgroundImage:i,color:t,focused:u}),s.createElement(ce,null,e))}function he({description:e,data:t,title:o,height:n,onAssetPress:i,onSelectAsset:r,onFocus:a}){const{ref:l,focusKey:c}=W({onFocus:a}),u=(0,s.useRef)(null),d=(0,s.useCallback)((({x:e},t)=>{r(t),u.current.scrollTo({left:e,behavior:"smooth"})}),[u]);return s.createElement(_.Provider,{value:c},s.createElement(ne,{ref:l},s.createElement(ie,null,o),s.createElement(re,{ref:u},s.createElement(ae,null,t.map((({title:e,description:t,color:o,backgroundImage:r,width:a},l)=>s.createElement(de,{backgroundImage:r,description:t,height:n,width:a,key:e+l,title:e,color:o,onEnterPress:i,onFocus:d})))))))}const fe=n.ZP.div`
    margin-bottom: 37px;
  `,pe=n.ZP.div`
    color: white;
    margin:8px;
    margin-bottom: 22px;
    text-align: left;
    font-size: 38px;
    font-weight: 700;
    font-family: 'Arial';
  `,ye=n.ZP.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 0px;
  `,ge=n.ZP.div`
    display: flex;
    flex-direction: row;
 `,me=n.F4`
 0% { opacity: 1}
 20% { opacity: 0}
 100% { opacity: 1; }
`,be=n.F4`
0% { opacity: 1}
20% { opacity: 0}
100% { opacity: 1; }
`,ve=n.ZP.div`
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
    animation-name: ${({focused:e})=>e?me:be};
    animation-duration: 2s;
    animation-iteration-count: 1;
`,xe=n.ZP.div`
    color: white;
    margin:8px;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 36px;
    font-weight: 400;
    text-align:left;
  `,Ce=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;function Fe({title:e,color:t,width:o,height:n,backgroundImage:i,description:r,onEnterPress:a,onFocus:l}){const{ref:c,focused:u}=W({onEnterPress:a,onFocus:l,extraProps:{title:e,color:t,backgroundImage:i,description:r}});return s.createElement(Ce,{ref:c},s.createElement(ve,{width:o,height:n,backgroundImage:i,color:t,focused:u},s.createElement(xe,null,"Asset Title"),s.createElement(pe,null,"Asset text")))}function we({description:e,data:t,title:o,height:n,onAssetPress:i,onSelectAsset:r,onFocus:a}){const{ref:l,focusKey:c}=W({onFocus:a}),u=(0,s.useRef)(null),d=(0,s.useCallback)((({x:e},t)=>{r(t),u.current.scrollTo({left:e,behavior:"smooth"})}),[u]);return s.createElement(_.Provider,{value:c},s.createElement(fe,{ref:l},s.createElement(ye,{ref:u},s.createElement(ge,null,t.map((({title:e,description:t,color:o,backgroundImage:r,width:a},l)=>s.createElement(Fe,{backgroundImage:"200px"==n?"":r,description:t,height:n,width:a,key:e+l,title:e,color:"200px"==n?"":o,onEnterPress:i,onFocus:d})))))))}const Ee=n.ZP.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,Ke=n.ZP.div`
    height: 482px;
    margin-left: 932px;
    width: 852px;
    background-image: url('${({backgroundImage:e})=>e}');
    background-color: ${({color:e})=>e};
    margin-bottom: 37px;
    border-radius: 7px;
  `,Pe=n.ZP.div`
    position:absolute;
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,ke=n.ZP.div`
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,Le=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: white;
    font-size: 32px;
    font-weight: 400;
    font-family: 'Arial';
  `,Ae=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: grey;
    font-size: 28px;
    font-weight: 400;
    font-family: 'Arial';
  `,De=({color:e,backgroundImage:t,title:o,description:n})=>s.createElement(Ee,null,s.createElement(Ke,{color:e?"red":"#565b6b",backgroundImage:t||""}),s.createElement(Pe,null,s.createElement(ke,null,o||"Default selected title",s.createElement(Le,null,n||"Default selected title"),s.createElement(Ae,null,'"2nd item of text"')))),Me=(n.ZP.div`

`,n.ZP.div`

`,n.ZP.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-left:16px;
  `),Be=n.ZP.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;function Ne(e){let t=[],o=[];e.data&&(t=e.data.pages[0].page.content,o=e.data.spinner[0].page.content);const{setShowContent:n}=(0,s.useContext)(J),{ref:i,focusKey:r}=W(),[a,l]=(0,s.useState)(null),c=(0,s.useCallback)((e=>{n(!0)}),[]),u=(0,s.useCallback)((e=>{l(e)}),[]),d=(0,s.useCallback)((e=>{l(null)}),[]),h=(0,s.useCallback)((({y:e})=>{i.current.scrollTo({top:e,behavior:"smooth"})}),[i]);return s.createElement(_.Provider,{value:r},s.createElement(Me,null,a?s.createElement(De,{description:a.description,backgroundImage:a.backgroundImage,title:a.title,color:"",width:""}):s.createElement("div",null),s.createElement(Be,{ref:i},t.length>0?s.createElement("div",null,o.map(((e,t,o)=>s.createElement(we,{data:e.assets,height:a?"200px":"600px",key:e.title+t,title:e.title,description:e.description,onAssetPress:c,onSelectAsset:d,onFocus:h}))),t.map(((e,t,o)=>s.createElement(he,{height:"200px",data:e.assets,key:e.title+t,title:e.title,description:e.description,onAssetPress:c,onSelectAsset:u,onFocus:h})))):s.createElement("div",null))))}var Se=o(1721),Re=o(6488),Ze=o(1174),Ie=o(5945);const $e=new Re.S;z({debug:!1,visualDebug:!1});const Te=n.ZP.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`,Oe=n.ZP.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
`,je=n.vJ`
  ::-webkit-scrollbar {
    display: none;
  }
`;function ze(){const{isLoading:e,error:t,data:o,refetch:n}=(0,Ze.a)(["repoData"],(()=>Se.ZP.get("https://stone-bronzed-river.glitch.me/data.json").then((e=>e.data)))),[i,r]=s.useState(0),[a,l]=s.useState(!1);if(e)return s.createElement("div",null,"Loading...");return s.createElement(J.Provider,{value:{page:i,setPage:r,showContent:a,setShowContent:l}},s.createElement(Te,null,s.createElement(je,null),s.createElement(se,{focusKey:"MENU"}),s.createElement(Oe,null,s.createElement(Ne,{page:i,data:o}))))}class He extends s.Component{constructor(e){super(e)}render(){return s.createElement(Ie.aH,{client:$e},s.createElement(s.StrictMode,null,s.createElement(Ue,null,s.createElement(ze,null))))}}class Ue extends s.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){alert(e),window.location.reload()}reload(){window.location.reload()}render(){return this.state.hasError?s.createElement("div",null,s.createElement("h1",null,"Sorry.. there was an error"),s.createElement("button",{onClick:this.reload},"Refresh Page")):this.props.children}}var _e=o(745);new class{constructor(){this.render()}render(){(0,_e.s)(document.getElementById("app")||document.createElement("div")).render(s.createElement(He,{app:this},null))}}}},o={};function s(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={id:e,loaded:!1,exports:{}};return t[e](i,i.exports,s),i.loaded=!0,i.exports}s.m=t,e=[],s.O=(t,o,n,i)=>{if(!o){var r=1/0;for(u=0;u<e.length;u++){for(var[o,n,i]=e[u],a=!0,l=0;l<o.length;l++)(!1&i||r>=i)&&Object.keys(s.O).every((e=>s.O[e](o[l])))?o.splice(l--,1):(a=!1,i<r&&(r=i));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,n,i]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};s.O.j=t=>0===e[t];var t=(t,o)=>{var n,i,[r,a,l]=o,c=0;if(r.some((t=>0!==e[t]))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(l)var u=l(s)}for(t&&t(o);c<r.length;c++)i=r[c],s.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return s.O(u)},o=self.webpackChunkreact_typescript_webpack_starter=self.webpackChunkreact_typescript_webpack_starter||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),s.nc=void 0,s.O(void 0,[675],(()=>s(4810)));var n=s.O(void 0,[675],(()=>s(1941)));n=s.O(n)})();