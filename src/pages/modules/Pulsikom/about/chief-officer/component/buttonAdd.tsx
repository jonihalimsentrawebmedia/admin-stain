import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

export const ButtonAddChiefOfficer = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/pusilkom/kelompok-pimpinan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(!open)
          queryClient.invalidateQueries({
            queryKey: ['chief-officer'],
          })
          toast.success(res.data.message || 'Success')
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
        <BiPlus />
        Tambah Kelompok
      </Button>

      <DialogBasic title={'Tambah Kelompok'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'nama_kelompok'}
              form={form}
              label={'Nama Kelompok'}
              placeholder={'Nama Kelompok'}
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
