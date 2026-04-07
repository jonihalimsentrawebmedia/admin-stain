import { Button } from '@/components/ui/button.tsx'
import type { IParticipant } from '../data/index.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import {
  ResolverRefund,
  type TResolverRefund,
} from '@/pages/modules/Pulsikom/training/list-training/participant/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'

interface Props {
  data?: IParticipant
}

export const SectionRefund = (props: Props) => {
  const { data } = props
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverRefund>({
    resolver: zodResolver(ResolverRefund),
  })

  const queryClient = useQueryClient()
  const HandleRefund = async (value: TResolverRefund) => {
    setLoading(true)
    await AxiosClient.patch(
      `/pusilkom/training/${data?.id_training}/peserta/${data?.id_peserta}/refund`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setIsEdit(!isEdit)
          toast.success(res.data.message || 'Success Refund')
          queryClient.invalidateQueries({
            queryKey: ['detail-participant'],
          })
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Error')
        setLoading(false)
      })
  }

  console.log(form.formState.errors)

  return (
    <>
      {isEdit ? (
        <>
          <Form {...form}>
            <form className={'flex flex-col gap-4 mt-4'} onSubmit={form.handleSubmit(HandleRefund)}>
              <div className="flex items-center gap-4 justify-between col-span-2">
                <p className="text-xl text-primary font-semibold">3. Refund</p>
                <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
              </div>
              <InputRadio
                label={'Ada Refund ?'}
                isRequired
                isRow
                form={form}
                name={'is_refund_pembayaran'}
                data={[
                  { label: 'Ya', value: true },
                  { label: 'Tidak', value: false },
                ]}
              />

              {form.watch('is_refund_pembayaran') && (
                <>
                  <TextInput
                    form={form}
                    name={'nama_bank'}
                    label={'Nama Bank'}
                    placeholder={'Nama Bank'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    form={form}
                    name={'no_rekening'}
                    label={'No. Rekening'}
                    placeholder={'No. Rekening'}
                    type={'number'}
                    isRow
                    isRequired
                  />
                  <TextInput
                    form={form}
                    name={'atas_nama_rekening'}
                    label={'Atas Nama Rekening'}
                    placeholder={'Atas Nama Rekening'}
                    isRow
                    isRequired
                  />
                  <CurrencyInput
                    name={'jumlah_refund'}
                    form={form}
                    label={'Jumlah Refund'}
                    locale={'id-ID'}
                    currency={'IDR'}
                    placeholder={'Jumlah Refund'}
                    isRow
                    isRequired
                  />
                  <div className="grid grid-cols-[12rem_1fr] gap-5">
                    <p className="text-gray-700 text-sm">Buti Refund</p>
                    <UploadPhotoImage name={'url_file_refund'} form={form} />
                  </div>
                </>
              )}
            </form>
          </Form>
        </>
      ) : (
        <>
          <div className={'grid grid-cols-[12rem_1fr] gap-4 text-sm mt-4'}>
            <div className="col-span-2 items-center justify-between flex gap-4">
              <p className="text-xl text-primary font-semibold">3. Refund</p>
              <Button
                onClick={() => setIsEdit(!isEdit)}
                variant={'outline'}
                className={'text-primary hover:text-primary border-primary'}
              >
                Edit
              </Button>
            </div>
            <p className="text-gray-500">Ada Refund ?</p>
            <p>{data?.is_refund_pembayaran ? 'Ya' : 'Tidak'}</p>
            <p className="text-gray-500">Nama Bank</p>
            <p>{data?.nama_bank}</p>
            <p className="text-gray-500">No. Rekening</p>
            <p>{data?.no_rekening}</p>
            <p className="text-gray-500">Atas Nama Rekening</p>
            <p>{data?.atas_nama_rekening}</p>
            <p className="text-gray-500">Jumlah Refund</p>
            <p>
              {data?.jumlah_refund
                ? new Intl.NumberFormat('id-id', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(data?.jumlah_refund)
                : '-'}
            </p>
            <p className="text-gray-500">Bukti Refund</p>
            {data?.url_file_refund && (
              <div className={'flex items-start gap-4'}>
                <img
                  src={data?.url_file_refund ?? '/noimg.png'}
                  alt="image"
                  className="object-contain h-[200px]"
                />
                <p>{data?.refund_at ? format(data?.refund_at, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
