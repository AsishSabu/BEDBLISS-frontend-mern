import{s as C,r as a,d as h,j as e}from"./index-BbR1353G.js";import{F as g,f as k,d as S,a as O}from"./default-D4on9fXr.js";import{q as b}from"./Notifications-DoaGR5xu.js";const M=({handleSearch:j})=>{const N=C(s=>s.searchingSlice),[i,m]=a.useState(!1),[x,u]=a.useState(!1),[l,p]=a.useState({startDate:new Date,endDate:h(new Date,1)}),[t,w]=a.useState({adult:1,children:0,room:1}),[y,D]=a.useState(N.destination),o=a.useRef(null),c=a.useRef(null),n=(s,r)=>{w(d=>({...d,[s]:r==="i"?t[s]+1:t[s]-1}))},v=s=>{const{startDate:r,endDate:d}=s.selection;d<=r?p({startDate:r,endDate:h(r,1)}):p({startDate:r,endDate:d})},f=s=>{o.current&&!o.current.contains(s.target)&&m(!1),c.current&&!c.current.contains(s.target)&&u(!1)};return a.useEffect(()=>(document.addEventListener("mousedown",f),()=>{document.removeEventListener("mousedown",f)}),[]),e.jsxs("div",{className:"flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white border border-gray-300 shadow-lg rounded-lg md:mx-auto max-w-full md:max-w-4xl m-4  ",children:[e.jsx("input",{type:"text",placeholder:"Enter your destination",value:y,onChange:s=>D(s.target.value),className:"px-2 py-1 border border-gray-300 rounded-md w-full md:w-auto"}),e.jsxs("div",{className:"flex items-center space-x-2 cursor-pointer relative w-full md:w-fit border rounded-md py-2 px-3 md:border-none justify-center",ref:o,children:[e.jsx(g,{icon:k,className:"text-gray-500"}),e.jsx("span",{onClick:()=>m(!i),className:"text-gray-700",children:`${b(l.startDate,"MM/dd/yyyy")} to ${b(l.endDate,"MM/dd/yyyy")}`}),i&&e.jsx("div",{className:"absolute top-12 left-0 z-50 mt-2",children:e.jsx(S.DateRange,{editableDateInputs:!0,onChange:v,moveRangeOnFirstSelection:!1,ranges:[{startDate:l.startDate,endDate:l.endDate,key:"selection"}],className:"shadow-md rounded-lg",minDate:new Date})})]}),e.jsxs("div",{className:"flex items-center space-x-2 cursor-pointer md:relative w-full md:w-fit md:border-none justify-center border py-2 rounded-md",ref:c,children:[e.jsx(g,{icon:O,className:"text-gray-500"}),e.jsx("span",{onClick:()=>u(!x),className:"text-gray-700",children:`${t.adult} adult · ${t.children} children · ${t.room} room`}),x&&e.jsxs("div",{className:"absolute top-12 left-0 w-48 bg-white p-4 rounded-lg shadow-md z-50",children:[e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-gray-700",children:"Adult"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:t.adult<=1,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>n("adult","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:t.adult}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>n("adult","i"),children:"+"})]})]}),e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsx("span",{className:"text-gray-700",children:"Children"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:t.children<=0,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>n("children","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:t.children}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>n("children","i"),children:"+"})]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-700",children:"Room"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("button",{disabled:t.room<=1,className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50",onClick:()=>n("room","d"),children:"-"}),e.jsx("span",{className:"text-gray-700",children:t.room}),e.jsx("button",{className:"text-gray-700 bg-gray-200 rounded-full px-2 py-1",onClick:()=>n("room","i"),children:"+"})]})]})]})]}),e.jsx("button",{className:"bg-blue-600 text-white font-bold rounded-lg px-4 w-full md:w-52 py-2",onClick:()=>j(y,t,l),children:"Search"})]})};export{M as S};
