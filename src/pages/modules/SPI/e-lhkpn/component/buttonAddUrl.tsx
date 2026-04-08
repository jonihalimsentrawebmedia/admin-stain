import { Button } from '@/components/ui/button.tsx'
import { MdInsertLink } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { IELHKPN } from '@/pages/modules/SPI/e-lhkpn/hooks'

interface props {
  data?: IELHKPN
}

export const ButtonAddUrl = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (data) {
      form.reset({
        url: data?.url,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleAdd = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/spi/elhkpn/upsert-url', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['e-lhkpn'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <MdInsertLink />
        Website E-LHKPN
      </Button>

      <DialogBasic title={'Link Website E-LHKPN'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleAdd)} className={'flex flex-col gap-4'}>
            <TextInput
              name={'url'}
              form={form}
              label={'URL Website'}
              placeholder={'Url Website LHKPN'}
              type={'url'}
              isRow
              isRequired
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(false)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
