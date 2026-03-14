import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import type { IJobSeekerRegistered } from '../../data/types.ts'
import { BiX } from 'react-icons/bi'

interface props {
  data?: IJobSeekerRegistered
}

export const ButtonReject = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleApprovedAll = async (values: any) => {
    setLoading(true)
    await AxiosClient.patch('/pusat-karir/verifikasi-pencari-kerja/update-status', {
      status_pendaftaran_asal: data?.status_pendaftaran,
      status_pendaftaran: 'DITOLAK',
      alasan: values.alasan,
      ids: [data?.id_pencari_kerja],
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res?.data?.message || 'Berhasil disetujui')
          queryClient.invalidateQueries({ queryKey: ['detail-verification-job-seeker'] })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal disetujui')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-red-500 text-red-500 hover:text-red-500'}
        disabled={loading}
        onClick={() => setOpen(!open)}
      >
        <BiX className={'size-4'} /> Tolak
      </Button>

      <DialogBasic
        title={<p className={'text-2xl text-red-500 font-semibold'}>Tolak Pendaftaran</p>}
        open={open}
        setOpen={setOpen}
      >
        <p>
          Apakah anda yakin untuk menolak pendaftar berikut? Data yang ditolak tidak dapat digunakan
          untuk mendaftar lagi.penolakan.
        </p>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleApprovedAll)}>
            <TextInput
              isRequired
              name={'alasan'}
              form={form}
              label={'Mohon tuliskan alasan Revisi'}
              placeholder={'Tuliskan alasan disini.'}
            />

            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => setOpen(false),
                },
                {
                  type: 'custom',
                  element: (
                    <Button className={'bg-red-500 hover:bg-red-600'}>Tolak Pendaftar</Button>
                  ),
                },
              ]}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
