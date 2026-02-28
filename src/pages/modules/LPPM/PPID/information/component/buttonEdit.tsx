import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverInformation, type SchemaInformation } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IListInformationTree } from '../data/types'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormInformation } from '@/pages/modules/LPPM/PPID/information/component/forms.tsx'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data?: IListInformationTree
  isChild: boolean
}

export const ButtonEditInformation = (props: Props) => {
  const { data, isChild } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaInformation>({
    resolver: zodResolver(ResolverInformation),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        judul: data?.judul,
        url: data?.url,
        id_parent: isChild ? data?.id_parent : null,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: SchemaInformation) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/daftar-informasi/${data?.id_daftar_informasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['information-tree'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah data')
      })
  }

  return (
    <>
      <button
        className={'text-white p-1.5 bg-yellow-500 hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded max-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Informasi'}
        description={'Jika Informasi Memiliki Sub Informasi, maka URL Dikosongkan Saja'}
      >
        <FormInformation
          form={form}
          HandleSave={HandleSave}
          loading={loading}
          open={open}
          setOpen={setOpen}
          isChild={isChild}
        />
      </DialogCustom>
    </>
  )
}
