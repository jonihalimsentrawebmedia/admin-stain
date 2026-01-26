import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import {
  CollectionListResolver,
  type ICollectionResolver,
} from '@/pages/modules/website-unit/collection/listCollection/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormListCollection } from '@/pages/modules/website-unit/collection/listCollection/component/form.tsx'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import type { ICategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  rootData?: IUnitCollection
  data?: ICategoryCollection
}

export const ButtonEditCollectionCategory = (props: Props) => {
  const { rootData, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ICollectionResolver>({
    resolver: zodResolver(CollectionListResolver),
  })

  useEffect(() => {
    if (rootData || data) {
      form.reset({
        nama_kategori: rootData?.nama_kategori,
        nama_koleksi: data?.nama_koleksi,
        url: data?.url,
        urutan: data?.urutan,
        foto_url: data?.foto_url,
        uraian: data?.uraian,
      })
    }
  }, [rootData, data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ICollectionResolver) => {
    setLoading(true)
    await AxiosClient.put(
      `/unit/unit-koleksi/${rootData?.id_unit_kategori_koleksi}/koleksi/${data?.id_unit_koleksi}`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['collection-category'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Koleksi')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        disableOutsideDialog
        className={'rounded lg:max-w-7xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Koleksi'}
      >
        <FormListCollection
          form={form}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}
