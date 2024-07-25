import{s as ee,U as W,j as e,v as Ce,r as m,b as de,B as Re,e as ke,l as Ee,C as Ae,u as $e,D as Ie,E as Oe}from"./index-KXlzdG9K.js";import{u as Pe}from"./index-mMo2Mjdk.js";import{a as B,s as Z}from"./hoist-non-react-statics.cjs-HqSw4Y_3.js";import{F as me,f as Le,d as Fe,a as ze}from"./default-Bamrce6K.js";import{q as xe,u as Ue,v as Me}from"./Notifications-27rzImSY.js";import{a as he,b as _e}from"./index-CXeVw653.js";import{G as Be}from"./iconBase-BYeeqz2k.js";import{r as He}from"./index-CGb8gEsT.js";import{u as Te}from"./imageUpload-D63niljF.js";import"./index-CSCTJCDn.js";import"./index-n-aAPHji.js";import"./clsx-B-dksMZM.js";import"./tslib.es6-DuO2G4rp.js";import"./index.esm-B0Pxq1wK.js";const Ve=async n=>{var t,h;try{return(await B.get(n)).data}catch(c){throw B.isAxiosError(c)?new Error(`Error fetching data: ${(t=c.response)==null?void 0:t.status} ${(h=c.response)==null?void 0:h.statusText}`):new Error(`Unexpected error: ${c.message}`)}},ge=n=>{const t=ee(u=>u.searchingSlice),h=new Date(t.dates[0].startDate),c=new Date(t.dates[0].endDate),i=new URLSearchParams({id:n||"",destination:t.destination||"",adult:t.options.adult.toString(),children:t.options.children.toString(),room:t.options.room.toString(),startDate:h.toISOString(),endDate:c.toISOString()}).toString(),{data:g,error:a,mutate:j}=Pe(`${W}/hotelDetails?${i}`,Ve),l=async()=>{var u,w;try{await j()}catch(o){B.isAxiosError(o)?console.error(`Error reloading hotel details: ${(u=o.response)==null?void 0:u.status} ${(w=o.response)==null?void 0:w.statusText}`):console.error(`Unexpected error reloading hotel details: ${o.message}`)}};return{hotel:g==null?void 0:g.data,loading:!a&&!g,error:a,reloadHotelDetails:l}},We=({src:n,...t})=>{const h=n&&n.includes("https://")?n:`http://localhost:4000/uploads/${n}`;return e.jsx("img",{...t,src:h,alt:""})},qe=({id:n})=>{const{reloadHotelDetails:t}=ge(n),h=ee(p=>p.searchingSlice),c=Ce(),[i,g]=m.useState(!1),[a,j]=m.useState(!1),l=h.dates[0],[u,w]=m.useState({startDate:l.startDate?new Date(l.startDate):new Date,endDate:l.endDate?new Date(l.endDate):de(new Date,1)}),[o,P]=m.useState({adult:h.options.adult,children:h.options.children,room:h.options.room}),E=m.useRef(null),A=m.useRef(null),$=async(p,b)=>{console.log(p,"options.........."),console.log(b,"dates......");try{const{startDate:y,endDate:I}=b;console.log(y,"startDates......"),console.log(I,"endDates......"),c(Re({options:p,dates:[{startDate:y,endDate:I}]})),t()}catch(y){console.error(y)}},f=(p,b)=>{P(y=>({...y,[p]:b==="i"?o[p]+1:o[p]-1}))},L=p=>{const{startDate:b,endDate:y}=p.selection;y<=b?w({startDate:b,endDate:de(b,1)}):w({startDate:b,endDate:y})};return m.useEffect(()=>{const p=b=>{E.current&&!E.current.contains(b.target)&&g(!1),A.current&&!A.current.contains(b.target)&&j(!1)};return document.addEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}},[]),e.jsxs("div",{className:"flex items-center space-x-4 py-1 px-3 bg-Alabaster  border-2 shadow-xl rounded-lg -mt-8 mx-auto max-w-fit",children:[e.jsxs("div",{className:"flex items-center space-x-2 cursor-pointer relative",ref:E,children:[e.jsx(me,{icon:Le,className:"text-gray-500"}),e.jsx("span",{onClick:()=>g(!i),className:"text-gray-700",children:`${xe(u.startDate,"MM/dd/yyyy")} to ${xe(u.endDate,"MM/dd/yyyy")}`}),i&&e.jsx("div",{className:"absolute top-12 left-0 z-50 mt-2",children:e.jsx(Fe.DateRange,{editableDateInputs:!0,onChange:()=>L,moveRangeOnFirstSelection:!1,ranges:[{startDate:u.startDate,endDate:u.endDate,key:"selection"}],className:"shadow-md rounded-lg",minDate:new Date})})]}),e.jsxs("div",{className:"flex items-center space-x-2 cursor-pointer relative",ref:A,children:[e.jsx(me,{icon:ze,className:"text-gray-500"}),e.jsx("span",{onClick:()=>j(!a),className:"text-gray-700",children:`${o.adult} adult · ${o.children} children · ${o.room} room`}),a&&e.jsxs("div",{className:"absolute top-12 left-0 w-48 bg-white p-4 rounded-lg shadow-md z-50",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-gray-700",children:"Adult"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:o.adult<=1,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>f("adult","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:o.adult}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>f("adult","i"),children:"+"})]})]}),e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-gray-700",children:"Children"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:o.children<=0,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>f("children","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:o.children}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>f("children","i"),children:"+"})]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-700",children:"Room"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:o.room<=1,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>f("room","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:o.room}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>f("room","i"),children:"+"})]})]})]})]}),e.jsx("button",{className:"bg-blue-600 text-white font-bold rounded-lg px-4 py-1",onClick:()=>$(o,u),children:"Update"})]})};var pe={};(function(n){Object.defineProperty(n,"__esModule",{value:!0});var t=m;function h(a){if(a&&a.__esModule)return a;var j=Object.create(null);return a&&Object.keys(a).forEach(function(l){if(l!=="default"){var u=Object.getOwnPropertyDescriptor(a,l);Object.defineProperty(j,l,u.get?u:{enumerable:!0,get:function(){return a[l]}})}}),j.default=a,Object.freeze(j)}var c=h(t);/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */var i=function(){return i=Object.assign||function(j){for(var l,u=1,w=arguments.length;u<w;u++){l=arguments[u];for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(j[o]=l[o])}return j},i.apply(this,arguments)},g=function(a){var j=a.bgColor,l=j===void 0?"#6a1b9a":j,u=a.height,w=u===void 0?"20px":u,o=a.width,P=o===void 0?"100%":o,E=a.borderRadius,A=E===void 0?"50px":E,$=a.labelAlignment,f=$===void 0?"right":$,L=a.baseBgColor,p=L===void 0?"#e0e0de":L,b=a.labelColor,y=b===void 0?"#fff":b,I=a.labelSize,_=I===void 0?"15px":I,x=a.isLabelVisible,d=x===void 0?!0:x,C=a.dir,F=C===void 0?"ltr":C,O=a.ariaValuemin,z=O===void 0?0:O,G=a.ariaValuemax,se=G===void 0?100:G,K=a.ariaValuetext,J=K===void 0?null:K,Y=a.maxCompleted,M=Y===void 0?100:Y,R=a.animateOnRender,q=R===void 0?!1:R,Q=a.initCompletedOnAnimation,H=Q===void 0?0:Q,T=a.completed,te=a.margin,ae=a.padding,s=a.customLabelStyles,r=a.transitionDuration,v=a.transitionTimingFunction,S=a.className,k=a.customLabel,N=a.barContainerClassName,D=a.completedClassName,U=a.labelClassName,fe=function(V){return V==="left"?"flex-start":V==="center"?"center":V==="right"?"flex-end":null},re=fe(f),ne=typeof H=="number"?"".concat(H,"%"):H,je=function(V,Se){if(V){var ce=Number(Se)/V;return ce>1?"100%":"".concat(ce*100,"%")}return ne},le=je(M,T),ie=c.useState(ne),be=ie[0],ye=ie[1],ve={height:w,background:p,borderRadius:A,padding:ae,width:P,margin:te,overflow:"hidden"},Ne={height:w,width:q?be:le,background:l,transition:"width ".concat(r||"1s"," ").concat(v||"ease-in-out"),borderRadius:"inherit",display:"flex",alignItems:"center",justifyContent:f!=="outside"&&re?re:"normal"},oe=i({padding:f==="outside"?"0 0 0 5px":"5px",color:y,fontWeight:"bold",fontSize:_,display:d?"initial":"none"},s),we={display:f==="outside"?"flex":"initial",alignItems:f==="outside"?"center":"initial"},De=typeof T=="number"?"".concat(T,"%"):"".concat(T),X=k||De;return c.useEffect(function(){q&&requestAnimationFrame(function(){return ye(le)})},[le,q]),c.createElement("div",{style:S?void 0:we,className:S,dir:F,role:"progressbar","aria-valuenow":parseFloat(X),"aria-valuemin":z,"aria-valuemax":se,"aria-valuetext":"".concat(J===null?X:J)},c.createElement("div",{style:N?void 0:ve,className:N},c.createElement("div",{style:D?void 0:Ne,className:D},f!=="outside"&&c.createElement("span",{style:U?void 0:oe,className:U},X))),f==="outside"&&c.createElement("span",{style:U?void 0:oe,className:U},X))};n.default=g})(pe);const Ge=ke(pe),Ke=({review:n})=>{console.log(n,"review in review card");const t=n.reduce((i,{rating:g})=>(g>=1&&g<=5&&(i[g]=(i[g]||0)+1),i),{1:0,2:0,3:0,4:0,5:0}),h=Object.values(t).reduce((i,g)=>i+g,0),c=({rating:i})=>e.jsxs("div",{className:"flex items-center ",children:[e.jsx("span",{className:"font-medium text text-black mr-2",children:i}),e.jsx(he,{color:"orange",className:"mr-2 "}),e.jsx("div",{className:"flex-grow",children:e.jsx(Ge,{completed:h?t[i]/h*100:0,className:" ",bgColor:"orange",isLabelVisible:!1})}),e.jsx("p",{className:"font-medium text-lg text-black ml-2",children:t[i]})]});return e.jsx("div",{className:"box flex flex-col gap-y-4",children:[5,4,3,2,1].map(i=>e.jsx(c,{rating:i},i))})};function Je(n){return Be({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"},child:[]}]})(n)}const ue=({stars:n})=>{const t=Array.from({length:5},(h,c)=>{let i=c+.5;return e.jsx("span",{children:n>=c+1?e.jsx(he,{color:"orange"}):n>=i?e.jsx(_e,{color:"orange"}):e.jsx(Je,{className:"icon"})},c)});return e.jsx(e.Fragment,{children:e.jsx("div",{className:" flex gap-2 align-middle justify-start",children:t})})},Ye=({onClose:n,reviewId:t})=>{const[h,c]=m.useState(""),[i,g]=m.useState(0),[a,j]=m.useState([]),[l,u]=m.useState(!1),[w,o]=m.useState(!1),[P,E]=m.useState(!1),[A,$]=m.useState(!0),f=m.useRef(null);m.useEffect(()=>{console.log(t,"review idddddd"),t&&(async()=>{try{const{data:d}=await B.get(`${W}/getRatingById/${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("access_token")}`}});console.log(d,"data"),c(d.result.description||""),g(d.result.rating||0),j(d.result.imageUrls.map(C=>({file:null,url:C}))||[]),$(!1)}catch{Z("Failed to fetch review details","error"),$(!1)}})()},[t]);const L=x=>{c(x.target.value),u(x.target.value.trim()==="")},p=async x=>{const d=x.target.files;if(!(!d||d.length===0)){if(a.length+d.length>5){alert("You can only upload up to 5 images.");return}E(!0);try{const F=(await Te(Array.from(d))).map((O,z)=>({file:d[z],url:O}));j([...a,...F])}catch(C){console.error("Error uploading images:",C),alert("Failed to upload images. Please try again.")}finally{E(!1)}}},b=x=>{const d=[...a];d.splice(x,1),j(d)},y=x=>{g(x),o(x===0)},I=async()=>{var C,F;const x=h.trim()==="",d=i===0;if(u(x),o(d),!(x||d||P))try{const{data:O}=await B.patch(`${W}/updateRatingById/${t}`,{rating:i,description:h,imageUrls:a.map(z=>z.url)},{headers:{authorization:`Bearer ${localStorage.getItem("access_token")}`}});Z(O.message),n()}catch(O){Z((F=(C=O.response)==null?void 0:C.data)==null?void 0:F.message,"error")}},_=x=>{f.current&&!f.current.contains(x.target)&&n()};return m.useEffect(()=>(document.addEventListener("mousedown",_),()=>{document.removeEventListener("mousedown",_)}),[]),A?e.jsx("div",{children:"Loading..."}):e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:e.jsxs("div",{className:"bg-white min-w-1xl flex flex-col rounded-xl shadow-lg",ref:f,children:[e.jsx("div",{className:"px-12 py-5",children:e.jsx("h2",{className:"text-gray-800 text-3xl font-semibold",children:"Edit your review"})}),e.jsxs("div",{className:"bg-gray-200 w-full flex flex-col items-center",children:[e.jsxs("div",{className:"flex flex-col items-center py-4 space-y-3",children:[e.jsx("span",{className:"text-lg text-gray-800",children:"How was the quality of the Hotel?"}),e.jsx("div",{className:"flex space-x-3",children:e.jsx(He.Rating,{unratedColor:"gray",ratedColor:"green",value:i,onChange:x=>y(x)})}),w&&e.jsx("span",{className:"text-red-500 text-sm",children:"Rating is required"})]}),e.jsxs("div",{className:"w-3/4 flex flex-col",children:[e.jsx("textarea",{rows:3,className:`p-4 text-gray-500 rounded-xl resize-none ${l?"border-red-500":"border-gray-300"}`,placeholder:"Description...",value:h,onChange:L}),l&&e.jsx("span",{className:"text-red-500 text-sm",children:"Description cannot be empty"}),e.jsx("div",{className:"mt-2",children:e.jsx("label",{className:"block mb-1 text-sm text-gray-600",children:"Add images"})}),e.jsxs("div",{className:"flex mt-2 space-x-2",children:[a.map((x,d)=>e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:x.file?URL.createObjectURL(x.file):x.url,alt:`Preview ${d}`,className:"w-16 h-16 object-cover rounded"}),e.jsx("button",{onClick:()=>b(d),className:"absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center",children:"×"})]},d)),a.length<5&&e.jsx("div",{className:"w-16 h-16 border border-gray-300 rounded flex items-center justify-center",children:e.jsxs("label",{className:"cursor-pointer",children:[e.jsx("input",{type:"file",className:"hidden",onChange:p,multiple:!0}),e.jsx("span",{className:"text-gray-500 text-2xl",children:"+"})]})})]}),P&&e.jsx("div",{className:"mt-2",children:e.jsx("span",{className:"text-gray-500",children:"Uploading..."})}),e.jsx("button",{disabled:P,onClick:I,className:"py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white",children:"Save changes"})]})]}),e.jsx("div",{onClick:n,className:"h-16 flex items-center justify-center",children:e.jsx("a",{href:"#",className:"text-gray-600",children:"Cancel"})})]})})},ms=()=>{const{id:n}=Ee();console.log(n,"hotel id");const{hotel:t,loading:h,error:c}=ge(n),[i,g]=m.useState("");console.log(t,"hotel in hotel details");const a=ee(s=>s.searchingSlice),j=ee(s=>s.userSlice);console.log(a,"searchingData");const[l,u]=m.useState(null),w=Ae(),o=$e(),[P,E]=m.useState(!1),[A,$]=m.useState([]),[f,L]=m.useState(!1),{data:p}=Ue(`${W}/getRating/${n}`),[b,y]=m.useState(!1),[I,_]=m.useState(null),x=new Date;m.useEffect(()=>{w(Ie())},[]),m.useEffect(()=>{console.log(p,"review......."),p&&u(p.result)},[p]);const d=l?l.reduce((s,r)=>s+r.rating,0):0,C=d&&l?d/l.length:0;if(console.log(d,"sum of ratings........."),console.log(C),console.log(l,"😆"),h)return e.jsx("div",{children:"Loading..."});if(c)return e.jsx("div",{children:"Error loading hotel details"});if(!t)return e.jsx("div",{children:"No hotel data available"});console.log(a.dates,"'''''''''''''''''''''''''''");const F=t==null?void 0:t.rooms,{name:O,imageUrls:z,destination:G,description:se,amenities:K,propertyRules:J,stayType:Y,address:M,offer:R}=t,q=(s,r)=>{const{value:v}=s.target;g("");const S=parseInt(v,10);$(S===0?k=>k.filter(N=>N.roomId!==r):k=>k.find(D=>D.roomId===r)?k.map(D=>D.roomId===r?{...D,count:S}:D):[...k,{roomId:r,count:S}])},Q=async(s,r,v,S)=>(console.log(s,r,v,S,".........................."),(await B.post(W+"/checkAvailability/"+s,{count:r,dates:{checkInDate:v,checkOutDate:S}})).data.RoomAvailable),H=s=>R.type==="flat"?s>=(R.minAmount??0)&&s<=(R.maxAmount??1/0)?s-R.amount:null:s*(100-R.amount)/100,T=s=>{_(s),y(!0)},te=async()=>{if(console.log(A),A.length===0){g("Please select at least one room");return}L(!0);const s=A.map(({roomId:N,count:D})=>Q(N,D,a.dates[0].startDate,a.dates[0].endDate)),r=await Promise.all(s);console.log(r);for(const N of r)if(N===void 0){Z("something went wrong, please select room once more","error");return}const v={name:(t==null?void 0:t.name)??"",destination:(t==null?void 0:t.destination)??"",city:(t==null?void 0:t.address.city)??"",district:(t==null?void 0:t.address.district)??"",pincode:(t==null?void 0:t.address.pincode)??"",country:(t==null?void 0:t.address.country)??"",hotelId:(t==null?void 0:t._id)??"",rooms:r,checkIn:a.dates[0].startDate,checkOut:a.dates[0].endDate,adults:a.options.adult,children:a.options.children,offer:t==null?void 0:t.offer,cancellationPolicies:t==null?void 0:t.cancellationPolicies};console.log(v),w(Oe(v));const S=r.map(N=>{var D;return{roomId:((D=N.roomDetails)==null?void 0:D._id)??"",roomNumbers:N.rooms?N.rooms.map(U=>U.number):[]}});await B.post(W+"/addUnavilableDates",{rooms:S,checkInDate:a.dates[0].startDate,checkOutDate:a.dates[0].endDate},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})&&o(`/user/checkout/${t._id}`),L(!1)},ae=async()=>{_(null),y(!1)};return P?e.jsx("div",{className:" absolute pt-48 inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50 ",children:e.jsxs("div",{className:"relative bg-white p-8 rounded-lg max-w-3xl w-full",children:[e.jsx("button",{title:"button",onClick:()=>E(!1),className:"absolute top-4 right-4 text-black",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"w-6 h-6",children:e.jsx("path",{fillRule:"evenodd",d:"M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",clipRule:"evenodd"})})}),e.jsx("h2",{className:"text-2xl mb-4",children:"Photos"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",children:z.map((s,r)=>e.jsx("div",{className:"flex justify-center items-center",children:e.jsx(We,{src:s,alt:`Photo ${r}`,width:600,height:400,className:"object-cover rounded"})},r))})]})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-7 gap-2",children:[e.jsx("div",{className:"col-span-3",children:e.jsx("img",{src:z[0],alt:"Houseboat",className:"w-full h-80 aspect-auto rounded-lg"})}),e.jsxs("div",{className:"col-span-4 grid grid-cols-2 gap-2 relative",children:[z.slice(1,5).map((s,r)=>e.jsx("div",{className:"",children:e.jsx("img",{src:s,alt:`Houseboat ${r+1}`,className:"w-full h-40 aspect-auto r rounded-lg"})},r)),e.jsx("button",{onClick:()=>E(!0),className:"right-5 absolute bottom-5 bg-gray-300 px-3 rounded-lg",children:"show all"})]})]}),e.jsxs("div",{children:[" ",e.jsx("h1",{className:"text-3xl font-bold mb-2",children:O}),l?e.jsxs("div",{className:"flex items-center mb-2 gap-2",children:[e.jsx(ue,{stars:C}),e.jsx("span",{className:"text-gray-600",children:l.length?`(${l.length} reviews)`:"(not yet rated )"})]}):"",e.jsx("p",{className:"text-gray-700 mb-2",children:Y.name}),e.jsx("p",{className:"text-gray-600 mb-2",children:G})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2",children:[e.jsxs("div",{className:"col-span-2",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("p",{className:"text-gray-800 mb-1",children:"Hosted by Kirby"}),e.jsx("p",{className:"text-gray-600 mb-1",children:"Dedicated workspace"}),e.jsx("p",{className:"text-gray-600 mb-1",children:"Kirby is a Superhost"}),e.jsx("p",{className:"text-gray-600 mb-1",children:"Free cancellation before Jun 3"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h2",{className:"text-xl font-semibold mb-2",children:"Description"}),e.jsx("p",{className:"text-gray-600",children:se})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h2",{className:"text-xl font-semibold mb-2",children:"What this place offers"}),e.jsx("ul",{className:"list-disc list-inside text-gray-600",children:K.map((s,r)=>e.jsx("li",{children:s},r))})]})]}),e.jsxs("div",{className:"col-span-2 ",children:[e.jsx("div",{className:"flex justify-center p-3"}),e.jsxs("div",{className:"mb-4 p-5  border rounded-lg ring-2  ",children:[e.jsx("h2",{className:"text-xl font-semibold mb-2",children:" Address"}),e.jsxs("div",{className:"mb-4",children:[e.jsxs("p",{className:"text-gray-800 mb-1",children:[M.streetAddress," , ",M.landMark]}),e.jsx("p",{className:"text-gray-600 mb-1",children:M.city}),e.jsx("p",{className:"text-gray-600 mb-1",children:M.district}),e.jsxs("p",{className:"text-gray-600 mb-1",children:[M.country," , ",M.pincode]})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h2",{className:"text-xl font-semibold mb-2",children:"Property Rules"}),e.jsx("ul",{className:"list-disc list-inside text-gray-600",children:J.map((s,r)=>e.jsx("li",{children:s},r))})]})]})]}),e.jsx("div",{className:" pt-16",children:e.jsx(qe,{id:n})}),e.jsxs("div",{className:"p-4",children:[e.jsxs("table",{className:"min-w-full bg-white border border-gray-200",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"w-full bg-gray-100",children:[e.jsx("th",{className:"py-2 px-4 border-r",children:"Room Types"}),e.jsx("th",{className:"py-2 px-4 border-r",children:"Number of guests"}),e.jsx("th",{className:"py-2 px-4 border-r",children:"Price per night"}),e.jsx("th",{className:"py-2 px-4 border-r",children:"No of rooms"})]})}),e.jsx("tbody",{children:F.map(s=>e.jsxs("tr",{className:"border-b ",children:[e.jsxs("td",{className:"py-4 px-4 border-r",children:[e.jsx("h3",{className:"text-lg font-semibold text-varRed",children:s.title}),e.jsx("p",{className:"text-green-600",children:s.desc})]}),e.jsx("td",{className:"py-4 px-4 border-r",children:e.jsxs("div",{className:"flex items-center",children:[e.jsxs("span",{className:"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2",children:[e.jsx("svg",{className:"inline-block h-6 w-6 mr-1 text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 2a6 6 0 016 6 6 6 0 01-2 4.472V15h1.5a1.5 1.5 0 110 3H4.5a1.5 1.5 0 110-3H6v-2.528A6 6 0 1110 2zM4 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"})}),s.maxAdults]}),e.jsxs("span",{className:"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700",children:[e.jsx("svg",{className:"inline-block h-6 w-6 mr-1 text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M12 12h6.5a1.5 1.5 0 110 3H1.5a1.5 1.5 0 110-3H6v-1.528A6 6 0 119.528 2H12a6 6 0 110 12z"})}),s.maxChildren]})]})}),e.jsx("td",{className:"py-4 px-4 border-r w-fit ",children:R&&new Date(R.endDate)>=x?H(s.price)!==null?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"text-sm  text-gray-600 line-through flex justify-center py-2",children:["₹ ",s.price]}),e.jsxs("span",{className:"text-lg font-bold text-gray-700 flex justify-center pb-3",children:["₹ ",H(s.price)]}),e.jsx("span",{className:"text-xs  text-varWhite bg-varGreen flex justify-center w-fit p-0.5 rounded-md ",children:R.type==="flat"?`FLAT ₹  ${R.amount} off/-`:`${R.amount}% off/-`})]}):e.jsxs("span",{className:"text-lg font-bold text-gray-700 flex justify-center",children:["₹ ",s.price]}):e.jsxs("span",{className:"text-lg font-bold text-gray-700 flex justify-center",children:["₹ ",s.price]})}),e.jsx("td",{className:"py-4 px-4 border-r",children:e.jsx("select",{title:"select",className:"border p-2 rounded",onChange:r=>q(r,s._id),children:Array.from({length:s.roomNumbers.length+1},(r,v)=>e.jsx("option",{value:v,children:v},v))})})]},s._id))})]}),e.jsx("div",{className:"py-4 flex justify-center",children:F.length>0?e.jsx("button",{disabled:!!f,className:f?"px-4 py-2 bg-gray-500 text-black rounded":"px-4 py-2 bg-blue-500 text-white rounded",onClick:te,children:"I'll reserve"}):e.jsx("span",{className:"text-varRed text-xl",children:"no rooms available"})}),e.jsx("span",{className:"text-varRed flex justify-center",children:i})]})]}),l&&l.length&&e.jsxs("div",{className:"pt-5 m-2 border ",children:[e.jsx("p",{className:"flex justify-center text-2xl py-10",children:"Customer Review & Ratings"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsx("div",{className:"",children:e.jsx("div",{className:"w-full border mx-2 p-4 rounded-lg   shadow-lg",children:e.jsx(Ke,{review:l})})}),e.jsx("div",{className:"col-span-2",children:l&&l.map(s=>{var r,v,S,k,N;return e.jsxs("div",{className:"flex flex-col border rounded-lg shadow-md p-4 space-y-4 w-full",children:[e.jsx(ue,{stars:s.rating}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("img",{className:"rounded-full w-6 h-6",src:(r=s==null?void 0:s.userId)!=null&&r.profilePic?(v=s==null?void 0:s.userId)==null?void 0:v.profilePic:Me,alt:`${(S=s==null?void 0:s.userId)==null?void 0:S.name}'s Avatar`}),e.jsxs("div",{className:"flex justify-between w-full",children:[e.jsx("div",{className:" text-blue-800 text-xl font-bold",children:(k=s==null?void 0:s.userId)==null?void 0:k.name}),e.jsxs("div",{className:"text-gray-400",children:[" ",(s==null?void 0:s.createdAt)&&e.jsx(e.Fragment,{children:new Date(s.createdAt).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})})]})]})]}),e.jsx("div",{className:"flex mt-2 space-x-2",children:s==null?void 0:s.imageUrls.map((D,U)=>e.jsx("div",{className:"relative",children:e.jsx("img",{src:D,alt:`Preview ${U}`,className:"w-16 h-16 object-cover rounded"})},U))}),e.jsx("p",{className:"text-gray-500 text-xl font-thin",children:s==null?void 0:s.description}),e.jsx("p",{onClick:()=>T(s==null?void 0:s._id),className:"flex justify-end",children:((N=s==null?void 0:s.userId)==null?void 0:N._id)===j.id?e.jsx(e.Fragment,{children:"edit"}):""})]},s==null?void 0:s._id)})})]})]}),b&&e.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-45 flex items-center justify-center z-50",children:I&&e.jsx(Ye,{reviewId:I,onClose:ae})})]})};export{ms as default};