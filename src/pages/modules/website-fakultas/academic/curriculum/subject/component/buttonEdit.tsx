import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormSubjectCurriculum } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/form.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISubjectDetail } from '@/pages/modules/website-prodi/curriculum/suject-detail/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import {
  SubjectResolver,
  type SubjectResolverType,
} from '@/pages/modules/website-prodi/curriculum/suject-detail/data/resolver.tsx'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'

interface Props {
  data: ISubjectDetail
}

export const ButtonEditSubject = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id: id_prodi, id_subject } = useParams()
  const { session } = UseGetSessionFaculty()

  const [searchParams] = useSearchParams()
  const tahun = searchParams.get('tahun')
  const semester = searchParams.get('semester')

  useEffect(() => {
    if (tahun && semester && data) {
      form.reset({
        id_universitas: session?.id_universitas,
        id_fakultas: session?.id_fakultas,
        id_prodi: id_prodi,
        id_kurikulum: id_subject,
        tahun: Number(tahun),
        semester: Number(semester) % 2 === 0 ? 'GENAP' : 'GANJIL',
        nama_mata_kuliah: data.nama_mata_kuliah,
        sks: data.sks,
        jenis_mata_kuliah: data.jenis_mata_kuliah,
      })
    }
  }, [tahun, semester, session, data])

  const form = useForm<SubjectResolverType>({
    resolver: zodResolver(SubjectResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: SubjectResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/fakultas/mata-kuliah/${data?.id_mata_kuliah}`, {
      id_kurikulum: value?.id_kurikulum,
      nama_mata_kuliah: value?.nama_mata_kuliah,
      tahun: value?.tahun,
      semester: value?.semester,
      sks: value?.sks,
      jenis_mata_kuliah: value?.jenis_mata_kuliah,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah mata kuliah')
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['subject-detail'],
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
        onClick={() => setOpen(!open)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded"
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'lg:max-w-4xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Mata Kuliah'}
      >
        <FormSubjectCurriculum
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
