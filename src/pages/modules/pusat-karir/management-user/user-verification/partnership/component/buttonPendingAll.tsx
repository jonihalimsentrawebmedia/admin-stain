import type { Status } from '../hooks/index'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { VscDebugRestart } from 'react-icons/vsc'

interface props {
  collect: string[]
  setCollect: Dispatch<SetStateAction<string[]>>
  status: Status
}

export const ButtonPendingAll = (props: props) => {
  const { collect, status, setCollect } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprovedAll = async (value: any) => {
    await AxiosClient.patch('/pusat-karir/verifikasi-mitra-kerja/update-status', {
      status_pendaftaran_asal: status,
      status_pendaftaran: 'PENDING',
      alasan: value?.alasan,
      ids: collect,
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(true)
          setOpen(false)
          setCollect([])
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
      <Button disabled={loading} onClick={() => setOpen(!open)}>
        <VscDebugRestart className={'size-4'} /> Pending
      </Button>

      <DialogBasic title={'Kembalikan Ke Pending'} open={open} setOpen={setOpen}>
        <p>Apakah anda yakin untuk mengembalikan data pendaftar ke status <b>Pending</b>?</p>
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
              element: <Button onClick={HandleApprovedAll}>Ya, Saya yakin.</Button>,
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
