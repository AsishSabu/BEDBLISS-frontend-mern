import{U as w,v as P,s as N,r as p,y as F,I,J as D,j as a}from"./index-KXlzdG9K.js";import{u as A}from"./formik.esm-DiYwNCQ8.js";import{c as E,a as d,d as $}from"./index.esm-YSYIP4zo.js";import{a as R,s as v}from"./hoist-non-react-statics.cjs-HqSw4Y_3.js";import{a as U}from"./axiosService-CXjPuuKV.js";import{u as Y}from"./imageUpload-D63niljF.js";import{u as q,v as z}from"./Notifications-27rzImSY.js";import{r as k}from"./index-CGb8gEsT.js";import"./index-mMo2Mjdk.js";import"./clsx-B-dksMZM.js";import"./index-CSCTJCDn.js";import"./tslib.es6-DuO2G4rp.js";import"./index.esm-B0Pxq1wK.js";R.defaults.withCredentials=!0;const O=()=>{const{data:t,isError:n}=q(`${w}/profile`),i=P(),m=N(s=>s.userSlice),[o,e]=p.useState(null),[u,y]=p.useState(!1),[C,f]=p.useState({name:"",email:"",phone:"",dob:"",state:"",country:"",imageFile:[]}),r=t?t.user:null;return n&&v("Oops! Something went wrong","error"),p.useEffect(()=>{r&&(f({name:r.name||"",email:r.email||"",phone:r.phoneNumber||"",dob:r.dob||"",state:r.state||"",country:r.country||"",imageFile:[]}),e(r.profilePic||null))},[r]),{profile:r,formData:C,imagePreview:o,isSubmitting:u,handleInputChange:s=>{const{name:h,value:c}=s.target;if(h==="imageFile"){const g=s.target,x=g.files&&g.files[0];if(x){const b=new FileReader;b.onloadend=()=>{e(b.result)},b.readAsDataURL(x),f(S=>({...S,imageFile:[x]}))}}else f(g=>({...g,[h]:c}))},handleSubmit:async s=>{y(!0);try{const h=(await Y(s.imageFile)).toString(),{data:c}=await U.patch(`${w}/profile/edit`,{name:s.name,phoneNumber:s.phone,profilePic:h||(r==null?void 0:r.profilePic),dob:s.dob,state:s.state,country:s.country},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});v(c.message),i(F({...m,name:c.user.name,image:c.user.profilePic}))}catch{v("Oops! Something went wrong while updating profile","error")}finally{y(!1)}}}},j=new Date;j.setFullYear(j.getFullYear()-10);const ae=()=>{const{profile:t,formData:n,imagePreview:i,handleInputChange:m,handleSubmit:o}=O(),e=A({initialValues:n,enableReinitialize:!0,validationSchema:E({name:d().matches(I,"Invalid name").required(),email:d().email("Invalid email address").required("Email is required"),phone:d().matches(D,"Phone number must have 10 numbers").optional(),dob:$().max(new Date(new Date().setFullYear(new Date().getFullYear()-10)),"minimum required age is 10").optional().nullable(),state:d().matches(/^[A-Za-z\s]+$/,"Enter a valid State").optional(),country:d().matches(/^[A-Za-z\s]+$/,"enter a valid Country").optional()}),onSubmit:u=>{o(u)}});return a.jsx("div",{className:"flex flex-col w-screen h-screen overflow-hidden ml-64",children:a.jsx("div",{className:"min-h-screen bg-gray-100 flex justify-center items-center",children:a.jsxs("div",{className:"bg-varWhite p-6 rounded-lg shadow-lg w-full overflow-auto",children:[a.jsxs("div",{className:"flex items-center space-x-4 mb-6",children:[a.jsx("img",{src:i||(t!=null&&t.profilePic?t==null?void 0:t.profilePic:z),alt:"",className:"w-32 h-32 bg-gray-800 text-white flex items-center justify-center rounded-full text-4xl"}),a.jsxs("label",{htmlFor:"profile-image",className:"flex items-center justify-center text-white bg-Marine_blue font-semibold cursor-pointer mt-3 p-2 rounded-full",children:[t!=null&&t.profilePic?"Change":"Add",a.jsx("input",{type:"file",id:"profile-image",name:"imageFile",className:"hidden",accept:"image/*",onChange:m})]})]}),a.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Your profile"}),a.jsxs("form",{onSubmit:e.handleSubmit,children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsx(l,{title:"Name",name:"name",value:e.values.name,onChange:e.handleChange,error:e.errors.name}),a.jsx(l,{title:"Email",name:"email",value:e.values.email,onChange:e.handleChange,error:e.errors.email,disabled:!0}),a.jsx(l,{title:"Phone",name:"phone",value:e.values.phone,onChange:e.handleChange,error:e.errors.phone}),a.jsx(l,{title:"DOB",name:"dob",type:"date",value:e.values.dob,onChange:e.handleChange,error:e.errors.dob}),a.jsx(l,{title:"State",name:"state",value:e.values.state,onChange:e.handleChange,error:e.errors.state}),a.jsx(l,{title:"Country",name:"country",value:e.values.country,onChange:e.handleChange,error:e.errors.country})]}),a.jsx("button",{type:"submit",className:"bg-blue-900 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500",children:"Update Profile"})]})]})})})},l=({title:t,name:n,value:i,onChange:m,error:o,disabled:e=!1,type:u=""})=>a.jsxs("div",{className:"flex flex-col p-4 bg-gray-50 border border-gray-200 rounded-lg",children:[a.jsx("label",{htmlFor:n,className:"text-gray-700 text-lg",children:t}),a.jsx(k.Input,{variant:"static",type:u,id:n,name:n,value:i,onChange:m,className:"px-3 py-2 w-full",disabled:e}),o?a.jsx("div",{className:"text-red-500 text-sm mt-1",children:o}):null]});export{ae as default};