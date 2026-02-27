import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";
import {useForm} from "react-hook-form";
import {ResolverServices, type SchemaService} from "@/pages/modules/LPPM/services/data/resolver.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button.tsx";
import {BiPlus} from "react-icons/bi";
import {FormServices} from "@/pages/modules/LPPM/services/component/forms.tsx";
import {DialogCustom} from "@/components/common/dialog/DialogCustom.tsx";

export const ButtonAddService = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaService>({
    resolver: zodResolver(ResolverServices),
    defaultValues: {
      posisi_bawah_landing: false,
      posisi_footer: false,
      posisi_header: false,
    }
  })

  const queryClient = useQueryClient()

  console.log(form.formState.errors)

  const HandleAddService = async (data: SchemaService) => {
    setLoading(true)
    await AxiosClient.post('/lppm/layanan', data).then((res) => {
      if (res.data.status) {
        setOpen(false)
        setLoading(false)
        queryClient.invalidateQueries({
          queryKey: ['services'],
        })
        form.reset()
      }
    }).catch((err) => {
      setLoading(false)
      toast.error(err?.response?.data?.message || 'Gagal tambah data')
    })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
      >
        <BiPlus/>
        Tambah
      </Button>

      <DialogCustom className={'rounded max-w-4xl'} title={'Tambah Layanan'} open={open} setOpen={setOpen}>
        <FormServices form={form} HandleSave={HandleAddService} loading={loading} open={open} setOpen={setOpen}/>
      </DialogCustom>
    </>
  )

}
