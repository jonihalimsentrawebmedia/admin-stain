import { Label } from '@radix-ui/react-label'
import type {
  IPertanyaanSurvey,
  ISurveyDataPost,
} from '@/pages/modules/pusat-karir/survey/data/types.ts'

interface Props {
  data?: ISurveyDataPost
  setData: (data: ISurveyDataPost) => void
  item?: IPertanyaanSurvey
  activeIndex: number
  index: number
}

export const ShortText = (props: Props) => {
  const { data, setData, item, activeIndex, index } = props
  return (
    <>
      <div className={'w-full'}>
        <p className={'text-blue-500 text-sm'}>Jawaban Teks Pendek</p>
        <div className="flex items-center justify-end">
          <input
            id={`data${index}`}
            type={'checkbox'}
            checked={item?.required ?? false}
            onChange={(e) => {
              if (!data) return
              const newBagian = data.bagian.map((bagian, bagianIndex) => {
                if (bagianIndex !== activeIndex) return bagian
                const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                  if (questionIndex !== index) return q
                  return {
                    ...q,
                    required: e.target.checked,
                  }
                })
                return {
                  ...bagian,
                  pertanyaan: newPertanyaan,
                }
              })
              setData({
                ...data,
                bagian: newBagian as any,
              })
            }}
          />
          <Label htmlFor={`data${index}`} className={'ml-2 text-sm'}>
            Wajib diisi
          </Label>
        </div>
      </div>
    </>
  )
}
