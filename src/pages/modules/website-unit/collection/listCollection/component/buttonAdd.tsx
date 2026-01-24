import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
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

interface Props {
  rootData?: IUnitCollection
}

export const ButtonAddCollectionCategory = (props: Props) => {
  const { rootData } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ICollectionResolver>({
    resolver: zodResolver(CollectionListResolver),
  })

  useEffect(() => {
    if (rootData) {
      form.reset({
        nama_kategori: rootData?.nama_kategori,
      })
    }
  }, [rootData])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ICollectionResolver) => {
    setLoading(true)
    await AxiosClient.post(
      `/unit/unit-koleksi/${rootData?.id_unit_kategori_koleksi}/koleksi`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['collection-category'],
          })
          form.reset()
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
      <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Koleksi
      </Button>

      <DialogCustom
        disableOutsideDialog
        className={'rounded lg:max-w-7xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Koleksi'}
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
