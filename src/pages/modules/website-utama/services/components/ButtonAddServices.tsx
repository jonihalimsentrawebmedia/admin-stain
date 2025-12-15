import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { ServicesResolver, type IServicesTypeForm } from '../model/resolver'
import ServiceForm from './ServiceForm'

const ButtonAddServices = () => {
  const form = useForm<IServicesTypeForm>({
    resolver: zodResolver(ServicesResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IServicesTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/layanan', {
      ...e,
      footer: e.header?.includes('footer') ? 'Y' : 'N',
      header: e.header?.includes('header') ? 'Y' : 'N',
      slider: e.header?.includes('slider') ? 'Y' : 'N',
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-services'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom width='50%' open={open} className={'rounded lg:min-w-2xl'} setOpen={setOpen} title={'Tambah Menu'}>
        <ServiceForm
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonAddServices
