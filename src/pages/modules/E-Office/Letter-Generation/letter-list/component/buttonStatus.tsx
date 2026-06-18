import type { IMailInvitationLetterList } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { MdTimer } from 'react-icons/md'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { IoIosCheckbox } from 'react-icons/io'

interface props {
  data: IMailInvitationLetterList
}

const ButtonStatusOnce = (props: props) => {
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
          queryClient.invalidateQueries({
            queryKey: ['letter-generate-detail'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  if (data?.status === 'MENUNGGU') {
    return (
      <>
        <Button
          variant={'outline'}
          onClick={() => setOpen(!open)}
          className={'border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white'}
        >
          <MdTimer className={'text-yellow-500'} />
          Proses Surat
        </Button>

        <DialogBasic title={'Proses Surat'} open={open} setOpen={setOpen}>
          <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
            <p className="text-gray-500">Nomor Surat</p>
            <p>{data?.nomor_surat}</p>
            <p className="text-gray-500">Jenis Surat</p>
            <p>{data?.nama_jenis_surat.trim() || '-'}</p>
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
                      className={'bg-blue-500 text-white hover:bg-blue-600'}
                      onClick={() => HandleSave('DIPROSES')}
                      disabled={loading}
                    >
                      <MdTimer className={'text-yellow-500'} />
                      Proses Surat
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </DialogBasic>
      </>
    )
  } else if (data?.status === 'DIPROSES') {
    return (
      <>
        <Button
          variant={'outline'}
          onClick={() => setOpen(!open)}
          className={'border-green-500 text-green-500 hover:bg-green-600 hover:text-white'}
        >
          <IoIosCheckbox className={'size-4'} />
          Selesaikan Surat
        </Button>

        <DialogBasic title={'Selesaikan Surat'} open={open} setOpen={setOpen}>
          <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
            <p className="text-gray-500">Nomor Surat</p>
            <p>{data?.nomor_surat}</p>
            <p className="text-gray-500">Jenis Surat</p>
            <p>{data?.nama_jenis_surat.trim() || '-'}</p>
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
                      className={'bg-green-500 text-white hover:bg-green-600'}
                      onClick={() => HandleSave('SELESAI')}
                      disabled={loading}
                    >
                      <IoIosCheckbox className={'size-4'} />
                      Selesaikan Surat
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
}

export default ButtonStatusOnce
