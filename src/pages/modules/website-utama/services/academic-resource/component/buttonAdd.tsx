import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverAcademicResource, type ResolverAcademicResourceType } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormAcademicResource from '@/pages/modules/website-utama/services/academic-resource/component/form.tsx'

const ButtonAddAcademicResource = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ResolverAcademicResourceType>({
    resolver: zodResolver(ResolverAcademicResource),
  })

  const queryClient = useQueryClient()
  const handleSave = async (value: ResolverAcademicResourceType) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/academic-resources', value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['academic-resource'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          setOpen(false)
          setLoading(false)
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
        className="border border-primary text-primary hover:text-primary"
        onClick={() => setOpen(true)}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic title={'Tambah Academic Resource'} open={open} setOpen={setOpen} className="lg:min-w-2xl">
        <FormAcademicResource
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={handleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonAddAcademicResource
