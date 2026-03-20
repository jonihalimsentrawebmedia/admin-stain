import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { clsx } from 'clsx'

function IconFlower(isActive: boolean) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.7998 19.2002C16.7997 21.8511 14.6509 24 12 24C9.34913 24 7.2003 21.851 7.2002 19.2002V16.7998H16.7998V19.2002ZM7.2002 16.7998H4.7998C2.14893 16.7997 0 14.6509 0 12C9.79241e-06 9.34911 2.14893 7.2003 4.7998 7.2002H7.2002V16.7998ZM19.2002 7.2002C21.8511 7.2003 24 9.34911 24 12C24 14.6509 21.8511 16.7997 19.2002 16.7998H16.7998V7.2002H19.2002ZM12 0C14.6509 0 16.7997 2.14893 16.7998 4.7998V7.2002H7.2002V4.7998C7.2003 2.14895 9.34913 3.96847e-05 12 0Z"
        className={clsx(isActive ? 'fill-primary' : 'fill-[#DFDFDF]')}
      />
      <circle
        cx="12.0001"
        cy="12"
        r="2.88"
        className={clsx(isActive ? 'fill-primary' : 'fill-[#DFDFDF]')}
      />
    </svg>
  )
}
const Menu = () => {
  const { id } = useParams()
  const baseUrl = `/modules/website-fakultas/academic/study-program/${id}`

  const location = useLocation()
  const pathname = location.pathname

  const [data] = useState([
    {
      id: 1,
      name: 'Tentang',
      link: `${baseUrl}/tentang`,
    },
    {
      id: 2,
      name: 'Unit Pengelola',
      link: `${baseUrl}/unit-pengelola`,
    },
    {
      id: 3,
      name: 'Visi, Misi, & Tujuan',
      link: `${baseUrl}/visi-misi`,
    },
    {
      id: 4,
      name: 'Struktur Organisasi',
      link: `${baseUrl}/struktur-organisasi`,
    },
    {
      id: 5,
      name: 'Staff',
      link: `${baseUrl}/staff`,
    },
    {
      id: 6,
      name: 'Dosen',
      link: `${baseUrl}/dosen`,
    },
    {
      id: 7,
      name: 'Berita',
      link: `${baseUrl}/berita`,
    },
    {
      id: 8,
      name: 'Galeri',
      link: `${baseUrl}/galeri`,
    },
    {
      id: 9,
      name: 'Hubungi Kami',
      link: `${baseUrl}/hubungi-kami`,
    },
  ])

  return (
    <div className="border w-[300px] p-2 flex shadow-lg flex-col gap-2">
      {data.map((item, index) => (
        <Link
          key={item.name + index}
          to={item.link}
          className={`${item.link == pathname ? 'text-primary font-semibold bg-primary/20 border border-primary' : ''} rounded px-4 gap-2 py-2 flex items-center`}
        >
          {IconFlower(item.link == pathname)}
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default Menu
