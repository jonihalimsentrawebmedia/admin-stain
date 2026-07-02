import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import type { IMailInvitationLetterList } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'

interface props {
  data: IMailInvitationLetterList
}

const ButtonDeleteLetterGenerate = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/mail-surat/${data?.id}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-generate'],
          })
          toast.success(res.data.message || 'Berhasil menghapus surat')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response?.data?.message || 'Gagal menghapus surat')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'}
        onClick={() => setOpen(!open)}
        title="Hapus Surat"
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Surat Undangan'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nomor Surat</p>
          <p>{data?.nomor_surat || '-'}</p>
          <p className="text-gray-500">Jenis Surat</p>
          <p>{data?.jenis_surat || '-'}</p>
          <p className="text-gray-500">Nama Template Surat</p>
          <p>{data?.nama_kode_template || '-'}</p>
          <p className="text-gray-500">Tanggal Surat</p>
          <p>
            {data?.tanggal_surat
              ? format(new Date(data.tanggal_surat), 'dd MMM yyyy', { locale: localeId })
              : '-'}
          </p>
          <p className="text-gray-500">Dibuat Oleh</p>
          <p>{data?.nama_user_created || '-'}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.status || '-'}</p>
        </div>

        <p className="text-red-600 text-sm mt-4">
          Apakah Anda yakin ingin menghapus surat ini? Tindakan ini tidak dapat dibatalkan.
        </p>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <>
                  <Button variant="destructive" onClick={HandleSave} disabled={loading}>
                    <FaTrash />
                    Hapus
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

export default ButtonDeleteLetterGenerate
