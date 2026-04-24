import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetDescriptionAuditManagement } from './hooks/index'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const AuditManagementPage = () => {
  const { description } = UseGetDescriptionAuditManagement()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (description) {
      form.setValue('isi', description?.isi)
    }
  }, [description])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/spi/tinjauan-manajemen', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['description-audit-management'],
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
                label={'Update Tinjauan Manajemen'}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <ButtonGoToGuide
                        titleGuide={'Tinjauan Manajemen'}
                        valueGuide="SPI_JAMINAN_MUTU_TINJUAUAN_MANAJEMEN"
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
              label={'Tinjauan Manajemen'}
              buttonGroup={[
                 {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Tinjauan Manajemen'}
                      valueGuide="SPI_JAMINAN_MUTU_TINJUAUAN_MANAJEMEN"
                    />
                  ),
                },
                {
                  type: 'custom',
                  element: (
                    <Button
                      onClick={() => navigate('document')}
                      variant={'outline'}
                      className={'border-primary text-primary hover:text-primary'}
                    >
                      <FaListUl />
                      Daftar Dokumen
                    </Button>
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
              dangerouslySetInnerHTML={{ __html: description?.isi ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}
