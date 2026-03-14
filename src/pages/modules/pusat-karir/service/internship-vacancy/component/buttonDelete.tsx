import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  data: IJobVacancy
}

export const ButtonDeleteInternshipVacancy = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusat-karir/lowongan-magang-pekerjaan/${data.id_lowongan_pekerjaan}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['job-vacancy'],
          })
          toast.success(res.data.message || 'Success menghapus data lowongan pekerjaan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menghapus data lowongan pekerjaan')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'text-white bg-red-500 hover:bg-red-600 p-1.5 rounded'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        className={'rounded max-w-2xl'}
        title={'Hapus Lowongan Pekerjaan?'}
        description={'Apakah Anda yakin ingin menghapus lowongan pekerjaan ini?'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Pembuka Lowongan</p>
          <p>{data?.nama_mitra_kerja}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{data?.nama_pekerjaan}</p>
          <p className="text-gray-500">Jenis Perkerjaan</p>
          <p>{data?.jenis_pekerjaan}</p>
          <p className="text-gray-500">Lokasi Perkerjaan</p>
          <p>
            {data?.jenis_lokasi_kerja}-{data.nama_kabupaten}, {data?.nama_provinsi}
          </p>
          <p className="text-gray-500">Kouta</p>
          <p>{data?.kouta_pekerjaan}</p>
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
                <Button variant={'destructive'} disabled={loading} onClick={handleDelete}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}
