const __vite__fileDeps=["assets/Layout-CFfJ1JyR.js","assets/index-C0JB0cT-.js","assets/index-DLTz6Mb1.css","assets/logo-CkiQX2uB.js","assets/Notifications-BtANmxaB.js","assets/hoist-non-react-statics.cjs-CxxjioJb.js","assets/index-Cd8CbeYN.js","assets/clsx-B-dksMZM.js","assets/ToggleSwitch-BZI4oU_G.js","assets/index-Umk_CdzM.js","assets/index.esm-B0Pxq1wK.js","assets/floating-ui.react-dom-BqiJ1lPF.js","assets/CheckoutPage-W95T-0Wf.js","assets/formik.esm-DlztVDdY.js","assets/index.esm-BKJcP99K.js","assets/PaymentCompleted-BFGBMAD2.js","assets/NotificationHook-CKFK8QD4.js","assets/BookingHistory-DAlOgCn0.js","assets/BookingDetails-EPxpf9hK.js","assets/Messages-D1XtwmWj.js","assets/index-DUeupfZa.js","assets/index-CYkqFElQ.js","assets/tslib.es6-DuO2G4rp.js","assets/imageUpload-B_HbYlTc.js","assets/Wallet-1v0t411z.js","assets/NotFoundPage-Q7huf7-_.js","assets/HotelDetails-C44yysLk.js","assets/default-DZ6iiexP.js","assets/default-DM65bp54.css","assets/index-BlK-UjDw.js","assets/iconBase-53EnAEkU.js","assets/Hotels-B76GKjaF.js","assets/SearchBoxUser-DAJ2J28C.js","assets/UserProfile-DpnFFKBZ.js","assets/axiosService-BsYarKI0.js","assets/Home-BD76XYVc.js","assets/Profile-BBvwmq_1.js","assets/index-BxFhfxZx.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{r,u as b,U as n,j as e,_ as s,R as j,a as t}from"./index-C0JB0cT-.js";import{P as _,a as f}from"./index-Cd8CbeYN.js";import{u as k,N as v}from"./Notifications-BtANmxaB.js";import{a as N,s as c}from"./hoist-non-react-statics.cjs-CxxjioJb.js";import"./clsx-B-dksMZM.js";const E=()=>{const[i,l]=r.useState([]),m=b(),{data:o,isError:x,isLoading:g}=k(`${n}/saved`);r.useEffect(()=>{o&&o.savedHotels?l(o.savedHotels):l([])},[o]);const u=a=>{m(`/user/hotelDetails/${a}`)},p=async a=>{try{const d=await N.patch(`${n}/removeSaved/${a}`,{},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});c(d.data.message,"success");const h=i.filter(y=>y._id!==a);l(h)}catch{c("Failed to remove hotel","error")}};return g?e.jsx("p",{children:"Loading..."}):x?e.jsx("p",{children:"Error loading saved hotels."}):e.jsxs("div",{className:"py-10 md:px-20 sm:px-10 px-5",children:[e.jsx("h2",{className:"text-2xl font-bold mb-5",children:"My next trip"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl",children:i.length>0?i.map(a=>e.jsxs("div",{className:"bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:[e.jsxs("div",{className:"relative rounded-lg",children:[e.jsx("button",{onClick:()=>p(a._id),className:"absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center",children:"X"}),e.jsx("img",{className:"rounded-2xl object-cover aspect-square",src:a.imageUrls[0],alt:a.name})]}),e.jsxs("div",{className:"pt-2 h-fit rounded-lg ",onClick:()=>u(a._id),children:[e.jsx("h5",{className:"mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white",children:a.name}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("p",{className:"mb-1 text-sm font-thin text-gray-700 dark:text-gray-400",children:a.destination}),e.jsxs("p",{className:"mb-1 text-sm font-thin text-gray-700 dark:text-gray-400",children:["₹",a.price]})]})]})]},a._id)):e.jsx("p",{children:"No hotels available"})})]})},w=()=>e.jsx("section",{className:"bg-white dark:bg-gray-900 ",children:e.jsxs("div",{className:"py-8 lg:py-16 px-4 mx-auto max-w-screen-md",children:[e.jsx("h2",{className:"mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white",children:"Contact Us"}),e.jsx("p",{className:"mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl",children:"Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know."}),e.jsxs("form",{action:"#",className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:"Your email"}),e.jsx("input",{type:"email",id:"email",className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",placeholder:"name@flowbite.com",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"subject",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:"Subject"}),e.jsx("input",{type:"text",id:"subject",className:"block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",placeholder:"Let us know how we can help you",required:!0})]}),e.jsxs("div",{className:"sm:col-span-2",children:[e.jsx("label",{htmlFor:"message",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",children:"Your message"}),e.jsx("textarea",{id:"message",rows:6,className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Leave a comment..."})]}),e.jsx("button",{type:"submit",className:"py-3 px-5 bg-varBlue text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:"Send message"})]})]})}),P=r.lazy(()=>s(()=>import("./Layout-CFfJ1JyR.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]))),R=r.lazy(()=>s(()=>import("./CheckoutPage-W95T-0Wf.js"),__vite__mapDeps([12,1,2,13,5,14,4,6,7]))),L=r.lazy(()=>s(()=>import("./PaymentCompleted-BFGBMAD2.js"),__vite__mapDeps([15,1,2,5,16]))),D=r.lazy(()=>s(()=>import("./BookingHistory-DAlOgCn0.js"),__vite__mapDeps([17,1,2,4,5,6,7]))),A=r.lazy(()=>s(()=>import("./BookingDetails-EPxpf9hK.js"),__vite__mapDeps([18,1,2,4,5,6,7,19,20,21,22,10,23,16]))),z=r.lazy(()=>s(()=>import("./Wallet-1v0t411z.js"),__vite__mapDeps([24,1,2,4,5,6,7]))),I=r.lazy(()=>s(()=>import("./NotFoundPage-Q7huf7-_.js"),__vite__mapDeps([25,1,2]))),T=r.lazy(()=>s(()=>import("./HotelDetails-C44yysLk.js"),__vite__mapDeps([26,1,2,6,5,27,21,9,28,4,7,29,30,20,22,10,23]))),O=r.lazy(()=>s(()=>import("./Hotels-B76GKjaF.js"),__vite__mapDeps([31,1,2,13,5,6,32,27,21,9,28,4,7,20,22,10]))),V=r.lazy(()=>s(()=>import("./UserProfile-DpnFFKBZ.js"),__vite__mapDeps([33,1,2,13,5,14,34,23,4,6,7,20,21,22,10]))),H=r.lazy(()=>s(()=>import("./Home-BD76XYVc.js"),__vite__mapDeps([35,1,2,32,27,21,9,28,4,5,6,7]))),U=r.lazy(()=>s(()=>import("./Profile-BBvwmq_1.js"),__vite__mapDeps([36,1,2,37,30]))),q=()=>e.jsx(j,{children:e.jsxs(t,{path:"",element:e.jsx(P,{}),children:[e.jsxs(t,{path:"",element:e.jsx(_,{}),children:[e.jsx(t,{index:!0,element:e.jsx(H,{})}),e.jsx(t,{path:"hotels",element:e.jsx(O,{})}),e.jsx(t,{path:"hotelDetails/:id",element:e.jsx(T,{})}),e.jsx(t,{path:"contactUs",element:e.jsx(w,{})})]}),e.jsxs(t,{path:"",element:e.jsx(f,{}),children:[e.jsx(t,{path:"saved",element:e.jsx(E,{})}),e.jsx(t,{path:"checkout/:id",element:e.jsx(R,{})}),e.jsx(t,{path:"payment_status/:id",element:e.jsx(L,{})}),e.jsx(t,{path:"notifications",element:e.jsx(v,{})}),e.jsxs(t,{path:"profile",element:e.jsx(U,{}),children:[e.jsx(t,{index:!0,element:e.jsx(V,{})}),e.jsx(t,{path:"/profile/Mybookings",element:e.jsx(D,{})}),e.jsx(t,{path:"/profile/bookingDetails/:id",element:e.jsx(A,{})}),e.jsx(t,{path:"/profile/MyWallet",element:e.jsx(z,{})})]})]}),e.jsx(t,{path:"*",element:e.jsx(I,{})})]})});export{q as default};