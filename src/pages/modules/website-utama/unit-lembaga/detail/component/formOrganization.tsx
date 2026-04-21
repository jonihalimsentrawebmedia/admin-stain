import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Button } from '@/components/ui/button'
import { HiPencil } from 'react-icons/hi'
import { UseGetStructureUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/detail/hooks'
import ImageOrganization from '@/pages/modules/website-utama/program-studi/detail/struktur-organisasi/components/ImageOrganization.tsx'
import {
  type IOrganizationalStructureTypeForm,
  OrganizationalStructureResolver,
} from '@/pages/modules/website-utama/program-studi/detail/model/organizational-structure.ts'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'

const OrganizationalStructureForm = () => {
  const { id } = useParams()
  const { structure } = UseGetStructureUnitInstitution(id as string)

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IOrganizationalStructureTypeForm>({
    resolver: zodResolver(OrganizationalStructureResolver),
  })

  const queryClient = useQueryClient()
  const handleSave = async (e: IOrganizationalStructureTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/satuan-organisasi/${id}/struktur-organisasi`, {
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
    if (structure) {
      form.setValue('url_gambar', structure.url_gambar)
    }
  }, [structure])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-primary">Struktur Organisasi</div>
          <div className='flex gap-4 items-center'>
            <ButtonGoToGuide titleGuide='Struktur Organisasi' valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_TENTANG" />
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
                  url_gambar: structure?.url_gambar,
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

export default OrganizationalStructureForm
