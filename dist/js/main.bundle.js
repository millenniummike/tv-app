(()=>{"use strict";var e,t={1941:()=>{},4810:(e,t,s)=>{var o=s(7294),n=s(2788),i=s(308),r=s.n(i),a=s(3955),l=s.n(a),c=s(3105),u=s.n(c),d=s(8804),h=s.n(d),p=s(9734),f=s.n(p),y=s(894),g=s.n(y),m=s(4486),b=s.n(m),v=s(2525),x=s.n(v),C=s(3493),F=s.n(C),w=s(1966),E=s.n(w);const K=e=>{let t=e.offsetParent;const s=e.offsetHeight,o=e.offsetWidth;let n=e.offsetLeft,i=e.offsetTop;for(;t&&1===t.nodeType;)n+=t.offsetLeft-t.scrollLeft,i+=t.offsetTop-t.scrollTop,t=t.offsetParent;return{height:s,left:n,top:i,width:o}},P=e=>{const t=e&&e.parentElement;if(e&&t){const s=K(t),{height:o,left:n,top:i,width:r}=K(e);return{x:n-s.left,y:i-s.top,width:r,height:o,left:n,top:i}}return{x:0,y:0,width:0,height:0,left:0,top:0}},k="undefined"!=typeof window&&window.document,L=k?window.innerWidth:0,A=k?window.innerHeight:0;class M{constructor(){k&&(this.debugCtx=M.createCanvas("sn-debug","1010"),this.layoutsCtx=M.createCanvas("sn-layouts","1000"))}static createCanvas(e,t){const s=document.querySelector(`#${e}`)||document.createElement("canvas");s.setAttribute("id",e);const o=s.getContext("2d");return s.style.zIndex=t,s.style.position="fixed",s.style.top="0",s.style.left="0",document.body.appendChild(s),s.width=L,s.height=A,o}clear(){k&&this.debugCtx.clearRect(0,0,L,A)}clearLayouts(){k&&this.layoutsCtx.clearRect(0,0,L,A)}drawLayout(e,t,s){k&&(this.layoutsCtx.strokeStyle="green",this.layoutsCtx.strokeRect(e.left,e.top,e.width,e.height),this.layoutsCtx.font="8px monospace",this.layoutsCtx.fillStyle="red",this.layoutsCtx.fillText(t,e.left,e.top+10),this.layoutsCtx.fillText(s,e.left,e.top+25),this.layoutsCtx.fillText(`left: ${e.left}`,e.left,e.top+40),this.layoutsCtx.fillText(`top: ${e.top}`,e.left,e.top+55))}drawPoint(e,t,s="blue",o=10){k&&(this.debugCtx.strokeStyle=s,this.debugCtx.lineWidth=3,this.debugCtx.strokeRect(e-o/2,t-o/2,o,o))}}const D=M,B="left",N="right",S="up",R="down",I="enter",Z="back",$="backdelete",O={[B]:[37],[S]:[38],[N]:[39],[R]:[40],[I]:[13],[$]:[8],[Z]:[10009]},T={leading:!0,trailing:!1};class z{constructor(){this.focusableComponents={},this.focusKey=null,this.parentsHavingFocusedChild=[],this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.pressedKeys={},this.paused=!1,this.keyDownEventListener=null,this.keyUpEventListener=null,this.keyMap=O,this.onKeyEvent=this.onKeyEvent.bind(this),this.pause=this.pause.bind(this),this.resume=this.resume.bind(this),this.setFocus=this.setFocus.bind(this),this.updateAllLayouts=this.updateAllLayouts.bind(this),this.navigateByDirection=this.navigateByDirection.bind(this),this.init=this.init.bind(this),this.setKeyMap=this.setKeyMap.bind(this),this.getCurrentFocusKey=this.getCurrentFocusKey.bind(this),this.debug=!1,this.visualDebugger=null,this.logIndex=0}static getCutoffCoordinate(e,t,s,o){const n=o.left,i=o.top,r=(o.width,o.height),a=e?i:n,l=e?r:1;return t?s?a:a+l:s?a+l:a}static getRefCorners(e,t,s){const o=s.left,n=s.top,i=s.width,r=s.height,a={a:{x:0,y:0},b:{x:0,y:0}};switch(e){case S:{const e=t?n+r:n;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case R:{const e=t?n:n+r;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case B:{const e=t?o+i:o;a.a={x:e,y:n},a.b={x:e,y:n+r};break}case N:{const e=t?o:o+i;a.a={x:e,y:n},a.b={x:e,y:n+r};break}}return a}static isAdjacentSlice(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",l=o[a],c=n[a],u=i[a],d=r[a],h=.2*(c-l);return Math.max(0,Math.min(c,d)-Math.max(l,u))>=h}static getPrimaryAxisDistance(e,t,s){const{a:o}=e,{a:n}=t,i=s?"y":"x";return Math.abs(n[i]-o[i])}static getSecondaryAxisDistance(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",l=o[a],c=n[a],u=i[a],d=r[a],h=[];return h.push(Math.abs(u-l)),h.push(Math.abs(u-c)),h.push(Math.abs(d-l)),h.push(Math.abs(d-c)),Math.min(...h)}sortSiblingsByPriority(e,t,s,o){const n=s===R||s===S,i=z.getRefCorners(s,!1,t);return f()(e,(e=>{const t=z.getRefCorners(s,!0,e.layout),r=z.isAdjacentSlice(i,t,n),a=r?z.getPrimaryAxisDistance:z.getSecondaryAxisDistance,l=r?z.getSecondaryAxisDistance:z.getPrimaryAxisDistance,c=a(i,t,n),u=l(i,t,n),d=5*c+u,h=(d+1)/(r?5:1);return this.log("smartNavigate",`distance (primary, secondary, total weighted) for ${e.focusKey} relative to ${o} is`,c,u,d),this.log("smartNavigate",`priority for ${e.focusKey} relative to ${o} is`,h),this.visualDebugger&&(this.visualDebugger.drawPoint(t.a.x,t.a.y,"yellow",6),this.visualDebugger.drawPoint(t.b.x,t.b.y,"yellow",6)),h}))}init({debug:e=!1,visualDebug:t=!1,nativeMode:s=!1,throttle:o=0,throttleKeypresses:n=!1}={}){this.enabled||(this.enabled=!0,this.nativeMode=s,this.throttleKeypresses=n,this.debug=e,this.nativeMode||(Number.isInteger(o)&&o>0&&(this.throttle=o),this.bindEventHandlers(),t&&(this.visualDebugger=new D,this.startDrawLayouts())))}startDrawLayouts(){const e=()=>{requestAnimationFrame((()=>{this.visualDebugger.clearLayouts(),x()(this.focusableComponents,((e,t)=>{this.visualDebugger.drawLayout(e.layout,t,e.parentFocusKey)})),e()}))};e()}destroy(){this.enabled&&(this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.focusKey=null,this.parentsHavingFocusedChild=[],this.focusableComponents={},this.paused=!1,this.keyMap=O,this.unbindEventHandlers())}getEventType(e){return g()(this.getKeyMap(),(t=>t.includes(e)))}bindEventHandlers(){"undefined"!=typeof window&&window.addEventListener&&(this.keyDownEventListener=e=>{if(!0===this.paused)return;this.debug&&(this.logIndex+=1);const t=this.getEventType(e.keyCode);if(!t)return;this.pressedKeys[t]=this.pressedKeys[t]?this.pressedKeys[t]+1:1,e.preventDefault(),e.stopPropagation();const s={pressedKeys:this.pressedKeys};if((t===Z||t===$)&&this.focusKey)return void this.onBackPress(s);if(t===I&&this.focusKey)return void this.onEnterPress(s);!1===this.onArrowPress(t,s)?(this.log("keyDownEventListener","default navigation prevented"),this.visualDebugger&&this.visualDebugger.clear()):this.onKeyEvent(e)},this.throttle&&(this.keyDownEventListenerThrottled=F()(this.keyDownEventListener.bind(this),this.throttle,T)),this.keyUpEventListener=e=>{const t=this.getEventType(e.keyCode);Reflect.deleteProperty(this.pressedKeys,t),this.throttle&&!this.throttleKeypresses&&this.keyDownEventListenerThrottled.cancel(),t===I&&this.focusKey&&this.onEnterRelease()},window.addEventListener("keyup",this.keyUpEventListener),window.addEventListener("keydown",this.throttle?this.keyDownEventListenerThrottled:this.keyDownEventListener))}unbindEventHandlers(){"undefined"!=typeof window&&window.removeEventListener&&(window.removeEventListener("keydown",this.keyDownEventListener),this.keyDownEventListener=null,this.throttle&&(window.removeEventListener("keyup",this.keyUpEventListener),this.keyUpEventListener=null))}onBackPress(e){this.log("onBackPress","")}onEnterPress(e){const t=this.focusableComponents[this.focusKey];t?t.focusable?t.onEnterPress&&t.onEnterPress(e):this.log("onEnterPress","componentNotFocusable"):this.log("onEnterPress","noComponent")}onEnterRelease(){const e=this.focusableComponents[this.focusKey];e?e.focusable?e.onEnterRelease&&e.onEnterRelease():this.log("onEnterRelease","componentNotFocusable"):this.log("onEnterRelease","noComponent")}onArrowPress(e,t){const s=this.focusableComponents[this.focusKey];if(s)return s&&s.onArrowPress&&s.onArrowPress(e,t);this.log("onArrowPress","noComponent")}navigateByDirection(e,t){if(!0===this.paused||this.nativeMode)return;const s=[R,S,B,N];s.includes(e)?(this.log("navigateByDirection","direction",e),this.smartNavigate(e,null,t)):this.log("navigateByDirection",`Invalid direction. You passed: \`${e}\`, but you can use only these: `,s)}onKeyEvent(e){this.visualDebugger&&this.visualDebugger.clear();const t=g()(this.getKeyMap(),(t=>t.includes(e.keyCode)));this.smartNavigate(t,null,{event:e})}smartNavigate(e,t,s){if(this.nativeMode)return;this.log("smartNavigate","direction",e),this.log("smartNavigate","fromParentFocusKey",t),this.log("smartNavigate","this.focusKey",this.focusKey),t||x()(this.focusableComponents,(e=>{e.layoutUpdated=!1}));const o=this.focusableComponents[t||this.focusKey];if(this.log("smartNavigate","currentComponent",o?o.focusKey:void 0,o?o.node:void 0),o){this.updateLayout(o.focusKey);const{parentFocusKey:t,focusKey:n,layout:i}=o,r=e===R||e===S,a=e===R||e===N,l=z.getCutoffCoordinate(r,a,!1,i),c=u()(this.focusableComponents,(e=>{if(e.parentFocusKey===t&&e.focusable){this.updateLayout(e.focusKey);const t=z.getCutoffCoordinate(r,a,!0,e.layout);return a?t>=l:t<=l}return!1}));if(this.debug&&(this.log("smartNavigate","currentCutoffCoordinate",l),this.log("smartNavigate","siblings",`${c.length} elements:`,c.map((e=>e.focusKey)).join(", "),c.map((e=>e.node)))),this.visualDebugger){const t=z.getRefCorners(e,!1,i);this.visualDebugger.drawPoint(t.a.x,t.a.y),this.visualDebugger.drawPoint(t.b.x,t.b.y)}const d=this.sortSiblingsByPriority(c,i,e,n),p=h()(d);if(this.log("smartNavigate","nextComponent",p?p.focusKey:void 0,p?p.node:void 0),p)this.setFocus(p.focusKey,s);else{const o=this.focusableComponents[t];this.saveLastFocusedChildKey(o,n),o&&o.isFocusBoundary||this.smartNavigate(e,t,s)}}}saveLastFocusedChildKey(e,t){e&&(this.log("saveLastFocusedChildKey",`${e.focusKey} lastFocusedChildKey set`,t),e.lastFocusedChildKey=t)}log(e,t,...s){this.debug}getCurrentFocusKey(){return this.focusKey}getNextFocusKey(e){const t=this.focusableComponents[e];if(!t||this.nativeMode)return e;const s=u()(this.focusableComponents,(t=>t.parentFocusKey===e&&t.focusable));if(s.length>0){const{lastFocusedChildKey:e,preferredChildFocusKey:o}=t;if(this.log("getNextFocusKey","lastFocusedChildKey is",e),this.log("getNextFocusKey","preferredChildFocusKey is",o),e&&t.saveLastFocusedChild&&this.isParticipatingFocusableComponent(e))return this.log("getNextFocusKey","lastFocusedChildKey will be focused",e),this.getNextFocusKey(e);if(o&&this.isParticipatingFocusableComponent(o))return this.log("getNextFocusKey","preferredChildFocusKey will be focused",o),this.getNextFocusKey(o);s.forEach((e=>this.updateLayout(e.focusKey)));const{focusKey:n}=(e=>{const t=f()(e,(({layout:e})=>Math.abs(e.left)+Math.abs(e.top)));return h()(t)})(s);return this.log("getNextFocusKey","childKey will be focused",n),this.getNextFocusKey(n)}return this.log("getNextFocusKey","targetFocusKey",e),e}addFocusable({focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,saveLastFocusedChild:l,trackChildren:c,onUpdateFocus:u,onUpdateHasFocusedChild:d,preferredChildFocusKey:h,autoRestoreFocus:p,focusable:f,isFocusBoundary:y}){this.focusableComponents[e]={focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,onUpdateFocus:u,onUpdateHasFocusedChild:d,saveLastFocusedChild:l,trackChildren:c,preferredChildFocusKey:h,focusable:f,isFocusBoundary:y,autoRestoreFocus:p,lastFocusedChildKey:null,layout:{x:0,y:0,width:0,height:0,left:0,top:0,node:t},layoutUpdated:!1},this.nativeMode||(this.updateLayout(e),e===this.focusKey&&this.setFocus(e))}removeFocusable({focusKey:e}){const t=this.focusableComponents[e];if(t){const{parentFocusKey:s}=t;Reflect.deleteProperty(this.focusableComponents,e);const o=this.focusableComponents[s],n=e===this.focusKey;if(o&&o.lastFocusedChildKey===e&&(o.lastFocusedChildKey=null),this.nativeMode)return;n&&o&&o.autoRestoreFocus&&this.setFocus(s)}}getNodeLayoutByFocusKey(e){const t=this.focusableComponents[e];return t?(this.updateLayout(t.focusKey),t.layout):null}setCurrentFocusedKey(e,t){if(this.isFocusableComponent(this.focusKey)&&e!==this.focusKey){const e=this.focusableComponents[this.focusKey],s=this.focusableComponents[e.parentFocusKey];this.saveLastFocusedChildKey(s,this.focusKey),e.onUpdateFocus(!1),e.onBlur(this.getNodeLayoutByFocusKey(this.focusKey),t)}if(this.focusKey=e,this.isFocusableComponent(this.focusKey)){const e=this.focusableComponents[this.focusKey];e.onUpdateFocus(!0),e.onFocus(this.getNodeLayoutByFocusKey(this.focusKey),t)}}updateParentsHasFocusedChild(e,t){const s=[];let o=this.focusableComponents[e];for(;o;){const{parentFocusKey:e}=o,t=this.focusableComponents[e];if(t){const{focusKey:e}=t;s.push(e)}o=t}const n=E()(this.parentsHavingFocusedChild,s),i=E()(s,this.parentsHavingFocusedChild);b()(n,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!1),this.onIntermediateNodeBecameBlurred(e,t)})),b()(i,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!0),this.onIntermediateNodeBecameFocused(e,t)})),this.parentsHavingFocusedChild=s}updateParentsLastFocusedChild(e){let t=this.focusableComponents[e];for(;t;){const{parentFocusKey:e}=t,s=this.focusableComponents[e];s&&this.saveLastFocusedChildKey(s,t.focusKey),t=s}}getKeyMap(){return this.keyMap}setKeyMap(e){this.keyMap=Object.assign(Object.assign({},this.getKeyMap()),(e=>{const t={};return Object.entries(e).forEach((([e,s])=>{"number"==typeof s?t[e]=[s]:Array.isArray(s)&&(t[e]=s)})),t})(e))}isFocusableComponent(e){return!!this.focusableComponents[e]}isParticipatingFocusableComponent(e){return this.isFocusableComponent(e)&&this.focusableComponents[e].focusable}onIntermediateNodeBecameFocused(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onFocus(this.getNodeLayoutByFocusKey(e),t)}onIntermediateNodeBecameBlurred(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onBlur(this.getNodeLayoutByFocusKey(e),t)}pause(){this.paused=!0}resume(){this.paused=!1}setFocus(e,t={}){if(!this.enabled)return;this.log("setFocus","focusKey",e);const s=this.focusKey,o=this.getNextFocusKey(e);this.log("setFocus","newFocusKey",o),this.setCurrentFocusedKey(o,t),this.updateParentsHasFocusedChild(o,t),this.updateParentsLastFocusedChild(s)}updateAllLayouts(){this.nativeMode||x()(this.focusableComponents,((e,t)=>{this.updateLayout(t)}))}updateLayout(e){const t=this.focusableComponents[e];if(!t||this.nativeMode||t.layoutUpdated)return;const{node:s}=t;t.layout=Object.assign(Object.assign({},P(s)),{node:s})}updateFocusable(e,{node:t,preferredChildFocusKey:s,focusable:o,isFocusBoundary:n,onEnterPress:i,onEnterRelease:r,onArrowPress:a,onFocus:l,onBlur:c}){if(this.nativeMode)return;const u=this.focusableComponents[e];u&&(u.preferredChildFocusKey=s,u.focusable=o,u.isFocusBoundary=n,u.onEnterPress=i,u.onEnterRelease=r,u.onArrowPress=a,u.onFocus=l,u.onBlur=c,t&&(u.node=t))}isNativeMode(){return this.nativeMode}}const j=new z,{init:H,destroy:U,setKeyMap:_}=j,q=(0,o.createContext)("SN:ROOT"),W=e=>{const t=(0,o.useRef)(e),s=(0,o.useRef)(),n=(0,o.useRef)(!1),i=(0,o.useRef)(!1),[,r]=(0,o.useState)(0);n.current&&(i.current=!0),(0,o.useEffect)((()=>(n.current||(s.current=t.current(),n.current=!0),r((e=>e+1)),()=>{i.current&&s.current&&s.current()})),[])},J=({focusable:e=!0,saveLastFocusedChild:t=!0,trackChildren:s=!1,autoRestoreFocus:n=!0,isFocusBoundary:i=!1,focusKey:a,preferredChildFocusKey:c,onEnterPress:u=r(),onEnterRelease:d=r(),onArrowPress:h=(()=>!0),onFocus:p=r(),onBlur:f=r(),extraProps:y}={})=>{const g=(0,o.useCallback)((e=>{u(y,e)}),[u,y]),m=(0,o.useCallback)((()=>{d(y)}),[d,y]),b=(0,o.useCallback)(((e,t)=>h(e,y,t)),[y,h]),v=(0,o.useCallback)(((e,t)=>{p(e,y,t)}),[y,p]),x=(0,o.useCallback)(((e,t)=>{f(e,y,t)}),[y,f]),C=(0,o.useRef)(null),[F,w]=(0,o.useState)(!1),[E,K]=(0,o.useState)(!1),P=(0,o.useContext)(q),k=(0,o.useMemo)((()=>a||l()("sn:focusable-item-")),[a]),L=(0,o.useCallback)((()=>{j.setFocus(k)}),[k]);return W((()=>{const o=C.current;return j.addFocusable({focusKey:k,node:o,parentFocusKey:P,preferredChildFocusKey:c,onEnterPress:g,onEnterRelease:m,onArrowPress:b,onFocus:v,onBlur:x,onUpdateFocus:(e=!1)=>w(e),onUpdateHasFocusedChild:(e=!1)=>K(e),saveLastFocusedChild:t,trackChildren:s,isFocusBoundary:i,autoRestoreFocus:n,focusable:e}),()=>{j.removeFocusable({focusKey:k})}})),(0,o.useEffect)((()=>{const t=C.current;j.updateFocusable(k,{node:t,preferredChildFocusKey:c,focusable:e,isFocusBoundary:i,onEnterPress:g,onEnterRelease:m,onArrowPress:b,onFocus:v,onBlur:x})}),[k,c,e,i,g,m,b,v,x]),{ref:C,focusSelf:L,focused:F,hasFocusedChild:E,focusKey:k,setFocus:j.isNativeMode()?r():j.setFocus,navigateByDirection:j.navigateByDirection,pause:j.pause,resume:j.resume,updateAllLayouts:j.updateAllLayouts,getCurrentFocusKey:j.getCurrentFocusKey}},X=(0,o.createContext)({page:0,setPage:e=>{},showMenu:!1,setshowMenu:e=>{}});var Y=s(1871),G=function(e,t,s,o){return new(s||(s=Promise))((function(n,i){function r(e){try{l(o.next(e))}catch(e){i(e)}}function a(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,a)}l((o=o.apply(e,t||[])).next())}))};const Q=e=>{const{iconName:t,size:s,color:n}=e,i=o.createElement(Y[t]);return o.createElement("div",{style:{fontSize:s,color:n}},i)},V=[{title:"Menu1"},{title:"Menu2"}],ee=n.ZP.div`
    text-align:center;
    padding:8px;
    color: white;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Arial';
  `,te=n.ZP.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `,se=n.ZP.div`
    width: 64px;
    height: 64px;
    margin:16px;
    margin-bottom:8px;
    padding: 8px;
    border-color: white;
    background-color: ${({focused:e})=>e?"#0e4181":"#000000"};
    border-radius: 7px;
  `,oe=n.ZP.div`
    flex: 1;
    margin:12px;
    max-width: ${({hasFocusedChild:e})=>"140px"};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 37px;
    position:absolute;
    z-index:3;

  `;function ne(e){const{setPage:t}=(0,o.useContext)(X),s=(0,o.useCallback)((e=>{}),null),n=(0,o.useCallback)((e=>{alert("menu press")}),null),{ref:i,focused:r,focusKey:a,setFocus:l}=J({onFocus:s,onEnterPress:n,focusKey:""+e.id,extraProps:{index:e.index}});return o.createElement("div",null,o.createElement(se,{ref:i,focused:r},o.createElement(Q,{iconName:e.icon,size:64,color:"white"})),o.createElement(ee,null,e.title))}function ie({focusKey:e}){const{ref:t,focusSelf:s,hasFocusedChild:n,focusKey:i,getCurrentFocusKey:r,setFocus:a}=J({focusable:!0,saveLastFocusedChild:!0,trackChildren:!0,autoRestoreFocus:!0,isFocusBoundary:!1,focusKey:e,preferredChildFocusKey:null,onEnterPress:()=>{},onEnterRelease:()=>{},onArrowPress:()=>!0,onFocus:()=>{},onBlur:()=>{}});(0,o.useEffect)((()=>{a("menu:0")}),[s]);const[l,c]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(()=>{G(this,void 0,void 0,(function*(){try{const e=yield fetch("https://stone-bronzed-river.glitch.me/menu.json"),t=yield e.json();c(t)}catch(e){c(V)}}))})()}),[]),o.createElement(q.Provider,{value:i},o.createElement(oe,{ref:t,hasFocusedChild:n},o.createElement(te,{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU"}),l.length>0?o.createElement("div",null,l.map(((e,t,s)=>n?o.createElement(ne,{id:"menu:"+t,icon:e.icon,key:t,index:t,menuFocus:n,title:e.title}):o.createElement(ne,{id:"menu:"+t,icon:e.icon,key:t,index:t,menuFocus:n,title:""})))):o.createElement("div",null)))}const re=n.ZP.div`
    margin-bottom: 37px;
  `,ae=n.ZP.div`
    color: white;
    margin-bottom: 22px;
    text-align: left;
    font-size: 27px;
    font-weight: 700;
    font-family: 'Arial';
    padding-left: 120px;
  `,le=n.ZP.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 120px;
  `,ce=n.ZP.div`
    display: flex;
    flex-direction: row;
 `,ue=n.ZP.div`
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
`,de=n.ZP.div`
    color: white;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `,he=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;function pe({title:e,color:t,width:s,height:n,backgroundImage:i,key:r,description:a,onEnterPress:l,onFocus:c}){const{ref:u,focused:d}=J({onEnterPress:l,onFocus:c,focusKey:r,extraProps:{title:e,color:t,backgroundImage:i,description:a}});return o.createElement(he,{ref:u},o.createElement(ue,{width:s,height:n,key:r,backgroundImage:i,color:t,focused:d}),o.createElement(de,null,e))}function fe({description:e,data:t,title:s,height:n,onAssetPress:i,onSelectAsset:r,onFocus:a}){const{ref:l,focusKey:c}=J({onFocus:a}),u=(0,o.useRef)(null),d=(0,o.useCallback)((({x:e},t)=>{r(t),u.current.scrollTo({left:e,behavior:"smooth"})}),[u]);return o.createElement(q.Provider,{value:c},o.createElement(re,{ref:l},o.createElement(ae,null,s),o.createElement(le,{ref:u},o.createElement(ce,null,t.map((({title:e,description:t,color:s,backgroundImage:r,width:a},l)=>o.createElement(pe,{backgroundImage:r,description:t,height:n,width:a,key:e+l,title:e,color:s,onEnterPress:i,onFocus:d})))))))}const ye=n.ZP.div`
    margin-bottom: 37px;
  `,ge=n.ZP.div`
    color: white;
    margin:8px;
    margin-bottom: 22px;
    margin-left: 120px;
    text-align: left;
    font-size: 38px;
    font-weight: 700;
    font-family: 'Arial';
  `,me=n.ZP.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 0px;
  `,be=n.ZP.div`
    display: flex;
    flex-direction: row;
 `,ve=n.F4`
 0% { opacity: 0}
 30% { opacity: 0.1; }
 50% { opacity: 1; }
`,xe=n.F4`
0% { opacity: 1}
30% { opacity: 0; }
100% { opacity: 0; }
`,Ce=n.ZP.div`
    width: ${({width:e})=>e};
    height: ${({height:e})=>e};
    background-image: url('${({backgroundImage:e})=>e}');
    background-size: cover;
    background-color: ${({color:e})=>e};
    box-sizing: border-box;
    border-radius: 7px;
    animation-duration: 3s;
    animation-name: ${ve};

`,Fe=n.ZP.div`
    width: ${({width:e})=>e};
    height: ${({height:e})=>e};
    background-image: url('${({backgroundImage:e})=>e}');
    background-size: cover;
    background-color: ${({color:e})=>e};
    box-sizing: border-box;
    border-radius: 7px;
    animation-duration: 2s;
    animation-name: ${xe};
`,we=n.ZP.div`
    color: white;
    margin:8px;
    margin-top: 10px;
    margin-left: 120px;
    font-family: 'Arial';
    font-size: 36px;
    font-weight: 400;
    text-align:left;
  `,Ee=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `;function Ke({title:e,color:t,width:s,height:n,backgroundImage:i,description:r,id:a,onEnterPress:l,onFocus:c}){const[u,d]=(0,o.useState)(!0),{ref:h,focused:p}=J({onEnterPress:l,onFocus:c,focusKey:a,extraProps:{title:e,color:t,backgroundImage:i,description:r,fadeIn:()=>{d(!0)},fadeOut:()=>{d(!1)}}});return o.createElement(Ee,{ref:h},u?o.createElement(Ce,{width:s,height:n,backgroundImage:i,color:t,focused:p},o.createElement(we,null,"Asset Title"),o.createElement(ge,null,"Asset text")):o.createElement(Fe,{width:s,height:n,backgroundImage:i,color:t,focused:p},o.createElement(we,null,"Asset Title"),o.createElement(ge,null,"Asset text")))}function Pe({description:e,data:t,title:s,height:n,onAssetPress:i,onSelectAsset:r,onFocus:a}){const{ref:l,focusKey:c}=J({onFocus:a}),u=()=>{},d=()=>{},h=(0,o.useRef)(null);let p=null;const f=(0,o.useCallback)((({x:e},t)=>{h.current.scrollLeft!=e&&(t.fadeIn(),p&&p.fadeOut(),h.current.scrollTo({left:e,behavior:"smooth"})),p=t,r(t)}),[h]);return o.createElement(q.Provider,{value:c},o.createElement(ye,{ref:l},o.createElement(me,{ref:h},o.createElement(be,null,t.map((({title:e,description:t,color:s,backgroundImage:r,width:a},l)=>o.createElement(Ke,{backgroundImage:"200px"==n?"":r,description:t,height:n,width:a,id:"spinner:"+l,key:e+l,title:e,color:"200px"==n?"":s,onEnterPress:i,onFocus:f,fadeIn:u,fadeOut:d})))))))}const ke=n.ZP.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,Le=n.ZP.div`
    height: 482px;
    margin-left: 932px;
    width: 852px;
    background-image: url('${({backgroundImage:e})=>e}');
    background-color: ${({color:e})=>e};
    margin-bottom: 37px;
    border-radius: 7px;
  `,Ae=n.ZP.div`
    position:absolute;
    text-align:left;
    padding:8px;
    left: 90px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,Me=n.ZP.div`
    text-align:left;
    padding:8px;
    left: 56px;
    top:64px;
    color: white;
    font-size: 78px;
    font-weight: 400;
    font-family: 'Arial';
  `,De=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: white;
    font-size: 32px;
    font-weight: 400;
    font-family: 'Arial';
  `,Be=n.ZP.div`
    width:750px;
    padding:8px;
    text-align:left;
    left: 0px;
    color: grey;
    font-size: 28px;
    font-weight: 400;
    font-family: 'Arial';
  `,Ne=({color:e,backgroundImage:t,title:s,description:n})=>o.createElement(ke,null,o.createElement(Le,{color:e?"red":"#565b6b",backgroundImage:t||""}),o.createElement(Ae,null,o.createElement(Me,null,s||"Default selected title",o.createElement(De,null,n||"Default selected title"),o.createElement(Be,null,'"2nd item of text"')))),Se=(n.ZP.div`

`,n.ZP.div`

`,n.ZP.video`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  position:absolute;
`),Re=n.ZP.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-left:16px;
  `,Ie=n.ZP.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `;function Ze(e){let t=[],s=[];e.data&&e.page<2&&(t=e.data.pages[e.page].page.content,s=e.data.spinner[e.page].page.content);const{setshowMenu:n,setPage:i,page:r}=(0,o.useContext)(X),{ref:a,focusKey:l,focusSelf:c,getCurrentFocusKey:u,setFocus:d}=J({saveLastFocusedChild:!0});let h=(0,o.useRef)(0),p=(0,o.useRef)("");(0,o.useEffect)((()=>{const e=({key:e})=>{if("Backspace"==e||"XF86Back"==e){let e=h.current;e--,e<0&&(e=0),i(e),h.current=e}};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}}),[]);const[f,y]=(0,o.useState)(null),g=t=>{0==e.page?(i(1),h.current=1,p.current=u(),d("spinner:0")):(i(2),h.current=2,p.current=u())},m=(0,o.useCallback)((t=>{0==e.page?(i(1),h.current=1,p.current=u(),d("spinner:0")):(i(2),h.current=2,p.current=u())}),[]),b=e=>{y(e)},v=(0,o.useCallback)((e=>{y(null)}),[]),x=(0,o.useCallback)((({y:e})=>{a.current.scrollTo({top:e,behavior:"smooth"})}),[a]);switch(e.page){case 0:return o.createElement(q.Provider,{value:l},2==e.page?o.createElement(Se,{id:"video",src:"http://techslides.com/demos/sample-videos/small.mp4",loop:!0,autoPlay:!0,preload:"auto"}):null,o.createElement(Re,null,f?o.createElement(Ne,{description:f.description,backgroundImage:f.backgroundImage,title:f.title,color:"",width:""}):o.createElement("div",null),o.createElement(Ie,{ref:a},o.createElement("div",null,s.map(((e,t,s)=>o.createElement(Pe,{data:e.assets,height:f?"200px":"600px",key:e.title+t,title:e.title,description:e.description,onAssetPress:g,onSelectAsset:v,onFocus:x}))),t.map(((e,t,s)=>o.createElement(fe,{height:"200px",data:e.assets,key:e.title+t,title:e.title,description:e.description,onAssetPress:m,onSelectAsset:b,onFocus:x})))))));case 1:return o.createElement(q.Provider,{value:l},o.createElement(Re,null,f?o.createElement(Ne,{description:f.description,backgroundImage:f.backgroundImage,title:f.title,color:"",width:""}):o.createElement("div",null),o.createElement("div",null,"Specific Selected Content"),o.createElement(Ie,{ref:a},o.createElement("div",null,s.map(((e,t,s)=>o.createElement(Pe,{data:e.assets,height:f?"200px":"600px",key:e.title+t,title:e.title,description:e.description,onAssetPress:g,onSelectAsset:v,onFocus:x}))),t.map(((e,t,s)=>o.createElement(fe,{height:"200px",data:e.assets,key:e.title+t,title:e.title,description:e.description,onAssetPress:m,onSelectAsset:b,onFocus:x})))))));case 2:return o.createElement(q.Provider,{value:l},o.createElement(Se,{id:"video",src:"http://techslides.com/demos/sample-videos/small.mp4",loop:!0,autoPlay:!0,preload:"auto"}))}}var $e=s(1721),Oe=s(6488),Te=s(1174),ze=s(5945);const je=new Oe.S;H({debug:!0,visualDebug:!1});const He=n.ZP.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`,Ue=n.ZP.div`
  background-color: #000000;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
`,_e=n.vJ`
  ::-webkit-scrollbar {
    display: none;
  }
`;function qe(){const{isLoading:e,error:t,data:s,refetch:n}=(0,Te.a)(["repoData"],(()=>$e.ZP.get("https://stone-bronzed-river.glitch.me/data.json").then((e=>e.data)))),[i,r]=o.useState(0),[a,l]=o.useState(!0);return e?o.createElement("div",null,"Loading..."):o.createElement(X.Provider,{value:{page:i,setPage:r,showMenu:a,setshowMenu:l}},o.createElement(He,null,o.createElement(_e,null),0==i?o.createElement(ie,{focusKey:"MENU"}):null,o.createElement(Ue,null,o.createElement(Ze,{page:i,data:s}))))}class We extends o.Component{constructor(e){super(e)}render(){return o.createElement(ze.aH,{client:je},o.createElement(o.StrictMode,null,o.createElement(Je,null,o.createElement(qe,null))))}}class Je extends o.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){alert(e),window.location.reload()}reload(){window.location.reload()}render(){return this.state.hasError?o.createElement("div",null,o.createElement("h1",null,"Sorry.. there was an error"),o.createElement("button",{onClick:this.reload},"Refresh Page")):this.props.children}}var Xe=s(745);new class{constructor(){this.render()}render(){(0,Xe.s)(document.getElementById("app")||document.createElement("div")).render(o.createElement(We,{app:this},null))}}}},s={};function o(e){var n=s[e];if(void 0!==n)return n.exports;var i=s[e]={id:e,loaded:!1,exports:{}};return t[e](i,i.exports,o),i.loaded=!0,i.exports}o.m=t,e=[],o.O=(t,s,n,i)=>{if(!s){var r=1/0;for(u=0;u<e.length;u++){for(var[s,n,i]=e[u],a=!0,l=0;l<s.length;l++)(!1&i||r>=i)&&Object.keys(o.O).every((e=>o.O[e](s[l])))?s.splice(l--,1):(a=!1,i<r&&(r=i));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[s,n,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,s)=>{var n,i,[r,a,l]=s,c=0;if(r.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(l)var u=l(o)}for(t&&t(s);c<r.length;c++)i=r[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},s=self.webpackChunkreact_typescript_webpack_starter=self.webpackChunkreact_typescript_webpack_starter||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),o.nc=void 0,o.O(void 0,[675],(()=>o(4810)));var n=o.O(void 0,[675],(()=>o(1941)));n=o.O(n)})();