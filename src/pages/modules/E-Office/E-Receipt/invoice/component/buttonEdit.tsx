import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  InvoiceResolver,
  type TInvoiceResolver,
} from '@/pages/modules/E-Office/E-Receipt/invoice/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { HiPencil } from 'react-icons/hi'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import type { ItemInvoice } from '@/pages/modules/E-Office/E-Receipt/invoice/data/types.ts'

interface props {
  data: ItemInvoice
}

const ButtonEditItemFaktur = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TInvoiceResolver>({
    resolver: zodResolver(InvoiceResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        banyak: data?.banyak,
        satuan: data?.satuan,
        nama_barang: data?.nama_barang,
        harga_satuan: data?.harga_satuan,
        total: data?.total_harga,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TInvoiceResolver) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/kwitansi/${data?.id_kwitansi}/item-faktur/${data.id_item_faktur}`,
      {
        banyak: value?.banyak,
        satuan: value?.satuan,
        nama_barang: value?.nama_barang,
        harga_satuan: value?.harga_satuan,
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({ queryKey: ['reconciliation'] })
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

      <DialogBasic title={'Edit Item Faktur'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form className={'grid grid-cols-2 gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'banyak'}
              form={form}
              label={'Banyak'}
              isNumber
              type={'number'}
              placeholder={'Banyak'}
              htmlFor={'banyak'}
              isRequired
              fx={(e) => {
                const count = form.watch('harga_satuan')
                const total = count * e
                form.setValue('total', total)
              }}
            />
            <TextInput
              name={'satuan'}
              form={form}
              label={'Satuan'}
              placeholder={'Cth: Unit, kg lusin dll'}
              htmlFor={'satuan'}
              isRequired
            />
            <TextInput
              name={'nama_barang'}
              form={form}
              label={'Nama Barang'}
              placeholder={'Masukakan Nama Barang'}
              isRequired
            />
            <CurrencyInput
              name={'harga_satuan'}
              form={form}
              label={'Harga Satuan'}
              placeholder={'Harga Satuan'}
              currency={'IDR'}
              locale={'id-ID'}
              isRequired
              fx={(e) => {
                const count = form.watch('banyak')
                const total = count * e
                form.setValue('total', total)
              }}
            />
            <CurrencyInput
              name={'total'}
              form={form}
              label={'Total Harga (Rp.)'}
              isDisabled
              placeholder={'Total Harga (Rp.)'}
              currency={'IDR'}
              locale={'id-ID'}
            />
            <div className="col-span-2">
              <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
            </div>
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonEditItemFaktur
