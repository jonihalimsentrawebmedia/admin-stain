import { UseGetConditionTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
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
import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

interface IProps {
  prev_value: string
  next_value: string
  title?: string
}

export const FormCondition = (props: IProps) => {
  const { prev_value, title, next_value } = props
  const id = window.localStorage.getItem('id_training')
  const { condition } = UseGetConditionTraining(id as string)
  const [loading, setLoading] = useState(false)
  const form = useForm()
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

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
    await AxiosClient.post(`/pusilkom/training/${id}/persyaratan`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['status-training'],
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
        <form className={'flex flex-col gap-4 mt-0 lg:mt-[55px]'} onSubmit={form.handleSubmit(HandleSave)}>
          <div className="static lg:absolute w-full top-0 left-0 py-2 z-20">
            <ButtonTitleGroup
              label={title ?? ''}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={`3. Persyaratan`}
                      valueGuide="PUSILKOM_TRAINING_DAFTAR_TRAINING_FORM_PERSYARATAN"
                    />
                  ),
                },
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => navigate('/modules/pulsikom/training/list-training'),
                },
                {
                  type: 'custom',
                  element: (
                    <Button disabled={loading} className={'text-white'}>
                      Lanjutkan <ChevronRight className={'size-4'} />
                    </Button>
                  ),
                },
              ]}
            />
          </div>
          <p className="text-xl font-semibold text-primary">3. Persyaratan</p>

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
                  onClick: () => navigate('/modules/pulsikom/training/list-training'),
                },
                {
                  type: 'custom',
                  element: (
                    <Button disabled={loading} className={'text-white'}>
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
