import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import {
  InformationPublicRegisterResolver,
  type InformationPublicRegisterType,
} from '../model/resolver'
import InformationPublicRegisterForm from '../components/InformationPublicRegisterForm'
import { useGetInformationPublicRegisterDetail } from '../controller'
import { Skeleton } from '@/components/ui/skeleton'

const InformationPublicRegisterEditView = () => {
  const navigate = useNavigate()
  const { id, information, loading: loadingDetail } = useGetInformationPublicRegisterDetail()
  const form = useForm<InformationPublicRegisterType>({
    resolver: zodResolver(InformationPublicRegisterResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: InformationPublicRegisterType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/daftar-informasi-public/${id}`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        navigate(-1)
        await queryClient.invalidateQueries({
          queryKey: ['informasi-serta-merta-unit-ppid'],
        })

        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (information) {
      form.reset({
        ...information,
      })
    }
  }, [information])

  if (loadingDetail) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
      </div>
    )
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSave)}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonForm loading={loading} />,
            },
          ]}
          label="Tambah Informasi Publik"
        />
        <InformationPublicRegisterForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default InformationPublicRegisterEditView
