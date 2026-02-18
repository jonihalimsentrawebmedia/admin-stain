import { useNavigate, useParams } from 'react-router-dom'
import {  WorkResponsibilitiesResolver, type WorkResponsibilitiesType } from '../model/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Form } from '@/components/ui/form'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonForm from '@/components/common/button/ButtonForm'
import { Skeleton } from '@/components/ui/skeleton'
import useGetWorkResponsibilitiesDetail from '../controller/useGetWorkResponsibilitiesDetail'
import WorkResponsibilitiesForm from '../components/WorkResponsibilitiesForm'

const WorkResponsibilitiesEditView = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { loading: loadingDetail, workResponsibilities } = useGetWorkResponsibilitiesDetail()
  const form = useForm<WorkResponsibilitiesType>({
    resolver: zodResolver(WorkResponsibilitiesResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: WorkResponsibilitiesType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/tugas-fungsi-tanggung-jawab/${id}`, {
        ...data,
        urutan: Number(data.urutan),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        navigate(-1)
        await queryClient.invalidateQueries({
          queryKey: ['work-responsibilities'],
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
    if (workResponsibilities) {
      form.reset({
        isi: workResponsibilities.isi,
        urutan: workResponsibilities.urutan.toString(),
        nama: workResponsibilities.nama,
      })
    }
  }, [workResponsibilities])
  if (loadingDetail) {
    return (
      <div className="flex flex-col gap-4">
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
          label="Edit Tugas, Fungsi, & Tanggung Jawab"
        />
        <WorkResponsibilitiesForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default WorkResponsibilitiesEditView
