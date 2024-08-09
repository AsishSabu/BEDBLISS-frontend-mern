import{r as d,u as N,U as h,j as s}from"./index-BbR1353G.js";import{a as g,s as u}from"./hoist-non-react-statics.cjs-BToLjH0z.js";import{u as S,F as I}from"./formik.esm-Dx4FV9u3.js";import{g as v,r as E}from"./localStorage-jfIHgayU.js";const L=()=>{const[c,f]=d.useState(60),p=N(),i=S({initialValues:{otp:Array.from({length:6}).fill("")},onSubmit:async(t,e)=>{var r,a;const n=v("userId"),o=t.otp.join("");if(n)try{const{data:m}=await g.post(h+"/auth/verifyOtp",{otp:o,userid:n});u(m.message,"success"),E("userId"),p("/auth/login")}catch(m){u(((a=(r=m.response)==null?void 0:r.data)==null?void 0:a.message)||"An error occurred","error")}else u("Something went wrong","error"),p("/auth/login",{replace:!0});e.setSubmitting(!1)}}),l=d.useRef([]);d.useEffect(()=>{const t=l.current[0];if(t)return t.focus(),t.addEventListener("paste",x),()=>t.removeEventListener("paste",x)},[]),d.useEffect(()=>{const t=setInterval(()=>{c>0&&f(e=>e-1)},1e3);return()=>clearInterval(t)},[c]);const b=()=>{f(60);const t=v("userId");t&&g.post(h+"/auth/resendOtp",{userId:t}).then(({data:e})=>{u(e.message,"success")}).catch(({response:e})=>{u(e.data.message,"error")})},x=t=>{var o,r;const e=(o=t.clipboardData)==null?void 0:o.getData("text"),n=e==null?void 0:e.split("").slice(0,6).map(a=>a||"");i.setValues(a=>({...a,otp:n})),(r=l.current[5])==null||r.focus()},j=(t,e)=>{var r;const{value:n}=t.target,o=[...i.values.otp];o[e]=n.slice(-1),i.setValues(a=>({...a,otp:o})),n&&e<5&&((r=l.current[e+1])==null||r.focus())},w=(t,e)=>{var n;t.key==="Backspace"&&e>0&&((n=l.current[e-1])==null||n.focus())},y=()=>i.values.otp.map((t,e)=>s.jsx("input",{title:"input",maxLength:1,type:"text",name:e.toString(),value:t,onKeyUp:n=>w(n,e),ref:n=>l.current[e]=n,onChange:n=>j(n,e),className:"w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",pattern:"\\d*"},e));return s.jsx("div",{className:"relative font-inter antialiased",children:s.jsx("main",{className:"relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden",children:s.jsx("div",{className:"w-full max-w-6xl mx-auto px-4 md:px-6 py-24",children:s.jsx("div",{className:"flex justify-center",children:s.jsxs("div",{className:"max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow",children:[s.jsxs("header",{className:"mb-8",children:[s.jsx("h1",{className:"text-2xl font-bold mb-1",children:"Email Verification"}),s.jsx("p",{className:"text-[15px] text-slate-500",children:"Enter the 6-digit verification code that was sent to your email."})]}),s.jsx(I,{initialValues:i.initialValues,onSubmit:i.handleSubmit,children:({handleSubmit:t})=>s.jsxs("form",{id:"otp-form",onSubmit:t,children:[s.jsx("div",{className:"flex items-center justify-center gap-3",children:y()}),s.jsx("div",{className:"max-w-[260px] mx-auto mt-4",children:s.jsx("button",{type:"submit",className:"w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150",children:"Verify Account"})})]})}),s.jsxs("div",{className:"text-sm text-slate-500 mt-4",children:["Didn't receive code?"," ",s.jsx("button",{className:"text-blue-500 underline focus:outline-none hover:text-blue-700",onClick:b,disabled:c!==0,children:"Resend OTP"})]}),s.jsx("span",{className:"font-medium",children:c!==0&&` (${c}s)`})]})})})})})};export{L as default};
