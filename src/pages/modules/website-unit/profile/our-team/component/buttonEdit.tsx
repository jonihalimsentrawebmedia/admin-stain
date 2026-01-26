import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormOurTeamUnit } from '@/pages/modules/website-unit/profile/our-team/component/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OurTeamResolver, type OurTeamResolverType } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { useQueryClient } from '@tanstack/react-query'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IUnitTeamGroup
}

export const ButtonAddOurTeam = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        nama_divisi: data?.nama_divisi,
        urutan: data?.urutan,
      })
    }
  }, [session])

  const form = useForm<OurTeamResolverType>({
    resolver: zodResolver(OurTeamResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: OurTeamResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/profil/tim/${data?.id_unit_tim}`, {
      nama_divisi: value?.nama_divisi,
      urutan: value?.urutan,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Tim')
          queryClient.invalidateQueries({
            queryKey: ['division-unit'],
          })
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
        <FormOurTeamUnit
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
