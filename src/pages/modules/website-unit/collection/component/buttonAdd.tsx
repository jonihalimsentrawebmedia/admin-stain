import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CollectionResolver,
  type CollectionResolverType,
} from '@/pages/modules/website-unit/collection/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  session?: ISessionUnit
}

export const ButtonAddCollection = (props: Props) => {
  const { session } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CollectionResolverType>({
    resolver: zodResolver(CollectionResolver),
  })

  useEffect(() => {
    if (session) {
      form.reset({
        nama_unit: session?.nama_unit,
      })
    }
  }, [session])

  const queryClient = useQueryClient()

  const HandleSave = async (value: CollectionResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/kategori-koleksi', value)
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
      <Button onClick={() => setOpen(!open)} variant={'outline'} className={'border-primary'}>
        <BiPlus />
        Tambah Kategori
      </Button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Kategori'}
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
