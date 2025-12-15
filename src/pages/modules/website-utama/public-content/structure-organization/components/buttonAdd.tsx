import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormStructureOrganization } from '@/pages/modules/website-utama/public-content/structure-organization/components/forms.tsx'
import { useForm } from 'react-hook-form'
import { StructureOrganization, type StructureOrganizationType } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonAddStructureOrganization = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<StructureOrganizationType>({
    resolver: zodResolver(StructureOrganization),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (e: StructureOrganizationType) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/kelompok-organisasi', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['list-group-organization'],
          })
          toast.success(res.data.message || 'Success tambah data kelompok')
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
        className={'border border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Kelompok
      </Button>

      <DialogCustom
        className={'rounded lg:max-w-lg'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Kelompok'}
      >
        <FormStructureOrganization
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}
