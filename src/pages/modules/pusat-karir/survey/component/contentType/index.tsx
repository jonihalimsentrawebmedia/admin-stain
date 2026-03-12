import type {
  IKonfigurasiPilihan,
  IKonfigurasiSkalaLinear,
  IPertanyaanSurvey,
  IPilihanSurvey,
} from '@/pages/modules/pusat-karir/survey/data/types.ts'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { UseFormReturn } from 'react-hook-form'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { OtherInputRadio } from '@/pages/modules/pusat-karir/survey/component/contentType/otherRadio.tsx'
import { OtherInputCheckbox } from '@/pages/modules/pusat-karir/survey/component/contentType/checkbox-other.tsx'
import { ScaleLinearData } from '@/pages/modules/pusat-karir/survey/component/contentType/ScaleLinear.tsx'

interface props {
  form: UseFormReturn<any>
  item: IPertanyaanSurvey
  index: number
}

interface OptionHaveOther extends IPilihanSurvey {
  is_other?: boolean
}

export const ContentType = (props: props) => {
  const { form, item, index } = props

  const coFigure =
    item?.konfigurasi && 'min' in item.konfigurasi
      ? (item.konfigurasi as IKonfigurasiSkalaLinear)
      : null

  const Option =
    item?.konfigurasi && 'pilihan' in item.konfigurasi
      ? (item.konfigurasi as IKonfigurasiPilihan)
      : undefined

  const temp: OptionHaveOther[] = [
    ...(Option?.pilihan ?? []),
    {
      value: 'other',
      judul_pilihan: 'Lainnya',
      is_other: true,
    },
  ]

  switch (item.type) {
    case 'TEXT_PENDEK': {
      return (
        <TextInput
          isRequired={item?.required}
          name={item?.id_pertanyaan === '' ? `TEXT_PENDEK${index}` : item?.id_pertanyaan}
          form={form}
          placeholder={'Tuliskan jawaban disini.'}
          label={item?.pertanyaan}
          inputClassName={'rounded'}
        />
      )
    }
    case 'TEXT_PANJANG': {
      return (
        <TextAreaInput
          isRequired={item?.required}
          name={item?.id_pertanyaan === '' ? `TEXT_PANJANG${index}` : item?.id_pertanyaan}
          form={form}
          inputClassName={'rounded'}
          placeholder={'Tuliskan jawaban disini.'}
          label={item?.pertanyaan}
        />
      )
    }
    case 'TANGGAL': {
      return (
        <TextInput
          isRequired={item?.required}
          name={item?.id_pertanyaan === '' ? `TANGGAL${index}` : item?.id_pertanyaan}
          form={form}
          inputClassName={'rounded'}
          placeholder={'Tuliskan jawaban disini.'}
          label={item?.pertanyaan}
          type={'date'}
        />
      )
    }
    case 'ANGKA': {
      return (
        <TextInput
          isRequired={item?.required}
          name={item?.id_pertanyaan === '' ? `ANGKA${index}` : item?.id_pertanyaan}
          form={form}
          inputClassName={'rounded'}
          placeholder={'Tuliskan jawaban disini.'}
          label={item?.pertanyaan}
          type={'number'}
          isNumber
        />
      )
    }
    case 'DROPDOWN': {
      return (
        <SelectBasicInput
          name={item?.id_pertanyaan === '' ? `DROPDOWN${index}` : item?.id_pertanyaan}
          form={form}
          placeholder={'Pilih Jawaban'}
          label={item?.pertanyaan}
          isRequired={item?.required}
          usePortal
          data={
            Option?.pilihan?.map((row) => ({
              label: row?.judul_pilihan,
              value: row?.value,
            })) ?? []
          }
        />
      )
    }
    case 'PILIHAN_GANDA': {
      return (
        <OtherInputRadio
          form={form}
          name={item?.id_pertanyaan === '' ? `PILIHAN_GANDA${index}` : item?.id_pertanyaan}
          label={item?.pertanyaan}
          isRequired={item?.required}
          text_value={`${item?.id_pertanyaan}_text_other`}
          data={
            temp?.map((row, k) => ({
              label: row?.judul_pilihan,
              value: row?.value === '' ? k.toString() : row?.value,
              isText: row?.is_other,
            })) ?? []
          }
        />
      )
    }
    case 'KONTAK_CENTANG': {
      return (
        <OtherInputCheckbox
          form={form}
          name={item?.id_pertanyaan === '' ? `KONTAK_CENTANG${index}` : item?.id_pertanyaan}
          label={item?.pertanyaan}
          isRequired={item?.required}
          text_value={`${item?.id_pertanyaan}_text_other`}
          data={
            temp?.map((row) => ({
              label: row?.judul_pilihan,
              value: row?.value,
              isText: row?.is_other,
            })) ?? []
          }
        />
      )
    }
    case 'SKALA_LINEAR': {
      return (
        <ScaleLinearData
          max_item={coFigure?.max ?? 5}
          text_max={coFigure?.judul_max ?? ''}
          text_min={coFigure?.judul_min ?? ''}
        />
      )
    }
  }
}
