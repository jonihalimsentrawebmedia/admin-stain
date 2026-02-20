import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar.tsx'
import { ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
const baseUrl = '/modules/ppid'
export const Menus = [
  {
    label: 'Beranda',
    link: `${baseUrl}/dashboard`,
  },
  {
    label: 'Data Unit',
    link: `${baseUrl}/unit`,
  },
  {
    label: 'Profil',
    link: `${baseUrl}/profile`,
    children: [
      {
        label: 'Gambaran Singkat Pembentukan',
        link: `${baseUrl}/profile/short-description`,
      },
      {
        label: 'Visi Misi',
        link: `${baseUrl}/profile/visi-misi`,
      },
      {
        label: 'Stuktur Organisasi',
        link: `${baseUrl}/profile/structure-organization`,
      },
      {
        label: 'Tugas, Fungsi, & Tanggung Jawab',
        link: `${baseUrl}/profile/work-responsibilities`,
      },
      {
        label: 'Maklumat Layanan',
        link: `${baseUrl}/profile/service-commitment`,
      },
    ],
  },
  {
    label: 'Informasi Publik',
    link: `${baseUrl}/information-public`,
    children: [
      {
        label: 'Informasi Berkala',
        link: `${baseUrl}/information-public/information-regular`,
      },
      {
        label: 'Informasi Tersedia',
        link: `${baseUrl}/information-public/information-available`,
      },
      {
        label: 'Informasi Serta Merta',
        link: `${baseUrl}/information-public/information-immediately`,
      },
      {
        label: 'Standard Pelayanan Informasi Publik',
        link: `${baseUrl}/information-public/standard-service`,
      },
      {
        label: 'Daftar Informasi Publik',
        link: `${baseUrl}/information-public/register`,
      },
    ],
  },
  {
    label: 'Regulasi',
    link: `${baseUrl}/regulation`,
    children: [
      {
        label: 'Regulasi Terkait',
        link: `${baseUrl}/regulation/regulation`,
        children: [],
      },
      {
        label: 'Regulasi Lingkungan',
        link: `${baseUrl}/regulation/environmental-regulation`,
        children: [],
      },
    ],
  },
  {
    label: 'Keluhan',
    link: `${baseUrl}/keluhan`,
  },
  {
    label: 'Konten Publik',
    link: `${baseUrl}/public-content`,
    children: [
      {
        label: 'Berita',
        link: `${baseUrl}/public-content/news`,
      },
      {
        label: 'Pengumuman',
        link: `${baseUrl}/public-content/announcement`,
      },
      {
        label: 'Agenda',
        link: `${baseUrl}/public-content/agenda`,
      },
    ],
  },
  {
    label: 'Pengaturan',
    link: `${baseUrl}/settings`,
    children: [
      {
        label: 'Landing Page',
        link: `${baseUrl}/settings/landing-page`,
      },
      {
        label: 'Video',
        link: `${baseUrl}/settings/video`,
      },
      {
        label: 'Pengaturan Warna',
        link: `${baseUrl}/settings/warna`,
      },
      {
        label: 'Pengaturan Template',
        link: `${baseUrl}/settings/template`,
      },
    ],
  },
]
export const HeaderMenu = () => {
  const location = useLocation()
  const pathname = location.pathname
  function isActive(link: string) {
    if (pathname.includes(link)) {
      return 'border-b rounded-b-none border-white data-[state=open]:rounded-b-sm!'
    }
  }
  return (
    <>
      <div className="bg-white shadow drop-shadow py-1.5">
        <div className={'max-w-[1440px] px-4 mx-auto'}>
          <Menubar className={'border-none  group  hidden lg:flex bg-transparent shadow-none p-0'}>
            {Menus.map((menu, i) => (
              <MenubarMenu key={i}>
                {menu?.children ? (
                  <MenubarTrigger className={isActive(menu.link)}>
                    {menu.label}{' '}
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200 
               data-[state=open]:rotate-180"
                    />
                  </MenubarTrigger>
                ) : (
                  <Link to={menu.link}>
                    <MenubarTrigger className={isActive(menu.link)}>{menu.label}</MenubarTrigger>
                  </Link>
                )}

                {menu.children && (
                  <MenubarContent>
                    <MenubarGroup>
                      {menu.children.map((child, j) => (
                        // child.children ? (
                        //   // 🔽 LEVEL 3
                        //   // <MenubarSub key={j}>
                        //   //   <MenubarSubTrigger>{child.label}</MenubarSubTrigger>
                        //   //   <MenubarSubContent>
                        //   //     {child.children.map((sub, k) => (
                        //   //       <Link to={sub?.link} key={k}>
                        //   //         <MenubarItem>{sub.label}</MenubarItem>
                        //   //       </Link>
                        //   //     ))}
                        //   //   </MenubarSubContent>
                        //   // </MenubarSub>
                        //   <></>
                        // ) : (
                        //   // 🔹 LEVEL 2 biasa
                        //   // <Link to={child?.link} key={j}>
                        //   //   <MenubarItem>{child.label}</MenubarItem>
                        //   // </Link>
                        // )
                        <Link to={child?.link} key={j}>
                          <MenubarItem>{child.label}</MenubarItem>
                        </Link>
                      ))}
                    </MenubarGroup>
                  </MenubarContent>
                )}
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
      </div>
    </>
  )
}
