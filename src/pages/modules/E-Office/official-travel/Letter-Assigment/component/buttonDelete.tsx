import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ListLetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data: ListLetterAssignment
}

const ButtonDeleteLetterAssigment = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/mail-surat-tugas/${data.id_mail_surat_tugas}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-assignment'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        disabled={loading}
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        className={'min-w-2xl'}
        title={'Hapus Surat Tugas'}
        description={
          'apakah anda ingin menghapus data berikut? Mohon diingat bahwa aktivitas ini tidak dapat dibatalkan.'
        }
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Tanggal Surat</p>
          <p>{data?.tanggal_surat}</p>
          <p className="text-gray-500">No. Surat</p>
          <p>{data?.nomor_surat}</p>
          <p className="text-gray-500">Kegiatan</p>
          <p>{data?.kegiatan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <>
                  <Button disabled={loading} variant="destructive" onClick={HandleDelete}>
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

export default ButtonDeleteLetterAssigment
