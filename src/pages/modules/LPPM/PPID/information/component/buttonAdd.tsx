import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverInformation, type SchemaInformation } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import type { IListInformationTree } from '../data/types'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormInformation } from '@/pages/modules/LPPM/PPID/information/component/forms.tsx'

interface Props {
  data?: IListInformationTree
}

export const ButtonAddInformation = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaInformation>({
    resolver: zodResolver(ResolverInformation),
  })

  useEffect(() => {
    if (data) {
      form.setValue('id_parent', data?.id_daftar_informasi)
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: SchemaInformation) => {
    setLoading(true)
    await AxiosClient.post('/lppm/daftar-informasi', value)
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
      <Button
        size={'sm'}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        {data ? 'Tambah' : 'Tambah Informasi'}
      </Button>

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
          isChild={!!data}
        />
      </DialogCustom>
    </>
  )
}
