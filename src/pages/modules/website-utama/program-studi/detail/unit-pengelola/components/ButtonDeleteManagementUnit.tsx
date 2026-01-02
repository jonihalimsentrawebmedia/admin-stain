import { useForm } from 'react-hook-form'
import type { ManagementUnitList } from '../../model/management-unit'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'

interface Props {
  data: ManagementUnitList
}

const ButtonDeleteManagementUnit = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const field: any = [
    {
      name: 'nama',
      label: 'Nama',
    },
    {
      name: 'jabatan',
      label: 'Jabatan',
    },
    {
      name: 'urutan',
      label: 'Urutan',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/satuan-organisasi/${id}/unit-pengelola/${data.id_unit_pengelola}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data')
          queryClient.invalidateQueries({
            queryKey: ['program-studi-management-unit'],
          })
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
        onClick={() => {
          setOpen(!open)
          form.reset({
            ...data,
          })
        }}
      >
        <IconDelete />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        width="50%"
        title={<p className="text-2xl text-red-500">Hapus Unit Pengelola</p>}
        description={'Apakah anda yakin untuk menghapus data unit pengelola ini?'}
      >
        <div className="flex gap-4">
          <img src={data.gambar_url} className="w-[120px] h-40 object-cover object-center" alt="" />
          <DetailField data={field} form={form} />
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonDeleteManagementUnit
