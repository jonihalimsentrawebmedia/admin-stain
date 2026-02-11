import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import ImageUpload from './ImageUpload'

interface Props {
  data: any
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
        title={<p className="text-2xl ">Edit Gambar Landing Page</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ImageUpload maxSizeMB={2} form={form} name="thumbnail" label="Gambar(Ukuran 4:2)" />
              <div className="text-center">
                <ButtonForm
                  loading={loading}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEdit
