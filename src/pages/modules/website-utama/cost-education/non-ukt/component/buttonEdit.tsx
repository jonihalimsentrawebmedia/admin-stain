import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormEntranceProdiNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/component/form.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import { ResolverEntranceNonUkt, type TResolverEntranceNonUkt } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import type { NonUktEntranceList } from '../data/types.tsx'
import { HiPencil } from 'react-icons/hi'
import type { INonUktEntrance } from '@/pages/modules/website-utama/cost-education/non-ukt/entrance-list/data/types.ts'

interface props {
  faculty: SatuanOrganisasiList[]
  prodi: SatuanOrganisasiList[]
  jenjang: EducationalLevelList[]
  data: NonUktEntranceList
  entrance: INonUktEntrance[]
}

export const ButtonEditEntranceNonUkt = (props: props) => {
  const { faculty, prodi, jenjang, data, entrance } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEntranceNonUkt>({
    resolver: zodResolver(ResolverEntranceNonUkt),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_prodi: data?.id_prodi,
        id_fakultas: data?.id_fakultas,
        id_jenjang_pendidikan: data?.id_jenjang_pendidikan,
        id_jalur_masuk_non_ukt: data?.id_jalur_masuk,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: TResolverEntranceNonUkt) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/biaya-pendidikan-non-ukt/${data?.id_non_ukt_jalur_masuk}`,
      {
        id_prodi: value.id_prodi,
        id_jalur_masuk_non_ukt: value.id_jalur_masuk_non_ukt,
        urutan: value.urutan,
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['cost_education_non_ukt'],
          })
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Jalur Masuk'} open={open} setOpen={setOpen}>
        <FormEntranceProdiNonUkt
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
          faculty={faculty}
          prodi={prodi}
          jenjang={jenjang}
          entrance={entrance}
        />
      </DialogBasic>
    </>
  )
}
