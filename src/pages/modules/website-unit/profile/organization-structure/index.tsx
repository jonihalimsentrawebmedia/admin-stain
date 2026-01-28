import { useEffect, useState } from 'react'
import { UseGetOrganizationStructure } from '@/pages/modules/website-unit/profile/organization-structure/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Form } from '@/components/ui/form.tsx'
import ImageOrganization from '@/pages/modules/website-utama/program-studi/detail/struktur-organisasi/components/ImageOrganization.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const OrganizationStructure = () => {
  const { organization } = UseGetOrganizationStructure()

  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  useEffect(() => {
    if (organization) {
      form.setValue('gambar_struktur_url', organization?.gambar_struktur_url ?? '')
    }
  }, [organization])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/struktur-organisasi', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['organization-structure'],
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
      <div className={'flex flex-col gap-4'}>
        {isEdit ? (
          <Form {...form}>
            <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
              <ButtonTitleGroup
                label={'Struktur Organisasi'}
                buttonGroup={[
                  { type: 'edit', label: 'Edit', onClick: () => setIsEdit(!isEdit) },
                  { type: 'save', label: 'Simpan', onClick: () => {}, isDisabled: loading },
                ]}
              />
              <ImageOrganization
                image={form.watch('gambar_struktur_url')}
                setImage={(img) => {
                  form.setValue('gambar_struktur_url', img)
                }}
                isEdit={isEdit}
              />
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Struktur Organisasi'}
              buttonGroup={[{ type: 'edit', label: 'Edit', onClick: () => setIsEdit(!isEdit) }]}
            />

            <img
              src={organization?.gambar_struktur_url ?? '/img/no-image.png'}
              alt="asd"
              className={'w-full h-auto object-cover'}
            />
          </>
        )}
      </div>
    </>
  )
}
