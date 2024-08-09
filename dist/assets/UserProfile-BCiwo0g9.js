import{U as w,v as N,s as P,r as p,y as F,I,J as D,j as a}from"./index-BbR1353G.js";import{u as A}from"./formik.esm-Dx4FV9u3.js";import{c as E,a as d,d as $}from"./index.esm-Dmy6JEbm.js";import{a as R,s as v}from"./hoist-non-react-statics.cjs-BToLjH0z.js";import{a as U}from"./axiosService-Dv1iEGWQ.js";import{u as Y}from"./imageUpload-B4lxFXOD.js";import{u as k,v as q}from"./Notifications-DoaGR5xu.js";import{r as z}from"./Pagination-BytGtE1z.js";import"./clsx-B-dksMZM.js";import"./tslib.es6-DuO2G4rp.js";R.defaults.withCredentials=!0;const O=()=>{const{data:t,isError:n}=k(`${w}/profile`),i=N(),m=P(s=>s.userSlice),[l,e]=p.useState(null),[c,j]=p.useState(!1),[C,f]=p.useState({name:"",email:"",phone:"",dob:"",state:"",country:"",imageFile:[]}),r=t?t.user:null;return n&&v("Oops! Something went wrong","error"),p.useEffect(()=>{r&&(f({name:r.name||"",email:r.email||"",phone:r.phoneNumber||"",dob:r.dob||"",state:r.state||"",country:r.country||"",imageFile:[]}),e(r.profilePic||null))},[r]),{profile:r,formData:C,imagePreview:l,isSubmitting:c,handleInputChange:s=>{const{name:h,value:u}=s.target;if(h==="imageFile"){const g=s.target,x=g.files&&g.files[0];if(x){const b=new FileReader;b.onloadend=()=>{e(b.result)},b.readAsDataURL(x),f(S=>({...S,imageFile:[x]}))}}else f(g=>({...g,[h]:u}))},handleSubmit:async s=>{j(!0);try{const h=(await Y(s.imageFile)).toString(),{data:u}=await U.patch(`${w}/profile/edit`,{name:s.name,phoneNumber:s.phone,profilePic:h||(r==null?void 0:r.profilePic),dob:s.dob,state:s.state,country:s.country},{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});v(u.message),i(F({...m,name:u.user.name,image:u.user.profilePic}))}catch{v("Oops! Something went wrong while updating profile","error")}finally{j(!1)}}}},y=new Date;y.setFullYear(y.getFullYear()-10);const Q=()=>{const{profile:t,formData:n,imagePreview:i,handleInputChange:m,handleSubmit:l}=O(),e=A({initialValues:n,enableReinitialize:!0,validationSchema:E({name:d().matches(I,"Invalid name").required(),email:d().email("Invalid email address").required("Email is required"),phone:d().matches(D,"Phone number must have 10 numbers").optional(),dob:$().max(new Date(new Date().setFullYear(new Date().getFullYear()-10)),"minimum required age is 10").optional().nullable(),state:d().matches(/^[A-Za-z\s]+$/,"Enter a valid State").optional(),country:d().matches(/^[A-Za-z\s]+$/,"enter a valid Country").optional()}),onSubmit:c=>{l(c)}});return a.jsx("div",{className:"w-screen h-fit overflow-hidden ",children:a.jsx("div",{className:"min-h-screen bg-varWhite text-black p-4",children:a.jsx("div",{className:"max-w-4xl mx-auto",children:a.jsx("div",{className:"min-h-screen flex justify-center items-center",children:a.jsxs("div",{className:"bg-varWhite p-6 rounded-lg shadow-lg w-full overflow-auto",children:[a.jsxs("div",{className:"flex items-center space-x-4 mb-6",children:[a.jsx("img",{src:i||(t!=null&&t.profilePic?t==null?void 0:t.profilePic:q),alt:"",className:"w-32 h-32 bg-gray-800 text-white flex items-center justify-center rounded-full text-4xl"}),a.jsxs("label",{htmlFor:"profile-image",className:"flex items-center justify-center text-white bg-Marine_blue font-semibold cursor-pointer mt-3 p-2 rounded-full",children:[t!=null&&t.profilePic?"Change":"Add",a.jsx("input",{type:"file",id:"profile-image",name:"imageFile",className:"hidden",accept:"image/*",onChange:m})]})]}),a.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Your profile"}),a.jsxs("form",{onSubmit:e.handleSubmit,children:[a.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[a.jsx(o,{title:"Name",name:"name",value:e.values.name,onChange:e.handleChange,error:e.errors.name}),a.jsx(o,{title:"Email",name:"email",value:e.values.email,onChange:e.handleChange,error:e.errors.email,disabled:!0}),a.jsx(o,{title:"Phone",name:"phone",value:e.values.phone,onChange:e.handleChange,error:e.errors.phone}),a.jsx(o,{title:"DOB",name:"dob",type:"date",value:e.values.dob,onChange:e.handleChange,error:e.errors.dob}),a.jsx(o,{title:"State",name:"state",value:e.values.state,onChange:e.handleChange,error:e.errors.state}),a.jsx(o,{title:"Country",name:"country",value:e.values.country,onChange:e.handleChange,error:e.errors.country})]}),a.jsx("button",{type:"submit",className:"bg-blue-900 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500",children:"Update Profile"})]})]})})})})})},o=({title:t,name:n,value:i,onChange:m,error:l,disabled:e=!1,type:c=""})=>a.jsxs("div",{className:"flex flex-col p-4 bg-gray-50 border border-gray-200 rounded-lg",children:[a.jsx("label",{htmlFor:n,className:"text-gray-700 text-lg",children:t}),a.jsx(z.Input,{variant:"static",type:c,id:n,name:n,value:i,onChange:m,className:"px-3 py-2 w-full",disabled:e}),l?a.jsx("div",{className:"text-red-500 text-sm mt-1",children:l}):null]});export{Q as default};
