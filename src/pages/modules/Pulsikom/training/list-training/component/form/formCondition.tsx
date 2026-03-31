import { UseGetConditionTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { RichText } from '@/components/common/richtext'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useQueryClient } from '@tanstack/react-query'

export const FormCondition = () => {
  const id = window.localStorage.getItem('id_training')
  const { condition } = UseGetConditionTraining(id as string)
  const [loading, setLoading] = useState(false)
  const form = useForm()

  useEffect(() => {
    if (condition) {
      form.reset({
        isi: condition?.isi,
      })
    }
  }, [condition])

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/pusilkom/training/${id}/persyaratan`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['status-training'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <RichText form={form} name={'isi'} label={'Persyaratan'} isRow={false} />
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
              },
              {
                type: 'custom',
                element: (
                  <Button disabled={loading}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
