import { HiPencil } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { IGroupOrganization } from '../data/index'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormStructureOrganization } from '../components/forms'
import { useForm } from 'react-hook-form'
import { StructureOrganization, type StructureOrganizationType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const ButtonEditStructureOrganization = (data: IGroupOrganization) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const form = useForm<StructureOrganizationType>({
    resolver: zodResolver(StructureOrganization),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kelompok: data.nama_kelompok,
        kelompok: data.kelompok,
        urutan: data.urutan,
      })
    }
  }, [])

  const HandlerEdit = async (e: StructureOrganizationType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/kelompok-organisasi/${data?.id_kelompok_organisasi}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['list-group-organization'],
          })
          toast.success(res.data.message || 'Success tambah data kelompok')
          form.reset()
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
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600'}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-lg'}
        open={open}
        setOpen={setOpen}
        title={'Edit Kelompok'}
      >
        <FormStructureOrganization
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandlerEdit}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}
