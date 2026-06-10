import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverTypeTemplateLetter, type TResolverTypeTemplateLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/form.tsx'
import { useParams } from 'react-router-dom'
import type { ITypeTemplateLetter } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: ITypeTemplateLetter
}

const ButtonEditTypeTemplate = (props: props) => {
  const { id } = useParams()
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeTemplateLetter>({
    resolver: zodResolver(ResolverTypeTemplateLetter),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_jenis_surat: data.id_jenis_surat,
        urutan: data.urutan,
        nama_jenis_template: data?.nama_jenis_template,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeTemplateLetter) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-jenis-template-surat/${data?.id_mail_jenis_template_surat}`,
      {
        ...value,
        id_jenis_surat: id as string,
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['type-template'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'rounded bg-yellow-500 p-1.5 hover:bg-yellow-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Jenis Template'} open={open} setOpen={setOpen}>
        <FormTypeTemplate
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          open={open}
          setOpen={setOpen}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditTypeTemplate
