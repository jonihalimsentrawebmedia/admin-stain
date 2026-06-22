import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AccreditationFormFaculty from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/component/forms.tsx'
import {
  FacultyAccreditationResolver,
  type IAccreditationForm,
} from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/resolver.tsx'
import type { IAccreditation } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { format } from 'date-fns'

interface Props {
  data?: IAccreditation
}

const ButtonEditAccreditationFaculty = (props: Props) => {
  const { data } = props

  const form = useForm<IAccreditationForm>({
    resolver: zodResolver(FacultyAccreditationResolver),
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        id_unit: data?.id_satuan_organisasi_akreditas,
        mulai_berlaku: format(data.mulai_berlaku, 'yyyy-MM-dd'),
        akhir_berlaku: format(data.akhir_berlaku, 'yyyy-MM-dd'),
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const handleSave = async (e: IAccreditationForm) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/akreditas/${data?.id_akreditas}`, {
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
      <button
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => {
          setOpen(true)
        }}
      >
        <HiPencil />
      </button>

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

export default ButtonEditAccreditationFaculty
