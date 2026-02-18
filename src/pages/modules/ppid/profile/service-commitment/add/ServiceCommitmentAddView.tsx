import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import { ServiceCommitmentResolver, type ServiceCommitmentType } from '../model/resolver'
import ServiceCommitmentForm from '../components/ServiceCommitmentForm'

const ServiceCommitmentAddView = () => {
  const navigate = useNavigate()
  const form = useForm<ServiceCommitmentType>({
    resolver: zodResolver(ServiceCommitmentResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ServiceCommitmentType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/maklumat-layanan`, {
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
          label="Tambah Maklumat Layanan"
        />
        <ServiceCommitmentForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default ServiceCommitmentAddView
