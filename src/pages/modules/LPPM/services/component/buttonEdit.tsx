import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";
import {useForm} from "react-hook-form";
import {ResolverServices, type SchemaService} from "../data/resolver.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {FormServices} from "./forms.tsx";
import {DialogCustom} from "@/components/common/dialog/DialogCustom.tsx";
import type {IServices} from "../data/types.tsx";
import {HiPencil} from "react-icons/hi";

interface Props {
  data: IServices
}

export const ButtonEditService = (props: Props) => {
  const {data} = props

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

  useEffect(() => {
    if (data) {
      form.reset({
        posisi_bawah_landing: data?.posisi_bawah_landing,
        posisi_header: data?.posisi_header,
        posisi_footer: data?.posisi_footer,
        url: data?.url,
        urutan: data?.urutan,
        nama_layanan: data?.nama_layanan
      })
    }
  }, [data]);

  const HandleAddService = async (value: SchemaService) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/layanan/${data.id_layanan}`, value).then((res) => {
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
      <button
        onClick={() => setOpen(!open)}
        className={'p-1.5 rounded text-white bg-yellow-500 hover:bg-yellow-600'}
      >
        <HiPencil/>
      </button>

      <DialogCustom className={'rounded max-w-4xl'} title={'Tambah Layanan'} open={open} setOpen={setOpen}>
        <FormServices form={form} HandleSave={HandleAddService} loading={loading} open={open} setOpen={setOpen}/>
      </DialogCustom>
    </>
  )

}
