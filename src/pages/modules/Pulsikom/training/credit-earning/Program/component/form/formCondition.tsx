import { UseGetConditionProgram } from '../../hooks/index'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { RichText } from '@/components/common/richtext'
import { Form } from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  prev_value: string
  next_value: string
}

export const FormCondition = (props: IProps) => {
  const { prev_value, next_value } = props
  const id = window.localStorage.getItem('id_program')
  const { condition } = UseGetConditionProgram(id as string)
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const [_, setSearchParams] = useSearchParams()

  const HandlePrev = () => {
    const Params = new URLSearchParams()
    Params.append('step', prev_value)
    setSearchParams(Params)
  }

  const HandleNext = () => {
    if (prev_value) {
      const Params = new URLSearchParams()
      Params.append('step', next_value)
      setSearchParams(Params)
    }
  }

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
    await AxiosClient.post(`/pusilkom/program/${id}/persyaratan`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['status-program'],
          })
          HandleNext()
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

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={(e) => {
                e.preventDefault()
                HandlePrev()
              }}
            >
              <ArrowLeft className={'size-4'} />
              Topik Bahasan & Jadwal
            </Button>
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
          </div>
        </form>
      </Form>
    </>
  )
}
