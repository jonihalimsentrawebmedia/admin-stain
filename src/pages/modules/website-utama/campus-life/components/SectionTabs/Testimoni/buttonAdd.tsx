import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  type ITestimonials,
  TestimonialsResolver,
} from '@/pages/modules/website-utama/campus-life/types/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus, BiX } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { FaSave } from 'react-icons/fa'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

export const ButtonAddTestimonial = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ITestimonials>({
    resolver: zodResolver(TestimonialsResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: ITestimonials) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/kehidupan-kampus-testimoni', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['campus-life-testimonial'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className="border border-primary hover:text-primay text-primary"
        onClick={() => setOpen(true)}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Testimoni'}
        className={'rounded lg:max-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
            <UploadImageRatio
              name={'foto_url'}
              form={form}
              maxWidthClassName={'max-w-[120px]'}
              aspectRatioWidth={3}
              aspectRatioHeight={4}
              label={'Foto Profile'}
              placeholder={'Foto Profile'}
            />

            <TextInput
              name={'nama_lengkap'}
              form={form}
              label={'Nama Lengkap'}
              placeholder={'Nama Lengkap'}
              isRow
              isRequired
            />

            <TextInput
              name={'pekerjaan'}
              form={form}
              label={'Pekerjaan'}
              placeholder={'Pekerjaan'}
              isRow
              isRequired
            />

            <TextAreaInput
              name={'Komentar'}
              form={form}
              label={'Komentar'}
              placeholder={'Komentar'}
              isRow
              isRequired
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
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
