"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1894],{79417:function(e,t,r){r.d(t,{VY:function(){return eS},ZA:function(){return eL},JO:function(){return ex},ck:function(){return eP},wU:function(){return ej},eT:function(){return eM},h_:function(){return ek},fC:function(){return ey},$G:function(){return eI},u_:function(){return eR},Z0:function(){return e_},xz:function(){return eC},B4:function(){return eE},l_:function(){return eO}});var n=r(45953),o=r(56945),l=r(43567);function a(e,[t,r]){return Math.min(r,Math.max(t,e))}var i=r(79346),c=r(47530),u=r(91951),s=r(18047),d=r(4670),p=r(57141),f=r(83137),v=r(72236),m=r(17709),h=r(41296),w=r(82840),g=r(73840),b=r(19285),y=r(67550),C=r(68691),E=r(97860),x=r(28268);let k=(0,o.forwardRef)((e,t)=>(0,o.createElement)(g.WV.span,(0,n.Z)({},e,{ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}})));var S=r(54367),O=r(13394);let L=[" ","Enter","ArrowUp","ArrowDown"],P=[" ","Enter"],M="Select",[j,R,I]=(0,c.B)(M),[_,V]=(0,s.b)(M,[I,h.D7]),T=(0,h.D7)(),[Z,D]=_(M),[W,B]=_(M),H=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,disabled:l=!1,...a}=e,c=T(r),s=D("SelectTrigger",r),d=s.disabled||l,p=(0,u.e)(t,s.onTriggerChange),f=R(r),[v,m,w]=eg(e=>{let t=f().filter(e=>!e.disabled),r=t.find(e=>e.value===s.value),n=eb(t,e,r);void 0!==n&&s.onValueChange(n.value)}),b=()=>{d||(s.onOpenChange(!0),w())};return(0,o.createElement)(h.ee,(0,n.Z)({asChild:!0},c),(0,o.createElement)(g.WV.button,(0,n.Z)({type:"button",role:"combobox","aria-controls":s.contentId,"aria-expanded":s.open,"aria-required":s.required,"aria-autocomplete":"none",dir:s.dir,"data-state":s.open?"open":"closed",disabled:d,"data-disabled":d?"":void 0,"data-placeholder":eh(s.value)?"":void 0},a,{ref:p,onClick:(0,i.M)(a.onClick,e=>{e.currentTarget.focus()}),onPointerDown:(0,i.M)(a.onPointerDown,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&t.releasePointerCapture(e.pointerId),0===e.button&&!1===e.ctrlKey&&(b(),s.triggerPointerDownPosRef.current={x:Math.round(e.pageX),y:Math.round(e.pageY)},e.preventDefault())}),onKeyDown:(0,i.M)(a.onKeyDown,e=>{let t=""!==v.current;e.ctrlKey||e.altKey||e.metaKey||1!==e.key.length||m(e.key),(!t||" "!==e.key)&&L.includes(e.key)&&(b(),e.preventDefault())})})))}),A=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,className:l,style:a,children:i,placeholder:c="",...s}=e,d=D("SelectValue",r),{onValueNodeHasChildrenChange:p}=d,f=void 0!==i,v=(0,u.e)(t,d.onValueNodeChange);return(0,E.b)(()=>{p(f)},[p,f]),(0,o.createElement)(g.WV.span,(0,n.Z)({},s,{ref:v,style:{pointerEvents:"none"}}),eh(d.value)?(0,o.createElement)(o.Fragment,null,c):i)}),N=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,children:l,...a}=e;return(0,o.createElement)(g.WV.span,(0,n.Z)({"aria-hidden":!0},a,{ref:t}),l||"▼")}),K="SelectContent",F=(0,o.forwardRef)((e,t)=>{let r=D(K,e.__scopeSelect),[a,i]=(0,o.useState)();return((0,E.b)(()=>{i(new DocumentFragment)},[]),r.open)?(0,o.createElement)(q,(0,n.Z)({},e,{ref:t})):a?(0,l.createPortal)((0,o.createElement)(U,{scope:e.__scopeSelect},(0,o.createElement)(j.Slot,{scope:e.__scopeSelect},(0,o.createElement)("div",null,e.children))),a):null}),[U,z]=_(K),q=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,position:l="item-aligned",onCloseAutoFocus:a,onEscapeKeyDown:c,onPointerDownOutside:s,side:d,sideOffset:m,align:h,alignOffset:w,arrowPadding:g,collisionBoundary:y,collisionPadding:C,sticky:E,hideWhenDetached:x,avoidCollisions:k,...L}=e,P=D(K,r),[M,j]=(0,o.useState)(null),[I,_]=(0,o.useState)(null),V=(0,u.e)(t,e=>j(e)),[T,Z]=(0,o.useState)(null),[W,B]=(0,o.useState)(null),H=R(r),[A,N]=(0,o.useState)(!1),F=(0,o.useRef)(!1);(0,o.useEffect)(()=>{if(M)return(0,S.Ry)(M)},[M]),(0,f.EW)();let z=(0,o.useCallback)(e=>{let[t,...r]=H().map(e=>e.ref.current),[n]=r.slice(-1),o=document.activeElement;for(let r of e)if(r===o||(null==r||r.scrollIntoView({block:"nearest"}),r===t&&I&&(I.scrollTop=0),r===n&&I&&(I.scrollTop=I.scrollHeight),null==r||r.focus(),document.activeElement!==o))return},[H,I]),q=(0,o.useCallback)(()=>z([T,M]),[z,T,M]);(0,o.useEffect)(()=>{A&&q()},[A,q]);let{onOpenChange:G,triggerPointerDownPosRef:J}=P;(0,o.useEffect)(()=>{if(M){let e={x:0,y:0},t=t=>{var r,n,o,l;e={x:Math.abs(Math.round(t.pageX)-(null!==(r=null===(n=J.current)||void 0===n?void 0:n.x)&&void 0!==r?r:0)),y:Math.abs(Math.round(t.pageY)-(null!==(o=null===(l=J.current)||void 0===l?void 0:l.y)&&void 0!==o?o:0))}},r=r=>{e.x<=10&&e.y<=10?r.preventDefault():M.contains(r.target)||G(!1),document.removeEventListener("pointermove",t),J.current=null};return null!==J.current&&(document.addEventListener("pointermove",t),document.addEventListener("pointerup",r,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",t),document.removeEventListener("pointerup",r,{capture:!0})}}},[M,G,J]),(0,o.useEffect)(()=>{let e=()=>G(!1);return window.addEventListener("blur",e),window.addEventListener("resize",e),()=>{window.removeEventListener("blur",e),window.removeEventListener("resize",e)}},[G]);let[$,Q]=eg(e=>{let t=H().filter(e=>!e.disabled),r=t.find(e=>e.ref.current===document.activeElement),n=eb(t,e,r);n&&setTimeout(()=>n.ref.current.focus())}),ee=(0,o.useCallback)((e,t,r)=>{let n=!F.current&&!r;(void 0!==P.value&&P.value===t||n)&&(Z(e),n&&(F.current=!0))},[P.value]),et=(0,o.useCallback)(()=>null==M?void 0:M.focus(),[M]),er=(0,o.useCallback)((e,t,r)=>{let n=!F.current&&!r;(void 0!==P.value&&P.value===t||n)&&B(e)},[P.value]),en="popper"===l?X:Y;return(0,o.createElement)(U,{scope:r,content:M,viewport:I,onViewportChange:_,itemRefCallback:ee,selectedItem:T,onItemLeave:et,itemTextRefCallback:er,focusSelectedItem:q,selectedItemText:W,position:l,isPositioned:A,searchRef:$},(0,o.createElement)(O.Z,{as:b.g7,allowPinchZoom:!0},(0,o.createElement)(v.M,{asChild:!0,trapped:P.open,onMountAutoFocus:e=>{e.preventDefault()},onUnmountAutoFocus:(0,i.M)(a,e=>{var t;null===(t=P.trigger)||void 0===t||t.focus({preventScroll:!0}),e.preventDefault()})},(0,o.createElement)(p.XB,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:c,onPointerDownOutside:s,onFocusOutside:e=>e.preventDefault(),onDismiss:()=>P.onOpenChange(!1)},(0,o.createElement)(en,(0,n.Z)({role:"listbox",id:P.contentId,"data-state":P.open?"open":"closed",dir:P.dir,onContextMenu:e=>e.preventDefault()},L,en===X?{side:d,sideOffset:m,align:h,alignOffset:w,arrowPadding:g,collisionBoundary:y,collisionPadding:C,sticky:E,hideWhenDetached:x,avoidCollisions:k}:{},{onPlaced:()=>N(!0),ref:V,style:{display:"flex",flexDirection:"column",outline:"none",...L.style},onKeyDown:(0,i.M)(L.onKeyDown,e=>{let t=e.ctrlKey||e.altKey||e.metaKey;if("Tab"===e.key&&e.preventDefault(),t||1!==e.key.length||Q(e.key),["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let t=H().filter(e=>!e.disabled).map(e=>e.ref.current);if(["ArrowUp","End"].includes(e.key)&&(t=t.slice().reverse()),["ArrowUp","ArrowDown"].includes(e.key)){let r=e.target,n=t.indexOf(r);t=t.slice(n+1)}setTimeout(()=>z(t)),e.preventDefault()}})}))))))}),Y=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,onPlaced:l,...i}=e,c=D(K,r),s=z(K,r),[d,p]=(0,o.useState)(null),[f,v]=(0,o.useState)(null),m=(0,u.e)(t,e=>v(e)),h=R(r),w=(0,o.useRef)(!1),b=(0,o.useRef)(!0),{viewport:y,selectedItem:C,selectedItemText:x,focusSelectedItem:k}=s,S=(0,o.useCallback)(()=>{if(c.trigger&&c.valueNode&&d&&f&&y&&C&&x){let e=c.trigger.getBoundingClientRect(),t=f.getBoundingClientRect(),r=c.valueNode.getBoundingClientRect(),n=x.getBoundingClientRect();if("rtl"!==c.dir){let o=n.left-t.left,l=r.left-o,i=e.left-l,c=e.width+i,u=Math.max(c,t.width),s=a(l,[10,window.innerWidth-10-u]);d.style.minWidth=c+"px",d.style.left=s+"px"}else{let o=t.right-n.right,l=window.innerWidth-r.right-o,i=window.innerWidth-e.right-l,c=e.width+i,u=Math.max(c,t.width),s=a(l,[10,window.innerWidth-10-u]);d.style.minWidth=c+"px",d.style.right=s+"px"}let o=h(),i=window.innerHeight-20,u=y.scrollHeight,s=window.getComputedStyle(f),p=parseInt(s.borderTopWidth,10),v=parseInt(s.paddingTop,10),m=parseInt(s.borderBottomWidth,10),g=p+v+u+parseInt(s.paddingBottom,10)+m,b=Math.min(5*C.offsetHeight,g),E=window.getComputedStyle(y),k=parseInt(E.paddingTop,10),S=parseInt(E.paddingBottom,10),O=e.top+e.height/2-10,L=C.offsetHeight/2,P=p+v+(C.offsetTop+L);if(P<=O){let e=C===o[o.length-1].ref.current;d.style.bottom="0px";let t=f.clientHeight-y.offsetTop-y.offsetHeight;d.style.height=P+Math.max(i-O,L+(e?S:0)+t+m)+"px"}else{let e=C===o[0].ref.current;d.style.top="0px";let t=Math.max(O,p+y.offsetTop+(e?k:0)+L);d.style.height=t+(g-P)+"px",y.scrollTop=P-O+y.offsetTop}d.style.margin="10px 0",d.style.minHeight=b+"px",d.style.maxHeight=i+"px",null==l||l(),requestAnimationFrame(()=>w.current=!0)}},[h,c.trigger,c.valueNode,d,f,y,C,x,c.dir,l]);(0,E.b)(()=>S(),[S]);let[O,L]=(0,o.useState)();(0,E.b)(()=>{f&&L(window.getComputedStyle(f).zIndex)},[f]);let P=(0,o.useCallback)(e=>{e&&!0===b.current&&(S(),null==k||k(),b.current=!1)},[S,k]);return(0,o.createElement)(G,{scope:r,contentWrapper:d,shouldExpandOnScrollRef:w,onScrollButtonChange:P},(0,o.createElement)("div",{ref:p,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:O}},(0,o.createElement)(g.WV.div,(0,n.Z)({},i,{ref:m,style:{boxSizing:"border-box",maxHeight:"100%",...i.style}}))))}),X=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,align:l="start",collisionPadding:a=10,...i}=e,c=T(r);return(0,o.createElement)(h.VY,(0,n.Z)({},c,i,{ref:t,align:l,collisionPadding:a,style:{boxSizing:"border-box",...i.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}}))}),[G,J]=_(K,{}),$="SelectViewport",Q=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,...l}=e,a=z($,r),c=J($,r),s=(0,u.e)(t,a.onViewportChange),d=(0,o.useRef)(0);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"}}),(0,o.createElement)(j.Slot,{scope:r},(0,o.createElement)(g.WV.div,(0,n.Z)({"data-radix-select-viewport":"",role:"presentation"},l,{ref:s,style:{position:"relative",flex:1,overflow:"auto",...l.style},onScroll:(0,i.M)(l.onScroll,e=>{let t=e.currentTarget,{contentWrapper:r,shouldExpandOnScrollRef:n}=c;if(null!=n&&n.current&&r){let e=Math.abs(d.current-t.scrollTop);if(e>0){let n=window.innerHeight-20,o=Math.max(parseFloat(r.style.minHeight),parseFloat(r.style.height));if(o<n){let l=o+e,a=Math.min(n,l),i=l-a;r.style.height=a+"px","0px"===r.style.bottom&&(t.scrollTop=i>0?i:0,r.style.justifyContent="flex-end")}}}d.current=t.scrollTop})}))))}),[ee,et]=_("SelectGroup"),er=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,...l}=e,a=(0,m.M)();return(0,o.createElement)(ee,{scope:r,id:a},(0,o.createElement)(g.WV.div,(0,n.Z)({role:"group","aria-labelledby":a},l,{ref:t})))}),en="SelectItem",[eo,el]=_(en),ea=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,value:l,disabled:a=!1,textValue:c,...s}=e,d=D(en,r),p=z(en,r),f=d.value===l,[v,h]=(0,o.useState)(null!=c?c:""),[w,b]=(0,o.useState)(!1),y=(0,u.e)(t,e=>{var t;return null===(t=p.itemRefCallback)||void 0===t?void 0:t.call(p,e,l,a)}),C=(0,m.M)(),E=()=>{a||(d.onValueChange(l),d.onOpenChange(!1))};if(""===l)throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return(0,o.createElement)(eo,{scope:r,value:l,disabled:a,textId:C,isSelected:f,onItemTextChange:(0,o.useCallback)(e=>{h(t=>{var r;return t||(null!==(r=null==e?void 0:e.textContent)&&void 0!==r?r:"").trim()})},[])},(0,o.createElement)(j.ItemSlot,{scope:r,value:l,disabled:a,textValue:v},(0,o.createElement)(g.WV.div,(0,n.Z)({role:"option","aria-labelledby":C,"data-highlighted":w?"":void 0,"aria-selected":f&&w,"data-state":f?"checked":"unchecked","aria-disabled":a||void 0,"data-disabled":a?"":void 0,tabIndex:a?void 0:-1},s,{ref:y,onFocus:(0,i.M)(s.onFocus,()=>b(!0)),onBlur:(0,i.M)(s.onBlur,()=>b(!1)),onPointerUp:(0,i.M)(s.onPointerUp,E),onPointerMove:(0,i.M)(s.onPointerMove,e=>{if(a){var t;null===(t=p.onItemLeave)||void 0===t||t.call(p)}else e.currentTarget.focus({preventScroll:!0})}),onPointerLeave:(0,i.M)(s.onPointerLeave,e=>{if(e.currentTarget===document.activeElement){var t;null===(t=p.onItemLeave)||void 0===t||t.call(p)}}),onKeyDown:(0,i.M)(s.onKeyDown,e=>{var t;(null===(t=p.searchRef)||void 0===t?void 0:t.current)!==""&&" "===e.key||(P.includes(e.key)&&E()," "===e.key&&e.preventDefault())})}))))}),ei="SelectItemText",ec=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,className:a,style:i,...c}=e,s=D(ei,r),d=z(ei,r),p=el(ei,r),f=B(ei,r),[v,m]=(0,o.useState)(null),h=(0,u.e)(t,e=>m(e),p.onItemTextChange,e=>{var t;return null===(t=d.itemTextRefCallback)||void 0===t?void 0:t.call(d,e,p.value,p.disabled)}),w=null==v?void 0:v.textContent,b=(0,o.useMemo)(()=>(0,o.createElement)("option",{key:p.value,value:p.value,disabled:p.disabled},w),[p.disabled,p.value,w]),{onNativeOptionAdd:y,onNativeOptionRemove:C}=f;return(0,E.b)(()=>(y(b),()=>C(b)),[y,C,b]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(g.WV.span,(0,n.Z)({id:p.textId},c,{ref:h})),p.isSelected&&s.valueNode&&!s.valueNodeHasChildren?(0,l.createPortal)(c.children,s.valueNode):null)}),eu=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,...l}=e;return el("SelectItemIndicator",r).isSelected?(0,o.createElement)(g.WV.span,(0,n.Z)({"aria-hidden":!0},l,{ref:t})):null}),es="SelectScrollUpButton",ed=(0,o.forwardRef)((e,t)=>{let r=z(es,e.__scopeSelect),l=J(es,e.__scopeSelect),[a,i]=(0,o.useState)(!1),c=(0,u.e)(t,l.onScrollButtonChange);return(0,E.b)(()=>{if(r.viewport&&r.isPositioned){let t=r.viewport;function e(){i(t.scrollTop>0)}return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),a?(0,o.createElement)(ev,(0,n.Z)({},e,{ref:c,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop-t.offsetHeight)}})):null}),ep="SelectScrollDownButton",ef=(0,o.forwardRef)((e,t)=>{let r=z(ep,e.__scopeSelect),l=J(ep,e.__scopeSelect),[a,i]=(0,o.useState)(!1),c=(0,u.e)(t,l.onScrollButtonChange);return(0,E.b)(()=>{if(r.viewport&&r.isPositioned){let t=r.viewport;function e(){let e=t.scrollHeight-t.clientHeight;i(Math.ceil(t.scrollTop)<e)}return e(),t.addEventListener("scroll",e),()=>t.removeEventListener("scroll",e)}},[r.viewport,r.isPositioned]),a?(0,o.createElement)(ev,(0,n.Z)({},e,{ref:c,onAutoScroll:()=>{let{viewport:e,selectedItem:t}=r;e&&t&&(e.scrollTop=e.scrollTop+t.offsetHeight)}})):null}),ev=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,onAutoScroll:l,...a}=e,c=z("SelectScrollButton",r),u=(0,o.useRef)(null),s=R(r),d=(0,o.useCallback)(()=>{null!==u.current&&(window.clearInterval(u.current),u.current=null)},[]);return(0,o.useEffect)(()=>()=>d(),[d]),(0,E.b)(()=>{var e;let t=s().find(e=>e.ref.current===document.activeElement);null==t||null===(e=t.ref.current)||void 0===e||e.scrollIntoView({block:"nearest"})},[s]),(0,o.createElement)(g.WV.div,(0,n.Z)({"aria-hidden":!0},a,{ref:t,style:{flexShrink:0,...a.style},onPointerDown:(0,i.M)(a.onPointerDown,()=>{null===u.current&&(u.current=window.setInterval(l,50))}),onPointerMove:(0,i.M)(a.onPointerMove,()=>{var e;null===(e=c.onItemLeave)||void 0===e||e.call(c),null===u.current&&(u.current=window.setInterval(l,50))}),onPointerLeave:(0,i.M)(a.onPointerLeave,()=>{d()})}))}),em=(0,o.forwardRef)((e,t)=>{let{__scopeSelect:r,...l}=e;return(0,o.createElement)(g.WV.div,(0,n.Z)({"aria-hidden":!0},l,{ref:t}))});function eh(e){return""===e||void 0===e}let ew=(0,o.forwardRef)((e,t)=>{let{value:r,...l}=e,a=(0,o.useRef)(null),i=(0,u.e)(t,a),c=(0,x.D)(r);return(0,o.useEffect)(()=>{let e=a.current,t=Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,"value").set;if(c!==r&&t){let n=new Event("change",{bubbles:!0});t.call(e,r),e.dispatchEvent(n)}},[c,r]),(0,o.createElement)(k,{asChild:!0},(0,o.createElement)("select",(0,n.Z)({},l,{ref:i,defaultValue:r})))});function eg(e){let t=(0,y.W)(e),r=(0,o.useRef)(""),n=(0,o.useRef)(0),l=(0,o.useCallback)(e=>{let o=r.current+e;t(o),function e(t){r.current=t,window.clearTimeout(n.current),""!==t&&(n.current=window.setTimeout(()=>e(""),1e3))}(o)},[t]),a=(0,o.useCallback)(()=>{r.current="",window.clearTimeout(n.current)},[]);return(0,o.useEffect)(()=>()=>window.clearTimeout(n.current),[]),[r,l,a]}function eb(e,t,r){var n;let o=t.length>1&&Array.from(t).every(e=>e===t[0])?t[0]:t,l=(n=Math.max(r?e.indexOf(r):-1,0),e.map((t,r)=>e[(n+r)%e.length]));1===o.length&&(l=l.filter(e=>e!==r));let a=l.find(e=>e.textValue.toLowerCase().startsWith(o.toLowerCase()));return a!==r?a:void 0}ew.displayName="BubbleSelect";let ey=e=>{let{__scopeSelect:t,children:r,open:n,defaultOpen:l,onOpenChange:a,value:i,defaultValue:c,onValueChange:u,dir:s,name:p,autoComplete:f,disabled:v,required:w}=e,g=T(t),[b,y]=(0,o.useState)(null),[E,x]=(0,o.useState)(null),[k,S]=(0,o.useState)(!1),O=(0,d.gm)(s),[L=!1,P]=(0,C.T)({prop:n,defaultProp:l,onChange:a}),[M,R]=(0,C.T)({prop:i,defaultProp:c,onChange:u}),I=(0,o.useRef)(null),_=!b||!!b.closest("form"),[V,D]=(0,o.useState)(new Set),B=Array.from(V).map(e=>e.props.value).join(";");return(0,o.createElement)(h.fC,g,(0,o.createElement)(Z,{required:w,scope:t,trigger:b,onTriggerChange:y,valueNode:E,onValueNodeChange:x,valueNodeHasChildren:k,onValueNodeHasChildrenChange:S,contentId:(0,m.M)(),value:M,onValueChange:R,open:L,onOpenChange:P,dir:O,triggerPointerDownPosRef:I,disabled:v},(0,o.createElement)(j.Provider,{scope:t},(0,o.createElement)(W,{scope:e.__scopeSelect,onNativeOptionAdd:(0,o.useCallback)(e=>{D(t=>new Set(t).add(e))},[]),onNativeOptionRemove:(0,o.useCallback)(e=>{D(t=>{let r=new Set(t);return r.delete(e),r})},[])},r)),_?(0,o.createElement)(ew,{key:B,"aria-hidden":!0,required:w,tabIndex:-1,name:p,autoComplete:f,value:M,onChange:e=>R(e.target.value),disabled:v},void 0===M?(0,o.createElement)("option",{value:""}):null,Array.from(V)):null))},eC=H,eE=A,ex=N,ek=e=>(0,o.createElement)(w.h,(0,n.Z)({asChild:!0},e)),eS=F,eO=Q,eL=er,eP=ea,eM=ec,ej=eu,eR=ed,eI=ef,e_=em},96223:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M12 3L12 21M12 21L20.5 12.5M12 21L3.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},47389:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},88734:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M2.95592 5.70436C2.55976 5.41246 2 5.69531 2 6.1874V17.8126C2 18.3047 2.55976 18.5875 2.95592 18.2956L10.8445 12.483C11.1699 12.2432 11.1699 11.7568 10.8445 11.517L2.95592 5.70436Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M13.9559 5.70436C13.5598 5.41246 13 5.69531 13 6.1874V17.8126C13 18.3047 13.5598 18.5875 13.9559 18.2956L21.8445 12.483C22.1699 12.2432 22.1699 11.7568 21.8445 11.517L13.9559 5.70436Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},42210:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M6 15L12 9L18 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},15102:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M6 18.4V5.6C6 5.26863 6.26863 5 6.6 5H9.4C9.73137 5 10 5.26863 10 5.6V18.4C10 18.7314 9.73137 19 9.4 19H6.6C6.26863 19 6 18.7314 6 18.4Z",stroke:"currentColor"}),n.createElement("path",{d:"M14 18.4V5.6C14 5.26863 14.2686 5 14.6 5H17.4C17.7314 5 18 5.26863 18 5.6V18.4C18 18.7314 17.7314 19 17.4 19H14.6C14.2686 19 14 18.7314 14 18.4Z",stroke:"currentColor"}))})},31131:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},54744:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M6.67742 20.5673C2.53141 18.0212 0.758026 12.7584 2.71678 8.1439C4.87472 3.0601 10.7453 0.68822 15.8291 2.84617C20.9129 5.00412 23.2848 10.8747 21.1269 15.9585C20.2837 17.945 18.8736 19.5174 17.1651 20.5673",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M17 16V20.4C17 20.7314 17.2686 21 17.6 21H22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M12 22.01L12.01 21.9989",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},33841:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M21.0441 5.70436C21.4402 5.41246 22 5.69531 22 6.1874V17.8126C22 18.3047 21.4402 18.5875 21.0441 18.2956L13.1555 12.483C12.8301 12.2432 12.8301 11.7568 13.1555 11.517L21.0441 5.70436Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M10.0441 5.70436C10.4402 5.41246 11 5.69531 11 6.1874V17.8126C11 18.3047 10.4402 18.5875 10.0441 18.2956L2.15555 12.483C1.8301 12.2432 1.8301 11.7568 2.15555 11.517L10.0441 5.70436Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},95630:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M1 13.8571V10.1429C1 9.03829 1.89543 8.14286 3 8.14286H5.9C6.09569 8.14286 6.28708 8.08544 6.45046 7.97772L12.4495 4.02228C13.1144 3.5839 14 4.06075 14 4.85714V19.1429C14 19.9392 13.1144 20.4161 12.4495 19.9777L6.45046 16.0223C6.28708 15.9146 6.09569 15.8571 5.9 15.8571H3C1.89543 15.8571 1 14.9617 1 13.8571Z",stroke:"currentColor"}),n.createElement("path",{d:"M17.5 7.5C17.5 7.5 19 9 19 11.5C19 14 17.5 15.5 17.5 15.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M20.5 4.5C20.5 4.5 23 7 23 11.5C23 16 20.5 18.5 20.5 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})},86492:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M18 14L20.0005 12M22 10L20.0005 12M20.0005 12L18 10M20.0005 12L22 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),n.createElement("path",{d:"M2 13.8571V10.1429C2 9.03829 2.89543 8.14286 4 8.14286H6.9C7.09569 8.14286 7.28708 8.08544 7.45046 7.97772L13.4495 4.02228C14.1144 3.5839 15 4.06075 15 4.85714V19.1429C15 19.9392 14.1144 20.4161 13.4495 19.9777L7.45046 16.0223C7.28708 15.9146 7.09569 15.8571 6.9 15.8571H4C2.89543 15.8571 2 14.9617 2 13.8571Z",stroke:"currentColor"}))})},34811:function(e,t,r){r.d(t,{Z:function(){return d}});var n=r(56945),o=r(10859),l=Object.defineProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,s=(e,t)=>{for(var r in t||(t={}))i.call(t,r)&&u(e,r,t[r]);if(a)for(var r of a(t))c.call(t,r)&&u(e,r,t[r]);return e},d=(0,n.forwardRef)((e,t)=>{let r=s(s({},n.useContext(o.s)),e);return n.createElement("svg",s({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),n.createElement("path",{d:"M6.90588 4.53682C6.50592 4.2998 6 4.58808 6 5.05299V18.947C6 19.4119 6.50592 19.7002 6.90588 19.4632L18.629 12.5162C19.0211 12.2838 19.0211 11.7162 18.629 11.4838L6.90588 4.53682Z",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))})}}]);