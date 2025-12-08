import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { LogActivity } from '../model'
import { formatDateTime } from '@/utils/date'
import useGetUsersDetail from '../../users/controller/useGetUsersDetail'

const HistoryLoginDetailViewModel = () => {
  const form = useForm()
  const { user } = useGetUsersDetail({})
  const [fieldsConfig, setFieldConfig] = useState<
    {
      name: string
      label: string
    }[]
  >([])
  const columns: ColumnDef<LogActivity>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        // Menggunakan index + 1 untuk nomor urut
        return <div>{row.row.index + 1}</div>
      },
    },

    // ✅ Satuan Kerja
    { accessorKey: 'nama_satuan_organisasi', header: 'Satuan Kerja' },

    // ✅ Menu
    { accessorKey: 'menu', header: 'Menu' },

    // ✅ Waktu (Tanggal dan Jam dalam dua baris)
    {
      accessorKey: 'waktu',
      header: 'Waktu',
      cell: (row) => {
        const value = row.row.original.created_at
        const temp = formatDateTime(value)
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return (
          <div className="whitespace-pre-line text-center">
            {temp.date == '' ? '-' : temp.date} <br /> {temp.time}
          </div>
        )
      },
    },

    // ✅ Aksi (Teks Deskripsi Aksi)
    { accessorKey: 'aksi', header: 'Aksi' },
  ]

  useEffect(() => {
    if (user) {
      
    
      setFieldConfig([
        {
          name: 'nama_lengkap',
          label: 'Nama Lengkap*',
        },
        {
          name: 'jabatan',
          label: 'Jabatan*',
        },
        ...(user?.level_users_multi.map((item, index) => {
          return {
            name: item.id_users_multi_level,
            label: `Level User ${index + 1}`, // Ditambah 1 agar penomoran dimulai dari 1
          }
        }) || []),
      ])
      const levelObject = user.level_users_multi.reduce((acc: any, item) => {
        // acc adalah accumulator, yang pada iterasi awal adalah {}
        acc[item.id_users_multi_level] = item.nama_level_user
        return acc
      }, {})
      form.reset({
        ...user,
        ...levelObject,
      })
    }
  }, [user])
 
  return {
    columns,
    fieldsConfig,
    form,
  }
}

export default HistoryLoginDetailViewModel
