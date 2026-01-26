import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CollectionResolver, type CollectionResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import { HiPencil } from 'react-icons/hi'

interface Props {
  session?: ISessionUnit
  data: IUnitCollection
}

export const ButtonEditCollection = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CollectionResolverType>({
    resolver: zodResolver(CollectionResolver),
  })

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        nama_kategori: data?.nama_kategori,
        urutan: data?.urutan,
      })
    }
  }, [session, data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: CollectionResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/kategori-koleksi/${data?.id_unit_kategori_koleksi}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['unit-collection'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Kategori Koleksi')
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
        onClick={() => setOpen(!open)}
        className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white'}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Kategori'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_unit'}
              form={form}
              label={'Pilih Unit'}
              placeholder={'Nama Unit'}
              isDisabled
              isRow
            />

            <TextInput
              name={'nama_kategori'}
              form={form}
              label={'Nama Kategori Koleksi'}
              placeholder={'Nama Kategori Koleksi'}
              isRequired
              isRow
            />

            <TextInput
              name={'urutan'}
              form={form}
              label={'Urutan'}
              placeholder={'Urutan'}
              type={'number'}
              isRequired
              isNumber
              isRow
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}
