import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormCategoryService } from '@/pages/modules/website-unit/services/category/component/form.tsx'
import { CategoryServiceResolver, type CategoryServiceResolverType } from '@/pages/modules/website-unit/services/category/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  session?: ISessionUnit
  data?: ICategoryServices
}

export const ButtonEditCategoryService = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CategoryServiceResolverType>({
    resolver: zodResolver(CategoryServiceResolver),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        nama_layanan: data?.nama_layanan,
        urutan: data?.urutan,
      })
    }
  }, [session, data])

  const HandleSave = async (value: CategoryServiceResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/kategori-layanan/${data?.id_kategori_layanan}`, value)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Kategori Layanan')
          queryClient.invalidateQueries({
            queryKey: ['category-services'],
          })
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
        className={'p-1.5 text-white bg-yellow-500 hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Kategori Laynaan'}
      >
        <FormCategoryService
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
