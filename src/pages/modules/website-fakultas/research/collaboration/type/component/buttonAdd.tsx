import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonAddType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/fakultas/bidang-kolaborasi', e).then((res) => {
      if (res?.data?.status) {
        setLoading(false)
        setOpen(false)
        toast.success(res?.data?.message || 'Success')
        queryClient.invalidateQueries({
          queryKey: ['type-collaboration'],
        })
      }
    })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic
        title={'Tambah Bidang Kolaborasi'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-5xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              placeholder={'Nama bidang Kolaborasi'}
              name={'nama'}
              form={form}
              label={'Nama Bidang kolaborasi'}
              isRequired
            />

            <RichText
              form={form}
              name={'deskripsi'}
              isRow={false}
              showLabel={true}
              label={'Deskripsi Bidang Kolaborasi'}
            />

            <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
