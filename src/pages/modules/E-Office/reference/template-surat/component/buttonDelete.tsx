import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ITemplateSurat } from '../data/types'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: ITemplateSurat
}

const ButtonDeleteTemplateSurat = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/template-surat/${data?.id_template_surat}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['template-surat'],
          })
          toast.success(res.data.message || 'Berhasil menghapus template surat')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Gagal menghapus template surat')
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

      <DialogBasic title={'Hapus Template Surat'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Template</p>
          <p>{data?.nama_template}</p>
          <p className="text-gray-500">Deskripsi</p>
          <p>{data?.deskripsi}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.status}</p>
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <Button variant="destructive" onClick={HandleSave} disabled={loading}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonDeleteTemplateSurat
