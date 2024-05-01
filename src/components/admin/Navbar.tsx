import React from 'react'
import {Popover,Menu} from "@headlessui/react"

const Navbar = () => {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-300 '>
      <div>search</div>
      <div className='flex item-center gap-2 mr-2'>
        {/* <Popover>
            <Popover.Button>
                
            </Popover.Button>
        </Popover> */}
         <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Options
          
          </Menu.Button>
        </div>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar