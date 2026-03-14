import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { IPartnershipRegistered } from '../../data/types.ts'
import { Check } from 'lucide-react'

interface props {
  data?: IPartnershipRegistered
}

export const ButtonApprove = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleApprovedAll = async () => {
    setLoading(true)
    await AxiosClient.patch('/pusat-karir/verifikasi-mitra-kerja/update-status', {
      status_pendaftaran_asal: data?.status_pendaftaran,
      status_pendaftaran: 'DISETUJUI',
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
        className={'bg-green-500 hover:bg-green-500'}
        disabled={loading}
        onClick={() => setOpen(!open)}
      >
        <Check className={'size-4'} /> Setujui
      </Button>

      <DialogBasic
        title={<p className={'text-2xl text-green-500 font-semibold'}>Setujui Pendaftaran</p>}
        open={open}
        setOpen={setOpen}
      >
        <p>Apakah anda yakin ingin menyetujui pendaftar ini?</p>
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
                <Button onClick={HandleApprovedAll} className={'bg-green-500 hover:bg-green-600'}>
                  Setujui Pendaftar
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
