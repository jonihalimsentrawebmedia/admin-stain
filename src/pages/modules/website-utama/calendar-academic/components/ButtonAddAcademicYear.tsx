import { useForm } from 'react-hook-form'
import { AcademicYearResolver, type IAcademicYearTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import AcademicYearForm from './AcademicYearForm'

const ButtonAddAcademicYear = () => {
  const form = useForm<IAcademicYearTypeForm>({
    resolver: zodResolver(AcademicYearResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IAcademicYearTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/tahun-akademik', {
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
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        width='50%'
        title={'Tambah Tahun Akademik'}
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

export default ButtonAddAcademicYear
