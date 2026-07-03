import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { UseGetReconciliation } from '@/pages/modules/E-Office/E-Receipt/invoice/hooks'
import { Progress } from '@/components/ui/progress.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import {
  InvoiceResolver,
  type TInvoiceResolver,
} from '@/pages/modules/E-Office/E-Receipt/invoice/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsItemFaktur } from '@/pages/modules/E-Office/E-Receipt/invoice/data/columns.tsx'
import { GeneratePdfInvoice } from '@/pages/modules/E-Office/E-Receipt/invoice/component/pdfGenerateInvoice.tsx'
import { FaEye } from 'react-icons/fa'

const InvoiceEReceiptPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const { reconciliation } = UseGetReconciliation(id as string)
  const form = useForm<TInvoiceResolver>({
    resolver: zodResolver(InvoiceResolver),
    defaultValues: {
      banyak: 1,
    },
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TInvoiceResolver) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/kwitansi/${id}/item-faktur`, {
      banyak: value?.banyak,
      satuan: value?.satuan,
      nama_barang: value?.nama_barang,
      harga_satuan: value?.harga_satuan,
    }).then((res) => {
      if (res.data.status) {
        form.reset()
        toast.success(res.data.message || 'Success')
        queryClient.invalidateQueries({
          queryKey: ['reconciliation'],
        })
        setLoading(false)
      }
    })
  }

  const columns = ColumnsItemFaktur()

  return (
    <>
      <ButtonTitleGroup
        label={'Lihat Faktur'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button
                className={'text-white'}
                disabled={!reconciliation || Number(reconciliation.sisa) !== 0}
                onClick={() => {
                  if (reconciliation) GeneratePdfInvoice(reconciliation).open()
                }}
              >
                <FaEye className={'mr-2 size-3'} />
                Preview Invoice
              </Button>
            ),
          },
        ]}
        isBack
      />
      <p className="mt-5 text-blue-500">
        Rincikan komponen faktur tanpa menlebihi total e-kwitansi
      </p>
      <div className={'shadow w-full rounded-lg overflow-hidden mt-5'}>
        <div className="bg-primary p-5 flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-white text-xs">No. Kwitansi</p>
            <p className={'text-white text-2xl font-semibold'}>
              {reconciliation?.kwitansi?.no_kwitansi}
            </p>
            <p className={'text-white text-xs'}>
              Penerima : {reconciliation?.kwitansi?.nama_penerima}
            </p>
          </div>
          <div className={'w-1/2 space-y-2 border border-white bg-white/10 rounded-md p-3'}>
            <p className="text-sm text-white">Total Kwitansi</p>
            <p className="text-2xl font-semibold text-white">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(Number(reconciliation?.kwitansi?.jumlah))}
            </p>
            <Progress
              value={
                ((reconciliation?.total_faktur ?? 0) / (reconciliation?.kwitansi?.jumlah ?? 0)) *
                100
              }
              className={'bg-white'}
            />
            <p className={'text-white text-end'}>
              {((reconciliation?.total_faktur ?? 0) / (reconciliation?.kwitansi?.jumlah ?? 0)) *
                100}
              %
            </p>
          </div>
        </div>
        <div className={'bg-white p-5 grid grid-cols-3 gap-4'}>
          <div className={'border border-primary p-2.5 rounded bg-primary/10 space-y-2'}>
            <p className="text-sm">Total Faktur</p>
            <p className="text-2xl font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(Number(reconciliation?.total_faktur))}
            </p>
          </div>
          <div className={'border border-primary p-2.5 rounded bg-primary/10 space-y-2'}>
            <p className="text-sm">Sisa Selisih</p>
            <p className="text-2xl font-semibold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(Number(reconciliation?.sisa))}
            </p>
          </div>
          <div className={'border border-primary p-2.5 rounded bg-yellow-500/20 space-y-2'}>
            <p className="text-sm">Status Rekonsiliasi</p>
            <p className="text-2xl text-yellow-500 font-semibold">
              {reconciliation?.status_rekonsiliasi}
            </p>
          </div>
        </div>
      </div>

      <div className={'p-5 bg-white mt-5 rounded-lg shadow space-y-1.5'}>
        <p className="text-2xl font-semibold">Tambah Item Faktur</p>
        <p className="text-blue-500">Masukkan detail barang/jasa yang menjabarkan nilai kwitansi</p>
        <Form {...form}>
          <form className={'flex gap-4 items-end mt-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <TextInput
              name={'banyak'}
              className={'w-full'}
              form={form}
              label={'Banyak'}
              isNumber
              type={'number'}
              placeholder={'Banyak'}
              htmlFor={'banyak'}
              fx={(e) => {
                const count = form.watch('harga_satuan')
                const total = count * e
                form.setValue('total', total)
              }}
              isRequired
            />
            <TextInput
              name={'satuan'}
              form={form}
              className={'w-full'}
              label={'Satuan'}
              placeholder={'Cth: Unit, kg lusin dll'}
              htmlFor={'satuan'}
              isRequired
            />
            <TextInput
              name={'nama_barang'}
              form={form}
              label={'Nama Barang'}
              className={'w-full'}
              placeholder={'Masukakan Nama Barang'}
              isRequired
            />
            <CurrencyInput
              name={'harga_satuan'}
              form={form}
              label={'Harga Satuan'}
              placeholder={'Harga Satuan'}
              currency={'IDR'}
              className={'w-full'}
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
              className={'w-full'}
              currency={'IDR'}
              locale={'id-ID'}
              isRequired
            />
            <Button className={'text-white rounded-full'} disabled={loading}>
              <BiPlus />
              Tambah
            </Button>
          </form>
        </Form>
      </div>

      {reconciliation?.items && reconciliation?.items?.length > 0 && (
        <TableCustom data={reconciliation?.items} columns={columns} />
      )}
    </>
  )
}
export default InvoiceEReceiptPage
