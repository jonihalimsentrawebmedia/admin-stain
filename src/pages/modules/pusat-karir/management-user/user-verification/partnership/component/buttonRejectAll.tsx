import type { Status } from '../hooks/index'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BiX } from 'react-icons/bi'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'

interface props {
  collect: string[]
  setCollect: Dispatch<SetStateAction<string[]>>
  status: Status
}

export const ButtonRejectAll = (props: props) => {
  const { collect, status, setCollect } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleApprovedAll = async () => {
    await AxiosClient.patch('/pusat-karir/verifikasi-mitra-kerja/update-status', {
      status_pendaftaran_asal: status,
      status_pendaftaran: 'DITOLAK',
      ids: collect,
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(true)
          setCollect([])
          setOpen(false)
          toast.success(res?.data?.message || 'Berhasil disetujui')
          queryClient.invalidateQueries({ queryKey: ['verification-partnership'] })
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
          Apakah anda yakin untuk menolak {collect.length} pendaftar yang dipilih? Data yang ditolak
          tidak dapat digunakan untuk mendaftar lagi.penolakan.
        </p>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleApprovedAll)}>
            <TextInput
              isRequired
              name={'alasan'}
              form={form}
              label={'Mohon tuliskan alasan penolakan'}
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
                  element: <Button variant={'destructive'}>Tolak Pendaftar</Button>,
                },
              ]}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
