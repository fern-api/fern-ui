"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6858],{16858:function(e,t,r){r.r(t),r.d(t,{Endpoint:function(){return eE}});var a=r(38093),n=r(3340),l=r(56945),s=r(50317),o=r(39864),i=r(39329),d=r(6249),u=r(69343),p=r(57795),c=r(56398),h=r(87578),m=r(52636),v=r.n(m),y=r(89565),f=r(32840),x=r(85186),g=r(13479),b=r(51566),j=r(94676),C=r(18570),k=r(63728),w=r(487),P=r(32235),N=r(7609),S=r(62203),E=r(28012),I=r(93796),T=r(2171);let R=(0,l.memo)(e=>{let{endpoint:t,streamToggle:r}=e,n=(0,N.Vl)();return(0,a.jsxs)("header",{className:"space-y-1 pb-2 pt-8",children:[(0,a.jsx)(S.k,{breadcrumbs:t.breadcrumbs}),(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("h1",{className:"fern-page-heading",children:t.title}),null!=t.availability&&(0,a.jsx)("span",{className:"inline-block ml-2 align-text-bottom",children:(0,a.jsx)(I.f,{availability:t.availability,minimal:!0})})]}),r]}),(0,a.jsx)(T.S,{path:t.path,method:t.method,selectedEnvironment:(0,E.qx)(t,n),showEnvironment:!0,large:!0})]})});R.displayName="EndpointContentHeader";var q=r(26281),B=r(41368),O=r(61739),M=r(96881),A=r(60139),L=r(23028),_=r(84637),z=r(36288),H=r(67639),G=r(33787),W=r(88752);let D={400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",409:"Conflict",412:"Precondition Failed",413:"Payload Too Large",422:"Unprocessable Entity",429:"Too Many Requests",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout"},V=(0,l.memo)(function(e){var t;let{error:r,isFirst:n,isLast:l,isSelected:s,onHoverProperty:o,onClick:i,anchorIdParts:u,slug:p,availability:c,types:h}=e;return(0,a.jsxs)("button",{className:(0,d.Z)("space flex flex-col items-start px-3 hover:bg-tag-default-soft transition-colors py-3",{"bg-tag-default-soft":s},{"border-default border-b":!l},{"rounded-t-md":n,"rounded-b-md":l}),onClick:i,children:[(0,a.jsxs)("div",{className:"flex items-baseline space-x-2",children:[(0,a.jsx)("div",{className:"rounded-lg bg-tag-danger px-2 py-1 text-xs text-intent-danger",children:r.statusCode}),(0,a.jsx)("div",{className:"t-muted text-xs",children:null!=r.name?(0,H.Q)(r.name):null!==(t=D[r.statusCode])&&void 0!==t?t:"Unknown"}),null!=c&&(0,a.jsx)(I.f,{availability:c,minimal:!0})]}),null!=r.shape&&(0,a.jsx)(z.u,{isOpen:s,className:"w-full",children:(0,a.jsxs)("div",{className:"space-y-2 pt-2",children:[(0,a.jsx)("div",{className:"t-muted w-full text-start text-sm leading-7",children:"This error return ".concat((0,W.iz)(r.shape,{withArticle:!0},h),".")}),!function e(t,r){return(0,q.z)((0,E.I9)(t,r),"type")._visit({primitive:()=>!0,literal:()=>!0,object:e=>0===(0,E.lW)(e,r).length,undiscriminatedUnion:()=>!1,discriminatedUnion:()=>!1,enum:()=>!1,optional:t=>e(t.shape,r),list:t=>e(t.shape,r),set:t=>e(t.shape,r),map:()=>!1,unknown:()=>!0,alias:t=>e(t.shape,r),_other:()=>!0})}(r.shape,h)?(0,a.jsx)("div",{className:"w-full text-start",children:(0,a.jsx)(G.r,{isCollapsible:!0,applyErrorStyles:!0,shape:r.shape,onHoverProperty:o,anchorIdParts:u,slug:p,types:h,isResponse:!0})}):null]})})]})});var Z=r(87220);let F=e=>{let{requestBody:t,onHoverProperty:r,anchorIdParts:n,slug:s,types:o}=e;return(0,a.jsxs)("div",{className:"flex flex-col",children:[(0,a.jsx)(L.Markdown,{size:"sm",className:(0,d.Z)("t-muted pb-5 leading-6",{"border-default border-b":"formData"!==t.shape.type}),mdx:t.description,fallback:"This endpoint expects ".concat((0,E.qb)(t.shape,{formData:e=>{let t=e.properties.filter(e=>"fileArray"===e.type),r=e.properties.filter(e=>"file"===e.type);return"a multipart form".concat(t.length>0||r.length>1?" with multiple files":null!=r[0]?" containing ".concat(r[0].isOptional?"an optional":"a"," file"):"")},bytes:e=>"binary data".concat(null!=e.contentType?" of type ".concat(e.contentType):""),typeShape:e=>(0,W.iz)(e,{withArticle:!0},o)}),".")}),(0,E.qb)(t.shape,{formData:e=>e.properties.map(e=>(0,a.jsxs)(l.Fragment,{children:[(0,a.jsx)(_.W,{}),(0,q.z)(e,"type")._visit({file:e=>(0,a.jsx)(Z.G,{name:e.key,description:e.description,typeShorthand:(0,W.fk)(e),anchorIdParts:[...n,e.key],slug:s,availability:e.availability}),fileArray:e=>(0,a.jsx)(Z.G,{name:e.key,description:e.description,typeShorthand:(0,W.fk)(e),anchorIdParts:[...n,e.key],slug:s,availability:e.availability}),bodyProperty:e=>(0,a.jsx)(Z.X,{name:e.key,description:null!=e.description?e.description:(0,E.Cy)(e.valueShape,o),shape:e.valueShape,anchorIdParts:[...n,e.key],slug:s,availability:e.availability,types:o}),_other:()=>null})]},e.key)),bytes:()=>null,typeShape:e=>(0,a.jsx)(G.r,{shape:e,isCollapsible:!1,onHoverProperty:r,anchorIdParts:n,slug:s,applyErrorStyles:!1,types:o})})]})};var U=r(90520);let X=e=>{let{responseBody:t,onHoverProperty:r,anchorIdParts:n,slug:l,types:s}=e,{isAudioFileDownloadSpanSummary:o}=(0,A.g)();return(0,a.jsxs)("div",{children:[(0,a.jsx)(L.Markdown,{size:"sm",className:"!t-muted border-default border-b pb-5 leading-6",mdx:t.description,fallback:function(e){let{responseBody:t,types:r,isAudioFileDownloadSpanSummary:n}=e;return"fileDownload"===t.shape.type?n?(0,a.jsxs)("span",{children:["This endpoint returns an ",(0,a.jsx)("code",{children:"audio/mpeg"})," file."]}):"This endpoint returns a file.":"streamingText"===t.shape.type?"This endpoint sends text responses over a long-lived HTTP connection.":"streamCondition"===t.shape.type?"This endpoint returns a stream.":"stream"===t.shape.type?"This endpoint returns a stream of ".concat((0,W.iz)(t.shape.value,{withArticle:!1},r),"."):"This endpoint returns ".concat((0,W.iz)(t.shape,{withArticle:!0},r),".")}({responseBody:t,types:s,isAudioFileDownloadSpanSummary:o})}),(0,E.x5)(t.shape,{fileDownload:()=>null,streamingText:()=>(console.error("Generated API Reference contains a deprecated streamingText shape. Please upgrade Fern CLI and regenerate the API Reference."),(0,a.jsx)(U.Om,{component:"EndpointResponseSection",error:"Stream condition cannot be rendered"})),streamCondition:()=>(console.error("Generated API Reference contains a deprecated streamCondition shape. Please upgrade Fern CLI and regenerate the API Reference."),(0,a.jsx)(U.Om,{component:"EndpointResponseSection",error:"Stream condition cannot be rendered"})),stream:e=>(0,a.jsx)(G.r,{shape:e.value,isCollapsible:!1,onHoverProperty:r,anchorIdParts:n,slug:l,applyErrorStyles:!1,types:s,isResponse:!0}),typeShape:e=>(0,a.jsx)(G.r,{shape:e,isCollapsible:!1,onHoverProperty:r,anchorIdParts:n,slug:l,applyErrorStyles:!1,types:s,isResponse:!0})})]})};var K=r(72687);let Q=["request"],J=["response"],Y=["request","path"],$=["request","query"],ee=["request","header"],et=["request","body"],er=["response","body"],ea=["response","error"],en=(0,l.memo)(e=>{let t,{endpoint:r,showErrors:n,onHoverRequestProperty:l,onHoverResponseProperty:s,selectedError:o,setSelectedError:i,types:d}=e,{isAuthEnabledInDocs:u}=(0,A.g)();r.auth&&u&&(t=(0,q.z)(r.auth,"type")._visit({basicAuth:()=>({key:"Authorization",description:"Basic authentication of the form Basic <username:password>.",hidden:!1,valueShape:{type:"unknown",displayName:"string"},availability:void 0}),bearerAuth:()=>({key:"Authorization",description:"Bearer authentication of the form Bearer <token>, where token is your auth token.",hidden:!1,valueShape:{type:"unknown",displayName:"string"},availability:void 0}),header:e=>({key:e.headerWireValue,description:null!=e.prefix?"Header authentication of the form ".concat(e.prefix," <token>"):void 0,hidden:!1,valueShape:{type:"unknown",displayName:"string"},availability:void 0}),oAuth:e=>(0,q.z)(e.value,"type")._visit({clientCredentials:e=>(0,q.z)(e.value,"type")._visit({referencedEndpoint:()=>({key:"Authorization",description:"OAuth authentication of the form Bearer <token>.",hidden:!1,valueShape:{type:"unknown",displayName:"string"},availability:void 0})})})}));let p=r.headers.filter(e=>!e.hidden);return t&&(p=[t,...p]),(0,a.jsxs)("div",{className:"flex max-w-full flex-1 flex-col gap-12",children:[(0,a.jsx)(L.Markdown,{className:"text-base leading-6",mdx:r.description}),r.pathParameters.length>0&&(0,a.jsx)(K.c,{title:"Path parameters",anchorIdParts:Y,slug:r.slug,children:(0,a.jsx)("div",{children:r.pathParameters.map(e=>(0,a.jsxs)("div",{children:[(0,a.jsx)(_.W,{}),(0,a.jsx)(Z.X,{name:e.key,shape:e.valueShape,anchorIdParts:[...Y,e.key],slug:r.slug,description:(0,E.Oo)(e,d),availability:e.availability,types:d})]},e.key))})}),p.length>0&&(0,a.jsx)(K.c,{title:"Headers",anchorIdParts:ee,slug:r.slug,children:(0,a.jsx)("div",{children:p.map(e=>{let t=!1,n=r.auth;return((null==n?void 0:n.type)==="header"&&e.key===(null==n?void 0:n.headerWireValue)||"Authorization"===e.key)&&(t=!0),(0,a.jsxs)("div",{className:"relative",children:[t&&(0,a.jsx)("div",{className:"absolute right-0 top-3",children:(0,a.jsx)("div",{className:"px-2 bg-tag-danger rounded-xl flex items-center h-5",children:(0,a.jsx)("span",{className:"text-xs t-danger",children:"Auth"})})}),(0,a.jsx)(_.W,{}),(0,a.jsx)(Z.X,{name:e.key,shape:e.valueShape,anchorIdParts:[...ee,e.key],slug:r.slug,description:(0,E.Oo)(e,d),availability:e.availability,types:d})]},e.key)})})}),r.queryParameters.length>0&&(0,a.jsx)(K.c,{title:"Query parameters",anchorIdParts:$,slug:r.slug,children:(0,a.jsx)("div",{children:r.queryParameters.map(e=>(0,a.jsxs)("div",{children:[(0,a.jsx)(_.W,{}),(0,a.jsx)(Z.X,{name:e.key,shape:e.valueShape,anchorIdParts:[...$,e.key],slug:r.slug,description:(0,E.Oo)(e,d),availability:e.availability,types:d})]},e.key))})}),null!=r.requestBody&&(0,a.jsx)(K.c,{title:"Request",anchorIdParts:Q,slug:r.slug,children:(0,a.jsx)(F,{requestBody:r.requestBody,onHoverProperty:l,anchorIdParts:et,slug:r.slug,types:d})},r.requestBody.contentType),null!=r.responseBody&&(0,a.jsx)(K.c,{title:"Response",anchorIdParts:J,slug:r.slug,children:(0,a.jsx)(X,{responseBody:r.responseBody,onHoverProperty:s,anchorIdParts:er,slug:r.slug,types:d})}),n&&r.errors.length>0&&(0,a.jsx)(K.c,{title:"Errors",anchorIdParts:ea,slug:r.slug,children:(0,a.jsx)("div",{className:"border-default flex flex-col overflow-visible rounded-lg border",children:(0,B.Z)(r.errors,e=>e.statusCode,e=>e.name).map((e,t)=>{var n;return(0,a.jsx)(V,{error:e,isFirst:0===t,isLast:t===r.errors.length-1,isSelected:null!=o&&e.statusCode===o.statusCode&&(null!=e.name&&null!=o.name?e.name===o.name:null==e.name&&null==o.name),onClick:t=>{t.stopPropagation(),i(e)},onHoverProperty:s,anchorIdParts:[...ea,"".concat(null!==(n=el(e.name))&&void 0!==n?n:e.statusCode)],slug:r.slug,availability:e.availability,types:d},t)})})})]})});function el(e){if(null!=e)return(0,O.Z)((0,M.Z)(e))}var es=r(14472),eo=r(10859),ei=Object.defineProperty,ed=Object.getOwnPropertySymbols,eu=Object.prototype.hasOwnProperty,ep=Object.prototype.propertyIsEnumerable,ec=(e,t,r)=>t in e?ei(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,eh=(e,t)=>{for(var r in t||(t={}))eu.call(t,r)&&ec(e,r,t[r]);if(ed)for(var r of ed(t))ep.call(t,r)&&ec(e,r,t[r]);return e};let em=(0,l.forwardRef)((e,t)=>{let r=eh(eh({},l.useContext(eo.s)),e);return l.createElement("svg",eh({width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",strokeWidth:1.5,fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),l.createElement("path",{d:"M9.8525 14.6334L3.65151 10.6873C2.41651 9.90141 2.41651 8.09858 3.65151 7.31268L9.8525 3.36659C11.1628 2.53279 12.8372 2.53279 14.1475 3.36659L20.3485 7.31268C21.5835 8.09859 21.5835 9.90142 20.3485 10.6873L14.1475 14.6334C12.8372 15.4672 11.1628 15.4672 9.8525 14.6334Z",stroke:"currentColor"}),l.createElement("path",{d:"M18.2857 12L20.3485 13.3127C21.5835 14.0986 21.5835 15.9014 20.3485 16.6873L14.1475 20.6334C12.8372 21.4672 11.1628 21.4672 9.8525 20.6334L3.65151 16.6873C2.41651 15.9014 2.41651 14.0986 3.65151 13.3127L5.71429 12",stroke:"currentColor"}))});var ev=Object.defineProperty,ey=Object.getOwnPropertySymbols,ef=Object.prototype.hasOwnProperty,ex=Object.prototype.propertyIsEnumerable,eg=(e,t,r)=>t in e?ev(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,eb=(e,t)=>{for(var r in t||(t={}))ef.call(t,r)&&eg(e,r,t[r]);if(ey)for(var r of ey(t))ex.call(t,r)&&eg(e,r,t[r]);return e};let ej=(0,l.forwardRef)((e,t)=>{let r=eb(eb({},l.useContext(eo.s)),e);return l.createElement("svg",eb({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:t},r),l.createElement("path",{d:"M17.5 8C17.5 8 19 9.5 19 12C19 14.5 17.5 16 17.5 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M20.5 5C20.5 5 23 7.5 23 12C23 16.5 20.5 19 20.5 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M6.5 8C6.5 8 5 9.5 5 12C5 14.5 6.5 16 6.5 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M3.5 5C3.5 5 1 7.5 1 12C1 16.5 3.5 19 3.5 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),l.createElement("path",{d:"M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))}),eC=[{type:"value",value:"batch",label:"Batch",icon:(0,a.jsx)(em,{})},{type:"value",value:"stream",label:"Stream",icon:(0,a.jsx)(ej,{})}],ek=e=>{let{value:t,setValue:r,className:n}=e;return(0,a.jsx)(es.P,{options:eC,onValueChange:(0,l.useCallback)(e=>r("stream"===e),[r]),value:t?"stream":"batch",className:n})};function ew(e){let{endpoint:t,container:r}=e,[l,o]=(0,n.KO)(s.n),i=(0,n.b9)(b.GP);return(0,a.jsx)(ek,{className:"ml-2 w-[200px]",value:l,setValue:e=>{o(e),i((e&&null!=t.stream?t.stream:t).slug),setTimeout(()=>{null!=r.current&&r.current.scrollIntoView({behavior:"instant"})},0)}})}let eP=v()(()=>Promise.all([r.e(1894),r.e(6405)]).then(r.bind(r,6405)).then(e=>e.EndpointContentCodeSnippets),{loadableGenerated:{webpack:()=>[6405]},ssr:!0}),eN=(0,p.cn)(e=>e(f.RB)?0:26),eS=(0,l.memo)(e=>{var t,r,i,m,v,N,S;let{api:E,showErrors:I,endpoint:T,hideBottomSeparator:q=!1,types:B}=e,O=(0,n.Dv)(s.n)&&null!=T.stream?T.stream:T,M=(0,l.useRef)(null);(0,P.b)(M,O.slug);let A=(0,u.Y)(M,{margin:"100%"})||x.h.get(o.wP)===O.nodeId,[L,_]=(0,l.useState)(),[z,H]=(0,l.useState)(),G=(0,l.useCallback)((e,t)=>{let{isHovering:r}=t;_(r?e:void 0)},[_]),W=(0,l.useCallback)((e,t)=>{let{isHovering:r}=t;H(r?e:void 0)},[H]),[D,V]=(0,l.useState)();(0,g.N)((0,y.vl)(e=>{let t=function(e){if(null!=e&&e.startsWith("response.error.")){let t=e.split(".")[2];if(null!=t){let e=parseInt(t,10);return isNaN(e)?t:e}}}(e(b.VO));if(null!=t){let e=O.errors.find(e=>"number"==typeof t?e.statusCode===t:el(e.name)===t);null!=e&&V(e)}},[]));let Z=(0,l.useMemo)(()=>null==D?O.examples.filter(e=>e.responseStatusCode>=200&&e.responseStatusCode<300):O.examples.filter(e=>e.responseStatusCode===D.statusCode),[O.examples,D]),[F,U]=(0,l.useState)(null===(t=O.requestBody)||void 0===t?void 0:t.contentType),X=(0,l.useMemo)(()=>(0,w.s)(Z),[Z]),[K,Q]=(0,n.KO)(j.Z),[J,Y]=(0,l.useState)(()=>{var e,t,r;let a=null===(e=X[0])||void 0===e?void 0:e.examples[0];return null!==(r=null===(t=X.find(e=>e.language===K))||void 0===t?void 0:t.examples[0])&&void 0!==r?r:a});(0,l.useEffect)(()=>{Y(e=>{var t,r;return null!==(r=null===(t=X.find(e=>e.language===K))||void 0===t?void 0:t.examples[0])&&void 0!==r?r:e})},[X,K]);let $=(0,l.useCallback)(e=>{Y(e),Q(e.language)},[Q]),ee=(null===(r=J.exampleCall.requestBody)||void 0===r?void 0:r.type)==="json"?J.exampleCall.requestBody.value:void 0,et=null===(i=J.exampleCall.responseBody)||void 0===i?void 0:i.value,er=(0,l.useMemo)(()=>JSON.stringify(et,void 0,2),[et]),ea=J.code.split("\n").length,es=(null!==(N=null===(m=X.find(e=>e.language===J.language))||void 0===m?void 0:m.examples.length)&&void 0!==N?N:0)>1?48:0,eo=null!==(S=null==er?void 0:er.split("\n").length)&&void 0!==S?S:0,[ei,ed]=(0,n.Dv)((0,l.useMemo)(()=>(0,c.kv)((0,p.cn)(e=>{var t;let r=e(f.RB),a=e(C.c0);if(r)return[19.5*Math.min(21,ea)+59,19.5*Math.min(21,eo)+59];let n=19.5*ea+59,l=19.5*eo+59,s=a-32-40-es,o=(s-24)/2;return(null===(t=J.exampleCall)||void 0===t?void 0:t.responseBody)==null?[Math.min(n,s),0]:n>=o&&l>=o?[o,o]:n+l<=s-24?[n,l]:n<o?[n,Math.min(s-n-24,l)]:l<o?[Math.min(s-l-24,n),l]:[0,0]}),e=>e,h.Z),[eo,null===(v=J.exampleCall)||void 0===v?void 0:v.responseBody,ea,es])),eu=ei+ed+(ed>0&&ei>0?24:0)+(0,n.Dv)(eN),[ep,ec]=(0,l.useState)(eu),eh=ep+64,em=(0,n.Dv)((0,l.useMemo)(()=>(0,p.cn)(e=>{let t=e(f.Pp);return"sm"===t||"mobile"===t?0:eh}),[eh]));return(0,l.useEffect)(()=>{A||ec(eu)},[eu]),(0,a.jsx)("section",{className:"fern-endpoint-content",onClick:()=>V(void 0),ref:M,id:(0,k.oQ)(O.slug),children:(0,a.jsxs)("div",{className:(0,d.Z)("scroll-mt-content max-w-content-width md:max-w-endpoint-width mx-auto",{"border-default border-b mb-px pb-12":!q}),children:[(0,a.jsx)(R,{endpoint:O,streamToggle:null!=T.stream&&(0,a.jsx)(ew,{endpoint:T,container:M})}),(0,a.jsxs)("div",{className:"md:grid md:grid-cols-2 md:gap-8 lg:gap-12",children:[(0,a.jsx)("div",{className:"flex min-w-0 max-w-content-width flex-1 flex-col pt-8 md:py-8",style:{minHeight:"".concat(em,"px")},children:(0,a.jsx)(en,{endpoint:O,showErrors:I,onHoverRequestProperty:G,onHoverResponseProperty:W,selectedError:D,setSelectedError:V,contentType:F,setContentType:U,types:B})}),(0,a.jsx)("aside",{className:"fern-endpoint-content-right",style:{height:A?void 0:"".concat(eh,"px")},children:A&&(0,a.jsx)(eP,{api:E,endpoint:O,example:J.exampleCall,clients:X,selectedClient:J,onClickClient:$,requestCodeSnippet:J.code,requestCurlJson:ee,hoveredRequestPropertyPath:L,hoveredResponsePropertyPath:z,showErrors:I,selectedError:D,errors:O.errors,setSelectedError:V,measureHeight:ec})})]})]})})});eS.displayName="EndpointContent";let eE=(0,l.memo)(e=>{let{api:t,showErrors:r,endpoint:d,isLastInApi:u,types:p}=e,[c,h]=(0,n.KO)(s.n),m=(0,o.FT)(),v=null!=d.stream&&c?d.stream.slug:d.slug;return((0,l.useEffect)(()=>{null!=d.stream&&(d.slug===m.slug?h(!1):d.stream.slug===m.slug&&h(!0))},[d.slug,d.stream,m.slug,h]),(0,i.H)(v))?null:(0,a.jsx)(eS,{api:t,showErrors:r,endpoint:d,hideBottomSeparator:u,types:p})})},14472:function(e,t,r){r.d(t,{P:function(){return i}});var a=r(38093),n=r(10697),l=r(6249),s=r(11932),o=r(65913);let i=e=>{let{className:t,itemClassName:r,options:i,value:d,onValueChange:u,muted:p,container:c,disabled:h}=e;return(0,a.jsx)(o.v,{children:(0,a.jsx)(n.fC,{className:(0,l.Z)("fern-segmented-control",t),type:"single",value:d,onValueChange:u,disabled:h,children:i.map(e=>{var t;return"value"===e.type?(0,a.jsx)(o.k,{content:e.tooltip,container:c,children:(0,a.jsx)("div",{className:"min-w-0 flex-1 shrink",children:(0,a.jsx)(n.ck,{asChild:!0,className:r,value:e.value,children:(0,a.jsx)(s.sR,{icon:e.icon,variant:"minimal",intent:p?"none":e.value===d?"primary":"none",className:"w-full",children:null!==(t=e.label)&&void 0!==t?t:e.value})})})},e.value):null})})})}},10697:function(e,t,r){r.d(t,{ck:function(){return E},fC:function(){return S}});var a=r(56945),n=r(41175),l=r(34606),s=r(80084),o=r(33326),i=r(84140),d=r(38093),u=a.forwardRef((e,t)=>{let{pressed:r,defaultPressed:a=!1,onPressedChange:n,...s}=e,[u=!1,p]=(0,i.T)({prop:r,onChange:n,defaultProp:a});return(0,d.jsx)(l.WV.button,{type:"button","aria-pressed":u,"data-state":u?"on":"off","data-disabled":e.disabled?"":void 0,...s,ref:t,onClick:(0,o.M)(e.onClick,()=>{e.disabled||p(!u)})})});u.displayName="Toggle";var p=r(33416),c="ToggleGroup",[h,m]=(0,n.b)(c,[s.Pc]),v=(0,s.Pc)(),y=a.forwardRef((e,t)=>{let{type:r,...a}=e;if("single"===r)return(0,d.jsx)(g,{...a,ref:t});if("multiple"===r)return(0,d.jsx)(b,{...a,ref:t});throw Error(`Missing prop \`type\` expected on \`${c}\``)});y.displayName=c;var[f,x]=h(c),g=a.forwardRef((e,t)=>{let{value:r,defaultValue:n,onValueChange:l=()=>{},...s}=e,[o,u]=(0,i.T)({prop:r,defaultProp:n,onChange:l});return(0,d.jsx)(f,{scope:e.__scopeToggleGroup,type:"single",value:o?[o]:[],onItemActivate:u,onItemDeactivate:a.useCallback(()=>u(""),[u]),children:(0,d.jsx)(k,{...s,ref:t})})}),b=a.forwardRef((e,t)=>{let{value:r,defaultValue:n,onValueChange:l=()=>{},...s}=e,[o=[],u]=(0,i.T)({prop:r,defaultProp:n,onChange:l}),p=a.useCallback(e=>u((t=[])=>[...t,e]),[u]),c=a.useCallback(e=>u((t=[])=>t.filter(t=>t!==e)),[u]);return(0,d.jsx)(f,{scope:e.__scopeToggleGroup,type:"multiple",value:o,onItemActivate:p,onItemDeactivate:c,children:(0,d.jsx)(k,{...s,ref:t})})});y.displayName=c;var[j,C]=h(c),k=a.forwardRef((e,t)=>{let{__scopeToggleGroup:r,disabled:a=!1,rovingFocus:n=!0,orientation:o,dir:i,loop:u=!0,...c}=e,h=v(r),m=(0,p.gm)(i),y={role:"group",dir:m,...c};return(0,d.jsx)(j,{scope:r,rovingFocus:n,disabled:a,children:n?(0,d.jsx)(s.fC,{asChild:!0,...h,orientation:o,dir:m,loop:u,children:(0,d.jsx)(l.WV.div,{...y,ref:t})}):(0,d.jsx)(l.WV.div,{...y,ref:t})})}),w="ToggleGroupItem",P=a.forwardRef((e,t)=>{let r=x(w,e.__scopeToggleGroup),n=C(w,e.__scopeToggleGroup),l=v(e.__scopeToggleGroup),o=r.value.includes(e.value),i=n.disabled||e.disabled,u={...e,pressed:o,disabled:i},p=a.useRef(null);return n.rovingFocus?(0,d.jsx)(s.ck,{asChild:!0,...l,focusable:!i,active:o,ref:p,children:(0,d.jsx)(N,{...u,ref:t})}):(0,d.jsx)(N,{...u,ref:t})});P.displayName=w;var N=a.forwardRef((e,t)=>{let{__scopeToggleGroup:r,value:a,...n}=e,l=x(w,r),s={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},o="single"===l.type?s:void 0;return(0,d.jsx)(u,{...o,...n,ref:t,onPressedChange:e=>{e?l.onItemActivate(a):l.onItemDeactivate(a)}})}),S=y,E=P}}]);