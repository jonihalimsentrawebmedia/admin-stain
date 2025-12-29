import { useForm } from "react-hook-form"
import { FieldOfCooperationResolver, type IFieldOfCooperationTypeForm } from "../model/resolver"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"
import type { FieldOfCooperationList } from "../model"
import { toast } from "react-toastify"
import { IconEdit } from "@/components/common/table/icon"
import { DialogCustom } from "@/components/common/dialog/DialogCustom"
import { Form } from "@/components/ui/form"
import TextInput from "@/components/common/form/TextInput"
import ButtonForm from "@/components/common/button/ButtonForm"
interface Props{
  data:FieldOfCooperationList
}
const ButtonEditFieldOfCooperation = ({data}:Props) => {
 const form = useForm<IFieldOfCooperationTypeForm>({
    resolver: zodResolver(FieldOfCooperationResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IFieldOfCooperationTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/bidang-kerjasama/${data.id_bidang_kerjasama}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-field-of-cooperation'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
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
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Bidang Kerjasama'}
        width="50%"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
            <TextInput
              form={form}
              name="nama_bidang_kerjasama"
              isRow
              label="Nama Bidang Kerjasama*"
              placeholder="Nama Bidang Kerjasama"
            />
            <ButtonForm
              loading={loading}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </form>
        </Form>
      </DialogCustom>
    </>
  )
}

export default ButtonEditFieldOfCooperation