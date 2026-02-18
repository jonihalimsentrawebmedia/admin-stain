import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
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
    label: 'Jaminan Mutu',
    link: `${baseUrl}/jaminan-mutu`,
    children: [
      {
        label: 'Sistem Dokumentasi',
        link: `${baseUrl}/jaminan-mutu/sistem-dokumentasi`,
      },
      {
        label: 'Manajemen Resiko',
        link: `${baseUrl}/jaminan-mutu/manajemen-resiko`,
      },
      {
        label: 'Audit Internal Mutu',
        link: `${baseUrl}/jaminan-mutu/audit-internal`,
      },
      {
        label: 'Tinjauan Manajemen Resiko',
        link: `${baseUrl}/jaminan-mutu/tinjauan-manajemen`,
      },
    ],
  },
  {
    label: 'Layanan',
    link: `${baseUrl}/layanan`,
    children: [
      {
        label: 'Sistem Penjaminan Mutu Internal (SPMI)',
        link: `${baseUrl}/layanan/spmi`,
        children: [
          {
            label: 'Dokumen Pendukung Akreditasi',
            link: `${baseUrl}/layanan/spmi/dokumen-pendukung`,
          },
          {
            label: 'Auditor Internal',
            link: `${baseUrl}/layanan/spmi/auditor-internal`,
          },
          {
            label: 'Reviewer',
            link: `${baseUrl}/layanan/spmi/reviewer`,
          },
          {
            label: 'Asesor',
            link: `${baseUrl}/layanan/spmi/asesor`,
          },
          {
            label: 'Laporan Benchmarking',
            link: `${baseUrl}/layanan/spmi/laporan-benchmarking`,
          },
        ],
      },
      {
        label: 'Audit Internal Mutu (AIM)',
        link: `${baseUrl}/layanan/aim`,
        children: [
          {
            label: 'Template AIM',
            link: `${baseUrl}/layanan/aim/template`,
          },
        ],
      },
      {
        label: 'Akreditasi',
        link: `${baseUrl}/layanan/akreditasi`,
      },
      {
        label: 'Layanan Publik',
        link: `${baseUrl}/layanan/pelayanan-public`,
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
    link: `${baseUrl}/pengaturan`,
    children: [
      {
        label: 'Landing Page',
        link: `${baseUrl}/pengaturan/landing-page`,
      },
      {
        label: 'Pengaturan Warna',
        link: `${baseUrl}/pengaturan/warna`,
      },
      {
        label: 'Pengaturan Template',
        link: `${baseUrl}/pengaturan/template`,
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
                      {menu.children.map((child, j) =>
                        child.children ? (
                          // 🔽 LEVEL 3
                          <MenubarSub key={j}>
                            <MenubarSubTrigger>{child.label}</MenubarSubTrigger>
                            <MenubarSubContent>
                              {child.children.map((sub, k) => (
                                <Link to={sub?.link} key={k}>
                                  <MenubarItem>{sub.label}</MenubarItem>
                                </Link>
                              ))}
                            </MenubarSubContent>
                          </MenubarSub>
                        ) : (
                          // 🔹 LEVEL 2 biasa
                          <Link to={child?.link} key={j}>
                            <MenubarItem>{child.label}</MenubarItem>
                          </Link>
                        )
                      )}
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
