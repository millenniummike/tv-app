!function(){"use strict";var e,t={1941:function(){},1748:function(e,t,s){var o=s(7294),n=s(2788),i=s(308),r=s.n(i),a=s(3955),u=s.n(a),c=s(3105),l=s.n(c),d=s(8804),h=s.n(d),f=s(9734),y=s.n(f),p=s(894),g=s.n(p),b=s(4486),m=s.n(b),v=s(2525),C=s.n(v),F=s(3493),x=s.n(F),w=s(1966),K=s.n(w);const E=e=>{let t=e.offsetParent;const s=e.offsetHeight,o=e.offsetWidth;let n=e.offsetLeft,i=e.offsetTop;for(;t&&1===t.nodeType;)n+=t.offsetLeft-t.scrollLeft,i+=t.offsetTop-t.scrollTop,t=t.offsetParent;return{height:s,left:n,top:i,width:o}};var k=e=>{const t=e&&e.parentElement;if(e&&t){const s=E(t),{height:o,left:n,top:i,width:r}=E(e);return{x:n-s.left,y:i-s.top,width:r,height:o,left:n,top:i}}return{x:0,y:0,width:0,height:0,left:0,top:0}};const P="undefined"!=typeof window&&window.document,L=P?window.innerWidth:0,D=P?window.innerHeight:0;class A{constructor(){P&&(this.debugCtx=A.createCanvas("sn-debug","1010"),this.layoutsCtx=A.createCanvas("sn-layouts","1000"))}static createCanvas(e,t){const s=document.querySelector(`#${e}`)||document.createElement("canvas");s.setAttribute("id",e);const o=s.getContext("2d");return s.style.zIndex=t,s.style.position="fixed",s.style.top="0",s.style.left="0",document.body.appendChild(s),s.width=L,s.height=D,o}clear(){P&&this.debugCtx.clearRect(0,0,L,D)}clearLayouts(){P&&this.layoutsCtx.clearRect(0,0,L,D)}drawLayout(e,t,s){P&&(this.layoutsCtx.strokeStyle="green",this.layoutsCtx.strokeRect(e.left,e.top,e.width,e.height),this.layoutsCtx.font="8px monospace",this.layoutsCtx.fillStyle="red",this.layoutsCtx.fillText(t,e.left,e.top+10),this.layoutsCtx.fillText(s,e.left,e.top+25),this.layoutsCtx.fillText(`left: ${e.left}`,e.left,e.top+40),this.layoutsCtx.fillText(`top: ${e.top}`,e.left,e.top+55))}drawPoint(e,t,s="blue",o=10){P&&(this.debugCtx.strokeStyle=s,this.debugCtx.lineWidth=3,this.debugCtx.strokeRect(e-o/2,t-o/2,o,o))}}var M=A;const N="left",B="right",R="up",S="down",I="enter",j={[N]:[37],[R]:[38],[B]:[39],[S]:[40],[I]:[13]},T={leading:!0,trailing:!1};class O{constructor(){this.focusableComponents={},this.focusKey=null,this.parentsHavingFocusedChild=[],this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.pressedKeys={},this.paused=!1,this.keyDownEventListener=null,this.keyUpEventListener=null,this.keyMap=j,this.onKeyEvent=this.onKeyEvent.bind(this),this.pause=this.pause.bind(this),this.resume=this.resume.bind(this),this.setFocus=this.setFocus.bind(this),this.updateAllLayouts=this.updateAllLayouts.bind(this),this.navigateByDirection=this.navigateByDirection.bind(this),this.init=this.init.bind(this),this.setKeyMap=this.setKeyMap.bind(this),this.getCurrentFocusKey=this.getCurrentFocusKey.bind(this),this.debug=!1,this.visualDebugger=null,this.logIndex=0}static getCutoffCoordinate(e,t,s,o){const n=o.left,i=o.top,r=o.width,a=o.height,u=e?i:n,c=e?a:r;return t?s?u:u+c:s?u+c:u}static getRefCorners(e,t,s){const o=s.left,n=s.top,i=s.width,r=s.height,a={a:{x:0,y:0},b:{x:0,y:0}};switch(e){case R:{const e=t?n+r:n;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case S:{const e=t?n:n+r;a.a={x:o,y:e},a.b={x:o+i,y:e};break}case N:{const e=t?o+i:o;a.a={x:e,y:n},a.b={x:e,y:n+r};break}case B:{const e=t?o:o+i;a.a={x:e,y:n},a.b={x:e,y:n+r};break}}return a}static isAdjacentSlice(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",u=o[a],c=n[a],l=i[a],d=r[a],h=.2*(c-u);return Math.max(0,Math.min(c,d)-Math.max(u,l))>=h}static getPrimaryAxisDistance(e,t,s){const{a:o}=e,{a:n}=t,i=s?"y":"x";return Math.abs(n[i]-o[i])}static getSecondaryAxisDistance(e,t,s){const{a:o,b:n}=e,{a:i,b:r}=t,a=s?"x":"y",u=o[a],c=n[a],l=i[a],d=r[a],h=[];return h.push(Math.abs(l-u)),h.push(Math.abs(l-c)),h.push(Math.abs(d-u)),h.push(Math.abs(d-c)),Math.min(...h)}sortSiblingsByPriority(e,t,s,o){const n=s===S||s===R,i=O.getRefCorners(s,!1,t);return y()(e,(e=>{const t=O.getRefCorners(s,!0,e.layout),r=O.isAdjacentSlice(i,t,n),a=r?O.getPrimaryAxisDistance:O.getSecondaryAxisDistance,u=r?O.getSecondaryAxisDistance:O.getPrimaryAxisDistance,c=a(i,t,n),l=u(i,t,n),d=5*c+l,h=(d+1)/(r?5:1);return this.log("smartNavigate",`distance (primary, secondary, total weighted) for ${e.focusKey} relative to ${o} is`,c,l,d),this.log("smartNavigate",`priority for ${e.focusKey} relative to ${o} is`,h),this.visualDebugger&&(this.visualDebugger.drawPoint(t.a.x,t.a.y,"yellow",6),this.visualDebugger.drawPoint(t.b.x,t.b.y,"yellow",6)),h}))}init({debug:e=!1,visualDebug:t=!1,nativeMode:s=!1,throttle:o=0,throttleKeypresses:n=!1}={}){this.enabled||(this.enabled=!0,this.nativeMode=s,this.throttleKeypresses=n,this.debug=e,this.nativeMode||(Number.isInteger(o)&&o>0&&(this.throttle=o),this.bindEventHandlers(),t&&(this.visualDebugger=new M,this.startDrawLayouts())))}startDrawLayouts(){const e=()=>{requestAnimationFrame((()=>{this.visualDebugger.clearLayouts(),C()(this.focusableComponents,((e,t)=>{this.visualDebugger.drawLayout(e.layout,t,e.parentFocusKey)})),e()}))};e()}destroy(){this.enabled&&(this.enabled=!1,this.nativeMode=!1,this.throttle=0,this.throttleKeypresses=!1,this.focusKey=null,this.parentsHavingFocusedChild=[],this.focusableComponents={},this.paused=!1,this.keyMap=j,this.unbindEventHandlers())}getEventType(e){return g()(this.getKeyMap(),(t=>t.includes(e)))}bindEventHandlers(){"undefined"!=typeof window&&window.addEventListener&&(this.keyDownEventListener=e=>{if(!0===this.paused)return;this.debug&&(this.logIndex+=1);const t=this.getEventType(e.keyCode);if(!t)return;this.pressedKeys[t]=this.pressedKeys[t]?this.pressedKeys[t]+1:1,e.preventDefault(),e.stopPropagation();const s={pressedKeys:this.pressedKeys};if(t===I&&this.focusKey)return void this.onEnterPress(s);!1===this.onArrowPress(t,s)?(this.log("keyDownEventListener","default navigation prevented"),this.visualDebugger&&this.visualDebugger.clear()):this.onKeyEvent(e)},this.throttle&&(this.keyDownEventListenerThrottled=x()(this.keyDownEventListener.bind(this),this.throttle,T)),this.keyUpEventListener=e=>{const t=this.getEventType(e.keyCode);Reflect.deleteProperty(this.pressedKeys,t),this.throttle&&!this.throttleKeypresses&&this.keyDownEventListenerThrottled.cancel(),t===I&&this.focusKey&&this.onEnterRelease()},window.addEventListener("keyup",this.keyUpEventListener),window.addEventListener("keydown",this.throttle?this.keyDownEventListenerThrottled:this.keyDownEventListener))}unbindEventHandlers(){"undefined"!=typeof window&&window.removeEventListener&&(window.removeEventListener("keydown",this.keyDownEventListener),this.keyDownEventListener=null,this.throttle&&(window.removeEventListener("keyup",this.keyUpEventListener),this.keyUpEventListener=null))}onEnterPress(e){const t=this.focusableComponents[this.focusKey];t?t.focusable?t.onEnterPress&&t.onEnterPress(e):this.log("onEnterPress","componentNotFocusable"):this.log("onEnterPress","noComponent")}onEnterRelease(){const e=this.focusableComponents[this.focusKey];e?e.focusable?e.onEnterRelease&&e.onEnterRelease():this.log("onEnterRelease","componentNotFocusable"):this.log("onEnterRelease","noComponent")}onArrowPress(e,t){const s=this.focusableComponents[this.focusKey];if(s)return s&&s.onArrowPress&&s.onArrowPress(e,t);this.log("onArrowPress","noComponent")}navigateByDirection(e,t){if(!0===this.paused||this.nativeMode)return;const s=[S,R,N,B];s.includes(e)?(this.log("navigateByDirection","direction",e),this.smartNavigate(e,null,t)):this.log("navigateByDirection",`Invalid direction. You passed: \`${e}\`, but you can use only these: `,s)}onKeyEvent(e){this.visualDebugger&&this.visualDebugger.clear();const t=g()(this.getKeyMap(),(t=>t.includes(e.keyCode)));this.smartNavigate(t,null,{event:e})}smartNavigate(e,t,s){if(this.nativeMode)return;this.log("smartNavigate","direction",e),this.log("smartNavigate","fromParentFocusKey",t),this.log("smartNavigate","this.focusKey",this.focusKey),t||C()(this.focusableComponents,(e=>{e.layoutUpdated=!1}));const o=this.focusableComponents[t||this.focusKey];if(this.log("smartNavigate","currentComponent",o?o.focusKey:void 0,o?o.node:void 0),o){this.updateLayout(o.focusKey);const{parentFocusKey:t,focusKey:n,layout:i}=o,r=e===S||e===R,a=e===S||e===B,u=O.getCutoffCoordinate(r,a,!1,i),c=l()(this.focusableComponents,(e=>{if(e.parentFocusKey===t&&e.focusable){this.updateLayout(e.focusKey);const t=O.getCutoffCoordinate(r,a,!0,e.layout);return a?t>=u:t<=u}return!1}));if(this.debug&&(this.log("smartNavigate","currentCutoffCoordinate",u),this.log("smartNavigate","siblings",`${c.length} elements:`,c.map((e=>e.focusKey)).join(", "),c.map((e=>e.node)))),this.visualDebugger){const t=O.getRefCorners(e,!1,i);this.visualDebugger.drawPoint(t.a.x,t.a.y),this.visualDebugger.drawPoint(t.b.x,t.b.y)}const d=this.sortSiblingsByPriority(c,i,e,n),f=h()(d);if(this.log("smartNavigate","nextComponent",f?f.focusKey:void 0,f?f.node:void 0),f)this.setFocus(f.focusKey,s);else{const o=this.focusableComponents[t];this.saveLastFocusedChildKey(o,n),o&&o.isFocusBoundary||this.smartNavigate(e,t,s)}}}saveLastFocusedChildKey(e,t){e&&(this.log("saveLastFocusedChildKey",`${e.focusKey} lastFocusedChildKey set`,t),e.lastFocusedChildKey=t)}log(e,t,...s){this.debug}getCurrentFocusKey(){return this.focusKey}getNextFocusKey(e){const t=this.focusableComponents[e];if(!t||this.nativeMode)return e;const s=l()(this.focusableComponents,(t=>t.parentFocusKey===e&&t.focusable));if(s.length>0){const{lastFocusedChildKey:e,preferredChildFocusKey:o}=t;if(this.log("getNextFocusKey","lastFocusedChildKey is",e),this.log("getNextFocusKey","preferredChildFocusKey is",o),e&&t.saveLastFocusedChild&&this.isParticipatingFocusableComponent(e))return this.log("getNextFocusKey","lastFocusedChildKey will be focused",e),this.getNextFocusKey(e);if(o&&this.isParticipatingFocusableComponent(o))return this.log("getNextFocusKey","preferredChildFocusKey will be focused",o),this.getNextFocusKey(o);s.forEach((e=>this.updateLayout(e.focusKey)));const{focusKey:n}=(e=>{const t=y()(e,(({layout:e})=>Math.abs(e.left)+Math.abs(e.top)));return h()(t)})(s);return this.log("getNextFocusKey","childKey will be focused",n),this.getNextFocusKey(n)}return this.log("getNextFocusKey","targetFocusKey",e),e}addFocusable({focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,saveLastFocusedChild:u,trackChildren:c,onUpdateFocus:l,onUpdateHasFocusedChild:d,preferredChildFocusKey:h,autoRestoreFocus:f,focusable:y,isFocusBoundary:p}){this.focusableComponents[e]={focusKey:e,node:t,parentFocusKey:s,onEnterPress:o,onEnterRelease:n,onArrowPress:i,onFocus:r,onBlur:a,onUpdateFocus:l,onUpdateHasFocusedChild:d,saveLastFocusedChild:u,trackChildren:c,preferredChildFocusKey:h,focusable:y,isFocusBoundary:p,autoRestoreFocus:f,lastFocusedChildKey:null,layout:{x:0,y:0,width:0,height:0,left:0,top:0,node:t},layoutUpdated:!1},this.nativeMode||(this.updateLayout(e),e===this.focusKey&&this.setFocus(e))}removeFocusable({focusKey:e}){const t=this.focusableComponents[e];if(t){const{parentFocusKey:s}=t;Reflect.deleteProperty(this.focusableComponents,e);const o=this.focusableComponents[s],n=e===this.focusKey;if(o&&o.lastFocusedChildKey===e&&(o.lastFocusedChildKey=null),this.nativeMode)return;n&&o&&o.autoRestoreFocus&&this.setFocus(s)}}getNodeLayoutByFocusKey(e){const t=this.focusableComponents[e];return t?(this.updateLayout(t.focusKey),t.layout):null}setCurrentFocusedKey(e,t){if(this.isFocusableComponent(this.focusKey)&&e!==this.focusKey){const e=this.focusableComponents[this.focusKey],s=this.focusableComponents[e.parentFocusKey];this.saveLastFocusedChildKey(s,this.focusKey),e.onUpdateFocus(!1),e.onBlur(this.getNodeLayoutByFocusKey(this.focusKey),t)}if(this.focusKey=e,this.isFocusableComponent(this.focusKey)){const e=this.focusableComponents[this.focusKey];e.onUpdateFocus(!0),e.onFocus(this.getNodeLayoutByFocusKey(this.focusKey),t)}}updateParentsHasFocusedChild(e,t){const s=[];let o=this.focusableComponents[e];for(;o;){const{parentFocusKey:e}=o,t=this.focusableComponents[e];if(t){const{focusKey:e}=t;s.push(e)}o=t}const n=K()(this.parentsHavingFocusedChild,s),i=K()(s,this.parentsHavingFocusedChild);m()(n,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!1),this.onIntermediateNodeBecameBlurred(e,t)})),m()(i,(e=>{const s=this.focusableComponents[e];s&&s.trackChildren&&s.onUpdateHasFocusedChild(!0),this.onIntermediateNodeBecameFocused(e,t)})),this.parentsHavingFocusedChild=s}updateParentsLastFocusedChild(e){let t=this.focusableComponents[e];for(;t;){const{parentFocusKey:e}=t,s=this.focusableComponents[e];s&&this.saveLastFocusedChildKey(s,t.focusKey),t=s}}getKeyMap(){return this.keyMap}setKeyMap(e){this.keyMap=Object.assign(Object.assign({},this.getKeyMap()),(e=>{const t={};return Object.entries(e).forEach((([e,s])=>{"number"==typeof s?t[e]=[s]:Array.isArray(s)&&(t[e]=s)})),t})(e))}isFocusableComponent(e){return!!this.focusableComponents[e]}isParticipatingFocusableComponent(e){return this.isFocusableComponent(e)&&this.focusableComponents[e].focusable}onIntermediateNodeBecameFocused(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onFocus(this.getNodeLayoutByFocusKey(e),t)}onIntermediateNodeBecameBlurred(e,t){this.isParticipatingFocusableComponent(e)&&this.focusableComponents[e].onBlur(this.getNodeLayoutByFocusKey(e),t)}pause(){this.paused=!0}resume(){this.paused=!1}setFocus(e,t={}){if(!this.enabled)return;this.log("setFocus","focusKey",e);const s=this.focusKey,o=this.getNextFocusKey(e);this.log("setFocus","newFocusKey",o),this.setCurrentFocusedKey(o,t),this.updateParentsHasFocusedChild(o,t),this.updateParentsLastFocusedChild(s)}updateAllLayouts(){this.nativeMode||C()(this.focusableComponents,((e,t)=>{this.updateLayout(t)}))}updateLayout(e){const t=this.focusableComponents[e];if(!t||this.nativeMode||t.layoutUpdated)return;const{node:s}=t;t.layout=Object.assign(Object.assign({},k(s)),{node:s})}updateFocusable(e,{node:t,preferredChildFocusKey:s,focusable:o,isFocusBoundary:n,onEnterPress:i,onEnterRelease:r,onArrowPress:a,onFocus:u,onBlur:c}){if(this.nativeMode)return;const l=this.focusableComponents[e];l&&(l.preferredChildFocusKey=s,l.focusable=o,l.isFocusBoundary=n,l.onEnterPress=i,l.onEnterRelease=r,l.onArrowPress=a,l.onFocus=u,l.onBlur=c,t&&(l.node=t))}isNativeMode(){return this.nativeMode}}const U=new O,{init:$,destroy:H,setKeyMap:Z}=U,z=(0,o.createContext)("SN:ROOT");var _=e=>{const t=(0,o.useRef)(e),s=(0,o.useRef)(),n=(0,o.useRef)(!1),i=(0,o.useRef)(!1),[,r]=(0,o.useState)(0);n.current&&(i.current=!0),(0,o.useEffect)((()=>(n.current||(s.current=t.current(),n.current=!0),r((e=>e+1)),()=>{i.current&&s.current&&s.current()})),[])};const q=({focusable:e=!0,saveLastFocusedChild:t=!0,trackChildren:s=!1,autoRestoreFocus:n=!0,isFocusBoundary:i=!1,focusKey:a,preferredChildFocusKey:c,onEnterPress:l=r(),onEnterRelease:d=r(),onArrowPress:h=(()=>!0),onFocus:f=r(),onBlur:y=r(),extraProps:p}={})=>{const g=(0,o.useCallback)((e=>{l(p,e)}),[l,p]),b=(0,o.useCallback)((()=>{d(p)}),[d,p]),m=(0,o.useCallback)(((e,t)=>h(e,p,t)),[p,h]),v=(0,o.useCallback)(((e,t)=>{f(e,p,t)}),[p,f]),C=(0,o.useCallback)(((e,t)=>{y(e,p,t)}),[p,y]),F=(0,o.useRef)(null),[x,w]=(0,o.useState)(!1),[K,E]=(0,o.useState)(!1),k=(0,o.useContext)(z),P=(0,o.useMemo)((()=>a||u()("sn:focusable-item-")),[a]),L=(0,o.useCallback)((()=>{U.setFocus(P)}),[P]);return _((()=>{const o=F.current;return U.addFocusable({focusKey:P,node:o,parentFocusKey:k,preferredChildFocusKey:c,onEnterPress:g,onEnterRelease:b,onArrowPress:m,onFocus:v,onBlur:C,onUpdateFocus:(e=!1)=>w(e),onUpdateHasFocusedChild:(e=!1)=>E(e),saveLastFocusedChild:t,trackChildren:s,isFocusBoundary:i,autoRestoreFocus:n,focusable:e}),()=>{U.removeFocusable({focusKey:P})}})),(0,o.useEffect)((()=>{const t=F.current;U.updateFocusable(P,{node:t,preferredChildFocusKey:c,focusable:e,isFocusBoundary:i,onEnterPress:g,onEnterRelease:b,onArrowPress:m,onFocus:v,onBlur:C})}),[P,c,e,i,g,b,m,v,C]),{ref:F,focusSelf:L,focused:x,hasFocusedChild:K,focusKey:P,setFocus:U.isNativeMode()?r():U.setFocus,navigateByDirection:U.navigateByDirection,pause:U.pause,resume:U.resume,updateAllLayouts:U.updateAllLayouts,getCurrentFocusKey:U.getCurrentFocusKey}};var W=s(1871),J=function(e,t,s,o){return new(s||(s=Promise))((function(n,i){function r(e){try{u(o.next(e))}catch(e){i(e)}}function a(e){try{u(o.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(r,a)}u((o=o.apply(e,t||[])).next())}))};$({debug:!1,visualDebug:!1});const Y=[{title:"Cool bets",assets:[{title:"From Server",color:"#714ADD",backgroundImage:"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",width:"600px"},{title:"From Server",color:"#714ADD",backgroundImage:"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",width:"600px"},{title:"From Server",color:"#714ADD",backgroundImage:"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",width:"600px"},{title:"From Server",color:"#714ADD",backgroundImage:"https://walter.trakt.tv/images/shows/000/154/574/fanarts/thumb/e76ff4eec3.jpg.webp",width:"600px"}]}],X=n.ZP.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,G=n.ZP.div`
    color: white;
    font-size: 48px;
    font-weight: 600;
    font-family: 'Arial';
    text-align: center;
    margin-bottom: 37px;
  `,Q=n.ZP.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,V=n.ZP.div`
    height: 482px;
    width: 1074px;
    background-image: url('${({backgroundImage:e})=>e}');
    background-color: ${({color:e})=>e};
    margin-bottom: 37px;
    border-radius: 7px;
  `,ee=n.ZP.div`
    position: absolute;
    bottom: 75px;
    left: 150px;
    color: white;
    font-size: 27px;
    font-weight: 400;
    font-family: 'Arial';
  `,te=n.ZP.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  `,se=n.ZP.div`
    width: 64px;
    padding: 8px;
    background-color: ${({focused:e})=>e?"#50F050":"#0056ed"};
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 7px;
  `,oe=n.ZP.div`
    flex: 1;
    max-width: ${({hasFocusedChild:e})=>"110px"};
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({hasFocusedChild:e})=>e?"#4e4181":"#362C56"};
    padding-top: 37px;
    position:relative;
    height:1200px;
  `,ne=n.ZP.div`
    margin-bottom: 37px;
  `,ie=n.ZP.div`
    color: white;
    margin-bottom: 22px;
    font-size: 27px;
    font-weight: 700;
    font-family: 'Arial';
    padding-left: 60px;
  `,re=n.ZP.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 60px;
  `,ae=n.ZP.div`
    display: flex;
    flex-direction: row;
  `,ue=n.ZP.img`
    height: 75px;
    width: 75px;
    margin-bottom: 51px;
  `,ce=(n.ZP.div`
    color: white;
    padding:8px;
    width:64px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `,n.ZP.div`
    width: ${({width:e})=>e};
    height: 174px;
    background-image: url('${({backgroundImage:e})=>e}');
    background-size: cover;
    background-color: ${({color:e})=>e};
    border-color: ${({focused:e})=>e?"white":"black"};
    border-style: solid;
    border-width: ${({focused:e})=>"6px"};
    box-sizing: border-box;
    border-radius: 7px;
  `),le=n.ZP.div`
    color: white;
    margin-top: 10px;
    font-family: 'Arial';
    font-size: 24px;
    font-weight: 400;
  `,de=n.ZP.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
  `,he=n.ZP.div`
  background-color: #221c35;
  width: 1440px;
  height: 890px;
  display: flex;
  flex-direction: row;
`,fe=n.vJ`
  ::-webkit-scrollbar {
    display: none;
  }
`;function ye(e){const t=(0,o.useCallback)(((e,t)=>{}),null),{ref:s,focused:n}=q({onFocus:t});return o.createElement(se,{ref:s,focused:n},o.createElement(W.Zyz,null))}function pe({focusKey:e}){const{ref:t,focusSelf:s,hasFocusedChild:n,focusKey:i}=q({focusable:!0,saveLastFocusedChild:!1,trackChildren:!0,autoRestoreFocus:!0,isFocusBoundary:!1,focusKey:e,preferredChildFocusKey:null,onEnterPress:()=>{},onEnterRelease:()=>{},onArrowPress:()=>!0,onFocus:()=>{},onBlur:()=>{},extraProps:{foo:"bar"}});(0,o.useEffect)((()=>{s()}),[s]);const[r,a]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(()=>{J(this,void 0,void 0,(function*(){try{const e=yield fetch("https://stone-bronzed-river.glitch.me/menu.json"),t=yield e.json();a(t)}catch(e){a(Y)}}))})()}),[]),o.createElement(z.Provider,{value:i},o.createElement(oe,{ref:t,hasFocusedChild:n},o.createElement(ue,{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsStcAyNQkgX4BYz3_1qyHaffzqRijsJwtPOslbpdCT9IY02xW8bmXmJ2DuE68OS57rw&usqp=CAU"}),r.length>0?o.createElement("div",null,r.map(((e,t,s)=>o.createElement(ye,{menuFocus:n,title:e.title})))):o.createElement("div",null)))}function ge({title:e,color:t,width:s,backgroundImage:n,onEnterPress:i,onFocus:r}){const{ref:a,focused:u}=q({onEnterPress:i,onFocus:r,extraProps:{title:e,color:t,backgroundImage:n}});return o.createElement(de,{ref:a},o.createElement(ce,{width:s,backgroundImage:n,color:t,focused:u}),o.createElement(le,null,e))}function be({data:e,title:t,onAssetPress:s,onFocus:n}){const{ref:i,focusKey:r}=q({onFocus:n}),a=(0,o.useRef)(null),[u,c]=(0,o.useState)(null),l=(0,o.useCallback)((({x:e},t)=>{s(t,null),a.current.scrollTo({left:e,behavior:"smooth"})}),[a]);return o.createElement(z.Provider,{value:r},o.createElement(ne,{ref:i},o.createElement(ie,null,t),o.createElement(re,{ref:a},o.createElement(ae,null,e.map((({title:e,color:t,backgroundImage:n,width:i})=>o.createElement(ge,{backgroundImage:n,width:i,key:e,title:e,color:t,onEnterPress:s,onFocus:l})))))))}function me(){const{ref:e,focusKey:t}=q(),[s,n]=(0,o.useState)(null),i=(0,o.useCallback)((e=>{n(e)}),[]),[r,a]=(0,o.useState)([]);(0,o.useEffect)((()=>{(()=>{J(this,void 0,void 0,(function*(){try{const e=yield fetch("https://stone-bronzed-river.glitch.me/data.json"),t=yield e.json();a(t.base[0].pages)}catch(e){a(Y)}}))})()}),[]);const u=(0,o.useCallback)((({y:t})=>{e.current.scrollTo({top:t,behavior:"smooth"})}),[e]);return o.createElement(z.Provider,{value:t},o.createElement(X,null,o.createElement(G,null,"What to Watch?"),o.createElement(Q,null,o.createElement(V,{color:s?s.color:"#565b6b",backgroundImage:s?s.backgroundImage:""}),o.createElement(ee,null,s?o.createElement("div",null,s.title):o.createElement("div",null),o.createElement("div",null,"Selected Item Text1"),o.createElement("div",null,"Selected Item Text2"),o.createElement("div",null,"Selected Item Text3"))),o.createElement(te,{ref:e},r.length>0?o.createElement("div",null,r.map(((e,t,s)=>o.createElement(be,{data:r[t].assets,key:e.title,title:e.title,onAssetPress:i,onFocus:u})))):o.createElement("div",null))))}class ve extends o.Component{constructor(e){super(e)}render(){return o.createElement(o.StrictMode,null,o.createElement(he,null,o.createElement(fe,null),o.createElement(pe,{focusKey:"MENU"}),o.createElement(me,null)))}}var Ce=s(745);new class{constructor(){this.render()}render(){(0,Ce.s)(document.getElementById("app")||document.createElement("div")).render(o.createElement(ve,{app:this},null))}}}},s={};function o(e){var n=s[e];if(void 0!==n)return n.exports;var i=s[e]={id:e,loaded:!1,exports:{}};return t[e](i,i.exports,o),i.loaded=!0,i.exports}o.m=t,e=[],o.O=function(t,s,n,i){if(!s){var r=1/0;for(l=0;l<e.length;l++){s=e[l][0],n=e[l][1],i=e[l][2];for(var a=!0,u=0;u<s.length;u++)(!1&i||r>=i)&&Object.keys(o.O).every((function(e){return o.O[e](s[u])}))?s.splice(u--,1):(a=!1,i<r&&(r=i));if(a){e.splice(l--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[s,n,i]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},function(){var e={179:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,i,r=s[0],a=s[1],u=s[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(u)var l=u(o)}for(t&&t(s);c<r.length;c++)i=r[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(l)},s=self.webpackChunkreact_typescript_webpack_starter=self.webpackChunkreact_typescript_webpack_starter||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}(),o.nc=void 0,o.O(void 0,[613],(function(){return o(1748)}));var n=o.O(void 0,[613],(function(){return o(1941)}));n=o.O(n)}();