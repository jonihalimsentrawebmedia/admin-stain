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
import { ServiceCommitmentResolver, type ServiceCommitmentType } from '../model/resolver'
import ServiceCommitmentForm from '../components/ServiceCommitmentForm'
import useGetServiceCommitmentDetail from '../controller/useGetServiceCommitmentDetail'
import { Skeleton } from '@/components/ui/skeleton'

const ServiceCommitmentEditView = () => {
  const { loading: loadingDetail, serviceCommitment, id } = useGetServiceCommitmentDetail()
  const navigate = useNavigate()
  const form = useForm<ServiceCommitmentType>({
    resolver: zodResolver(ServiceCommitmentResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ServiceCommitmentType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/maklumat-layanan/${id}`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        navigate(-1)
        await queryClient.invalidateQueries({
          queryKey: ['maklumat-layanan-unit-ppid'],
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
    if (serviceCommitment) {
      form.reset({
        deskripsi: serviceCommitment.deskripsi,
        public: serviceCommitment.public,
        url_gambar: serviceCommitment.url_gambar,
      })
    }
  }, [serviceCommitment])

  if (loadingDetail) {
    return <Skeleton className="h-[500px]" />
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSave)}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonForm loading={loading || loadingDetail} />,
            },
          ]}
          label="Edit Maklumat Layanan"
        />
        <ServiceCommitmentForm form={form} />
        <ButtonForm loading={loading || loadingDetail} />
      </form>
    </Form>
  )
}

export default ServiceCommitmentEditView
