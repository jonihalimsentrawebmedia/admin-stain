import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import {
  dateOptions,
  generateYearData,
  monthOptions,
} from '@/pages/modules/website-utama/statistic/data'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageStatistic = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Pengaturan Bahasa Surat Keterangan Mahasiswa'}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />

          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <p>Tanggal Berdiri</p>
            <div className="flex gap-4">
              <SelectBasicInput
                data={dateOptions}
                form={form}
                name="tanggal"
                placeholder="Pilih"
                label="Tanggal"
                selectClassName="min-w-[150px]"
              />
              <SelectBasicInput
                data={monthOptions}
                form={form}
                name="bulan"
                placeholder="Pilih"
                label="Bulan"
                selectClassName="min-w-[150px]"
              />
              <SelectBasicInput
                data={generateYearData(1940)}
                form={form}
                name="tahun"
                placeholder="Pilih"
                label="Tahun"
                selectClassName="min-w-[150px]"
              />
            </div>
          </div>

          <RichText name={'teks_pengantar'} form={form} label={'Teks Pengantar'} required isRow />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
                onClick: () => {},
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
