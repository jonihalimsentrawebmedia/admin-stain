import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import type { IStepApproval } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/types'
import { HiPencil } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data?: IStepApproval
}

export const ButtonUpdateStepApproval = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.setValue('alur_pengajuan', data.alur_pengajuan)
    }
  }, [data])

  const handleUpdate = async (data: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/surat-mahasiswa-pengajuan', data)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['step-approval'],
          })
          toast.success(res.data.message || 'Success Update Data')
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
        size={'sm'}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary w-fit rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
        {data?.alur_pengajuan === '' ? 'Update Data' : 'Edit Data'}
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Update Data'}
        className={'lg:max-w-7xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleUpdate)}>
            <RichText form={form} name={'alur_pengajuan'} />
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
