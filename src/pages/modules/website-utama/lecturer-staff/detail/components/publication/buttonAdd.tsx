import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  PublicationResolver,
  type TPublicationResolver,
} from '@/pages/modules/website-utama/lecturer-staff/detail/components/publication/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { FaTrash } from 'react-icons/fa'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  id_sdm: string
}

export const ButtonAddPublication = (props: Props) => {
  const { id_sdm } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<TPublicationResolver>({
    resolver: zodResolver(PublicationResolver),
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'penulis',
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TPublicationResolver) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/sdm/${id_sdm}/publikasi`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        Tambah Publikasi
      </Button>

      <DialogBasic
        title={'Tambah Publikasi'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-3xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'judul_publikasi'}
              form={form}
              label={'Judul Publikasi'}
              htmlFor={'judul_publikasi'}
              placeholder={'Masukkan Judul Publikasi'}
              isRow
              isRequired
            />
            <TextInput
              name={'jenis_publikasi'}
              form={form}
              label={'Jenis Publikasi'}
              htmlFor={'jenis_publikasi'}
              placeholder={'Masukkan Jenis Publikasi'}
              isRow
              isRequired
            />
            <TextInput
              name={'tanggal_terbit'}
              form={form}
              label={'Tanggal Terbit'}
              htmlFor={'tanggal_terbit'}
              type={'date'}
              isRow
              isRequired
            />
            <TextInput
              name={'url_jurnal'}
              form={form}
              label={'URL Publikasi'}
              htmlFor={'url'}
              placeholder={'Masukkan URL Publikasi'}
              type={'url'}
              isRow
              isRequired
            />

            <div className="flex flex-col gap-3 mt-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Daftar Penulis</p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      nama_penulis: '',
                    })
                  }
                >
                  Tambah Penulis
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <div className="flex-1">
                    <TextInput
                      name={`penulis.${index}.nama_penulis`}
                      form={form}
                      label={`Penulis ${index + 1}`}
                      htmlFor={`penulis.${index}.nama_penulis`}
                      placeholder={'Masukkan Nama Penulis'}
                      isRequired
                    />
                  </div>

                  {fields.length > 1 && (
                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                      <FaTrash />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
