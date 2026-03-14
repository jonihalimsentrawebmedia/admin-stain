import type { Status } from '../hooks/index'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { Check } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface props {
  collect: string[]
  setCollect: Dispatch<SetStateAction<string[]>>
  status: Status
}

export const ButtonApproveAll = (props: props) => {
  const { collect, status, setCollect } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprovedAll = async (value: any) => {
    await AxiosClient.patch('/pusat-karir/verifikasi-pencari-kerja/update-status', {
      status_pendaftaran_asal: status,
      status_pendaftaran: 'DISETUJUI',
      alasan: value?.alasan,
      ids: collect,
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(true)
          setOpen(false)
          setCollect([])
          toast.success(res?.data?.message || 'Berhasil disetujui')
          queryClient.invalidateQueries({ queryKey: ['verification-job-seeker'] })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal disetujui')
        setLoading(false)
      })
  }

  return (
    <>
      <Button disabled={loading} onClick={() => setOpen(!open)}>
        <Check className={'size-4'} /> Setujui
      </Button>

      <DialogBasic title={'Setujui Pendaftar'} open={open} setOpen={setOpen}>
        Apakah anda yakin ingin menyetujui {collect.length} pendaftar yang dipilih?
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
              element: <Button onClick={HandleApprovedAll}>Setujui Pendaftar</Button>,
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
