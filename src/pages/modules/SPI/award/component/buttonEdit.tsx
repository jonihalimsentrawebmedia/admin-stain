import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IAwardList } from '@/pages/modules/SPI/award/hooks'

interface Props {
  data: IAwardList
}

export const ButtonEditAward = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        url_gambar: data.url_gambar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleAdd = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/spi/penghargaan/${data.id_penghargaan}`, value)
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Upload Penghargaan'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleAdd)}>
            <div className="mx-auto w-full flex justify-center">
              <UploadImageRatio
                label={'Gambar(Ukuran 4:2)'}
                maxWidthClassName={'lg:min-w-[300px]!'}
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
