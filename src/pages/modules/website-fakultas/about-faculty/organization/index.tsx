import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Button } from '@/components/ui/button'
import { HiPencil } from 'react-icons/hi'
import { UseGetFacultyOrganization } from '@/pages/modules/website-fakultas/about-faculty/hooks'
import ImageOrganization from '@/pages/modules/website-utama/program-studi/detail/struktur-organisasi/components/ImageOrganization.tsx'
import { ResolverOrganization, type TypeResolverOrganizationForm } from './resolver.tsx'

const OrganizationalStructureView = () => {
  const { organization } = UseGetFacultyOrganization()
  const [isEdit, setIsEdit] = useState(false)

  const form = useForm<TypeResolverOrganizationForm>({
    resolver: zodResolver(ResolverOrganization),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const handleSave = async (e: TypeResolverOrganizationForm) => {
    setLoading(true)
    await AxiosClient.post(`/fakultas/profil/struktur-organisasi`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['program-studi-struktur-organisasi'],
          })
          setLoading(false)
          setIsEdit(!isEdit)
          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  useEffect(() => {
    if (organization) {
      form.setValue('url_gambar', organization.url_gambar)
    }
  }, [organization])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-primary">Struktur Organisasi</div>
          {isEdit ? (
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setIsEdit(false)
              }}
            />
          ) : (
            <Button
              onClick={() => {
                setIsEdit(!isEdit)
                form.reset({
                  url_gambar: organization?.url_gambar,
                })
              }}
              variant={'outline'}
              className={'bg-white text-primary border-primary hover:text-primary'}
            >
              <HiPencil />
              Edit
            </Button>
          )}
        </div>
        <ImageOrganization
          image={form.watch('url_gambar')}
          setImage={(img) => {
            form.setValue('url_gambar', img)
          }}
          isEdit={isEdit}
        />
      </form>
    </Form>
  )
}

export default OrganizationalStructureView
