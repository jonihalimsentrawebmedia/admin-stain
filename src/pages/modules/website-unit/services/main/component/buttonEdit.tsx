import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormMainService } from '@/pages/modules/website-unit/services/main/component/form.tsx'
import type { IUnitMainService } from '@/pages/modules/website-unit/services/main/data/types.ts'

interface Props {
  data?: IUnitMainService
}

export const ButtonEditMainService = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data)
      form.reset({
        id_category: data?.id_kategori_layanan,
        id_layanan: data.id_layanan,
        posisi: data.posisi,
      })
  }, [data])

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(`/unit/layanan-utama/${data?.id_unit_layanan_utama}`, {
      id_kategori_layanan: value.id_category,
      id_layanan: value.id_layanan,
      posisi: value.posisi,
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Layanan Utama')
          queryClient.invalidateQueries({
            queryKey: ['main-service'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(!open)}>
        Ganti
      </Button>

      <DialogBasic
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan Utama'}
      >
        <FormMainService
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}
