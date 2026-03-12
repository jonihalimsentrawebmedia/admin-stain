import type {
  IKonfigurasiPilihan,
  IPertanyaanSurvey,
  ISurveyDataPost,
} from '@/pages/modules/pusat-karir/survey/data/types.ts'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input.tsx'
import { FaTrash } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { Button } from '@/components/ui/button.tsx'
import { Label } from '@radix-ui/react-label'

interface Props {
  data?: ISurveyDataPost
  setData: (data: ISurveyDataPost) => void
  item?: IPertanyaanSurvey
  activeIndex: number
  index: number
  no_other?: boolean
}

export const TypeSelect = (props: Props) => {
  const { data, setData, item, index, activeIndex, no_other } = props

  const Option =
    item?.konfigurasi && 'pilihan' in item.konfigurasi
      ? (item.konfigurasi as IKonfigurasiPilihan)
      : undefined

  useEffect(() => {
    if (!Option) {
      const tempOption = {
        is_pilihan_lain: false,
        pilihan: [
          {
            judul_pilihan: '',
          },
        ],
      }
      if (!data) return
      const newBagian = data.bagian.map((bagian, bagianIndex) => {
        if (bagianIndex !== activeIndex) return bagian
        const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
          if (questionIndex !== index) return q
          return {
            ...q,
            konfigurasi: tempOption,
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
    }
  }, [Option, activeIndex, index])

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    if (!data) return

    const newBagian = data.bagian.map((bagian, bagianIndex) => {
      if (bagianIndex !== activeIndex) return bagian

      return {
        ...bagian,
        pertanyaan: (bagian.pertanyaan ?? []).map((q, qIndex) => {
          if (qIndex !== questionIndex) return q
          if (!q.konfigurasi || !('pilihan' in q.konfigurasi)) return q

          return {
            ...q,
            konfigurasi: {
              ...q.konfigurasi,
              pilihan: q.konfigurasi.pilihan.map((opt, optIndex) =>
                optIndex === optionIndex ? { ...opt, judul_pilihan: value } : opt
              ),
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

  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (!data) return

    const newBagian = data.bagian.map((bagian, bagianIndex) => {
      if (bagianIndex !== activeIndex) return bagian

      return {
        ...bagian,
        pertanyaan: (bagian.pertanyaan ?? []).map((q, qIndex) => {
          if (qIndex !== questionIndex) return q

          if (!q.konfigurasi || !('pilihan' in q.konfigurasi)) return q

          return {
            ...q,
            konfigurasi: {
              ...q.konfigurasi,
              pilihan: q.konfigurasi.pilihan.filter((_, i) => i !== optionIndex),
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
    <>
      <div className={'w-full space-y-2.5'}>
        <p className={'text-blue-500 text-sm'}>Daftar Pilihan Jawaban</p>
        <ul className={'mt-1 space-y-2.5'}>
          {Option?.pilihan.map((row, l) => (
            <li key={l} className={'w-full flex items-center gap-2.5'}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary rounded hover:bg-white'}
              >
                <IoMdMenu className={'size-4'} />
              </Button>
              <Input
                className={'rounded w-full'}
                value={row?.judul_pilihan ?? ''}
                placeholder={'Isi Pilihan'}
                onChange={(e) => {
                  updateOption(index, l, e.target.value)
                }}
              />
              <button
                onClick={() => {
                  removeOption(index, l)
                }}
                className={'text-red-500'}
              >
                <FaTrash className={'size-5'} />
              </button>
            </li>
          ))}
          {Option?.is_pilihan_lain && (
            <li className={'w-full flex items-center gap-2.5'}>
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary rounded hover:bg-white'}
              >
                <IoMdMenu className={'size-4'} />
              </Button>
              <div className={'w-full border p-1.5 text-sm rounded bg-muted'}>
                Pilihan Lainnya (Jawaban diisi responden)
              </div>
              <button
                onClick={() => {
                  if (!data) return
                  const newBagian = data.bagian.map((bagian, bagianIndex) => {
                    if (bagianIndex !== activeIndex) return bagian
                    const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                      if (questionIndex !== index) return q
                      return {
                        ...q,
                        konfigurasi: {
                          ...q.konfigurasi,
                          is_pilihan_lain: false,
                        },
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
                className={'text-red-500'}
              >
                <FaTrash className={'size-5'} />
              </button>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-1.5 mt-1.5">
          <button
            onClick={() => {
              if (!data) return
              const newBagian = data.bagian.map((bagian, bagianIndex) => {
                if (bagianIndex !== activeIndex) return bagian
                const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                  if (questionIndex !== index) return q
                  if (!q.konfigurasi || !('pilihan' in q.konfigurasi)) return q
                  return {
                    ...q,
                    konfigurasi: {
                      ...q.konfigurasi,
                      pilihan: [
                        ...q.konfigurasi.pilihan,
                        {
                          judul_pilihan: '',
                        },
                      ],
                    },
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
            className={'text-sm text-primary'}
          >
            Tambah Opsi
          </button>

          {!no_other && (
            <>
              <p className="text-gray-500 text-sm">Atau</p>
              <button
                onClick={() => {
                  if (!data) return
                  const newBagian = data.bagian.map((bagian, bagianIndex) => {
                    if (bagianIndex !== activeIndex) return bagian
                    const newPertanyaan = (bagian.pertanyaan ?? []).map((q, questionIndex) => {
                      if (questionIndex !== index) return q
                      return {
                        ...q,
                        konfigurasi: {
                          ...q.konfigurasi,
                          is_pilihan_lain: true,
                        },
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
                className={'text-sm text-primary'}
              >
                Tambahkan Opsi Lainnya
              </button>
            </>
          )}
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
    </>
  )
}
