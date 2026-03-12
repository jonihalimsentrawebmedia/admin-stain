import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import type { ISurveyDataPost } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import type { Dispatch, SetStateAction } from 'react'
import { FaTrash } from 'react-icons/fa'
import { clsx } from 'clsx'

interface Props {
  data?: ISurveyDataPost
  setActiveIndex: Dispatch<SetStateAction<number>>
  setData: Dispatch<SetStateAction<ISurveyDataPost | undefined>>
  activeIndex: number
}

export const SideSection = (props: Props) => {
  const { data, setData, activeIndex, setActiveIndex } = props

  const RemoveSection = (index: number) => {
    if (!data) return
    const tempData = [...data?.bagian]
    tempData.splice(index, 1)
    setData({
      ...data,
      bagian: tempData,
    })
  }

  return (
    <>
      <div className="border border-primary bg-white rounded p-4 h-full max-h-[calc(100vh-210px)] flex flex-col justify-between gap-2.5 sticky top-0">
        <div className="flex flex-col gap-2.5">
          <p className="text-primary text-sm">Bagian Survei (min. 1)</p>
          <ul className={'space-y-2.5'}>
            {data?.bagian?.map((row, k: number) => (
              <li
                onClick={() => setActiveIndex(k)}
                key={k}
                className={clsx(
                  'border p-2 text-sm flex items-center w-full justify-between',
                  k === activeIndex ? 'bg-blue-200 border-blue-500' : ''
                )}
              >
                <div className={'flex items-center gap-1.5'}>
                  <p>{k + 1}. </p>
                  <p>{row?.judul}</p>
                </div>
                {k > 0 && (
                  <button className={'text-red-500'} onClick={() => RemoveSection(k)}>
                    <FaTrash />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Button
          className={'w-full rounded'}
          onClick={() => {
            if (!data) return
            const tempData = [...data?.bagian]
            tempData.push({
              judul: `Judul Bagian ${data.bagian.length + 1}`,
              pertanyaan: [],
            })
            setData({
              ...data,
              bagian: tempData,
            })
          }}
        >
          <BiPlus />
          Tambah Bagian
        </Button>
      </div>
    </>
  )
}
