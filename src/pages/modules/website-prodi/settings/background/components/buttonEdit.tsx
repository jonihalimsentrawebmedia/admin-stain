import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UploadImageRatio } from '@/pages/modules/website-utama/public-content/facilities/components/uploadImageRatio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useSearchParams } from 'react-router-dom'
import { TAB_LIST } from '@/pages/modules/website-prodi/settings/background/data/constanta.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IProdiBackground } from '@/pages/modules/website-prodi/settings/background/data'

interface props {
  data: IProdiBackground
}

export const ButtonEditBackgroundProdi = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const [searchParams] = useSearchParams()
  const context = searchParams.get('context') ?? TAB_LIST?.[0]?.value

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        gambar_url: data.gambar_url,
      })
    }
  }, [data])

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/prodi/prodi-background/${data?.id_prodi_background}`, {
      context: context,
      gambar_url: value.gambar_url,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['prodi-background'],
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
      <button
        className={'bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Gambar'}
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
