import { Outlet } from "react-router-dom"
import Navbar from "../../components/admin/Navbar"
import AdminSidebar from "../../components/admin/Sidebar"
import { useEffect, useRef, useState } from "react"

const Layout: React.FC = () => {
  const [open, setOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleSideBar = () => {
    setOpen(!open)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div
          ref={sidebarRef}
          className={`${open ? "block absolute z-50" : "hidden"} md:block`}
        >
          <AdminSidebar isOpen={open} toggleSidebar={toggleSideBar} />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar isOpen={open} toggleSidebar={toggleSideBar} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-varGray">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
