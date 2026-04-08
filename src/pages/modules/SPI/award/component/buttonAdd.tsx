import { Button } from '@/components/ui/button.tsx'
import { MdUpload } from 'react-icons/md'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddAward = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleAdd = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/spi/penghargaan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['award'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <MdUpload />
        Uplaod Penghargaan
      </Button>

      <DialogBasic
        title={'Upload Penghargaan'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleAdd)}>
            <div className="flex justify-center w-full">
              <UploadImageRatio
                label={'Gambar(Ukuran 4:2)'}
                maxWidthClassName={'lg:min-w-[420px]! w-full! mx-auto'}
                aspectRatioWidth={4}
                aspectRatioHeight={2}
                name={'url_gambar'}
                form={form}
              />
            </div>
            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
