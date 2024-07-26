import{r as u,u as v,j as e,O as w}from"./index-C0JB0cT-.js";import{c as A,a as m,f as c}from"./index.esm-BKJcP99K.js";import{F as C,a as R,b as l,E as d}from"./formik.esm-DlztVDdY.js";import{u as S}from"./OwnerRouter-BUCq_RV5.js";import{a as q,s as g}from"./hoist-non-react-statics.cjs-CxxjioJb.js";import"./index-Cd8CbeYN.js";import"./validation-CzmKO_H6.js";import"./index-BlK-UjDw.js";import"./iconBase-53EnAEkU.js";import"./index-CYkqFElQ.js";import"./tslib.es6-DuO2G4rp.js";import"./imageUpload-B_HbYlTc.js";import"./Notifications-BtANmxaB.js";import"./clsx-B-dksMZM.js";import"./index-DUeupfZa.js";import"./index.esm-B0Pxq1wK.js";import"./floating-ui.react-dom-BqiJ1lPF.js";import"./index-BxFhfxZx.js";import"./UserProfile-DpnFFKBZ.js";import"./axiosService-BsYarKI0.js";const U=()=>{const{hotels:h}=S(),[s,b]=u.useState([]),[x,n]=u.useState(null),p=v(),y=async r=>{const a={title:r.name,maxAdults:r.maxAdults,maxChildren:r.maxChildren,price:r.price,desc:r.description,roomNumbers:s};console.log(a),await q.post(`${w}/addRoom/${r.hotelId}`,a,{headers:{authorization:`Bearer ${localStorage.getItem("access_token")}`}}).then(({data:t})=>{g(t.message),p("/owner/hotelDetails/"+r.hotelId)}).catch(({response:t})=>{var o;g((o=t==null?void 0:t.data)==null?void 0:o.message,"error")})},f=(r,a)=>{const t=parseInt(r,10);!isNaN(t)&&t>0&&t<=9999?s.includes(t)?n("Room number already exists."):(b([...s,t]),n(null),a("roomNumber","")):n("Please enter a valid room number (1-9999) without leading zeros.")},k=r=>{b(s.filter((a,t)=>t!==r))},j=A().shape({name:m().required("Room Name is required"),description:m().required("Description is required"),hotelId:m().required("Hotel is required"),price:c().required("Price is required").positive("Price must be positive"),maxAdults:c().required("Max Adults is required").positive("Max Adults must be positive"),maxChildren:c().required("Max Children is required").positive("Max Children must be positive")}),N=()=>{const r={};return s.length===0&&(r.roomNumbers="At least one room number is required."),r};return e.jsx("div",{children:e.jsx(C,{initialValues:{name:"",hotelId:"",maxAdults:0,maxChildren:0,price:"",desc:"",roomNumber:""},validationSchema:j,validate:N,onSubmit:y,children:({values:r,setFieldValue:a,errors:t})=>e.jsx("div",{className:"px-4 py-7 md:px-14 flex justify-center",children:e.jsxs("div",{className:"px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9  w-8/12   items-center ",children:[e.jsx("h1",{className:"p-6 text-2xl md:text-3xl font-bold mb-4 text-center",children:"Add Room"}),e.jsx(R,{children:e.jsxs("div",{className:"grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Room Name:"}),e.jsx(l,{type:"text",name:"name",className:"block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",placeholder:"Name"}),e.jsx("span",{className:"text-Strawberry_red text-sm",children:e.jsx(d,{name:"name"})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Description:"}),e.jsx(l,{type:"text",name:"description",className:"block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",placeholder:"Enter the location"}),e.jsx("span",{className:"text-Strawberry_red text-sm",children:e.jsx(d,{name:"description"})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Hotel:"}),e.jsxs(l,{as:"select",name:"hotelId",className:"block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",children:[e.jsx("option",{value:"",label:"Select a hotel"}),h.map((o,i)=>e.jsx("option",{value:o._id,children:o.name},i))]}),e.jsx("span",{className:"text-Strawberry_red text-sm",children:e.jsx(d,{name:"hotelId"})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Price:"}),e.jsx(l,{type:"text",name:"price",className:"block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",placeholder:"Enter the price"}),e.jsx("span",{className:"text-Strawberry_red text-sm",children:e.jsx(d,{name:"price"})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Maximum Adults:"}),e.jsxs("div",{className:"relative flex items-center max-w-[8rem]",children:[e.jsx("button",{title:"button",type:"button",onClick:()=>a("maxAdults",Math.max(0,r.maxAdults-1)),className:"bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none",children:"-"}),e.jsx("span",{"data-input-counter":!0,"aria-describedby":"helper-text-explanation",className:"bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:r.maxAdults}),e.jsx("button",{title:"button",type:"button",onClick:()=>a("maxAdults",r.maxAdults+1),className:"bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none",children:"+"})]}),e.jsx("span",{className:"text-red-500 text-sm",children:e.jsx(d,{name:"maxAdults"})})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Maximum Children:"}),e.jsxs("div",{className:"relative flex items-center max-w-[8rem]",children:[e.jsx("button",{title:"button",type:"button",onClick:()=>a("maxChildren",Math.max(0,r.maxChildren-1)),className:"bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none",children:"-"}),e.jsx("span",{"data-input-counter":!0,"aria-describedby":"helper-text-explanation",className:"bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:r.maxChildren}),e.jsx("button",{title:"button",type:"button",onClick:()=>a("maxChildren",r.maxChildren+1),className:"bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none",children:"+"})]}),e.jsx("span",{className:"text-red-500 text-sm",children:e.jsx(d,{name:"maxChildren"})})]}),e.jsxs("div",{className:"col-span-2",children:[e.jsx("label",{className:"text-gray-700 text-lg font-bold mb-2",children:"Room Numbers:"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{type:"number",name:"roomNumber",className:"block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",placeholder:"Enter room number"}),e.jsx("button",{type:"button",onClick:()=>f(r.roomNumber,a),className:"ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",children:"Add"})]}),x&&e.jsx("div",{className:"text-Strawberry_red text-sm mt-1",children:x}),t.roomNumber&&e.jsx("div",{className:"text-Strawberry_red text-sm mt-1",children:t.roomNumber}),e.jsx("div",{className:"mt-2 grid grid-cols-12 gap-2",children:s.map((o,i)=>e.jsxs("div",{className:"col-span-1 flex items-center mt-1 w-fit",children:[e.jsx("span",{children:o}),e.jsx("button",{type:"button",onClick:()=>k(i),className:"ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded",children:"X"})]},i))})]}),e.jsx("div",{className:"col-span-2",children:e.jsx("button",{type:"submit",className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4",children:"Submit"})})]})})]})})})})};export{U as default};