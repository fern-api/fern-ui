"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9562],{50317:function(e,t,n){n.d(t,{n:function(){return l}});let l=(0,n(56398).O4)("fern-stream",!0);l.debugLabel="FERN_STREAM_ATOM"},56112:function(e,t,n){n.d(t,{t:function(){return b}});var l=n(38093),i=n(26281),a=n(52636),r=n.n(a),s=n(92450),d=n(56945),o=n(32840),c=n(60139),u=n(90520);let h=r()(()=>Promise.resolve().then(n.bind(n,15208)).then(e=>{let{MdxContent:t}=e;return t}),{loadableGenerated:{webpack:()=>[15208]},ssr:!0}),m=r()(()=>n.e(2633).then(n.bind(n,32633)).then(e=>{let{ApiReferencePage:t}=e;return t}),{loadableGenerated:{webpack:()=>[32633]},ssr:!0}),x=r()(()=>n.e(2314).then(n.bind(n,42314)).then(e=>{let{ApiEndpointPage:t}=e;return t}),{loadableGenerated:{webpack:()=>[42314]},ssr:!0}),p=r()(()=>n.e(9866).then(n.bind(n,49866)).then(e=>{let{ChangelogPage:t}=e;return t}),{loadableGenerated:{webpack:()=>[49866]},ssr:!0}),f=r()(()=>n.e(1830).then(n.bind(n,91830)).then(e=>{let{ChangelogEntryPage:t}=e;return t}),{loadableGenerated:{webpack:()=>[91830]},ssr:!0}),v=r()(()=>Promise.all([n.e(3902),n.e(8643)]).then(n.bind(n,78643)).then(e=>{let{FeedbackPopover:t}=e;return t}),{loadableGenerated:{webpack:()=>[78643]},ssr:!1}),g=(0,d.memo)(e=>{let{content:t}=e;return(0,i.z)(t)._visit({"custom-markdown-page":e=>(0,l.jsx)(h,{mdx:e.mdx}),"api-reference-page":e=>(0,l.jsx)(m,{initialApi:e.apiDefinition,showErrors:e.showErrors}),"api-endpoint-page":e=>(0,l.jsx)(x,{item:e.item,showErrors:e.showErrors,types:e.types}),changelog:e=>(0,l.jsx)(p,{content:e}),"changelog-entry":e=>(0,l.jsx)(f,{content:e}),_other:()=>null})});function j(e){let{content:t}=e;return(0,o.ik)()?(0,l.jsx)(g,{content:t}):null}g.displayName="DocsMainContentRenderer";let b=(0,d.memo)(function(e){let{content:t}=e,{isInlineFeedbackEnabled:n}=(0,c.g)(),i=(0,s.useSearchParams)(),a=n?v:d.Fragment,r="true"===i.get("error")?j:g;return(0,l.jsx)(u.em,{children:(0,l.jsx)(a,{children:(0,l.jsx)(r,{content:t})})})})},41974:function(e,t,n){n.d(t,{I:function(){return f}});var l=n(38093),i=n(11932),a=n(30068),r=n(6249),s=n(74217),d=n(94236),o=n(20048),c=n(3340),u=n(56945),h=n(70067),m=n(15208);let x=(0,u.forwardRef)((e,t)=>{let{dismiss:n,className:d,...x}=e,p=(0,c.Dv)(h.Xl),f=(0,c.b9)(h.tx),v=(0,u.useRef)(null);return(0,a.y)(v,e=>{let[t]=e;null!=t&&f(t.contentRect.height)}),(0,u.useImperativeHandle)(t,()=>v.current),(0,l.jsx)(s.E.div,{ref:v,...x,className:(0,r.Z)("overflow-hidden",d),children:(0,l.jsxs)(s.E.div,{className:"min-h-8 bg-accent text-accent-contrast flex items-center",exit:{y:"-100%"},children:[(0,l.jsx)("div",{className:"text-center px-4 md:px-6 lg:px-8 max-w-page-width mx-auto flex-1",children:null!=p&&(0,l.jsx)(m.MdxContent,{mdx:p.mdx})}),(0,l.jsx)(i.sR,{variant:"minimal",className:"absolute right-0",icon:(0,l.jsx)(o.Z,{className:"!text-accent-contrast"}),onClick:n})]})})});x.displayName="AnnouncementInternal";let p=(0,s.E)(x,{forwardMotionProps:!0});function f(e){let{className:t}=e,n=(0,c.Dv)(h.Xl),[i,a]=(0,c.KO)(h.DW),r=(0,c.b9)(h.BD);return null==n?null:(0,l.jsx)(d.M,{mode:"popLayout",onExitComplete:()=>r(!1),children:!i&&(0,l.jsx)(p,{className:t,exit:{height:0},dismiss:()=>{r(!0),a(!0)}})})}},70564:function(e,t,n){n.d(t,{h:function(){return R}});var l=n(38093),i=n(11932),a=n(6249),r=n(35292),s=n(40111),d=n(3340),o=n(87578),c=n(56945),u=n(39864),h=n(2898),m=n(52021),x=n(18570),p=n(88593),f=n(47605),v=n(42e3),g=n(22659),j=n(63425),b=n(65221),N=n(87314),y=n(56175),w=n(75848),k=n(163);let Z=e=>{let{icon:t,value:n}=e;return(0,l.jsxs)("div",{className:"flex items-center gap-1",children:[(0,l.jsx)(t,{className:"size-icon-sm"}),n]})},D=e=>{let{repo:t}=e,{data:n}=(0,k.ZP)(t,b.N);return n?(0,l.jsxs)(p.M,{href:"https://github.com/".concat(t),icon:(0,l.jsx)(N.Z,{className:"!size-icon-lg",strokeWidth:1}),variant:"minimal",className:"h-10",children:[(0,l.jsx)("div",{className:"font-medium",children:t}),(0,l.jsxs)("div",{className:"flex gap-2 text-xs",children:[(0,l.jsx)(Z,{icon:y.Z,value:n.stars}),(0,l.jsx)(Z,{icon:w.Z,value:n.forks})]})]}):null};var E=n(1711),C=n(20048),I=n(96434);function z(){let e=(0,m.uc)(),t=(0,m.x3)(),n=(0,m.s7)();return(0,l.jsx)(i.sR,{onClickCapture:l=>{l.stopPropagation(),l.preventDefault(),e?t():n()},icon:e?(0,l.jsx)(C.Z,{}):(0,l.jsx)(I.Z,{className:"!size-icon-md"}),intent:e?"primary":"none",variant:e?"filled":"minimal",rounded:!0,size:"large"})}let M=(0,c.forwardRef)(function(e,t){let{className:n,style:o}=e,c=(0,d.Dv)(u.us),N=(0,h.cI)(),y=(0,m.mJ)(),w=(0,d.Dv)(f.$O),[k]=(0,v.X)(),Z="HEADER"===(0,d.Dv)(x.K2),C=(0,l.jsx)("div",{className:"lg-menu",children:(0,l.jsxs)(i.Pz,{children:[c.map((e,t)=>{var n;if("github"===e.type){let n=(0,b.l)(e.url);return n&&(0,l.jsx)(D,{repo:n},t)}return(0,l.jsx)(p.M,{className:"group cursor-pointer",href:e.url,icon:e.icon,intent:"primary"===e.type||"filled"===e.type?"primary":"none",rightIcon:null!==(n=e.rightIcon)&&void 0!==n?n:"primary"===e.type||"filled"===e.type&&t===c.length-1?(0,l.jsx)(r.Z,{className:"!size-icon transition-transform group-hover:translate-x-0.5"}):void 0,variant:"primary"===e.type?"outlined":"secondary"===e.type?"minimal":e.type,rounded:e.rounded,children:e.text},t)}),N.dark&&N.light&&(0,l.jsx)(j.U,{})]})}),I=c.find(e=>"github"===e.type),M=I&&(0,b.l)(I.url);return(0,l.jsxs)("nav",{"aria-label":"primary",className:(0,a.Z)("fern-header-content",n),ref:t,style:o,children:[(0,l.jsx)(E.f,{}),Z&&(0,l.jsx)("div",{className:(0,a.Z)("fern-header-searchbar",{invisible:w}),children:(0,l.jsx)(g.g,{className:"w-full"})}),(0,l.jsxs)("div",{className:(0,a.Z)("fern-header-right-menu",{"flex-1":Z}),children:[C,(0,l.jsxs)("div",{className:"max-lg-menu",children:[M&&(0,l.jsx)(D,{repo:M}),N.dark&&N.light&&(0,l.jsx)(j.U,{size:"large"}),k.isAvailable&&(0,l.jsx)(i.sR,{onClickCapture:e=>{e.stopPropagation(),y()},icon:(0,l.jsx)(s.Z,{className:"!size-icon-md"}),intent:"none",variant:"minimal",rounded:!0,size:"large",className:"max-sm:hidden"}),(0,l.jsx)(z,{})]})]})]})}),R=(0,c.memo)(M,(e,t)=>e.className===t.className&&(0,o.Z)(e.style,t.style))},1711:function(e,t,n){n.d(t,{f:function(){return Z}});var l=n(38093),i=n(3340),a=n(57795),r=n(45382),s=n(60139);let d=(0,a.cn)(e=>e(s.W).isDocsLogoTextEnabled?"docs":void 0);d.debugLabel="LOGO_TEXT_ATOM";let o=(0,a.cn)(e=>e(r.n).logoHref);o.debugLabel="LOGO_HREF_ATOM";let c=(0,a.cn)(e=>{var t;return null!==(t=e(r.n).logoHeight)&&void 0!==t?t:20});c.debugLabel="LOGO_HEIGHT_ATOM";var u=n(39864),h=n(53424),m=n(84305),x=n(2898),p=n(95273);function f(e){let{fileId:t,...n}=e;return(0,l.jsx)(p.x,{src:(0,m.T)(t),...n})}function v(){var e,t,n,a;let s=(0,x.cI)(),d=(0,i.Dv)(c),o=null!==(e=(0,i.Dv)(r.n).title)&&void 0!==e?e:"Logo";if(null!=s.dark&&null!=s.light)return(0,l.jsxs)(l.Fragment,{children:[null!=s.light.logo&&(0,l.jsx)(f,{alt:o,fileId:s.light.logo,className:"fern-logo-light",height:d,style:{height:d},priority:!0,loading:"eager",quality:100}),null!=s.dark.logo&&(0,l.jsx)(f,{alt:o,fileId:s.dark.logo,className:"fern-logo-dark",height:d,style:{height:d},priority:!0,loading:"eager",quality:100})]});{let e=null!==(a=null===(t=s.light)||void 0===t?void 0:t.logo)&&void 0!==a?a:null===(n=s.dark)||void 0===n?void 0:n.logo;return null==e?null:(0,l.jsx)(f,{fileId:e,className:"fern-logo",height:d,style:{height:d},priority:!0,loading:"eager",quality:100})}}var g=n(11932),j=n(99446),b=n(11391),N=n(83664);function y(e){return(0,l.jsx)(N.H,{...e,dropdownMenuElement:(0,l.jsx)(h.jZ,{href:""})})}var w=n(63728);let k=()=>{var e;let t=(0,i.Dv)(u.k8),n=(0,i.Dv)(u.fd),a=(0,w.DR)(),r=t.find(e=>{let{id:t}=e;return t===n});return t.length<=1?null:(0,l.jsx)("div",{className:"flex max-w-32",children:(0,l.jsx)(y,{value:n,options:t.map(e=>{let{id:t,title:n,availability:l,slug:i,pointsTo:r}=e;return{type:"value",label:n,helperText:null!=l?function(e){switch(e){case j.Availability.Beta:return"beta";case j.Availability.Deprecated:return"deprecated";case j.Availability.GenerallyAvailable:return"generally available";case j.Availability.Stable:return"stable";case j.Availability.InDevelopment:return"in development";case j.Availability.PreRelease:return"pre-release";default:return"unknown"}}(l):void 0,value:t,disabled:null==l,href:a(null!=r?r:i)}}),contentProps:{"data-testid":"version-dropdown-content"},children:(0,l.jsx)(g.sR,{"data-testid":"version-dropdown",intent:"primary",variant:"outlined",text:null!==(e=null==r?void 0:r.title)&&void 0!==e?e:n,rightIcon:(0,l.jsx)(b.Z,{className:"transition-transform data-[state=open]:rotate-180"}),disableAutomaticTooltip:!0})})})};function Z(){let e=(0,i.Dv)(o),t=(0,i.Dv)(u.k8),n=(0,i.Dv)(d);return(0,l.jsx)("div",{className:"relative flex h-full min-w-fit flex-1 shrink-0 items-center gap-2 py-1",children:(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsxs)(D,{href:e,children:[(0,l.jsx)(v,{}),null!=n&&n.length>0&&(0,l.jsx)("span",{className:"text-[1.5rem] lowercase font-heading ml-1 font-light text-accent",children:n})]}),t.length>1&&(0,l.jsx)("div",{children:(0,l.jsx)(k,{})})]})})}function D(e){let{children:t,href:n}=e,i=(0,l.jsx)("div",{className:"fern-logo-container",children:t});return null!=n?(0,l.jsx)(h.jZ,{href:n,children:i}):i}},36430:function(e,t,n){n.d(t,{a:function(){return o}});var l=n(38093),i=n(96919),a=n(3340),r=n(39864),s=n(53424),d=n(64964);function o(){let e=(0,a.Dv)(r.AW);return(0,l.jsx)("ul",{className:"fern-header-tabs-list",children:e.map(e=>(0,l.jsx)(c,{tab:e},e.index))})}function c(e){let{tab:t}=e,n=(0,a.Dv)(r.UE);return(0,l.jsx)("li",{className:"fern-header-tabs-list-item",children:(0,l.jsx)(s.jZ,{className:"fern-header-tab-button",href:(0,d.p)(t),"data-state":n===t.index?"active":"inactive",children:(0,l.jsxs)("div",{className:"flex min-w-0 items-center justify-start space-x-2",children:[t.icon&&(0,l.jsx)(i.Z,{icon:t.icon}),(0,l.jsx)("span",{className:"truncate font-medium",children:t.title})]})})})}},44713:function(e,t,n){n.d(t,{J:function(){return i}});var l=n(56945);function i(e){let[t,n]=(0,l.useState)(!1),i=(0,l.useCallback)(()=>(null==e?void 0:e.current)?e.current.scrollTop:window.scrollY,[e]);return(0,l.useEffect)(()=>{let t=()=>{n(i()>0)};if(t(),null==e?void 0:e.current){let n=e.current;return e.current.addEventListener("scroll",t),()=>{n.removeEventListener("scroll",t)}}return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}},[i,e]),t}},64964:function(e,t,n){n.d(t,{p:function(){return a}});var l=n(26281),i=n(63728);function a(e){let t=(0,i.DR)();return(0,l.z)(e,"type")._visit({tabGroup:e=>{var n;return t(null!==(n=e.pointsTo)&&void 0!==n?n:e.slug)},tabLink:e=>e.url,tabChangelog:e=>t(e.slug),_other:()=>"/"})}},84114:function(e,t,n){n.d(t,{Y:function(){return ec}});var l=n(38093),i=n(6249),a=n(3340),r=n(56945),s=n(52021),d=n(74217),o=n(94236),c=n(89565),u=n(32840),h=n(13479),m=n(7740),x=n(65913),p=n(18570),f=n(39864),v=n(44713),g=n(92086),j=n(35292),b=n(88593);function N(){let e=(0,a.Dv)(p.WS),t=(0,a.Dv)(f.us),n=(0,a.Dv)(u.RB);return null==t||0===t.length?null:(0,l.jsx)("div",{className:(0,i.Z)("border-concealed list-none -mx-4 border-t p-4 mt-4",{"lg:hidden":(null==e?void 0:e.disableHeader)!==!0}),children:null==t?void 0:t.map((e,a)=>{var r;return"github"===e.type?null:(0,l.jsx)(b.M,{icon:e.icon,href:e.url,text:e.text,rightIcon:null!==(r=e.rightIcon)&&void 0!==r?r:"primary"===e.type||"filled"===e.type&&a===t.length-1?(0,l.jsx)(j.Z,{className:"!size-icon"}):void 0,className:(0,i.Z)("w-full",{"mt-2":"primary"===e.type||"filled"===e.type}),variant:"primary"===e.type?"outlined":"secondary"===e.type?"minimal":e.type,intent:"primary"===e.type||"filled"===e.type?"primary":"none",size:n?"large":"normal"},a)})})}var y=n(2898),w=n(1711),k=n(63425),Z=n(22659);let D=e=>{let{className:t,showBorder:n}=e,s="SIDEBAR"===(0,a.Dv)(p.K2),d=(0,a.Dv)(y.p6),o=(0,a.Dv)(p.WS),c=(0,r.useMemo)(()=>s?(0,l.jsx)("div",{className:"fern-sidebar-searchbar-container",children:(0,l.jsx)(Z.g,{className:"w-full"})}):null,[s]);if(!s)return null;let u=(null==o?void 0:o.disableHeader)&&(0,l.jsxs)("div",{className:"fern-sidebar-header",children:[(0,l.jsx)(w.f,{}),(0,l.jsx)("div",{className:"-mr-3",children:d&&(0,l.jsx)(k.U,{size:"large"})})]});return(0,l.jsxs)("div",{className:(0,i.Z)("flex flex-col px-4",{"lg:pt-4":!u},t),"data-border":n?"show":"hide",children:[u,c]})};var E=n(96919),C=n(53424),I=n(64964);let z=(0,r.memo)(e=>{var t;let{tab:n,selected:a}=e;return(0,l.jsx)("li",{children:(0,l.jsx)(C.jZ,{className:(0,i.Z)("min-h-[32px] lg:min-h-[36px]","text-base lg:text-sm flex flex-1 py-2 lg:px-3 group/tab-button group-hover/tab-button:transition rounded-lg justify-start items-center select-none min-w-0 hover:t-accent","data-[state=active]:t-accent data-[state=inactive]:t-muted"),href:(0,I.p)(n),"data-state":a?"active":"inactive",children:(0,l.jsxs)("div",{className:"flex min-w-0 items-center justify-start space-x-4",children:[(0,l.jsx)("div",{className:"min-w-fit",children:(0,l.jsx)("div",{className:"flex size-6 items-center ring-1 shadow-sm ring-border-default justify-center rounded-md group-hover/tab-button:bg-tag-primary group-hover/tab-button:ring-accent/70 bg-card-surface group-data-[state=active]/tab-button:bg-accent group-data-[state=active]/tab-button:ring-0 group-hover/tab-button:group-data-[state=active]/tab-button:bg-accent",children:(0,l.jsx)(E.Z,{className:"size-4 bg-faded group-hover/tab-button:bg-accent group-data-[state=active]/tab-button:bg-background group-hover/tab-button:group-data-[state=active]/tab-button:bg-background",icon:null!==(t=n.icon)&&void 0!==t?t:"book-open"})})}),(0,l.jsx)("span",{className:"truncate font-medium group-data-[state=active]/tab-button:font-semibold",children:n.title})]})})})});var M=n(26281),R=n(52636),P=n.n(R),S=n(24498),T=n(26688);function A(e){let{nodes:t,open:n,renderNode:i,children:a}=e;return(0,l.jsxs)(T.fC,{open:n,children:[(0,l.jsx)(T.xz,{asChild:!0,children:a}),(0,l.jsx)(T.VY,{asChild:!0,children:(0,l.jsx)("ul",{className:"fern-sidebar-group",children:t.map(e=>(0,l.jsx)("li",{children:i(e)},e.id))})})]})}var L=n(47941),_=n(21917);function H(e){let{node:t,depth:n,shallow:i}=e,a=(0,s.u$)(t.id);return t.hidden&&!a?null:(0,l.jsx)(L.Z,{nodeId:t.id,slug:t.slug,title:t.title,depth:Math.max(0,n-1),hidden:t.hidden,icon:"webSocket"===t.type?(0,l.jsx)(_.gv,{method:"WSS",size:"sm",active:a}):"endpoint"===t.type&&t.isResponseStream?(0,l.jsx)(_.gv,{method:"STREAM",size:"sm",active:a}):(0,l.jsx)(_.gv,{method:t.method,size:"sm",active:a}),selected:a,shallow:i})}var O=n(13525),G=n(50317);function Y(e){let{node:t,depth:n,shallow:i}=e;return(0,a.Dv)(G.n)?(0,l.jsx)(H,{node:t.stream,depth:n,shallow:i}):(0,l.jsx)(H,{node:t.nonStream,depth:n,shallow:i})}var W=n(80289);function F(e){let{node:t,depth:n,className:i}=e;return(0,l.jsx)(L.G,{icon:t.icon,nodeId:t.id,className:i,depth:Math.max(n-1,0),title:t.title,rightElement:t.url.startsWith("http")&&(0,l.jsx)(W.Z,{className:"size-4 self-center text-faded"}),href:t.url})}function B(e){let{node:t,depth:n,className:i,shallow:a}=e,r=(0,s.u$)(t.id);return t.hidden&&!r?null:(0,l.jsx)(L.Z,{nodeId:t.id,className:i,slug:t.slug,depth:Math.max(n-1,0),title:t.title,selected:r,icon:t.icon,hidden:t.hidden,shallow:a})}function $(e){let{node:t,depth:n,shallow:i}=e;return(0,M.z)(t)._visit({page:e=>(0,l.jsx)(B,{node:e,depth:n,shallow:i}),link:e=>(0,l.jsx)(F,{node:e,depth:n}),endpoint:e=>(0,l.jsx)(H,{node:e,depth:n,shallow:i}),endpointPair:e=>(0,l.jsx)(Y,{node:e,depth:n,shallow:i}),webSocket:e=>(0,l.jsx)(H,{node:e,depth:n,shallow:i}),webhook:e=>(0,l.jsx)(H,{node:e,depth:n,shallow:i}),apiPackage:e=>(0,l.jsx)(U,{node:e,depth:n}),changelog:e=>(0,l.jsx)(O.SidebarChangelogNode,{node:e,depth:n})})}function U(e){let{node:t,depth:n,className:i}=e,a=(0,s.u$)(t.id),d=(0,s.ez)(t.id),o=(0,s.nj)(t.id),c=(0,s.iP)(t.id),u=(0,S.P5)(t),h=(0,r.useCallback)(e=>(0,l.jsx)($,{node:e,depth:n+1,shallow:u}),[n,u]);if(0===t.children.length)return null==t.overviewPageId||t.hidden&&!a?null:(0,l.jsx)(L.Z,{nodeId:t.id,className:i,slug:t.slug,depth:Math.max(n-1,0),title:t.title,selected:a,icon:t.icon,hidden:t.hidden,shallow:u});if(t.hidden&&!o)return null;if("apiReference"===t.type&&t.hideTitle)return(0,l.jsx)("ul",{className:"fern-sidebar-group",children:t.children.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)($,{node:e,depth:n,shallow:u})},e.id))});let m=o&&!c;return(0,l.jsx)(A,{open:c,nodes:t.children,renderNode:h,children:(0,l.jsx)(L.Z,{nodeId:t.id,icon:t.icon,className:i,depth:Math.max(n-1,0),title:t.title,expanded:c,toggleExpand:d,showIndicator:m,hidden:t.hidden,slug:null!=t.overviewPageId?t.slug:void 0,selected:a,shallow:u})})}function X(e){let{node:t,className:n,depth:i}=e,a=(0,s.u$)(t.id),d=(0,s.ez)(t.id),o=(0,s.nj)(t.id),c=(0,s.iP)(t.id),u=(0,r.useCallback)(e=>(0,l.jsx)(K,{node:e,depth:i+1}),[i]);if(0===t.children.length)return null!=t.overviewPageId?(0,l.jsx)(B,{node:{...t,type:"page",pageId:t.overviewPageId},depth:i,className:n}):null;if(t.hidden&&!o)return null;let h=o&&!c;return(0,l.jsx)(A,{open:c,nodes:t.children,renderNode:u,children:(0,l.jsx)(L.Z,{nodeId:t.id,icon:t.icon,className:n,depth:Math.max(i-1,0),title:t.title,expanded:c,toggleExpand:d,showIndicator:h,hidden:t.hidden,slug:null!=t.overviewPageId?t.slug:void 0,selected:a})})}let q=P()(()=>Promise.resolve().then(n.bind(n,13525)).then(e=>{let{SidebarChangelogNode:t}=e;return t}),{loadableGenerated:{webpack:()=>[13525]},ssr:!0});function K(e){let{node:t,depth:n,root:a}=e;return(0,M.z)(t)._visit({apiReference:e=>(0,l.jsx)(U,{node:e,depth:n}),section:e=>(0,l.jsx)(X,{node:e,depth:n,className:(0,i.Z)({"font-semibold !text-text-default":a})}),page:e=>(0,l.jsx)(B,{node:e,depth:n}),link:e=>(0,l.jsx)(F,{node:e,depth:n}),changelog:e=>(0,l.jsx)(q,{node:e,depth:n})})}function J(e){let{node:t}=e;return(0,l.jsx)("ul",{className:"fern-sidebar-group",children:t.children.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)(K,{node:e,depth:1,root:!0})},e.id))})}var V=n(61443);function Q(e){let{nodeChildren:t,shallow:n}=e;return(0,l.jsx)("ul",{className:"fern-sidebar-group",children:t.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)($,{node:e,depth:0,shallow:n})},e.id))})}function ee(e){let{node:t,className:n,shallow:a}=e,r=(0,s.u$)(t.id);return null==t.overviewPageId?(0,l.jsxs)("div",{className:(0,i.Z)("fern-sidebar-heading",n),children:[null!=t.icon&&(0,l.jsx)(E.Z,{icon:t.icon}),(0,l.jsx)("span",{className:"fern-sidebar-heading-content",children:t.title})]}):(0,l.jsx)(L.Z,{nodeId:t.id,linkClassName:"font-semibold !text-text-default",icon:t.icon,className:n,title:t.title,hidden:t.hidden,slug:t.slug,selected:r,shallow:a})}function et(e){let{node:t,className:n}=e,a=(0,s.u$)(t.id),r=(0,s.nj)(t.id),d=(0,S.P5)(t);return 0===t.children.length?null==t.overviewPageId||t.hidden&&!a?null:(0,l.jsx)(L.Z,{nodeId:t.id,linkClassName:"font-semibold !text-text-default",className:n,slug:t.slug,title:t.title,selected:a,icon:t.icon,hidden:t.hidden,shallow:d}):t.hidden&&!r?null:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(ee,{node:t,className:n,shallow:d}),(0,l.jsxs)("ul",{className:(0,i.Z)("fern-sidebar-group"),children:[t.children.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)($,{node:e,depth:1,shallow:d})},e.id)),"apiReference"===t.type&&null!=t.changelog&&(0,l.jsx)("li",{children:(0,l.jsx)($,{node:t.changelog,depth:1,shallow:d})})]})]})}function en(e){let{node:t}=e,n=(0,S.P5)(t);if(!t.hideTitle)return(0,l.jsx)("li",{className:"mt-6",children:(0,l.jsx)(et,{node:t})},t.id);let i=[];return[...t.children,...null!=t.changelog?[t.changelog]:[]].forEach(e=>{if("apiPackage"===e.type)i.push(e);else{let t=(0,V.Z)(i);(null==t?void 0:t.type)==="apiGroup"?t.children.push(e):i.push({type:"apiGroup",children:[e]})}}),(0,l.jsx)(l.Fragment,{children:i.map((e,t)=>"apiPackage"===e.type?(0,l.jsx)("li",{className:"mt-6",children:(0,l.jsx)(et,{node:e})},t):(0,l.jsx)("li",{className:"mt-6",children:(0,l.jsx)(Q,{nodeChildren:e.children,shallow:n})},t))})}function el(e){let{node:t,className:n}=e,a=(0,s.u$)(t.id),r=(0,s.nj)(t.id);return 0===t.children.length?null==t.overviewPageId||t.hidden&&!a?null:(0,l.jsx)(L.Z,{nodeId:t.id,linkClassName:"font-semibold !text-text-default",className:n,slug:t.slug,title:t.title,selected:a,icon:t.icon,hidden:t.hidden}):t.hidden&&!r?null:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(ee,{node:t,className:n}),(0,l.jsx)("ul",{className:(0,i.Z)("fern-sidebar-group"),children:t.children.map(e=>(0,l.jsx)("li",{children:(0,l.jsx)(K,{node:e,depth:1})},e.id))})]})}let ei=(0,r.memo)(function(e){let{node:t}=e;return(0,l.jsx)("ul",{className:"fern-sidebar-group",children:null==t?void 0:t.children.map(e=>(0,M.z)(e,"type")._visit({sidebarGroup:t=>(0,l.jsx)("li",{className:"mt-6",children:(0,l.jsx)(J,{node:t})},e.id),apiReference:t=>(0,l.jsx)(en,{node:t},e.id),section:t=>(0,l.jsx)("li",{className:"mt-6",children:(0,l.jsx)(el,{node:t})},e.id),_other:()=>null}))})}),ea=(0,r.forwardRef)(function(e,t){let n=(0,a.Dv)(p.WS),r=(0,a.Dv)(f.AW),d=(0,a.Dv)(f.UE),o=(0,f.qu)(),[c,h]=(0,a.KO)(s.B5),j=(0,v.J)({current:c}),b=(0,a.Dv)(u.RB),y=(0,s.uc)();return(0,s.DM)(),(0,l.jsxs)("nav",{"aria-label":"secondary",ref:t,...e,className:(0,i.Z)("fern-sidebar-container",e.className),children:[(0,l.jsx)(D,{showBorder:j||y&&b}),(0,l.jsx)(g.SearchSidebar,{children:(0,l.jsxs)(m.u,{rootClassName:"flex-1",className:(0,i.Z)("group/sidebar fern-sidebar-content",{"overscroll-contain":(null==n?void 0:n.disableHeader)===!0}),scrollbars:"vertical",ref:h,children:[r.length>0&&(0,l.jsx)("ul",{className:(0,i.Z)("fern-sidebar-tabs",{"lg:hidden":(null==n?void 0:n.disableHeader)!==!0&&(null==n?void 0:n.tabsPlacement)==="HEADER"}),children:r.map((e,t)=>(0,l.jsx)(z,{tab:e,selected:e.index===d},t))}),(0,l.jsx)(x.v,{children:(0,l.jsx)(ei,{node:o})}),(0,l.jsx)(N,{})]})})]})}),er=(0,r.memo)(ea),es=(0,d.E)(er),ed=[.16,1,.3,1];function eo(e){let{className:t}=e,n=(0,s.Ck)(),m=(0,a.Dv)(s.FS),x=(0,r.useRef)(null),p=(0,a.Dv)(u.wU)?0:.18;return(0,h.N)((0,c.vl)((e,t)=>{let n=e=>{t(s.zr,t=>{var n,l;return e.clientX<20||!!(t&&e.target instanceof HTMLElement)&&null!==(l=null===(n=x.current)||void 0===n?void 0:n.contains(e.target))&&void 0!==l&&l})};return window.addEventListener("mousemove",n),()=>{window.removeEventListener("mousemove",n),t(s.zr,!1)}},[])),(0,l.jsxs)(o.M,{children:[m&&(0,l.jsx)(d.E.div,{className:"inset-0 fixed bg-background/50 z-20 lg:hidden",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:p,curve:ed},onClickCapture:n}),m&&(0,l.jsx)(es,{ref:x,className:(0,i.Z)("dismissable z-50",t),initial:{x:"-100%"},animate:{x:0},exit:{x:"-100%"},transition:{duration:p,curve:ed}},"sidebar")]})}let ec=(0,r.memo)(function(e){let{className:t}=e,n=(0,a.Dv)(s.r4);return(0,a.Dv)(s.B8)?null:n?(0,l.jsx)(eo,{className:t}):(0,l.jsx)(er,{className:(0,i.Z)("desktop",t)})})},47941:function(e,t,n){n.d(t,{G:function(){return b},Z:function(){return N}});var l=n(38093),i=n(65913),a=n(96919),r=n(6249),s=n(11391),d=n(32739),o=n(56945),c=n(52021),u=n(13479),h=n(32840),m=n(53424),x=n(63728),p=n(76841),f=n(73397),v=n.n(f);let g=n(73826).noop,j=(0,o.forwardRef)((e,t)=>{var n;let{icon:c,className:u,linkClassName:h,title:x,onClick:p,shallow:f,scroll:v,href:g,selected:j,showIndicator:b,depth:N=0,toggleExpand:y,expanded:w=!1,rightElement:k,tooltipContent:Z,target:D,rel:E,hidden:C,as:I="span"}=e,z=(0,o.useRef)(null);if((0,o.useImperativeHandle)(t,()=>z.current),C&&!w&&!j)return null;let M=(null!=y||w)&&(0,l.jsx)("span",{className:(0,r.W)("fern-sidebar-link-expand",{"opacity-50 transition-opacity group-hover:opacity-80":!b}),"data-state":b?"active":"inactive",children:(0,l.jsx)(s.Z,{className:(0,r.Z)("size-icon-md lg:size-icon",{"-rotate-90":!w,"rotate-0":w})})});return(0,l.jsx)("div",{ref:z,className:(0,r.Z)("fern-sidebar-link-container",u),"data-state":j?"active":"inactive",children:(n=(e=>{let t=(0,r.Z)(h,"fern-sidebar-link",{"opacity-50":C});return null!=g?(0,l.jsx)(m.jZ,{href:g,className:t,onClick:e=>{null==p||p(e),null==y||y()},shallow:f,target:D,rel:E,scroll:v,children:e}):(0,l.jsx)("button",{className:t,onClick:e=>{null==p||p(e),null==y||y()},children:e})})((0,l.jsxs)(l.Fragment,{children:[(0,d.Z)(0,N).map(e=>(0,l.jsx)("div",{className:"fern-sidebar-link-indent"},e)),(0,l.jsxs)("span",{className:"fern-sidebar-link-content",children:[null!=c&&(0,l.jsx)("span",{className:"fern-sidebar-icon",children:"string"==typeof c?(0,l.jsx)(a.Z,{icon:c,className:"bg-faded group-data-[state=active]:bg-accent"}):c}),(0,o.createElement)(I,{className:"fern-sidebar-link-text"},x),k]}),M]})),null==Z?n:(0,l.jsx)(i.k,{content:Z,side:"right",children:n}))})});j.displayName="SidebarLink";let b=(0,o.memo)(j),N=(0,o.forwardRef)((e,t)=>{let{slug:n,onClick:i,toggleExpand:a,...r}=e,s=(0,o.useRef)(null);(0,o.useImperativeHandle)(t,()=>s.current);let d=(0,c.x3)();(0,u.N)((0,o.useCallback)(t=>{e.selected&&function(e,t){let n=!(arguments.length>2)||void 0===arguments[2]||arguments[2];null!=e&&null!=t&&setTimeout(()=>{v().clear(g),g=v().measure(()=>{t.offsetTop>=e.scrollTop&&t.offsetTop+t.clientHeight<=e.scrollTop+e.clientHeight||e.scrollTo({top:t.offsetTop-e.clientHeight/3,behavior:n?"smooth":"auto"})})},0)}(t(c.B5),s.current,!t(h.aM))},[e.selected]));let m=(0,x.oQ)(n),f=(0,o.useCallback)(e=>{null==i||i(e),null!=m&&(d(),r.shallow&&(0,p.scrollToRoute)(m))},[d,m,r.shallow,i]);return(0,l.jsx)(b,{...r,ref:s,href:m,onClick:f,toggleExpand:a,shallow:r.shallow||r.selected,scroll:!r.shallow})});N.displayName="SidebarSlugLink"},13525:function(e,t,n){n.r(t),n.d(t,{SidebarChangelogNode:function(){return u}});var l=n(38093),i=n(36555),a=n(52021),r=n(50064),s=n.n(r);class d{static toShortDateString(e){return o(e).format("MMM DD YYYY")}static toLongDateString(e){return o(e).format("MMMM D, YYYY")}static toCalendarDate(e){return o(e).calendar({sameDay:"[today]",nextDay:"[tomorrow]",nextWeek:"dddd",lastDay:"[yesterday]",lastWeek:"[last] dddd",sameElse:"M/D/YYYY"})}static withinLastWeek(e){let t=o(),n=o(e);return!n.isAfter(t)&&n.isSameOrAfter(t.subtract(7,"days"))}static isFutureDate(e){let t=o();return o(e).isAfter(t)}}function o(e){return s()(e).parseZone().startOf("day")}var c=n(47941);function u(e){var t;let{node:n,depth:r,className:s}=e,o=(0,a.u$)(n.id);return n.hidden&&!o?null:(0,l.jsx)(c.Z,{nodeId:n.id,slug:n.slug,title:n.title,className:s,selected:o,depth:Math.max(0,r-1),icon:null!==(t=n.icon)&&void 0!==t?t:(0,l.jsx)(i.Z,{}),tooltipContent:function(e){var t,n;let l=null===(n=e.children[0])||void 0===n?void 0:null===(t=n.children[0])||void 0===t?void 0:t.children[0];if(null!=l)return"Last updated ".concat(d.toCalendarDate(l.date))}(n),hidden:n.hidden})}},63425:function(e,t,n){n.d(t,{U:function(){return h}});var l=n(38093),i=n(11932),a=n(56945),r=n(88186),s=n(6249),d=n(80386),o=n(26408),c=n(21433),u=n(2898);let h=(0,a.memo)(e=>{let{className:t,...n}=e,h=(0,u.Fg)(),m=(0,u.Iy)(),x=(0,u.EO)(),p=function(){let[e,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{t(!0)},[]),e}(),[f,v]=(0,a.useState)(!1),g=p&&"dark"===h?d.Z:o.Z;return(0,l.jsxs)(r.fC,{open:f,onOpenChange:e=>{e||v(!1)},children:[(0,l.jsx)(r.xz,{asChild:!0,children:(0,l.jsx)(i.sR,{...n,className:(0,s.Z)("fern-theme-button",t),onClick:m,onContextMenu:e=>{e.preventDefault(),v(!0)},rounded:!0,variant:"minimal",intent:"primary",icon:(0,l.jsx)(g,{className:"fern-theme-button-icon !size-icon max-lg:!size-icon-md"}),title:"toggle theme"})}),(0,l.jsx)(r.h_,{children:(0,l.jsx)(r.VY,{sideOffset:5,side:"bottom",align:"center",children:(0,l.jsx)(i.sR,{onClick:()=>{x(),v(!1)},variant:"outlined",intent:"none",icon:(0,l.jsx)(c.Z,{className:"fern-theme-button-icon"}),text:"Auto",title:"set system theme"})})})]})});h.displayName="ThemeButton"}}]);