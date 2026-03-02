import { Button } from '@/components/ui/button'
import type { AdmissionINformationPublic } from '../model'
import { MdEmail } from 'react-icons/md'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import DetailField from '@/components/common/field/DetailField'
import AdmisionInformationPublicForm from './AdmisionInformationPublicForm'
import {
  AdmissionInformationPublicResolver,
  type AdmissionInformationPublicType,
} from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, X } from 'lucide-react'

interface Props {
  data?: AdmissionINformationPublic
  id: string
  isForTable?: boolean
}

const ButtonEmail = ({ data: dataProps, id, isForTable }: Props) => {
  const field = [
    {
      name: 'nama_lengkap',
      label: 'Nama Lengkap (Sesuai KTP)*',
    },
    {
      name: 'no_hp',
      label: 'No. Handphone*',
    },
    {
      name: 'email',
      label: 'Email*',
    },
    {
      name: 'jenis_informasi_dibutuhkan',
      label: 'Jenis Informasi yang Dibutuhkan*',
    },
    {
      name: 'tujuan_penggunaan_informasi',
      label: 'Tujuan Penggunaan Informasi*',
    },
  ]
  const formField = useForm()
  const [open, setOpen] = useState(false)
  const form = useForm<AdmissionInformationPublicType>({
    resolver: zodResolver(AdmissionInformationPublicResolver),
    defaultValues: {
      file_lampiran: [],
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: AdmissionInformationPublicType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/permohonan/${id}/kirim-jawaban`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: [`admission-information-public-detail`],
        })

        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
          formField.reset({
            ...dataProps,
          })
        }}
        variant={'outline'}
        className="border-primary text-primary hover:text-primary"
      >
        {isForTable ? (
          'Kirim Email'
        ) : (
          <>
            {' '}
            <MdEmail />
            Email
          </>
        )}
      </Button>
      <DialogCustom
        className="max-w-2xl! w-[90wdv] md:w-full! "
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Kirim Email</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <div className="border p-4  border-primary bg-primary/10">
                <p className="text-primary">Informasi Penerima</p>
                <DetailField data={field} form={formField} />
              </div>
              <AdmisionInformationPublicForm form={form} />
              <div className={`flex gap-4  items-center justify-end`}>
                <Button
                  className="border-primary text-primary bg-white hover:text-primary"
                  variant={'outline'}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                  }}
                >
                  <X />
                  Batal
                </Button>
                <Button
                  disabled={loading}
                  className="border-primary text-white bg-primary hover:text-white hover:bg-primary/80"
                >
                  <Send />
                  Kirim Email
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEmail
