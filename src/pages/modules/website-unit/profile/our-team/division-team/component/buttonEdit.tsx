import { useEffect, useState } from 'react'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { useForm } from 'react-hook-form'
import { DivisionTeamResolver, type DivisionTeamResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormDivisionTeam } from '../component/form'
import { HiPencil } from 'react-icons/hi'
import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'

interface Props {
  rootData: IUnitTeamGroup
  data: IDivisionTeam
}

export const ButtonEditDivisionTeam = (props: Props) => {
  const { rootData, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()
  const form = useForm<DivisionTeamResolverType>({
    resolver: zodResolver(DivisionTeamResolver),
  })

  useEffect(() => {
    if (session || data || rootData) {
      form.reset({
        nama_unit: session?.nama_unit,
        nama_divisi: rootData?.nama_divisi,
        foto_url: data?.foto_url,
        nama: data?.nama,
        jabatan: data?.jabatan,
        is_kepala_unit: data?.is_kepala_unit,
        urutan: data?.urutan,
      })
    }
  }, [session, data, rootData])

  const queryClient = useQueryClient()

  const HandleSave = async (value: DivisionTeamResolverType) => {
    setLoading(true)
    await AxiosClient.put(
      `unit/profil/tim-pejabat/${data?.id_unit_tim}/pejabat/${data?.id_unit_tim_pejabat}`,
      {
        foto_url: value?.foto_url,
        nama: value?.nama,
        jabatan: value?.jabatan,
        is_kepala_unit: value?.is_kepala_unit,
        urutan: value?.urutan,
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['division-team'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Menambahkan Data Tim')
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
        className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Divisi'}
      >
        <FormDivisionTeam
          form={form}
          handleSave={HandleSave}
          loading={loading}
          setOpen={setOpen}
          open={open}
        />
      </DialogCustom>
    </>
  )
}
