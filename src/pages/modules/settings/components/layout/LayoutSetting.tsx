import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { IoSchool } from "react-icons/io5";
import {
  MdBusiness,
  MdBusinessCenter,
  MdPeople,
  MdRoomPreferences,
} from "react-icons/md";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSmall, setSideBarSmall] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const menu = [
    {
      link: "/modules/settings/dashboard",
      label: "Dashboard",
      icon: <CiGrid42 size={24} />,
    },
    {
      link: "/modules/settings/main-data-university",
      label: "Data Utama Universitas",
      icon: <IoSchool size={24} />,
    },
    {
      link: "/modules/settings/faculty",
      label: "Data Fakultas",
      icon: <MdBusiness size={24} />,
    },
    {
      link: "/modules/settings/prodi",
      label: "Data Prodi",
      icon: <MdBusiness size={24} />,
    },
    {
      link: "/modules/settings/unit",
      label: "Data Unit",
      icon: <MdBusinessCenter size={24} />,
    },
    {
      link: "/modules/settings/institution",
      label: "Data Lembaga",
      icon: <MdBusinessCenter size={24} />,
    },
    {
      link: "/modules/settings/management-users",
      label: "Manajemen User",
      icon: <MdPeople size={24} />,
    },
    {
      link: "/modules/settings/reference",
      label: "Tabel Referensi",
      icon: <MdRoomPreferences size={24} />,
    },
  ];
  return (
    <div className="flex flex-col h-screen overflow-hidden! bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-50 px-4 sm:px-6 py-3 border-b border-green-100">
        <div>
          <h1 className="text-xs sm:text-sm text-green-700 font-medium">
            Manajemen Pengelolaan Website
          </h1>
          <h2 className="text-base sm:text-lg font-semibold text-green-900">
            Pengaturan
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="text-green-700 sm:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <img
              src="/user-avatar.png"
              alt="Admin"
              className="w-8 h-8 rounded-full border border-green-200"
            />
            <span className="text-sm font-medium text-gray-700">
              Admin Website
            </span>
          </div>
          <button
            className="text-green-700 hidden sm:block"
            onClick={() => setSideBarSmall(!sidebarSmall)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden!">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static z-50 top-0 left-0 h-full sm:h-auto bg-green-700 text-white flex flex-col justify-between
    ${sidebarSmall ? "w-16" : "w-64"} 
    transform transition-all duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
  `}
        >
          <div className=" space-y-1 mt-16 pt-8 sm:mt-0">
            {menu.map((item) => (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                link={item.link}
                key={item.link}
                active={pathname == item.link}
                hiddenLabel={sidebarSmall}
              />
            ))}
          </div>
        </aside>

        {/* Overlay untuk mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1  bg-white p-4 sm:p-6 overflow-y-auto rounded-tr-lg">
          <div className="h-full  rounded-lg pb-32  text-gray-400">
            <div className=" pb-20">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <footer className="text-center bg-white w-full text-primary text-xs z-50 fixed bottom-0  py-2 border-t border-green-400">
        Admin Website © 2025
      </footer>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  dropdown,
  link,
  hiddenLabel,
}: any) {
  return (
    <Link
      to={link}
      className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm font-medium
      ${
        active
          ? "border-l-white bg-[#F5FFFA] text-primary"
          : "hover:bg-green-600 text-green-50"
      }`}
    >
      <div className="flex items-center gap-2 flex-1">
        {icon}
        {!hiddenLabel && <span>{label}</span>}
      </div>
      {dropdown && <ChevronDown size={14} className="opacity-70" />}
    </Link>
  );
}
