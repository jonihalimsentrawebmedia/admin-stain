import { Button } from '@/components/ui/button'
import { MdEmail } from 'react-icons/md'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import DetailField from '@/components/common/field/DetailField'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send, X } from 'lucide-react'
import type { ObjectionsPublic } from '../model'
import { ObjectionPublicResolver, type ObjectionPublicType } from '../model/resolver'
import ObjectionsPublicForm from './ObjectionsPublicForm'

interface Props {
  data?: ObjectionsPublic
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
      name: 'alasan_keberatan',
      label: 'Alasan Keberatan',
      component: (
        <ul className="list-disc list-outside">
          {dataProps?.alasan_keberatan.map((item, index) => (
            <li key={item + index} className='break-all'>{item}</li>
          ))}{' '}
        </ul>
      ),
    },
    {
      name: 'kasus_posisi',
      label: 'Kasus Posisi',
    },
  ]
  const formField = useForm()
  const [open, setOpen] = useState(false)
  const form = useForm<ObjectionPublicType>({
    resolver: zodResolver(ObjectionPublicResolver),
    defaultValues: {
      file_lampiran: [],
    },
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ObjectionPublicType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/permohonan-keberatan/${id}/kirim-jawaban`, {
        ...data,
        tanggal_tanggapan:new Date(data.tanggal_tanggapan).toISOString()
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: [`objections-public-detail`],
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
        className="max-w-4xl! w-[90wdv] md:w-full! "
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
              <ObjectionsPublicForm form={form} />
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
