import { useEffect, useState } from 'react'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { useForm } from 'react-hook-form'
import { DivisionTeamResolver, type DivisionTeamResolverType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormDivisionTeam } from '../component/form'

export const ButtonAddDivisionTeam = (data?: IUnitTeamGroup) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()
  const form = useForm<DivisionTeamResolverType>({
    resolver: zodResolver(DivisionTeamResolver),
  })

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        nama_divisi: data?.nama_divisi,
      })
    }
  }, [session, data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: DivisionTeamResolverType) => {
    setLoading(true)
    await AxiosClient.post(`unit/profil/tim-pejabat/${data?.id_unit_tim}/pejabat`, {
      foto_url: value?.foto_url,
      nama: value?.nama,
      jabatan: value?.jabatan,
      is_kepala_unit: value?.is_kepala_unit,
      urutan: value?.urutan,
    })
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
      <Button
        variant={'outline'}
        className={'border-primary'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <BiPlus />
        Tambah
      </Button>
      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Divisi'}
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
