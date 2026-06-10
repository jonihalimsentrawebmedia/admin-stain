import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import {
  ResolverExpenditure,
  type TResolverExpenditure,
} from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormExpenditure } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'

export const ButtonAddExpenditure = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverExpenditure>({
    resolver: zodResolver(ResolverExpenditure),
  })
  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverExpenditure) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/acara/${id}/pengeluaran`, {
      ...value,
      tanggal_pengeluaran: new Date(value.tanggal_pengeluaran).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['expenditure'],
          })
          queryClient.invalidateQueries({
            queryKey: ['total-expenditure-print'],
          })
          toast.success(res.data.message || 'Success')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border border-primary text-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah Data
      </Button>
      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <FormExpenditure
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          setOpen={setOpen}
          open={open}
        />
      </DialogBasic>
    </>
  )
}
