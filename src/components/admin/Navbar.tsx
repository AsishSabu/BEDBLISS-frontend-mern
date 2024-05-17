// import React from 'react'
// import {Menu} from "@headlessui/react"

// const Navbar:React.FC= () => {
//   return (
//     <div className=' relative z-10 h-20 w-full  ps-8 py-2 bg-adminDash sm:bg-blue-500 md:bg-red-500 lg:bg-green-400 2xl:bg-orange-500 px-4 xl:bg-yellow-200 flex justify-between items-center border-b border-black  '>
//       <div className='text-white'>ADMIN PANEL</div>
//       <div className='flex item-center gap-2 mr-2'>
//         {/* <Popover>
//             <Popover.Button>
                
//             </Popover.Button>
//         </Popover> */}
//          <Menu as="div" className="relative inline-block text-left">
//         <div>
//           <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
//             Options
          
//           </Menu.Button>
//         </div>
//         </Menu>
//       </div>
//     </div>
//   )
// }

// export default Navbar


"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Header=()=> {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/admin">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BEDBLISS ADMIN</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;