import { useNavigate, useParams } from 'react-router-dom'
import { VisiMisiUnitResolver, type VisiMisiUnitType } from '../model/resolver'
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
import useGetVisiMisiUnitDetail from '../controller/useGetVisiMisiUnitDetail'
import VisiMisiUnitForm from '../components/VisiMisiUnitForm'

const VisiMisiUnitEditView = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { loading: loadingDetail, visiMisi } = useGetVisiMisiUnitDetail()
  const form = useForm<VisiMisiUnitType>({
    resolver: zodResolver(VisiMisiUnitResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: VisiMisiUnitType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/unit-ppid/visi-misi/${id}`, {
        ...data,
        urutan: Number(data.urutan),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        navigate(-1)
        await queryClient.invalidateQueries({
          queryKey: ['visi-misi-unit-ppid'],
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
    if (visiMisi) {
      form.reset({
        isi: visiMisi.isi,
        urutan: visiMisi.urutan.toString(),
        nama: visiMisi.nama,
      })
    }
  }, [visiMisi])
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
          label="Edit Visi Misi"
        />
        <VisiMisiUnitForm form={form} />
        <ButtonForm loading={loading} />
      </form>
    </Form>
  )
}

export default VisiMisiUnitEditView
