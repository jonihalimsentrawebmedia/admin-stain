import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { type CategoryPlan, CategoryPlanResolver } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormResearchPlan } from './form'
import type { IPLanResearchCategory } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface props {
  data?: IPLanResearchCategory
}

export const ButtonEditPlanning = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CategoryPlan>({
    resolver: zodResolver(CategoryPlanResolver),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kategori: data?.nama_kategori,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const HandleAddPlanning = async (e: CategoryPlan) => {
    setLoading(true)
    await AxiosClient.put(
      `/lppm/rencana-induk-penelitian-kategori/${data?.id_rencana_induk_penelitian_kategori}`,
      e
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kategori')
          queryClient.invalidateQueries({
            queryKey: ['research-plan'],
          })
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kategori')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Kategori'}
        className={'rounded max-w-2xl'}
      >
        <FormResearchPlan
          form={form}
          loading={loading}
          setOpen={setOpen}
          open={open}
          handleSubmit={HandleAddPlanning}
        />
      </DialogCustom>
    </>
  )
}
