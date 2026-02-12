import { useState } from 'react'
import type { DocumentSupportList } from '../model'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import TemplateAimForm from './TemplateAimForm'
import { TemplateAimInstutationResolver, type TemplateAimInstutationType } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

interface Props {
  data: DocumentSupportList
}
const ButtonEdit = ({ data }: Props) => {
 const [open, setOpen] = useState(false)
   const form = useForm<TemplateAimInstutationType>({
     resolver: zodResolver(TemplateAimInstutationResolver),
   })
 
   const [loading, setLoading] = useState(false)
 
   const queryClient = useQueryClient()
   async function handleSave(values: TemplateAimInstutationType) {
     setLoading(true)
     try {
       const res = await AxiosClient.put(
         `/lembaga/template-aim/${data.id_lembaga_template_aim}`,
         {
           ...values,
           urutan: Number(values.urutan),
         }
       )
 
       if (res.data.status) {
         toast.success(res.data.message)
         setOpen(false)
         await queryClient.invalidateQueries({
           queryKey: ['template-aim-lembaga'],
         })
 
         form.reset()
       }
     } catch (err: any) {
       toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
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
            judul: data.judul,
            urutan: data.urutan.toString(),
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
