import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AccreditationFormFaculty from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/component/forms.tsx'
import {
  FacultyAccreditationResolver,
  type IAccreditationForm,
} from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/resolver.tsx'
import type { IAccreditation } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/types.ts'

interface Props {
  data?: IAccreditation
}

const ButtonAddAccreditationFaculty = (props: Props) => {
  const { data } = props

  const form = useForm<IAccreditationForm>({
    resolver: zodResolver(FacultyAccreditationResolver),
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        id_unit: data?.id_satuan_organisasi_akreditas,
        gambar: data?.gambar,
        uraian: data?.uraian,
        nilai_akreditas: data?.nilai_akreditas,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleSave = async (e: IAccreditationForm) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/akreditas', {
      ...e,
      akhir_berlaku: new Date(e.akhir_berlaku).toISOString(),
      mulai_berlaku: new Date(e.mulai_berlaku).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['accreditation-faculty'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary rounded"
      >
        <Plus />
        Tambah Akreditasi
      </Button>

      <DialogBasic
        open={open}
        className={'rounded min-w-xs lg:min-w-4xl'}
        setOpen={setOpen}
        title={'Tambah Akreditasi'}
      >
        <AccreditationFormFaculty
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonAddAccreditationFaculty
