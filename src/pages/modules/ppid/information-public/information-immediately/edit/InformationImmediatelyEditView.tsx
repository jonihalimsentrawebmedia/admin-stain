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
import { Skeleton } from '@/components/ui/skeleton'
import useGetInformationImmediatelyDetail from '../controller/useGetInformationImmediatelyDetail'
import { InformationImmediatelyResolver, type InformationImmediatelyType } from '../model/resolver'
import InformationImmediatelyForm from '../components/InformationImmediatelyForm'

const InformationImmediatelyEditView = () => {
  const { loading: loadingDetail, informationImmediately, id } = useGetInformationImmediatelyDetail()
  const navigate = useNavigate()
  const form = useForm<InformationImmediatelyType>({
    resolver: zodResolver(InformationImmediatelyResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: InformationImmediatelyType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/informasi-serta-merta-informasi/${id}`, {
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
    if (informationImmediately) {
      form.reset({
        deskripsi: informationImmediately.deskripsi,
        public: informationImmediately.public,
        url_gambar: informationImmediately.url_gambar,
        judul: informationImmediately.judul,
      })
    }
  }, [informationImmediately])

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
          label="Edit Informasi Serta Merta"
        />
        <InformationImmediatelyForm form={form} />
        <ButtonForm loading={loading || loadingDetail} />
      </form>
    </Form>
  )
}

export default InformationImmediatelyEditView
