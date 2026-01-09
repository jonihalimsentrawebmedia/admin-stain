import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import {
  AcreditationResolver,
  type IAcreditationTypeForm,
} from '@/pages/modules/website-utama/acreditation/model/resolver.tsx'
import AccreditationFormProdi from './form'
import type { ISessionProdi } from '@/pages/modules/website-prodi/hooks'

interface Props {
  session?: ISessionProdi
}

const ButtonAddAccreditationProdi = (props: Props) => {
  const { session } = props
  const form = useForm<IAcreditationTypeForm>({
    resolver: zodResolver(AcreditationResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (session) {
      form.reset({
        id_satuan_organisasi_akreditas: session?.id_prodi,
      })
    }
  }, [session])

  const handleSave = async (e: IAcreditationTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/prodi/akreditas', {
      ...e,
      akhir_berlaku: new Date(e.akhir_berlaku).toISOString(),
      mulai_berlaku: new Date(e.mulai_berlaku).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['accreditation-prodi'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
        }}
        className="border border-primary hover:text-primay text-primary rounded"
      >
        <Plus />
        Tambah Akreditasi
      </Button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Akreditasi'}
        width="50%"
      >
        <AccreditationFormProdi
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

export default ButtonAddAccreditationProdi
