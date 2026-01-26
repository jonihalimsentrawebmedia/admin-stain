import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LevelUserResolver, type LeveluserType } from '../model/leveluser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Checkbox } from '@/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/react-table'
import type { SatuanOrganisasiList } from '../../../model'
interface Props {
  id_level_user: string
  id_multi_level: string
}
const useEditLevelUser = ({ id_level_user, id_multi_level }: Props) => {
  const [valuesListUnit, setValuesListUnit] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const form = useForm<LeveluserType>({
    resolver: zodResolver(LevelUserResolver),
  })
  const columns: ColumnDef<SatuanOrganisasiList>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{idx + 1}</div>
      },
    },

    // Kolom Nama User
    { accessorKey: 'kelompok', header: 'Kategori' },
    { accessorKey: 'nama', header: 'Nama Satuan Kerja' },
    {
      accessorKey: 'action',
      header: 'Status',
      cell: (row) => {
        const values = row.row.original
        return (
          <Checkbox
            checked={valuesListUnit.includes(values.id_satuan_organisasi)}
            onCheckedChange={() => {
              if (valuesListUnit.includes(values.id_satuan_organisasi)) {
                const temp = [...valuesListUnit].filter(
                  (item) => item != values.id_satuan_organisasi
                )

                setValuesListUnit(temp)
                form.setValue('list_unit', temp)
              } else {
                const temp = [...valuesListUnit]
                temp.push(values.id_satuan_organisasi)
                setValuesListUnit(temp)
                form.setValue('list_unit', temp)
              }
            }}
          />
        )
      },
    },
  ]

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: LeveluserType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(
        `/pengaturan/manajemen-user/users/multi-level/${id_multi_level}`,
        {
          ...data,
          id_level_user,
          list_unit: data.list_unit,
        }
      )

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['users-list'],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return {
    handleSave,
    setOpen,
    open,
    loading,
    form,
    columns,
    setValuesListUnit,
  }
}

export default useEditLevelUser
