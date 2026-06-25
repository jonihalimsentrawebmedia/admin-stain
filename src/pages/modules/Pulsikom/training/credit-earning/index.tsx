import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { RichText } from '@/components/common/richtext'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetCreditEarning } from './hooks/index'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaList } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const CreditEarningPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const { creditEarning } = UseGetCreditEarning()

  useEffect(() => {
    if (creditEarning) {
      form.reset({
        deskripsi: creditEarning?.deskripsi,
        keuntungan: creditEarning?.keuntungan,
      })
    }
  }, [creditEarning])

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/program-credit-earning', value)
      .then((res) => {
        if (res.data?.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['program-earning'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5 bg-white p-5">
        {isEdit ? (
          <Form {...form}>
            <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
              <ButtonTitleGroup
                label={'Edit Program Credit Earning'}
                buttonGroup={[
                  {
                    type: 'custom',
                    element: (
                      <ButtonGoToGuide
                        titleGuide={`Program Credit Earning`}
                        valueGuide="PUSILKOM_TRAINING_PROGRAM_CREDIT_EARNING"
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
                  },
                ]}
              />
              <p className="text-yellow-500 text-lg font-semibold">Deskripsi</p>
              <RichText
                form={form}
                name={'deskripsi'}
                label={'Deskripsi'}
                isRow={false}
                showLabel={false}
              />
              <p className="text-yellow-500 text-lg font-semibold">keuntungan</p>
              <RichText
                form={form}
                name={'keuntungan'}
                label={'Keuntungan'}
                isRow={false}
                showLabel={false}
              />

              <ButtonForm loading={loading} onCancel={() => setIsEdit(false)} />
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Program Credit Earning'}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <Button
                      className={'border-primary text-primary hover:text-primary'}
                      variant={'outline'}
                      onClick={() => navigate('program')}
                    >
                      <FaList />
                      Daftar Program
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

            <div className="space-y-5">
              <TitleLine title={'Deskripsi'} />
              <RenderHTMLContent content={creditEarning?.deskripsi ?? ''} />
              <TitleLine title={'Keuntungan'} />
              <RenderHTMLContent content={creditEarning?.keuntungan ?? ''} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
