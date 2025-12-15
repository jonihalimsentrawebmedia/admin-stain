import { useForm } from 'react-hook-form'
import type { AcademicYearList } from '../model'
import { AcademicYearResolver, type IAcademicYearTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import AcademicYearForm from './AcademicYearForm'

interface Props {
  data: AcademicYearList
}
const ButtonEditAcademicYear = ({ data }: Props) => {
  const form = useForm<IAcademicYearTypeForm>({
    resolver: zodResolver(AcademicYearResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IAcademicYearTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/tahun-akademik/${data.id_tahun_akademik}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
          setOpen(true)

          form.reset({
            ...data,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        open={open}
        width="50%"
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Tahun Akademik'}
      >
        <AcademicYearForm
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonEditAcademicYear
