import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddLandingProdi = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/prodi/landing-page', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['landing-page'],
          })
          toast.success(res.data.message || 'Success tambah gambar')
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
        className={'text-primary border-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <BiPlus />
        Tambah Gambar
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Gambar'}
        className={'rounded lg:max-w-2xl'}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSave)} className="space-y-4">
              <UploadImageRatio
                name={'gambar_url'}
                form={form}
                label={'Gambar(Ukuran 4:2)'}
                maxWidthClassName={'max-w-[400px] mx-auto'}
                aspectRatioWidth={4}
                aspectRatioHeight={2}
              />
              <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}
