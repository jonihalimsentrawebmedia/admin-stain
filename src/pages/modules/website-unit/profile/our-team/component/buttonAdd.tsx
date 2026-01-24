import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormOurTeamUnit } from '@/pages/modules/website-unit/profile/our-team/component/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OurTeamResolver, type OurTeamResolverType } from '../data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonAddOurTeam = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  useEffect(() => {
    if (session) {
      form.reset({
        nama_unit: session?.nama_unit,
      })
    }
  }, [session])

  const form = useForm<OurTeamResolverType>({
    resolver: zodResolver(OurTeamResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: OurTeamResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/tim', {
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
          form.reset()
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
