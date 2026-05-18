import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  LevelUTKSchema,
  type TLevelUTKSchema,
} from '@/pages/modules/website-utama/cost-education/level-ukt/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormLevelUkt } from '@/pages/modules/website-utama/cost-education/level-ukt/component/form.tsx'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'

interface props {
  select: EducationalLevelList[]
}

export const ButtonAddLevelUkt = (props: props) => {
  const { select } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TLevelUTKSchema>({
    resolver: zodResolver(LevelUTKSchema),
  })

  const queryClient = useQueryClient()
  const handleSave = async (value: TLevelUTKSchema) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/tingkatan-ukt', value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['level_ukt'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
        className={'border border-primary hover:text-primary text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Tingkat
      </Button>

      <DialogBasic
        title={'Tambah Tingkat UKT'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormLevelUkt
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
          select={select}
        />
      </DialogBasic>
    </>
  )
}
