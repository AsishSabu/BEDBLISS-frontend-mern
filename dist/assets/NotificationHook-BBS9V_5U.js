import{q as d,r as m,U as r}from"./index-KXlzdG9K.js";import{a as f}from"./hoist-non-react-statics.cjs-HqSw4Y_3.js";const N=()=>{const t=d();return{sendNotification:m.useCallback(async(o,i,a,n,e)=>{const c={type:e,message:o,data:{senderId:a.id,name:a.name,image:a.image,onClickPath:i}},s={type:e,message:o,data:{senderId:a.id,name:a.name,image:a.image,onClickPath:i},createdAt:new Date(Date.now())};t==null||t.emit("noti",s,n),f.patch(`${r}/addNotification/${n}`,c,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})},[t])}};export{N as u};