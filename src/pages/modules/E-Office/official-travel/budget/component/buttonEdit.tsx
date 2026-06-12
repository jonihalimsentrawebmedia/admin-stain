import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  BudgetSchema,
  type TBudgetSchema,
} from '@/pages/modules/E-Office/official-travel/budget/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormBudget from '@/pages/modules/E-Office/official-travel/budget/component/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IBudgetOfficialTravel } from '@/pages/modules/E-Office/official-travel/budget/data/types.ts'

interface props {
  data: IBudgetOfficialTravel
}

const ButtonEditBudget = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TBudgetSchema>({
    resolver: zodResolver(BudgetSchema),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        tahun_anggaran: data?.tahun_anggaran,
        sumber_data: data?.sumber_data,
        jumlah_anggaran: Number(data?.jumlah_anggaran),
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TBudgetSchema) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/anggaran/${data?.id_anggaran}`, {
      ...value,
      jumlah_anggaran: value?.jumlah_anggaran.toString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['budget-official-travel'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'text-white bg-yellow-500 p-1.5 hover:text-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Anggaran'} open={open} setOpen={setOpen}>
        <FormBudget
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditBudget
