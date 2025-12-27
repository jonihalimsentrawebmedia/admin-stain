import { useState } from "react"
import { CountryResolver, type CountryType } from "../model/resolver"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { HiPlus } from "react-icons/hi"
import { DialogCustom } from "@/components/common/dialog/DialogCustom"
import { Form } from "@/components/ui/form"
import { InputText } from "@/components/common/form/InputText"
import ButtonForm from "@/components/common/button/ButtonForm"

const ButtonAddCountry = () => {
 const [open, setOpen] = useState(false)
  const form = useForm<CountryType>({
    resolver: zodResolver(CountryResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: CountryType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/referensi/negara`, data)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-country'],
        })
        setOpen(false)
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
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        <HiPlus />
        Tambah Data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Negara</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <InputText
                form={form}
                name="nama_negara"
                isRow
                label="Nama Negara"
                placeholder="Nama Negara"
              />
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

export default ButtonAddCountry