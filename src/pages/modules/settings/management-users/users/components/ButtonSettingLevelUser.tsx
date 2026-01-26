import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonEditLevelUser from './ButtonEditLevelUser'
import TableCustom from '@/components/common/table/TableCustom'

import type { UserList } from '../model'
import useGetUsersLevel from '../controller/useGetUsersLevel'
import { FaGear } from 'react-icons/fa6'
import useGetUsersDetail from '../controller/useGetUsersDetail'
import type { UserMultiLevelList } from '../model/leveluser'
import { formatDateTime } from '@/utils/date'
import type { LevelUserList } from '../../level/model'
import type { SatuanOrganisasiList } from '../../../model'
import { Skeleton } from '@/components/ui/skeleton'
import ButtonSwitch from './ButtonSwitch'
interface Props {
  data: UserList
  levelUser: LevelUserList[]
  satuanOrganisasi: SatuanOrganisasiList[]
}
const ButtonSettingLevelUser = ({ data, levelUser, satuanOrganisasi }: Props) => {
  const { loading, userMulti } = useGetUsersLevel({ id: data.id_user })
  const { loading: loadingUser, user } = useGetUsersDetail({ idUser: data.id_user })
  const formDetail = useForm()
  const [open, setOpen] = useState(false)

  const field = [
    {
      label: 'Jabatan',
      name: 'jabatan',
    },
    {
      label: 'Level User 1',
      name: 'level_users_multi',
      component: (
        <div>
          {data.level_users.length == 1 ? (
            data.level_users[0]
          ) : (
            <ul className="ml-2 pl-2 list-outside list-disc">
              {data.level_users.map((item) => (
                <li key={data.id_user + item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
  ]
  const columns: ColumnDef<UserMultiLevelList>[] = [
    // ✅ Nomor (Menggunakan index dari row)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        // Menggunakan index + 1 untuk nomor urut
        return <div>{row.row.index + 1}</div>
      },
    },

    // ✅ Level
    { accessorKey: 'nama_level_user', header: 'Level' },

    // ✅ Satuan Kerja
    {
      accessorKey: 'list_unit_nama',
      header: 'Satuan Kerja',
      cell: (row) => {
        const satuanKerjaList = row.row.original.list_unit_nama

        if (Array.isArray(satuanKerjaList)) {
          // Menampilkan daftar satuan kerja dalam bentuk list
          return (
            <ul className="list-disc list-inside ml-2">
              {satuanKerjaList?.map((item, index) => (
                <li key={index + item.nama_satuan_organisasi + data.id_user} className="text-sm">
                  {item.nama_satuan_organisasi}
                </li>
              ))}
            </ul>
          )
        }
        // Jika bukan array, tampilkan langsung nilainya (seperti di baris 1)
        return <div>{satuanKerjaList == undefined ? 'Tidak ada' : satuanKerjaList}</div>
      },
    },

    // ✅ Status (Menggunakan switch/toggle dari gambar)
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => {
        const values = row.row.original

        return (
          <ButtonSwitch
            keyList={'users-list-multi' + data.id_user}
            data={values}
            link={`/pengaturan/manajemen-user/users/multi-level/${values.id_users_multi_level}/status`}
          />
        )
      },
    },

    // ✅ Aktif Sejak
    {
      accessorKey: 'aktif_sejak',
      header: 'Aktif Sejak',
      cell: (row) => {
        const values = row.row.original
        const updateAt = formatDateTime(values.aktif_sejak)
        return (
          <div className="text-center">
            {updateAt.date}
            <br />
           
          </div>
        )
      },
    },

    // ✅ Diubah
    {
      accessorKey: 'diubah',
      header: 'Diubah',
      cell: (row) => {
        const values = row.row.original
        const updateAt = formatDateTime(values.updated_at)
        return (
          <div className="text-center">
            {updateAt.date}
            <br />
            {updateAt.time}
          </div>
        )
      },
    },

    // ✅ Aksi (Ikon Edit)
    {
      accessorKey: 'action',
      header: 'Aksi',
      cell: (row) => {
        const values = row.row.original
        return (
          <ButtonEditLevelUser
            values={values}
            data={data}
            formDetail={formDetail}
            levelUser={levelUser}
            satuanOrganisasi={satuanOrganisasi}
          />
        )
      },
    },
  ]

  useEffect(() => {
    if (user) {
      formDetail.reset({
        ...user,
      })
    }
  }, [user])
  return (
    <>
      <div
        onClick={() => {
          setOpen(true)
        }}
      >
        <FaGear className="text-green-600" />
      </div>
      <DialogCustom
        className="max-w-2xl! w-full! rounded"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Atur Level User</p>}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 border-primary border rounded-xl bg-[#F5FFFA]">
            {loadingUser ? <Skeleton /> : <DetailField data={field} form={formDetail} isRow />}
          </div>
          <TableCustom
            isShowPagination={false}
            isShowFilter={false}
            columns={columns}
            loading={loading}
            data={userMulti}
            placeHolderSearch="Cari  User"
          />
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonSettingLevelUser
