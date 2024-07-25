import{r as n,j as t,L as g,z as f,p as b,l as w,q as j,U as k}from"./index-KXlzdG9K.js";import{a as v}from"./hoist-non-react-statics.cjs-HqSw4Y_3.js";import{u as N}from"./NotificationHook-BBS9V_5U.js";const $="/assets/credit-card-B36XrxE3.png";/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...e)=>e.filter((s,a,r)=>!!s&&r.indexOf(s)===a).join(" ");/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=n.forwardRef(({color:e="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:r,className:i="",children:o,iconNode:l,...m},c)=>n.createElement("svg",{ref:c,...C,width:s,height:s,stroke:e,strokeWidth:r?Number(a)*24/Number(s):a,className:p("lucide",i),...m},[...l.map(([u,d])=>n.createElement(u,d)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(e,s)=>{const a=n.forwardRef(({className:r,...i},o)=>n.createElement(I,{ref:o,iconNode:s,className:p(`lucide-${P(e)}`,r),...i}));return a.displayName=`${e}`,a};/**
 * @license lucide-react v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=A("CookingPot",[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",key:"u0tga0"}],["path",{d:"m4 8 16-4",key:"16g0ng"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",key:"12cejc"}]]),E=({isSuccess:e})=>t.jsx("div",{className:"bg-gray-100 min-h-screen flex justify-center items-center px-2",children:t.jsx("div",{className:`bg-white p-6 rounded-lg shadow-md ${e&&"px-10"}`,children:t.jsxs("div",{className:"text-center",children:[e?t.jsx("svg",{viewBox:"0 0 24 24",className:"text-green-600 w-16 h-16 mx-auto my-6 ",children:t.jsx("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"})}):t.jsx("div",{className:"w-16 h-16 mx-auto my-6",children:t.jsx("img",{src:$,alt:"Payment failed image"})}),t.jsx("h3",{className:"md:text-2xl text-lg text-gray-900 font-semibold mb-2",children:e?"Booking Successfull":"Payment Failed!"}),t.jsx("p",{className:"text-gray-600 mb-4",children:e?"Thank you for completing your  payment.":"Sorry, your payment was unsuccessful. Please try again later."}),t.jsx("p",{className:"text-gray-600 mb-8",children:e?"Have a great day!":"If the problem persists, please contact customer support."}),t.jsxs("div",{className:"flex items-center gap-2",children:[t.jsx(g,{to:e?"/user/profile/Mybookings":"/",className:`inline-block px-8 py-3 ${e?"bg-indigo-600 hover:bg-indigo-500":"bg-red-600 hover:bg-red-500"} text-white font-semibold rounded-lg shadow-md transition duration-300`,children:e?"View Booking":"GO BACK"}),e&&t.jsxs(g,{to:"/",className:`bg-teal-400 hover:bg-teal-500  inline-flex gap-1 items-center\r
              text-white font-semibold px-8 py-3 rounded-lg \r
              `,children:["Have something on mind ? ",t.jsx(B,{className:"h-4 w-4"})]})]})]})})}),_=()=>{const[e]=f(),{sendNotification:s}=N(),a=b(c=>c.userSlice),{id:r}=w(),i=j(),o=e.get("success"),l=o==="true",m=n.useRef(!1);return n.useEffect(()=>{const c=localStorage.getItem(`paymentStatusUpdated_${r}`);if(o&&!c&&!m.current){m.current=!0;const u=l?"Paid":"Failed";v.patch(`${k}/payment/status/${r}`,{paymentStatus:u},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}).then(({data:d})=>{const h=`${d.result.hotelId.name} booked by ${a.name}`,x=`/owner/bookingDetails/${d.result._id}`,y=d.result.hotelId.ownerId._id;s(h,x,a,y,1),localStorage.setItem(`paymentStatusUpdated_${r}`,"true")})}},[o,r,l,a.id,a.name,a.image,i]),t.jsx("div",{children:t.jsx(E,{isSuccess:l})})};export{_ as default};
