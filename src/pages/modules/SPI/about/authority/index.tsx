import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetAuthoritySPI } from './hooks/index'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const AuthoritySPIPage = () => {
  const { authority } = UseGetAuthoritySPI()
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (authority) {
      form.setValue('tugas', authority?.tugas)
      form.setValue('wewenang', authority?.wewenang)
    }
  }, [authority])

  const queryClient = useQueryClient()

  const handleSave = async (e: any) => {
    await AxiosClient.post('/spi/tugas-wewenang', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['authority-spi'],
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
                label={'Tugas & Wewenang'}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <ButtonGoToGuide
                        titleGuide={'Tugas & Wewenang'}
                        valueGuide="SPI_TENTANG_TUGAS_WEWENANG"
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
              <RichText form={form} name={'tugas'} isRow={false} label={'Tugas'} />
              <RichText form={form} name={'wewenang'} isRow={false} label={'Wewenang'} />
              <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className={'mt-5 space-y-4'}>
            <ButtonTitleGroup
              label={'Ubah Data Tugas & Wewenang'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={'Tugas & Wewenang'}
                      valueGuide="SPI_TENTANG_TUGAS_WEWENANG"
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
            <p className="text-yellow-500 font-semibold">Tugas</p>
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: authority?.tugas ?? '' }}
            />
            <p className="text-yellow-500 font-semibold">Wewenang</p>
            <div
              className={'tiptap ProseMirror simple-editor mt-5'}
              dangerouslySetInnerHTML={{ __html: authority?.wewenang ?? '' }}
            />
          </div>
        </>
      )}
    </>
  )
}
