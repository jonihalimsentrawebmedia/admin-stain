import type {
  IPertanyaanSurvey,
  ISurveyDataPost,
  TipePertanyaan,
} from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { TypeSelect } from '@/pages/modules/pusat-karir/survey/component/form/typeSelect.tsx'
import { ScaleLinearSection } from '@/pages/modules/pusat-karir/survey/component/form/skalaLinear.tsx'
import { ShortText } from '@/pages/modules/pusat-karir/survey/component/form/ShortText.tsx'
import { LongText } from '@/pages/modules/pusat-karir/survey/component/form/longText.tsx'
import { NumberText } from '@/pages/modules/pusat-karir/survey/component/form/NumberText.tsx'
import { DateText } from '@/pages/modules/pusat-karir/survey/component/form/DateText.tsx'

interface Props {
  type: TipePertanyaan
  data?: ISurveyDataPost
  setData: (data: ISurveyDataPost) => void
  item?: IPertanyaanSurvey
  activeIndex: number
  index: number
}

export const TypeInput = (props: Props) => {
  const { type, data, setData, item, index, activeIndex } = props

  switch (type) {
    case 'TEXT_PENDEK': {
      return (
        <ShortText
          data={data}
          setData={setData}
          item={item}
          activeIndex={activeIndex}
          index={index}
        />
      )
    }

    case 'TEXT_PANJANG': {
      return (
        <LongText
          data={data}
          setData={setData}
          item={item}
          activeIndex={activeIndex}
          index={index}
        />
      )
    }

    case 'KONTAK_CENTANG':
    case 'PILIHAN_GANDA': {
      return (
        <>
          <TypeSelect
            data={data}
            setData={setData}
            item={item}
            activeIndex={activeIndex}
            index={index}
          />
        </>
      )
    }

    case 'SKALA_LINEAR': {
      return (
        <ScaleLinearSection
          item={item}
          setData={setData}
          activeIndex={activeIndex}
          data={data}
          index={index}
        />
      )
    }

    case 'ANGKA': {
      return (
        <NumberText
          data={data}
          setData={setData}
          item={item}
          activeIndex={activeIndex}
          index={index}
        />
      )
    }

    case 'TANGGAL': {
      return (
        <DateText
          data={data}
          setData={setData}
          item={item}
          activeIndex={activeIndex}
          index={index}
        />
      )
    }
    case 'DROPDOWN': {
      return (
        <TypeSelect
          data={data}
          setData={setData}
          item={item}
          activeIndex={activeIndex}
          index={index}
          no_other={true}
        />
      )
    }
  }
}
