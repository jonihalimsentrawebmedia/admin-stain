import type { ColumnDef } from '@tanstack/react-table'
import { IoIosInformationCircle } from 'react-icons/io'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Pencil } from 'lucide-react'
import ButtonAddLevelUser from './components/ButtonAddLevelUser'
import ButtonSettingLevelUser from './components/ButtonSettingLevelUser'
import type { UserList } from './model'
import ButtonDeleteUser from './components/ButtonDeleteUsers'
import useGetSatuanOrganisasiAll from '../../controller/useGetSatuanOrganisasiAll'
import useGetLevelUser from '../level/controller/useGetLevelUser'
import ButtonSwitch from './components/ButtonSwitch'
const UsersViewModel = () => {
  const { satuanOrganisasi } = useGetSatuanOrganisasiAll()
  const { levelUser } = useGetLevelUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const columns: ColumnDef<UserList>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },

    // Kolom Nama User
    { accessorKey: 'nama_lengkap', header: 'Nama User' },

    // Kolom Level (Memiliki penanda bullet/dot untuk level kedua)
    {
      accessorKey: 'level_users',
      header: 'Level',
      cell: (row) => {
        const { level_users } = row.row.original
        return (
          <div className="flex flex-col">
            {level_users.length == 1 ? (
              <div>{level_users[0]}</div>
            ) : (
              <ul className="pl-4 list-outside list-disc">
                {level_users.map((item, index) => (
                  <li key={item + index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )
      },
    },

    // Kolom No. Handphone (Memiliki ikon telepon)
    {
      accessorKey: 'no_handphone',
      header: 'No. Handphone',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex items-center gap-2">
            <ButtonSettingLevelUser
              data={values}
              levelUser={levelUser}
              satuanOrganisasi={satuanOrganisasi}
            />
            {/* <IconGear className="text-green-600" /> */}
            <span>{values.telepon}</span>
          </div>
        )
      },
    },

    // Kolom Email
    { accessorKey: 'email', header: 'Email' },

    // Kolom Status (Menggunakan komponen Toggle/Switch)
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => {
        return (
          // <div className="flex justify-center flex-col items-center">
          //   <Switch checked={isAktif} />
          //   <span className="text-xs text-gray-500 mt-1">
          //     {isAktif ? "Aktif" : "Tidak Aktif"}
          //   </span>
          // </div>
          <ButtonSwitch data={row.row.original} />
        )
      },
    },

    // Kolom Aktif Sejak (Tanggal dan Waktu)
    {
      accessorKey: 'aktif_sejak',
      header: 'Aktif Sejak',
      cell: (row) => {
        const values = row.row.original
        return (
          <div className="flex flex-col items-center gap-2">
            <div>{values.aktif_sejak.split(' ')[0].split('-').reverse().join('-')}</div>
            <div>{values.aktif_sejak.split(' ')[1]}</div>
          </div>
        )
      },
    },

    // Kolom Aksi (Menu Ellipsis)
    {
      accessorKey: 'aksi',
      header: '', // Header kosong
      cell: (row) => {
        const values = row.row.original
        // Diwakili oleh menu dropdown/ellipsis
        return (
          <Popover>
            <PopoverTrigger>...</PopoverTrigger>
            <PopoverContent side="right">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    navigate(`/modules/settings/management-users/users/detail/${values.id_user}`)
                  }}
                  className="flex gap-4 items-center cursor-pointer text-[#464646]"
                >
                  <IoIosInformationCircle className="text-blue-500 size-4" />
                  Detail User
                </button>
                <ButtonAddLevelUser
                  data={values}
                  levelUser={levelUser}
                  satuanOrganisasi={satuanOrganisasi}
                />

                {/* <div className="flex gap-4 items-center">
                  <Plus className="text-green-500 size-4" />
                  Tambah Level
                </div> */}
                <button
                  onClick={() => {
                    navigate(`/modules/settings/management-users/users/edit/${values.id_user}`)
                  }}
                  className="flex gap-4 items-center text-[#464646] cursor-pointer"
                >
                  <Pencil className="text-orange-500 size-4" />
                  Edit
                </button>
                <ButtonDeleteUser data={values} />
              </div>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  function goToAdd() {
    navigate(`/modules/settings/management-users/users/add`)
  }
  return {
    columns,
    goToAdd,
  }
}

export default UsersViewModel
