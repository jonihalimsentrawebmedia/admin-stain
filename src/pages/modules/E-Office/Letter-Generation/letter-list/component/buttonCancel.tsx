import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { IMailInvitationLetterList } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'

interface props {
  data: IMailInvitationLetterList
}

const ButtonCancelStatus = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async (value: string) => {
    setLoading(true)
    await AxiosClient.patch(`/eoffice/mail-surat-undangan/${data?.id_mail_surat_undangan}/status`, {
      status: value,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['letter-generate'],
          })
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
        onClick={() => setOpen(!open)}
        className={'border-red-500 text-red-500 hover:bg-red-600 hover:text-white'}
      >
        <MdCancel className={'size-4'} />
        Batalkan Surat
      </Button>

      <DialogBasic title={'Selesaikan Surat'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nomor Surat</p>
          <p>{data?.nomor_surat}</p>
          <p className="text-gray-500">Jenis Surat</p>
          <p>{data?.nama_jenis_surat || '-'}</p>
          <p className="text-gray-500">Perihal Surat</p>
          <p>{data?.perihal ?? '-'}</p>
          <p className="text-gray-500">Tanggal Surat</p>
          <p>{data?.tanggal_surat ? format(data?.tanggal_surat, 'dd-MMMM-yyyy') : ''}</p>
          <p className="text-gray-500">Pembuat Surat</p>
          <p>{data?.nama_user_created}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(!open),
            },
            {
              type: 'custom',
              element: (
                <>
                  <Button
                    className={'bg-red-500 text-white hover:bg-red-600'}
                    onClick={() => HandleSave('DIBATALKAN')}
                    disabled={loading}
                  >
                    <MdCancel className="size-4" />
                    Batalkan Surat
                  </Button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonCancelStatus
