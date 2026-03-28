import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IProgramUndergraduatePartner } from '../data/types.ts'
import { useParams } from 'react-router-dom'

interface Props {
  data: IProgramUndergraduatePartner
}

export const ButtonDeletePartner = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const queryClient = useQueryClient()
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/fakultas/international-ungreaduate-program-universitas-partner/${id}/${data?.id_fakultas_international_ungreaduate_program_universitas_partner}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['partner-university-undergraduate'],
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
        title={'Hapus Galeri Album'}
        description={'Apakah anda yakin untuk menghapus data dibawah ini?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className={'text-gray-500'}>Logo</p>
          <img
            className={'h-[200px] object-contain'}
            src={data?.url_gambar}
            alt={data?.key_gambar}
          />
          <p className="text-gray-500">Nama Universitas</p>
          <p>{data?.nama_universitas}</p>
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
