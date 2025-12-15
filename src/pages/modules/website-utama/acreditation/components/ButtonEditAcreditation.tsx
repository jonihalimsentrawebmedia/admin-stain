import { useForm } from 'react-hook-form'
import type { AcreditationList } from '../model'
import { AcreditationResolver, type IAcreditationTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import AcreditationForm from './AcreditationForm'
import { IconEdit } from '@/components/common/table/icon'
import { formatDateTime } from '@/utils/date'

interface Props {
  data: AcreditationList
}

const ButtonEditAcreditation = ({ data }: Props) => {
  const form = useForm<IAcreditationTypeForm>({
    resolver: zodResolver(AcreditationResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IAcreditationTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/akreditas/${data.id_akreditas}`, {
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
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }
  const startAt = formatDateTime(data.mulai_berlaku)
  const endAt = formatDateTime(data.akhir_berlaku)
  console.log(startAt)
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
            akhir_berlaku: endAt.date.split('-').reverse().join('-'),
            mulai_berlaku: startAt.date.split('-').reverse().join('-'),
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        open={open}
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Akreditasi'}
        width="50%"
      >
        <AcreditationForm
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

export default ButtonEditAcreditation
