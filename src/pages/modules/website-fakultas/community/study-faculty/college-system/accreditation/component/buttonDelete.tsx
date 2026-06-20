import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { IAccreditation } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/types.ts'

interface Props {
  data?: IAccreditation
}

const ButtonDeleteAccreditationFaculty = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/fakultas/akreditas/${data?.id_akreditas}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['accreditation-faculty'],
          })
          toast.success(res.data.message || 'Success menghapus data')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
        onClick={() => setOpen(true)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Akreditasi'}
        description={'Apakah anda yakin untuk menghapus data dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-1 items-center">
          <p className="text-gray-500">Gambar</p>
          <img
            src={data?.gambar}
            alt={data?.nama_satuan_organisasi_akreditas}
            className="w-[200px] h-[150px] object-cover rounded"
          />
          <p className="text-gray-500">Universitas / Prodi</p>
          <p>
            {data?.nama_satuan_organisasi} / {data?.nama_satuan_organisasi_akreditas}
          </p>
          <p className="text-gray-500">Nilai Akreditasi</p>
          <p className="lowercase">
            {data?.nilai_akreditas?.split('_').join(' ')}
          </p>
          <p className="text-gray-500">Lembaga Penilaian</p>
          <p>{data?.lembaga_penilaian}</p>
          <p className="text-gray-500">No Surat Keputusan</p>
          <p>{data?.no_surat_keputusan}</p>
          <p className="text-gray-500">Masa Berlaku</p>
          <p>
            {data?.mulai_berlaku
              ? format(new Date(data?.mulai_berlaku), 'dd MMMM yyyy', { locale: id })
              : '-'}{' '}
            s/d{' '}
            {data?.akhir_berlaku
              ? format(new Date(data?.akhir_berlaku), 'dd MMMM yyyy', { locale: id })
              : '-'}
          </p>
        </div>

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
                <Button variant={'destructive'} onClick={handleDelete} disabled={loading}>
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

export default ButtonDeleteAccreditationFaculty
