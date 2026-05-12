import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'
import { Link } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface props {
  data: IEntrance
}

const ButtonDeleteEntrancePMB = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pmb/jalur-masuk/${data?.id_jalur_masuk}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['entrance-pmb'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Tambah Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'min-w-3xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Jalur</p>
          <p>{data?.nama_jalur}</p>
          <p className="text-gray-500">Url Pendaftaran</p>
          <Link to={data?.url_pendaftaran} target={'_blank'} className={'text-blue-500 underline'}>
            Url Pendaftaran
          </Link>
          <p className="text-gray-500">Status Tampil</p>
          <p>{data?.is_status_tampil ? 'Tampil' : 'Tidak Tampil'}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', onClick: () => setOpen(!Option) },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
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
export default ButtonDeleteEntrancePMB
