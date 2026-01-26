import { useForm } from 'react-hook-form'
import { AcreditationResolver, type IAcreditationTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import AcreditationForm from './AcreditationForm'
interface Props {
  optionsSatuanOrganisasi: {
    value: string
    label: string
  }[]
}
const ButtonAddAcreditation = ({ optionsSatuanOrganisasi }: Props) => {
  const form = useForm<IAcreditationTypeForm>({
    resolver: zodResolver(AcreditationResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IAcreditationTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/akreditas', {
      ...e,
      akhir_berlaku: new Date(e.akhir_berlaku).toISOString(),
      mulai_berlaku: new Date(e.mulai_berlaku).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acreditation'],
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
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Akreditasi'}
        width="50%"
      >
        <AcreditationForm
          form={form}
          optionsSatuanOrganisasi={optionsSatuanOrganisasi}
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

export default ButtonAddAcreditation
