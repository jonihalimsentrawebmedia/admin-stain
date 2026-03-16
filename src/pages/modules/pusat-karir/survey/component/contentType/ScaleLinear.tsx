import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'

interface Props {
  max_item: number
  text_min: string
  text_max: string
}

export const ScaleLinearData = (props: Props) => {
  const { max_item, text_min, text_max } = props
  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <Label>Bagaimana penilaian karyawanmu terhadap perusahaanmu?*</Label>
        <div className="flex items-center gap-x-10 mx-auto py-4 w-fit">
          <p className={'text-sm whitespace-nowrap'}>{text_min}</p>
          <div className="w-fit mx-auto flex items-center justify-between gap-x-20">
            {Array.from({ length: max_item }, (_, index) => (
              <div className={'flex flex-col gap-1.5 items-center'} key={index}>
                <Input
                  className="h-5 w-5 accent-primary border-gray-300 transition-all duration-200"
                  type="radio"
                  name="scale"
                  id={`scale${index}`}
                />
                <label htmlFor={`scale${index}`}>{index + 1}</label>
              </div>
            ))}
          </div>
          <p className={'text-sm whitespace-nowrap'}>{text_max}</p>
        </div>
      </div>
    </>
  )
}
