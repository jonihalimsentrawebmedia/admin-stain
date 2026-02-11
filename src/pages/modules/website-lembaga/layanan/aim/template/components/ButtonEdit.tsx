import { useState } from 'react'
import type { DocumentSupportList } from '../model'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import TemplateAimForm from './TemplateAimForm'

interface Props {
  data: DocumentSupportList
}
const ButtonEdit = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm()

  const [loading, setLoading] = useState(false)

  async function handleSave(data: any) {
    setLoading(true)
    try {
      console.log(data)
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Template AIM</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
           <TemplateAimForm form={form} />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEdit
