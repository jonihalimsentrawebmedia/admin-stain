import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { Label } from '@/components/ui/label.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import CurrencyInput from '@/components/common/form/InputCurrency.tsx'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import { FaTrash } from 'react-icons/fa'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { USeGetPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/hooks'
import { UseGetBudgetOfficialTravel } from '@/pages/modules/E-Office/official-travel/budget/hooks'
import { USeGetBiayaType } from '@/pages/modules/E-Office/reference/costing-type/hooks'
import { USeGetTransportType } from '@/pages/modules/E-Office/reference/transport-type/hooks'
import type { UseFieldArrayReturn } from 'react-hook-form'

interface Props {
  form: any
  HandleSave: (value: any) => void
  Costing: UseFieldArrayReturn<any, any>
  loading: boolean
}

export const FormLupSum = (props: Props) => {
  const { form, HandleSave, Costing, loading } = props
  const { pejabat } = USeGetPejabat({
    page: '0',
    limit: '0',
  })
  const { budget } = UseGetBudgetOfficialTravel({
    page: '0',
    limit: '0',
  })
  const { biayaType } = USeGetBiayaType({
    page: '0',
    limit: '0',
  })
  const { transportType } = USeGetTransportType({
    page: '0',
    limit: '0',
  })
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <Card className={'shadow-none rounded-md'}>
            <CardContent className={'space-y-4'}>
              <SelectBasicInput
                form={form}
                name={'id_pejabat'}
                label={'Pejabat'}
                placeholder={'Pilih Pejabat'}
                isRequired
                isRow
                usePortal
                data={
                  pejabat.map((row) => ({
                    label: `${row?.nama_lengkap} (${row?.jabatan})`,
                    value: row?.id_pejabat,
                  })) ?? []
                }
              />
              <SelectBasicInput
                form={form}
                name={'id_bendahara'}
                label={'Bendahara'}
                placeholder={'Pilih Bendahara'}
                isRequired
                isRow
                usePortal
                data={
                  pejabat.map((row) => ({
                    label: `${row?.nama_lengkap} (${row?.jabatan})`,
                    value: row?.id_pejabat,
                  })) ?? []
                }
              />
              <SelectBasicInput
                form={form}
                name={'id_sumber_dana'}
                label={'Sumber Dana'}
                placeholder={'Pilih Sumber Dana'}
                isRequired
                isRow
                usePortal
                data={
                  budget?.map((row) => ({
                    label: row?.sumber_data,
                    value: row?.id_anggaran,
                  })) ?? []
                }
              />
            </CardContent>
          </Card>

          <Card className={'shadow-none rounded-md'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>Daftar Biaya</CardTitle>
              <Button
                type={'button'}
                className={'text-white rounded-full'}
                onClick={() =>
                  Costing.append({
                    id_mail_surat_tugas_lumpsum_biaya: null,
                    id_jenis_biaya: '',
                    id_jenis_transportasi: '',
                    no_ticket: '',
                    jumlah_hari: 0,
                    harga: 0,
                    redaksi: '',
                    is_rill: false,
                  })
                }
              >
                <FaCirclePlus className={'text-yellow-500'} />
                Tambah Biaya
              </Button>

              <div className={'space-y-4'}>
                {Costing?.fields.map((field, index) => (
                  <div className={'grid items-start grid-cols-[12rem_1fr] gap-4'} key={field.id}>
                    <Label>Daftar Biaya {index + 1}</Label>
                    <div className="flex items-center gap-4">
                      <SelectBasicInput
                        name={`biaya.${index}.id_jenis_biaya`}
                        form={form}
                        placeholder={'Pilih Jenis Biaya'}
                        className={'w-full'}
                        selectItemClassName={'w-full'}
                        label={'Jenis Biaya'}
                        isRequired
                        usePortal
                        data={
                          biayaType?.map((row) => ({
                            label: row?.nama,
                            value: row?.id_jenis_biaya,
                          })) ?? []
                        }
                      />
                      {biayaType?.find(
                        (row) => row.id_jenis_biaya === form.watch(`biaya.${index}.id_jenis_biaya`)
                      )?.tipe === 'TRANSPORTASI' && (
                        <>
                          <SelectBasicInput
                            className={'w-full'}
                            selectItemClassName={'w-full'}
                            name={`biaya.${index}.id_jenis_transportasi`}
                            form={form}
                            placeholder={'Pilih Jenis Transportasi'}
                            label={'Jenis Transportasi'}
                            isRequired
                            usePortal
                            data={
                              transportType?.map((row) => ({
                                label: row?.nama,
                                value: row?.id_jenis_transportasi,
                              })) ?? []
                            }
                          />
                          <TextInput
                            form={form}
                            name={`biaya.${index}.no_ticket`}
                            label={'No. Ticket'}
                            placeholder={'Masukkan No. Ticket'}
                            htmlFor={'no_ticket'}
                            inputClassName={'bg-white w-full'}
                            className={'w-full'}
                            isRequired
                          />
                        </>
                      )}
                      {biayaType?.find(
                        (row) => row.id_jenis_biaya === form.watch(`biaya.${index}.id_jenis_biaya`)
                      )?.tipe === 'PERHARI' && (
                        <>
                          <TextInput
                            name={`biaya.${index}.jumlah_hari`}
                            form={form}
                            label={'Jumlah Hari'}
                            type={'number'}
                            className={'w-full'}
                            inputClassName={'bg-white w-full'}
                            htmlFor={'jumlah_hari'}
                            isNumber
                            isRequired
                          />
                          <CurrencyInput
                            form={form}
                            name={`biaya.${index}.perhari`}
                            label={'Biaya Perhari'}
                            className={'w-full'}
                            currency={'IDR'}
                            locale={'id-ID'}
                            placeholder={'Harga (Rp.)'}
                            inputClassName={'bg-white w-full text-end'}
                            isRequired
                            isDisabled
                          />
                        </>
                      )}
                      <CurrencyInput
                        form={form}
                        name={`biaya.${index}.harga`}
                        label={'Harga'}
                        className={'w-full'}
                        currency={'IDR'}
                        locale={'id-ID'}
                        placeholder={'Harga (Rp.)'}
                        inputClassName={'bg-white w-full text-end'}
                        isRequired
                        fx={(e: any) => {
                          const hari = form.watch(`biaya.${index}.jumlah_hari`) ?? 0
                          form.setValue(`biaya.${index}.perhari`, (Number(e) / hari).toString())
                        }}
                      />
                      <CheckboxInputBasic
                        className={'mt-5'}
                        name={`biaya.${index}.is_rill`}
                        form={form}
                        label={'Rill'}
                      />
                      {Costing?.fields.length > 1 && (
                        <button
                          className={'w-fit text-red-500 mt-5'}
                          type={'button'}
                          onClick={() => Costing.remove(index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div />
                    <TextInput
                      name={`biaya.${index}.redaksi`}
                      form={form}
                      placeholder={'Redaksi'}
                      label={'Redaksi'}
                      htmlFor={'redaksi'}
                      inputClassName={'bg-white w-full'}
                      className={'w-full [&>label]:hidden flex!'}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </>
  )
}
