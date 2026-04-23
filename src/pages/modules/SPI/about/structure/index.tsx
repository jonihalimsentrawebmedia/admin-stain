import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetStructureOrganization } from './hooks/index'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ProfileStructurePage = () => {
  const { structure } = UseGetStructureOrganization()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (structure) {
      form.setValue('isi', structure?.isi)
    }
  }, [structure])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/spi/struktur-organisasi', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['structure-spi'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      {isEdit ? (
        <>
          <Form {...form}>
            <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
              <ButtonTitleGroup
                label={'Struktur Organisasi'}
                buttonGroup={[
                   {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Struktur Organisasi'}
                      valueGuide="SPI_TENTANG_STRUKTUR_ORGANISASI"
                    />
                  ),
                },
                  {
                    type: 'cancel',
                    label: 'Batal',
                    onClick: () => setIsEdit(!isEdit),
                  },
                  {
                    type: 'save',
                    label: 'Simpan',
                    onClick: () => {},
                  },
                ]}
              />
              <RichText form={form} name={'isi'} isRow={false} showLabel={false} label={''} />
              <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className={'mt-5'}>
            <ButtonTitleGroup
              label={'Update Data Struktur Organisasi'}
              buttonGroup={[
                  {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Struktur Organisasi'}
                      valueGuide="SPI_TENTANG_STRUKTUR_ORGANISASI"
                    />
                  ),
                },
                {
                  type: 'edit',
                  label: 'Edit Konten',
                  onClick: () => setIsEdit(!isEdit),
                },
              ]}
            />
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: structure?.isi ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}
