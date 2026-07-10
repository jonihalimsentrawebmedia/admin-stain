import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IMailTypeLetter } from '../data/types.ts'

interface props {
  data: IMailTypeLetter
}

const ButtonDeleteLetterType = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/mail-jenis-surat/${data?.id_mail_jenis_surat}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['code-letter-type'],
          })
          setLoading(false)
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
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Kelompok Surat'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-4'}>
          <p className="text-gray-500 text-sm">Nama Jenis Surat</p>
          <p className="text-sm sm:text-base">{data?.nama_jenis_surat}</p>
          <p className="text-gray-500 text-sm">Kategori Jenis Surat</p>
          <p className="text-sm sm:text-base">{data?.kategori_jenis_surat}</p>
          <p className="text-gray-500 text-sm">Kode Surat</p>
          <p className="text-sm sm:text-base">{data?.kode_surat}</p>
        </div>
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

export default ButtonDeleteLetterType
