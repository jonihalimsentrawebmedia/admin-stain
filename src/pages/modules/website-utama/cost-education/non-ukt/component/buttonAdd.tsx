import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormEntranceProdiNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/component/form.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import {
  ResolverEntranceNonUkt,
  type TResolverEntranceNonUkt,
} from '@/pages/modules/website-utama/cost-education/non-ukt/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import type { INonUktEntrance } from '@/pages/modules/website-utama/cost-education/non-ukt/entrance-list/data/types.ts'

interface props {
  faculty: SatuanOrganisasiList[]
  prodi: SatuanOrganisasiList[]
  jenjang: EducationalLevelList[]
  id_prodi: string
  id_fakultas: string
  id_jenjang_pendidikan: string
  entrance: INonUktEntrance[]
}

export const ButtonAddEntranceNonUkt = (props: props) => {
  const { faculty, prodi, jenjang, id_prodi, id_jenjang_pendidikan, id_fakultas, entrance } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEntranceNonUkt>({
    resolver: zodResolver(ResolverEntranceNonUkt),
  })

  useEffect(() => {
    if (id_fakultas && id_prodi) {
      form.reset({
        id_prodi: id_prodi,
        id_fakultas: id_fakultas,
        id_jenjang_pendidikan: id_jenjang_pendidikan,
      })
    }
  }, [id_prodi, id_fakultas, id_jenjang_pendidikan])

  const queryClient = useQueryClient()
  const handleSave = async (value: TResolverEntranceNonUkt) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/biaya-pendidikan-non-ukt', {
      id_prodi: value.id_prodi,
      id_jalur_masuk_non_ukt: value.id_jalur_masuk_non_ukt,
      urutan: value.urutan,
    })
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
      <Button
        variant={'outline'}
        className={'border border-primary hover:text-primary text-primary'}
        onClick={() =>
          id_prodi && id_fakultas && id_jenjang_pendidikan
            ? setOpen(!open)
            : toast.error('Silakan pilih fakultas, prodi, dan jenjang terlebih dahulu')
        }
      >
        <BiPlus />
        Tambah Jalur Masuk
      </Button>

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
