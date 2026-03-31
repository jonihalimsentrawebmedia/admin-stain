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

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/credit-earning', value)
      .then((res) => {
        if (res.data?.status) {
          setIsEdit(!isEdit)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['credit-earning'],
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
                label={'Visi Misi'}
                buttonGroup={[
                  {
                    type: 'cancel',
                    label: 'Batal',
                    onClick: () => setIsEdit(true),
                  },
                  {
                    type: 'save',
                    label: 'Simpan',
                  },
                ]}
              />
              <p className="text-yellow-500 text-lg font-semibold">Visi</p>
              <RichText form={form} name={'visi'} label={'Visi'} isRow={false} showLabel={false} />
              <p className="text-yellow-500 text-lg font-semibold">Misi</p>
              <RichText form={form} name={'misi'} label={'Misi'} isRow={false} showLabel={false} />

              <ButtonForm loading={loading} onCancel={() => setIsEdit(false)} />
            </form>
          </Form>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Visi Misi'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Visi Misi',
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
