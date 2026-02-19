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
import InformationImmediatelyForm from '../components/InformationImmediatelyForm'
import { InformationImmediatelyResolver, type InformationImmediatelyType } from '../model/resolver'

const InformationImmediatelyAddView = () => {
  const navigate = useNavigate()
  const form = useForm<InformationImmediatelyType>({
    resolver: zodResolver(InformationImmediatelyResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: InformationImmediatelyType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/informasi-serta-merta-informasi`, {
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
          label="Tambah Informasi Serta Merta"
        />
        <InformationImmediatelyForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default InformationImmediatelyAddView
