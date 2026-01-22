import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import {
  ListServiceResolver,
  type ListServiceResolverType,
} from '@/pages/modules/website-unit/services/list/data/resolver.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormListService } from '@/pages/modules/website-unit/services/list/component/form.tsx'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import type { ListServices } from '@/pages/modules/website-unit/services/list/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  rootData?: ICategoryServices
  data?: ListServices
}

export const ButtonEditListCategory = (props: Props) => {
  const { rootData, data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<ListServiceResolverType>({
    resolver: zodResolver(ListServiceResolver),
  })

  useEffect(() => {
    if (rootData || data) {
      form.reset({
        nama_category: rootData?.nama_layanan,
        nama_layanan: data?.nama_layanan,
        uraian: data?.uraian,
        urutan: data?.urutan,
        link: data?.link,
        foto_url: data?.foto_url,
        kontak: data?.kontak,
      })
    }
  }, [rootData, data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ListServiceResolverType) => {
    setLoading(true)
    await AxiosClient.put(
      `/unit/layanan/${rootData?.id_kategori_layanan}/layanan/${data?.id_layanan}`,
      value
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-service'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Layanan')
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
        className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-3xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan'}
      >
        <FormListService
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
