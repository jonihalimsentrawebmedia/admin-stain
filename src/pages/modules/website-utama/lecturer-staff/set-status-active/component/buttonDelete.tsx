import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IHistoryStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status-active/data/resolver.tsx'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

interface props {
  data: IHistoryStatus
}

const ButtonDeleteHistory = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm-status-aktif-history/${data?.id_aktif_history}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['history-status-active'],
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
          <p className="text-gray-500">Status Aktif</p>
          <p>{data?.nama_status_aktif}</p>
          <p className="text-gray-500">Sejak</p>
          <p>{data?.sejak ? format(data?.sejak, 'dd-MM-yyyy') : ''}</p>
          <p className="text-gray-500">Alasan / Keterangan</p>
          <p>{data?.alasan}</p>
          <p className="text-gray-500">Lampiran</p>
          <div>
            {data?.url_lampiran ? (
              <Link to={data?.url_lampiran} target={'_blank'}>
                Link Lampiran
              </Link>
            ) : (
              'Tidak Ada Lampiran'
            )}
          </div>
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
export default ButtonDeleteHistory
