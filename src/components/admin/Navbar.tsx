import React from 'react'
import {Menu} from "@headlessui/react"

const Navbar:React.FC= () => {
  return (
    <div className=' relative z-10 h-20 w-full  ps-8 py-2 bg-adminDash  px-4 flex justify-between items-center border-b border-black '>
      <div className='text-white'>ADMIN PANEL</div>
      <div className='flex item-center gap-2 mr-2'>
        {/* <Popover>
            <Popover.Button>
                
            </Popover.Button>
        </Popover> */}
         <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Options
          
          </Menu.Button>
        </div>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
