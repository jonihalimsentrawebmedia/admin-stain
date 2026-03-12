import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import type { ISurveyDataPost } from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { TypeList } from '@/pages/modules/pusat-karir/survey/data/typeList.tsx'
import { FaEye, FaRegCopy, FaSave, FaTrash } from 'react-icons/fa'
import { TypeInput } from '@/pages/modules/pusat-karir/survey/component/typeInput.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface Props {
  activeIndex: number
  data?: ISurveyDataPost
  setData: (data: ISurveyDataPost) => void
}

export const QuestionActive = (props: Props) => {
  const { data, setData, activeIndex } = props

  const bagianActive = data?.bagian[activeIndex]

  const HandleAddQuestion = () => {
    if (!data) return
    const template = {
      pertanyaan: '',
      deskripsi: '',
      type: 'TEXT_PENDEK',
      required: false,
      konfigurasi: null,
    }
    const newBagian = data.bagian.map((item, index) => {
      if (index !== activeIndex) return item
      return {
        ...item,
        pertanyaan: [...(item.pertanyaan ?? []), template],
      }
    })
    setData({
      ...data,
      bagian: newBagian as any,
    })
  }

  return (
    <>
      <div className="border w-full p-2.5 rounded bg-white space-y-2">
        <Label>Judul Bagian {activeIndex + 1}*</Label>
        <Input
          className={'rounded'}
          value={bagianActive?.judul ?? ''}
          onChange={(e) => {
            const temp = data?.bagian
            if (temp) {
              temp[activeIndex] = {
                ...temp[activeIndex],
                judul: e.target.value,
              }
              setData({
                ...data,
                bagian: temp,
              })
            }
          }}
          placeholder={`Judul Bagian`}
        />
      </div>

      <p className="text-gray-500">Daftar Pertayaan</p>

      {(bagianActive?.pertanyaan ?? []).map((row, k: number) => (
        <div key={k} className={'flex flex-col items-start gap-1.5 border p-2.5 rounded bg-white'}>
          <div className="flex items-center gap-1 w-full">
            <p>{k + 1}. </p>

            <Input
              value={row?.pertanyaan ?? ''}
              className="rounded"
              placeholder="Pertanyaan"
              onChange={(e) => {
                if (!data) return
                const newBagian = data.bagian.map((bagian, bagianIndex) => {
                  if (bagianIndex !== activeIndex) return bagian
                  const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                    if (questionIndex !== k) return q
                    return {
                      ...q,
                      pertanyaan: e.target.value,
                    }
                  })
                  return {
                    ...bagian,
                    pertanyaan: newPertanyaan,
                  }
                })
                setData({
                  ...data,
                  bagian: newBagian,
                })
              }}
            />
            <select
              value={row?.type}
              className={'border rounded p-1.5 px-2 text-sm border-primary text-primary'}
              onChange={(e) => {
                if (!data) return
                const newBagian = data.bagian.map((bagian, bagianIndex) => {
                  if (bagianIndex !== activeIndex) return bagian
                  const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                    if (questionIndex !== k) return q
                    return {
                      ...q,
                      type: e.target.value,
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
            >
              {TypeList?.map((item, index) => (
                <option key={index} value={item?.value}>
                  {item?.label}
                </option>
              ))}
            </select>

            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => {
                if (!data) return
                const newBagian = data.bagian.map((bagian, bagianIndex) => {
                  if (bagianIndex !== activeIndex) return bagian
                  const questions = [...(bagian.pertanyaan ?? [])]
                  const duplicated = {
                    ...questions[k],
                  }
                  questions.splice(k + 1, 0, duplicated)
                  return {
                    ...bagian,
                    pertanyaan: questions,
                  }
                })
                setData({
                  ...data,
                  bagian: newBagian,
                })
              }}
            >
              <FaRegCopy />
            </Button>

            <Button
              variant={'destructive'}
              className={'w-fit rounded'}
              onClick={() => {
                if (!data) return
                const newBagian = data.bagian.map((bagian, bagianIndex) => {
                  if (bagianIndex !== activeIndex) return bagian
                  const newPertanyaan = (bagian.pertanyaan ?? []).filter(
                    (_, questionIndex) => questionIndex !== k
                  )
                  return {
                    ...bagian,
                    pertanyaan: newPertanyaan,
                  }
                })
                setData({
                  ...data,
                  bagian: newBagian,
                })
              }}
            >
              <FaTrash />
            </Button>
          </div>
          <Input
            className={'rounded'}
            placeholder={'Deskripsi Pertanyaan. Bisa berupa petunjuk pengisian'}
            value={row?.deskripsi ?? ''}
            onChange={(e) => {
              if (!data) return
              const newBagian = data.bagian.map((bagian, bagianIndex) => {
                if (bagianIndex !== activeIndex) return bagian
                const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                  if (questionIndex !== k) return q
                  return {
                    ...q,
                    deskripsi: e.target.value,
                  }
                })
                return {
                  ...bagian,
                  pertanyaan: newPertanyaan,
                }
              })
              setData({
                ...data,
                bagian: newBagian,
              })
            }}
          />
          <TypeInput
            activeIndex={activeIndex}
            index={k}
            type={row?.type}
            data={data}
            setData={setData}
            item={row}
          />
        </div>
      ))}

      <div className={'flex items-center justify-between'}>
        <Button onClick={HandleAddQuestion}>
          <BiPlus />
          Tambah Pertanyaan
        </Button>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  className={'rounded border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                >
                  <FaEye />
                  Pratinjau
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button className={'rounded'}>
                  <FaSave />
                  Simpan Survei
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
