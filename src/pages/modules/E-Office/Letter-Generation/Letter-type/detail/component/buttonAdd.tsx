import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverTypeTemplateLetter, type TResolverTypeTemplateLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/form.tsx'
import { useParams } from 'react-router-dom'

const ButtonAddTypeTemplate = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeTemplateLetter>({
    resolver: zodResolver(ResolverTypeTemplateLetter),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeTemplateLetter) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mail-jenis-template-surat', {
      ...value,
      id_jenis_surat: id as string,
    })
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <FaCirclePlus />
        Tambah Jenis Surat
      </Button>

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

export default ButtonAddTypeTemplate
