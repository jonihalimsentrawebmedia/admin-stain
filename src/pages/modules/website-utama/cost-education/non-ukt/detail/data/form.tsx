import type { BiayaNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/data/types.tsx'
import { HiPencil } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { FaSave } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  status: boolean
  data: BiayaNonUkt
}

export const FormUpdateCostTariff = (props: Props) => {
  const { status, data } = props
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm<{ biaya: number }>()
  const { id } = useParams()

  useEffect(() => {
    if (data) {
      form.reset({
        biaya: Number(data?.biaya) || 0,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: { biaya: number }) => {
    await AxiosClient.post(
      `/website-utama/biaya-pendidikan-non-ukt/jalur-masuk/${id}/jenis-tarif/${data?.id_jenis_tarif}`,
      {
        biaya: value.biaya,
        aktif: status,
      }
    )
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['detail_cost_non_ukt'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex items-center gap-2 justify-end'}>
        {isEdit ? (
          <>
            <Form {...form}>
              <form
                className={'flex items-center gap-1.5'}
                onSubmit={form.handleSubmit(handleSave)}
              >
                <CurrencyInput
                  name={'biaya'}
                  form={form}
                  className={'max-w-[250px] items-center'}
                  inputClassName={'text-end items-center'}
                />
                <button className={'bg-green-500 p-2 text-white hover:bg-green-600 rounded mt-1'}>
                  <FaSave />
                </button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <div className={'flex items-center gap-1.5'}>
              <p>
                {data?.biaya
                  ? new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(Number(data?.biaya))
                  : ''}
              </p>
              <button
                className={
                  'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded disabled:bg-gray-400'
                }
                disabled={!status}
                onClick={() => setIsEdit(!isEdit)}
              >
                <HiPencil />
              </button>
              <button
                className={
                  'bg-green-500 p-1.5 text-white hover:bg-green-600 rounded disabled:bg-gray-400'
                }
                onClick={() => {
                  handleSave({ biaya: Number(data.biaya) ?? 0 })
                }}
              >
                <FaSave />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
