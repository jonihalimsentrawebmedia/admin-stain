import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { FormMainService } from '@/pages/modules/website-unit/services/main/component/form.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useQueryClient } from '@tanstack/react-query'

export const AddMainService = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post('/unit/layanan-utama', {
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
      <div className="flex gap-2 flex-col items-center">
        <div className={' size-[250px] rounded bg-gray-200 flex items-center justify-center'}>
          Belum ada layanan
        </div>
        <Button
          variant={'outline'}
          className={'border-primary rounded'}
          onClick={() => setOpen(!open)}
          disabled={loading}
        >
          Pilih
        </Button>
      </div>

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
