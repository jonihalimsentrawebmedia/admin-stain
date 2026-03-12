import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {
  IKonfigurasiSkalaLinear,
  IPertanyaanSurvey,
  ISurveyDataPost,
} from '@/pages/modules/pusat-karir/survey/data/types'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@radix-ui/react-label'

interface Props {
  data?: ISurveyDataPost
  setData: (data: ISurveyDataPost) => void
  activeIndex: number
  index: number
  item?: IPertanyaanSurvey
}

export const ScaleLinearSection = (props: Props) => {
  const { data, setData, activeIndex, index, item } = props
  const question = data?.bagian?.[activeIndex]?.pertanyaan?.[index]

  const LinearOption =
    question?.konfigurasi && 'min' in question.konfigurasi
      ? (question.konfigurasi as IKonfigurasiSkalaLinear)
      : undefined

  const updateLinear = (
    field: 'min' | 'max' | 'judul_min' | 'judul_max',
    value: number | string
  ) => {
    if (!data) return

    const newBagian = data.bagian.map((bagian, bagianIndex) => {
      if (bagianIndex !== activeIndex) return bagian

      return {
        ...bagian,
        pertanyaan: bagian.pertanyaan.map((q, qIndex) => {
          if (qIndex !== index) return q

          const baseConfig: IKonfigurasiSkalaLinear =
            q.konfigurasi && 'min' in q.konfigurasi
              ? q.konfigurasi
              : {
                  min: 0,
                  max: 5,
                  judul_min: '',
                  judul_max: '',
                }

          return {
            ...q,
            konfigurasi: {
              ...baseConfig,
              [field]: value,
            },
          }
        }),
      }
    })

    setData({
      ...data,
      bagian: newBagian,
    })
  }

  return (
    <div className="w-full space-y-2.5">
      <p className="text-blue-500 text-sm">Jumlah Skala</p>

      <div className="flex items-center gap-2.5 mt-2">
        {/* MIN */}
        <Select
          value={(LinearOption?.min ?? 0).toString()}
          onValueChange={(v) => updateLinear('min', Number(v))}
        >
          <SelectTrigger className="rounded w-[80px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={`0`}>0</SelectItem>
            <SelectItem value={`1`}>1</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-primary">s.d</p>

        {/* MAX */}
        <Select
          value={(LinearOption?.max ?? 5).toString()}
          onValueChange={(v) => updateLinear('max', Number(v))}
        >
          <SelectTrigger className="rounded w-[80px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={`${i + 1}`}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={'mt-2.5 flex items-center gap-2.5'}>
        <Button
          variant={'outline'}
          className={'border-primary text-primary hover:text-primary rounded'}
        >
          {LinearOption?.min ?? '1'}
        </Button>
        <Input
          placeholder={'Label (opsional). Cth: Sangat Buruk'}
          value={LinearOption?.judul_min ?? ''}
          className={'rounded'}
          onChange={(e) => updateLinear('judul_min', e.target.value)}
        />
      </div>

      <div className={'mt-2.5 flex items-center gap-2.5'}>
        <Button
          variant={'outline'}
          className={'border-primary text-primary hover:text-primary rounded'}
        >
          {LinearOption?.max ?? '5'}
        </Button>
        <Input
          placeholder={'Label (opsional). Cth: Sangat Buruk'}
          value={LinearOption?.judul_max ?? ''}
          className={'rounded'}
          onChange={(e) => updateLinear('judul_max', e.target.value)}
        />
      </div>

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
  )
}
