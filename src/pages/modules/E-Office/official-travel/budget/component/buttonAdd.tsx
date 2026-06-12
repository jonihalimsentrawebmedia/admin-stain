import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  BudgetSchema,
  type TBudgetSchema,
} from '@/pages/modules/E-Office/official-travel/budget/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormBudget from '@/pages/modules/E-Office/official-travel/budget/component/form.tsx'

const ButtonAddBudget = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TBudgetSchema>({
    resolver: zodResolver(BudgetSchema),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TBudgetSchema) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/anggaran', {
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Anggaran
      </Button>

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

export default ButtonAddBudget
