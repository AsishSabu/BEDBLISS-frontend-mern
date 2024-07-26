import{r as d,O as y,j as e,U as v,u as N}from"./index-C0JB0cT-.js";import{u as w}from"./OwnerRouter-BUCq_RV5.js";import{r as o}from"./index-DUeupfZa.js";import{_ as j}from"./react-apexcharts.min-Dl-I62RE.js";import{u as b}from"./Notifications-BtANmxaB.js";import"./index-Cd8CbeYN.js";import"./hoist-non-react-statics.cjs-CxxjioJb.js";import"./formik.esm-DlztVDdY.js";import"./validation-CzmKO_H6.js";import"./index.esm-BKJcP99K.js";import"./index-BlK-UjDw.js";import"./iconBase-53EnAEkU.js";import"./index-CYkqFElQ.js";import"./tslib.es6-DuO2G4rp.js";import"./imageUpload-B_HbYlTc.js";import"./clsx-B-dksMZM.js";import"./floating-ui.react-dom-BqiJ1lPF.js";import"./index.esm-B0Pxq1wK.js";import"./index-BxFhfxZx.js";import"./UserProfile-DpnFFKBZ.js";import"./axiosService-BsYarKI0.js";const D=()=>{const[t,l]=d.useState([]),{data:a}=b(y+"/bookings");d.useEffect(()=>{a&&a.success&&l(a.bookings)},[a]);const i={type:"bar",height:348,series:[{name:"Bookings",data:(()=>{const x=new Date().getMonth()+1,n=new Array(31).fill(0);return t.forEach(h=>{const m=new Date(h.updatedAt);if(m.getMonth()+1===x){const r=m.getDate()-1;n[r]+=1}}),n})()}],options:{chart:{toolbar:{show:!1}},title:{show:!1},dataLabels:{enabled:!1},colors:["#020617"],plotOptions:{bar:{columnWidth:"50%",endingShape:"rounded"}},xaxis:{categories:Array.from({length:31},(p,x)=>x+1),labels:{style:{fontSize:"12px"}}},yaxis:{title:{text:"Number of Bookings",style:{fontSize:"14px"}},labels:{style:{fontSize:"10px"}}},grid:{borderColor:"#e0e0e0",strokeDashArray:3,yaxis:{lines:{show:!0}}},tooltip:{theme:"dark",x:{show:!1}}}};return e.jsxs(o.Card,{children:[e.jsx(o.CardHeader,{floated:!1,shadow:!1,color:"transparent",className:"flex flex-col h-8 rounded-lg gap-4 md:flex-row md:items-center",children:e.jsx("div",{children:e.jsx(o.Typography,{variant:"h3",color:"blue-gray",children:"Booking Chart"})})}),e.jsx(o.CardBody,{className:"px-2 pb-0",children:e.jsx(j,{options:i.options,series:i.series,type:"bar",height:i.height})})]})},k=()=>{const{data:t,isError:l}=b(v+"/wallet"),[a,s]=d.useState({series:[{name:"Revenue",data:[]}],options:{chart:{toolbar:{show:!1},height:240},title:{show:!1},dataLabels:{enabled:!1},colors:["#020617"],stroke:{lineCap:"round",curve:"smooth"},markers:{size:0},xaxis:{axisTicks:{show:!1},axisBorder:{show:!1},labels:{style:{colors:"#616161",fontSize:"12px",fontFamily:"inherit",fontWeight:400}},categories:[]},yaxis:{labels:{style:{colors:"#616161",fontSize:"10px",fontFamily:"inherit",fontWeight:400}}},grid:{show:!0,borderColor:"#dddddd",strokeDashArray:5,xaxis:{lines:{show:!0}},padding:{top:5,right:20}},fill:{opacity:.8},tooltip:{theme:"dark"}}});return d.useEffect(()=>{if(t){const i=new Date,p=i.getMonth(),x=i.getFullYear(),n=i.getDate(),h=Array(n).fill(0);t.transaction.forEach(r=>{const c=new Date(r.createdAt);if(c.getFullYear()===x&&c.getMonth()===p&&c.getDate()<=n){const f=c.getDate()-1,g=r.amount;r.type==="Credit"?h[f]+=g:r.type==="Debit"&&(h[f]-=g)}});const m=Array.from({length:n},(r,c)=>`${c+1}`);s(r=>({...r,series:[{name:"Revenue",data:h.slice(0,n)}],options:{...r.options,xaxis:{...r.options.xaxis,categories:m}}}))}},[t]),t?l?e.jsx("div",{children:"Error loading data"}):e.jsxs(o.Card,{children:[e.jsx(o.CardHeader,{floated:!1,shadow:!1,variant:"filled",color:"transparent",className:"flex flex-col gap-4 h-8 rounded-lg md:flex-row md:items-center",children:e.jsx("div",{children:e.jsx(o.Typography,{variant:"h3",color:"blue-gray",children:"Revenue Chart"})})}),e.jsx(o.CardBody,{className:"pb-0",children:e.jsx(j,{...a})})]}):e.jsx("div",{children:"Loading..."})},C=()=>{const{hotels:t}=w(),l=N(),a=s=>{l(`/owner/hotelDetails/${s}`)};return e.jsx("div",{className:"bg-varBlueGray",children:e.jsx("header",{className:"bg-shadow rounded-3xl p-4",children:e.jsxs("div",{className:"container mx-auto py-6 px-4 sm:px-6 lg:px-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Welcome, Asish!"}),e.jsx("p",{className:"mt-1 text-gray-600",children:"Add your hotels and earn more"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 p-4 mt-5 bg-varBlueGray rounded-lg",children:[e.jsx("div",{className:"col-span-1 ",children:e.jsx(D,{})}),e.jsx("div",{className:"col-span-1",children:e.jsx(k,{})})]}),e.jsx("div",{className:"border p-10 h-fit border-spacing-5 rounded-lg shadow-md mt-10",children:t.length?e.jsxs("div",{className:"p-5",children:[e.jsxs("header",{className:"flex justify-between mb-5",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Your Listings"}),e.jsx("div",{className:"flex space-x-3"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5",children:t.map(s=>e.jsxs("div",{className:"relative rounded-3xl shadow-sm p-2 cursor-pointer",onClick:()=>a(s._id),children:[e.jsxs("div",{className:"relative",children:[s.isVerified?null:e.jsxs("div",{className:"absolute top-2 left-2 bg-slate-200 text-black text-sm px-2 py-1 rounded-lg flex items-center space-x-1 bg-varWhite",children:[e.jsx("span",{className:"w-2 h-2 bg-red-600 rounded-full"}),e.jsx("span",{children:"Verification required"})]}),e.jsx("img",{className:"w-full h-64 object-cover rounded-xl border-none",src:s.imageUrls[0],alt:"Listing"})]}),e.jsx("div",{className:"mt-3",children:e.jsx("h2",{className:"text-xl font-semibold",children:s.name})})]},s._id))})]}):e.jsx("div",{className:"p-10",children:e.jsx("header",{className:"flex justify-between",children:e.jsx("h1",{className:"text-4xl text-red-600 font-body",children:"No Hotels listed yet"})})})})]})})})},u=["hotel","appartment","villas","resorts"],B=()=>{const[t,l]=d.useState(""),a=d.useCallback(()=>{const s=Math.floor(Math.random()*u.length);l(u[s])},[]);return d.useEffect(()=>{const s=setInterval(a,3e3);return()=>clearInterval(s)},[a]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"relative h-[300px] bg-banner-3 bg-cover bg-no-repeat bg-center",children:e.jsxs("div",{className:"flex flex-col gap-4 justify-center xl:ml-40 lg:ml-2.5 md:ml-3.5  sm:ml-60 w-full h-full px-3 md:px-0",children:[e.jsx("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-bold text-varWhite",children:"List Your"}),e.jsx("h1",{className:"text-3xl md:text-4xl lg:text-5xl font-bold text-Strawberry_red",children:t}),e.jsxs("h1",{className:"text-3xl md:text-4xl lg:text-5xl font-bold text-varWhite gap-3 flex",children:["On ",e.jsx("p",{className:"text-varGreen",children:"BEDBLISS"})]})]})})})},J=()=>e.jsxs("div",{className:"overflow-hidden",children:[e.jsx(B,{}),e.jsx(C,{})]});export{J as default};
