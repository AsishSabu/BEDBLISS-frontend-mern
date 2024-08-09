const __vite__fileDeps=["assets/Layout-BicMox1b.js","assets/index-G4O_8HcF.js","assets/index-FAy0rlv3.css","assets/Notifications-N6mrlI2l.js","assets/hoist-non-react-statics.cjs-a0QTsczJ.js","assets/Pagination-dCx4FqSh.js","assets/tslib.es6-DuO2G4rp.js","assets/clsx-B-dksMZM.js","assets/ToggleSwitch-ASKigdMM.js","assets/index-CSX2c45u.js","assets/floating-ui.react-dom-DAnhvcHD.js","assets/CheckoutPage-CX6-v85U.js","assets/formik.esm-CdzbWKuU.js","assets/index.esm-CeTZs_cb.js","assets/PaymentCompleted-BlHfKWbB.js","assets/NotificationHook-uOF3TroS.js","assets/BookingHistory-LvZaVG5Y.js","assets/BookingDetails-DyVcfdGc.js","assets/Messages-Hw-ui_Y1.js","assets/imageUpload-Boqc3c24.js","assets/Wallet-PKmxP0rF.js","assets/NotFoundPage-B3dOO_4y.js","assets/HotelDetails-CWb4bOIF.js","assets/default-UtGuZszh.js","assets/default-DM65bp54.css","assets/StarComponent-DyzT6Ivp.js","assets/iconBase-CwgE8KDf.js","assets/Hotels-C1Go6_Sq.js","assets/SearchBoxUser-C_ohkZyT.js","assets/UserProfile-BN4u9Xs9.js","assets/axiosService-Bv-PP213.js","assets/Home-DSRiGzIY.js","assets/Profile-DQWbwFGw.js","assets/index-CHbzFB2W.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{r as s,u as b,U as p,j as e,R as f,_ as a,a as j,b as t}from"./index-G4O_8HcF.js";import{P as _,a as k}from"./Pagination-dCx4FqSh.js";import{u as v,N as w}from"./Notifications-N6mrlI2l.js";import{a as E,s as m}from"./hoist-non-react-statics.cjs-a0QTsczJ.js";import"./tslib.es6-DuO2G4rp.js";import"./clsx-B-dksMZM.js";const N=()=>{const[l,i]=s.useState([]),c=b(),{data:o,isError:d,isLoading:x}=v(`${p}/saved`);s.useEffect(()=>{o&&o.savedHotels?i(o.savedHotels):i([])},[o]);const n=r=>{c(`/user/hotelDetails/${r}`)},g=async r=>{try{const u=await E.patch(`${p}/removeSaved/${r}`,{},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});m(u.data.message,"success");const h=l.filter(y=>y._id!==r);i(h)}catch{m("Failed to remove hotel","error")}};return x?e.jsx("p",{children:"Loading..."}):d?e.jsx("p",{children:"Error loading saved hotels."}):e.jsxs("div",{className:"py-10 md:px-20 sm:px-10 px-5",children:[e.jsx("h2",{className:"text-2xl font-bold mb-5",children:"My next trip"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl",children:l.length>0?l.map(r=>e.jsxs("div",{className:"bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:[e.jsxs("div",{className:"relative rounded-lg",children:[e.jsx("button",{onClick:()=>g(r._id),className:"absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center",children:"X"}),e.jsx("img",{className:"rounded-2xl object-cover aspect-square",src:r.imageUrls[0],alt:r.name})]}),e.jsxs("div",{className:"pt-2 h-fit rounded-lg ",onClick:()=>n(r._id),children:[e.jsx("h5",{className:"mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white",children:r.name}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("p",{className:"mb-1 text-sm font-thin text-gray-700 dark:text-gray-400",children:r.destination}),e.jsxs("p",{className:"mb-1 text-sm font-thin text-gray-700 dark:text-gray-400",children:["₹",r.price]})]})]})]},r._id)):e.jsx("p",{children:"No hotels available"})})]})},D=()=>{const[l,i]=f.useState(""),c=async o=>{o.preventDefault(),i("Sending....");const d=new FormData(o.target);d.append("access_key","6c5a2dec-8228-42c1-bf3c-fc97157ee5a5");const n=await(await fetch("https://api.web3forms.com/submit",{method:"POST",body:d})).json();n.success?(i(""),m("message send successfully","success"),o.target.reset()):(console.log("Error",n),i(n.message))};return e.jsx("section",{className:"bg-white dark:bg-gray-900 ",children:e.jsxs("div",{className:"py-8 lg:py-16 px-4 mx-auto max-w-screen-md",children:[e.jsx("h2",{className:"mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white",children:"Contact Us"}),e.jsx("p",{className:"mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl",children:"Got a technical issue? ? Let us know."}),e.jsxs("form",{action:"#",className:"space-y-8",onSubmit:c,children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:"Your email"}),e.jsx("input",{type:"email",id:"email",name:"email",className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",placeholder:"enter your email",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"subject",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:"Name"}),e.jsx("input",{type:"text",id:"subject",name:"name",className:"block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",placeholder:"enter your name",required:!0})]}),e.jsxs("div",{className:"sm:col-span-2",children:[e.jsx("label",{htmlFor:"message",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",children:"Your message"}),e.jsx("textarea",{id:"message",rows:6,name:"message",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Leave a comment..."})]}),e.jsx("button",{type:"submit",className:"py-3 px-5 bg-varBlue text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:"Send message"})]}),e.jsx("div",{className:"text-center text-gray-500 dark:text-gray-400",children:l})]})})},P=()=>e.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-4",children:"About BEDBLISS"}),e.jsx("p",{className:"text-lg mb-4",children:"BEDBLISS was founded with a vision to transform the way people book accommodations and experience their travels. Our mission is to provide a seamless, user-friendly platform that connects travelers with the perfect places to stay, from cozy homes to luxurious hotels, ensuring a memorable and stress-free experience."}),e.jsx("p",{className:"text-lg mb-4",children:"At BEDBLISS, we believe in leveraging technology to enhance your travel experience. Our platform offers a wide range of accommodation options, including unique stays and modern amenities, all designed to meet diverse travel needs. We strive to make booking simple and efficient, allowing you to focus on enjoying your journey."}),e.jsx("p",{className:"text-lg mb-4",children:"With a commitment to quality and customer satisfaction, BEDBLISS is dedicated to offering exceptional support around the clock. Our goal is to ensure that every guest has a smooth booking experience and access to the best places to stay, no matter where their travels take them."}),e.jsx("p",{className:"text-lg",children:"Explore our platform today and discover why BEDBLISS is your ideal travel companion. Experience the world like never before with our curated selection of accommodations and unparalleled customer service."})]}),L=s.lazy(()=>a(()=>import("./Layout-BicMox1b.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),R=s.lazy(()=>a(()=>import("./CheckoutPage-CX6-v85U.js"),__vite__mapDeps([11,1,2,12,4,13,3,5,6,7]))),S=s.lazy(()=>a(()=>import("./PaymentCompleted-BlHfKWbB.js"),__vite__mapDeps([14,1,2,4,15]))),A=s.lazy(()=>a(()=>import("./BookingHistory-LvZaVG5Y.js"),__vite__mapDeps([16,1,2,3,4,5,6,7]))),I=s.lazy(()=>a(()=>import("./BookingDetails-DyVcfdGc.js"),__vite__mapDeps([17,1,2,3,4,5,6,7,18,19,15]))),O=s.lazy(()=>a(()=>import("./Wallet-PKmxP0rF.js"),__vite__mapDeps([20,1,2,3,4,5,6,7]))),z=s.lazy(()=>a(()=>import("./NotFoundPage-B3dOO_4y.js"),__vite__mapDeps([21,1,2]))),B=s.lazy(()=>a(()=>import("./HotelDetails-CWb4bOIF.js"),__vite__mapDeps([22,1,2,5,4,6,23,9,24,3,7,25,26,19]))),T=s.lazy(()=>a(()=>import("./Hotels-C1Go6_Sq.js"),__vite__mapDeps([27,1,2,12,4,5,6,28,23,9,24,3,7]))),V=s.lazy(()=>a(()=>import("./UserProfile-BN4u9Xs9.js"),__vite__mapDeps([29,1,2,12,4,13,30,19,3,5,6,7]))),U=s.lazy(()=>a(()=>import("./Home-DSRiGzIY.js"),__vite__mapDeps([31,1,2,28,23,5,4,6,9,24,3,7]))),H=s.lazy(()=>a(()=>import("./Profile-DQWbwFGw.js"),__vite__mapDeps([32,1,2,33,26]))),G=()=>e.jsx(j,{children:e.jsxs(t,{path:"",element:e.jsx(L,{}),children:[e.jsxs(t,{path:"",element:e.jsx(_,{}),children:[e.jsx(t,{index:!0,element:e.jsx(U,{})}),e.jsx(t,{path:"hotels",element:e.jsx(T,{})}),e.jsx(t,{path:"hotelDetails/:id",element:e.jsx(B,{})}),e.jsx(t,{path:"contactUs",element:e.jsx(D,{})}),e.jsx(t,{path:"AboutUs",element:e.jsx(P,{})})]}),e.jsxs(t,{path:"",element:e.jsx(k,{}),children:[e.jsx(t,{path:"saved",element:e.jsx(N,{})}),e.jsx(t,{path:"checkout/:id",element:e.jsx(R,{})}),e.jsx(t,{path:"payment_status/:id",element:e.jsx(S,{})}),e.jsx(t,{path:"notifications",element:e.jsx(w,{})}),e.jsxs(t,{path:"profile",element:e.jsx(H,{}),children:[e.jsx(t,{index:!0,element:e.jsx(V,{})}),e.jsx(t,{path:"/profile/Mybookings",element:e.jsx(A,{})}),e.jsx(t,{path:"/profile/bookingDetails/:id",element:e.jsx(I,{})}),e.jsx(t,{path:"/profile/MyWallet",element:e.jsx(O,{})})]})]}),e.jsx(t,{path:"*",element:e.jsx(z,{})})]})});export{G as default};