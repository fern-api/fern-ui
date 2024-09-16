"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2346],{13231:function(e,t,s){s.d(t,{F:function(){return r}});var l=s(13069).lW;class r{async *iterMessages(){let e="",t=this.stream.getReader();for(;;){let s;let{done:r,value:n}=await t.read();if(r)break;for(e+=l.isBuffer(n)?n:l.from(n);(s=e.indexOf(this.terminator))>=0;){let t=e.slice(0,s).trim();if(t.length>0){let e=await this.parse(JSON.parse(t));yield e}e=e.slice(s+this.terminator.length)}}}async *[Symbol.asyncIterator](){for await(let e of this.iterMessages())yield e}constructor({stream:e,parse:t,terminator:s}){this.stream=e,this.parse=t,this.terminator=s}}},92346:function(e,t,s){s.r(t),s.d(t,{CohereChatButton:function(){return B}});var l=s(38093),r=s(81771),n=s(96751),a=s(3340),i=s(43567),o=s(48779),c=s(34381),d=s(42e3),u=s(7740),h=s(6249),x=s(3261),f=s(56945),m=s(89429);let g=(0,f.forwardRef)((e,t)=>{let{className:s}=e;return(0,l.jsx)("svg",{ref:t,xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"none",viewBox:"0 0 32 32",className:s,children:(0,l.jsx)("path",{fill:"currentColor",fillRule:"evenodd",d:"M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z",clipRule:"evenodd"})})});function p(e){return(0,l.jsx)("button",{...e,className:(0,h.Z)("mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:bg-grayscale-a6 disabled:text-grayscale-3 dark:disabled:bg-grayscale-a6 dark:disabled:text-grayscale-5 disabled:hover:opacity-100",e.className),children:(0,l.jsx)(g,{className:"icon-2xl"})})}let v=(0,f.forwardRef)((e,t)=>{let s=(0,f.useRef)(null);return(0,f.useImperativeHandle)(t,()=>s.current),function(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,l=20*s+20;(0,f.useEffect)(()=>{if(e){e.style.height="0px";let t=e.scrollHeight;e.style.height=Math.max(l,t)+"px"}},[l,e,t])}(s.current,e.value),(0,l.jsx)("textarea",{ref:s,...e})});function b(e){let{onSend:t,className:s}=e,[r,n]=(0,f.useState)("");return(0,l.jsx)("div",{className:(0,h.Z)("flex w-full items-center",s),children:(0,l.jsx)("div",{className:"flex w-full flex-col gap-1.5 rounded-[26px] p-1.5 transition-colors bg-grayscale-a3",children:(0,l.jsxs)("div",{className:"flex items-end gap-1.5 md:gap-2",children:[(0,l.jsx)("div",{className:"flex min-w-0 flex-1 flex-col pl-4",children:(0,l.jsx)(v,{style:{height:40},placeholder:"Ask me a question about Cohere",className:"px-0 py-2 m-0 resize-none text-grayscale-12 placeholder:text-grayscale-a10 border-0 bg-transparent focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 max-h-52",value:r,onChange:e=>n(e.target.value),onKeyDownCapture:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),t(r),n(""))},autoFocus:!0})}),(0,l.jsx)(p,{disabled:0===r.trim().length,onClick:()=>t(r)})]})})})}function j(){return(0,l.jsx)("div",{className:"flex items-center justify-center h-8 w-8 rounded-full overflow-hidden outline-1 outline outline-grayscale-a6",children:(0,l.jsx)(r.D,{className:"size-5"})})}var y=s(16165),N=s(61443),w=s(62164),k=s(51080);function C(e){let{terminator:t=!1}=e;return e=>{if(!t)return e;let s=(0,y.h)("span",{class:"fern-chatbot-terminator"}),l=(0,N.Z)(e.children);return(null==l?void 0:l.type)==="element"&&"p"===l.tagName?l.children.push(s):e.children.push((0,y.h)("p",s)),e}}function R(e){let{children:t,className:s,terminator:r,components:n}=e;return(0,l.jsx)(w.U,{components:n,remarkPlugins:[k.Z],rehypePlugins:[[C,{terminator:r}]],className:(0,h.Z)("prose dark:prose-invert",s),children:t})}let S=(0,f.memo)(e=>{let{message:t,components:s}=e;return(0,l.jsxs)("div",{className:"flex flex-1 gap-4 text-base",children:[(0,l.jsx)("div",{className:"flex-shrink-0",children:(0,l.jsx)(j,{})}),(0,l.jsx)("div",{children:(0,l.jsx)(R,{components:s,children:t})})]})}),E=e=>{let{isStreaming:t,message:s,citations:r,components:n}=e;if(""===s&&0===r.length&&!t)return null;let a=s;r.length>0&&(a+="\n\n### References\n");let i=[];return r.forEach(e=>{let{slugs:t}=e;t.forEach(e=>{i.includes("/".concat(e))||i.push("/".concat(e))})}),i.forEach(e=>{a+="\n".concat(1,". [").concat(e,"](").concat(e,")")}),(0,l.jsxs)("div",{className:"flex flex-1 gap-4 text-base",children:[(0,l.jsx)("div",{className:"flex-shrink-0",children:(0,l.jsx)(j,{})}),(0,l.jsx)("div",{className:"flex flex-col gap-4 min-w-0 shrink pr-4",children:(0,l.jsx)(R,{terminator:t,components:n,children:a})})]})},I=(0,f.memo)(e=>{let{message:t}=e;return(0,l.jsx)("div",{className:"flex gap-2 justify-end",children:(0,l.jsx)("div",{className:"relative max-w-[75%] rounded-3xl bg-grayscale-a3 px-5 py-2.5",children:(0,l.jsx)(R,{className:"leading-normal",children:t})})})}),Z=(0,f.forwardRef)((e,t)=>{let{messages:s,children:r,components:n}=e;return(0,l.jsxs)("div",{className:"flex flex-col gap-9",ref:t,children:[s.map((e,t)=>"AI"===e.role?(0,l.jsx)(S,{message:e.message,components:n},t):"USER"===e.role?(0,l.jsx)(I,{message:e.message},t):null),r]})}),A=(0,f.forwardRef)((e,t)=>{let{chatStream:s,className:r,components:n,belowInput:a}=e,[i,o]=(0,f.useState)(()=>({conversationId:(0,m.Z)(),messages:[]})),[c,d]=(0,f.useState)(!1),[g,p]=(0,f.useState)(""),[v,j]=(0,f.useState)([]),y=(0,f.useRef)(),N=(0,f.useRef)(null),w=i.messages.length>0||c||g.length>0,k=(0,f.useRef)((0,x.Z)(function(){var e;let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];null===(e=N.current)||void 0===e||e.scrollTo({top:N.current.scrollHeight,behavior:t?"smooth":"instant"})},150)),C=e=>{var t;0!==e.trim().length&&((null===(t=y.current)||void 0===t?void 0:t.signal.aborted)===!1&&y.current.abort(),o(t=>{let s=[...t.messages];return g.length>0&&s.push({role:"AI",message:g,citations:v}),s.push({role:"USER",message:e}),{...t,messages:s}}),d(!0),p(""),j([]),k.current(),s(e,i.conversationId).then(async e=>{let[t,s]=e;for await(let{message:e,citations:l}of(y.current=s,null!=t?t:[])){if(y.current.signal.aborted)return;p(e),j(l),k.current(!0)}y.current.signal.aborted||d(!1)}))},R=()=>{var e;(null===(e=y.current)||void 0===e?void 0:e.signal.aborted)===!1&&y.current.abort(),o({conversationId:(0,m.Z)(),messages:[]}),d(!1),p(""),j([])};return(0,f.useImperativeHandle)(t,()=>({reset:R,sendMessage:C})),(0,l.jsxs)("section",{className:(0,h.Z)("flex flex-col",r),children:[(0,l.jsx)("div",{className:"px-4 py-2",children:w&&(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsx)("span",{className:"text-sm text-grayscale-a11",children:"Ask Cohere"}),(0,l.jsx)("button",{className:"text-xs text-grayscale-a11 hover:text-grayscale-a12",onClick:R,children:"Clear Chat"})]})}),w&&(0,l.jsx)(u.u,{scrollbars:"vertical",className:"px-4 py-6 mask-grad-y-6",ref:N,children:(0,l.jsx)(Z,{messages:i.messages,components:n,children:(0,l.jsx)(E,{isStreaming:c,message:g,citations:v,components:n})})}),(0,l.jsxs)("div",{className:"p-4 pt-0",children:[(0,l.jsx)(b,{onSend:C}),a]})]})});var D=s(89565),O=s(13479),z=s(39864),M=s(53424),P=s(45741),T=s(57672),_=s(13231),H=s(11824);function V(e){let{className:t}=e,s=(0,a.Dv)(z.fd),r=(0,f.useRef)(null);(0,O.N)((0,D.vl)((e,t)=>{var s;let l=e.peek(o.f);0!==l.trim().length&&(null===(s=r.current)||void 0===s||s.sendMessage(l),t(o.f,""))},[]));let n=(0,P.V)("/api/fern-docs/search/cohere"),i=async(e,t)=>{let l=new AbortController,r=await fetch(n,{method:"POST",signal:l.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify({conversationId:t,message:e,versionId:s})}).then(e=>e.body);if(null==r)return[void 0,l];let a="",i=[];return[new _.F({stream:r,parse:async e=>("text-generation"===e.eventType&&(a+=e.text),"citation-generation"===e.eventType&&e.citations.forEach(e=>{i.push({text:e.text,start:e.start,end:e.end,slugs:e.documentIds})}),{message:a,role:"AI",citations:i}),terminator:"\n"}),l]};return(0,l.jsx)(A,{ref:r,chatStream:i,className:t,components:{pre(e){if((0,f.isValidElement)(e.children)&&"code"===e.children.type){let{children:r,className:n}=e.children.props;if("string"==typeof r){var t,s;let e=null!==(s=null===(t=/language-(\w+)/.exec(n||""))||void 0===t?void 0:t[1])&&void 0!==s?s:"plaintext";return(0,l.jsx)(T.d,{code:r,language:e})}}return(0,l.jsx)("pre",{...e})},a(e){let{href:t,...s}=e;return null==t?(0,l.jsx)("a",{...s}):(0,l.jsx)(M.jZ,{href:t,...s})}},belowInput:(0,l.jsxs)("div",{className:"mt-4 px-5 text-grayscale-a10 flex justify-between items-center gap-2",children:[(0,l.jsx)(M.jZ,{href:"https://cohere.com/",className:"text-xs font-medium",children:"Powered by Cohere (command-r-plus)"}),(0,l.jsx)(H.r,{})]})})}function B(){let[e]=(0,d.X)(),[t,s]=(0,a.KO)(o.D);return((0,c.y)(()=>{s(!1)}),e.isAvailable&&null==e.inkeep)?(0,l.jsxs)(n.fC,{open:t,onOpenChange:s,children:[(0,i.createPortal)((0,l.jsx)(n.xz,{asChild:!0,children:(0,l.jsxs)("button",{className:"fixed bottom-6 right-6 bg-background px-5 py-3 rounded-full border border-default inline-flex gap-2 items-center",children:[(0,l.jsx)(r.D,{}),(0,l.jsx)("span",{children:"Ask Cohere"})]})}),document.body),(0,l.jsxs)(n.h_,{children:[(0,l.jsx)(n.aV,{className:"fixed inset-0 z-0 bg-background/50 backdrop-blur-sm"}),(0,l.jsx)(n.VY,{className:"fixed md:max-w-content-width my-[10vh] top-0 inset-x-0 mx-6 max-h-[80vh] md:mx-auto flex flex-col",children:(0,l.jsx)(V,{className:"bg-search-dialog border-default flex h-auto min-h-0 shrink flex-col overflow-hidden rounded-xl border text-left align-middle shadow-2xl backdrop-blur-lg"})})]})]}):null}}}]);