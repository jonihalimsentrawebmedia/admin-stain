import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { type ILetterStudentTypeForm, LetterStudentResolver } from '../types/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import type { IStudentLetter } from '../types/index'
import { HiPencil } from 'react-icons/hi'

interface props {
  data?: IStudentLetter
}
export const ButtonEditLetter = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ILetterStudentTypeForm>({
    resolver: zodResolver(LetterStudentResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        keterangan: data.keterangan,
        judul_surat: data.judul_surat,
        link_google_form: data.link_google_form,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ILetterStudentTypeForm) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/surat-keterangan-mahasiswa/${data?.id_surat_mahasiswa_surat_keterangan_mahasiswa}`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['surat-keterangan-mahasiswa'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className={'text-white bg-yellow-500 p-1.5 rounded'}>
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Surat Keterangan Mahasiswa'}
        className={'lg:max-w-2xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'judul_surat'}
              form={form}
              label={'Judul Surat'}
              placeholder={'Masukkan Judul Surat'}
              isRequired
              isRow
            />

            <TextAreaInput
              name={'keterangan'}
              placeholder={'keterangan'}
              form={form}
              label={'Keterangan'}
              isRequired
              isRow
            />

            <TextInput
              name={'link_google_form'}
              form={form}
              label={'Link Google Form'}
              type={'url'}
              placeholder={'Masukkan Link Google Form'}
              isRequired
              isRow
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
                variant={'outline'}
                className={'text-primary border-primary hover:text-primary'}
              >
                <BiX />
                Batal
              </Button>
              <Button disabled={loading}>
                <FaSave />
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}
