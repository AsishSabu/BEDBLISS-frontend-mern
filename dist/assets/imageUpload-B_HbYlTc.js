import{a as s,s as l}from"./hoist-non-react-statics.cjs-CxxjioJb.js";import{K as n,M as p}from"./index-C0JB0cT-.js";const m=async r=>{try{console.log(r,"/////////////////////////////");const a=r.map(async t=>{const o=new FormData;o.append("file",t),o.append("upload_preset",n);const e=await s.post(p,o,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!1});if(!e.data.secure_url)throw new Error("Failed to upload image to Cloudinary");return e.data.secure_url});return await Promise.all(a)}catch(a){throw l("Error uploading images to Cloudinary","error"),a}};export{m as u};