import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import Search from '@/components/common/table/Search'
import { useMobile } from '@/utils/useMobile'
import { useState } from 'react'
import Select from 'react-select'

import InputModalSatuanKerja, { customStylesSelect } from './InputModalSatuanKerja'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
import { Checkbox } from '@/components/ui/checkbox'

import { Save, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { UseFormReturn } from 'react-hook-form'
interface Props {
  form: UseFormReturn<any>
}
const InputSatuanKerja = ({ form }: Props) => {
  const { isMobile } = useMobile()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [valueKelompok, setValueKelompok] = useState({
    value: 'UNIVERSITAS',
    label: 'Universitas',
  })
  const [tempValueSatuanKerja, setTempValueSatuanKerja] = useState<
    {
      name: string
      value: string
    }[]
  >([])

  const [valueUniv, setValueUniv] = useState({
    value: '',
    label: 'Semua',
  })
  const [valueFakultas, setValueFakultas] = useState({
    value: '',
    label: 'Semua',
  })
  const [valueSatuanKerja, setValueSatuanKerja] = useState<
    {
      name: string
      value: string
    }[]
  >([])
  const { satuanOrganisasi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: valueKelompok.value,
    searchFilter: search,
    idParent: valueKelompok.value == 'PRODI' ? valueFakultas.value : valueUniv.value,
  })
  
  const optionKelompok = [
    {
      value: 'UNIVERSITAS',
      label: 'Universitas',
    },
    {
      value: 'FAKULTAS',
      label: 'Fakultas',
    },
    {
      value: 'PRODI',
      label: 'Prodi',
    },
    {
      value: 'UNIT',
      label: 'Unit',
    },
    {
      value: 'LEMBAGA',
      label: 'Lembaga',
    },
    {
      value: 'UKK_UKM',
      label: 'Ukk_ukm',
    },
    {
      value: 'REKTORAT',
      label: 'Rektorat',
    },
    {
      value: 'BIRO',
      label: 'Biro',
    },
    {
      value: 'UPT',
      label: 'Upt',
    },
  ]
  
  const showUniv =
    valueKelompok.value == 'FAKULTAS' ||
    valueKelompok.value == 'UNIT' ||
    valueKelompok.value == 'LEMBAGA' ||
    valueKelompok.value == 'PRODI'
  return (
    <>
      <div
        className={`${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] flex-row items-center gap-5'}`}
      >
        <div className={'text-gray-600'}>Satuan Kerja</div>

        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setOpen(true)
              setTempValueSatuanKerja(valueSatuanKerja)
              if (valueSatuanKerja.length == 0) {
                setValueKelompok({
                  value: 'UNIVERSITAS',
                  label: 'Universitas',
                })
              }
            }}
          >
            <Search placeholder="Klik untuk mencari " position="end" className="lg:max-w-[300px]" />
          </div>
          {!open && (
            <div className="mt-4 space-y-2">
              {valueSatuanKerja.map((item, index) => (
                <div className="border-r flex gap-1 items-center pr-2">
                  <div>{item.name}</div>
                  <Trash2
                    className="size-4 text-red-500 cursor-pointer"
                    onClick={() => {
                      const temp = [...valueSatuanKerja]
                      temp.splice(index, 1)
                      setValueSatuanKerja(temp)
                      form.setValue(
                        'satuan_kerja',
                        temp.map((item) => item.value)
                      )
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DialogCustom
        open={open}
        setOpen={() => {
          setOpen(false)
          setValueSatuanKerja(tempValueSatuanKerja)
        }}
        title="Cari Satuan Kerja"
        className="min-h-[80%]"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <div className="min-w-[200px] max-w-[200px] w-full text-wrap text-[#999999]">
              Satker Dipilih
            </div>
            {valueSatuanKerja.length == 0 ? (
              <div className="text-red-500">Belum memilih</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {valueSatuanKerja.map((item, index) => (
                  <div className="border-r flex gap-1 items-center pr-2">
                    <div>{item.name}</div>
                    <Trash2
                      className="size-4 text-red-500 cursor-pointer"
                      onClick={() => {
                        const temp = [...valueSatuanKerja]
                        temp.splice(index, 1)
                        setValueSatuanKerja(temp)
                        form.setValue(
                          'satuan_kerja',
                          temp.map((item) => item.value)
                        )
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <div className="min-w-[200px] max-w-[200px] w-full text-wrap text-[#999999]">
              Kelompok
            </div>
            <Select
            styles={customStylesSelect}
              onChange={(e: any) => {
                setValueKelompok(e)
              }}
              placeholder="Kelompok"
              options={optionKelompok}
              value={valueKelompok}
              className=" w-full"
            />
          </div>
          {showUniv && (
            <InputModalSatuanKerja
              setValue={(e: any) => {
                setValueUniv(e)
              }}
              value={valueUniv}
              kelompok="UNIVERSITAS"
              label="Universitas/PT Asal"
            />
          )}
          {valueKelompok.value == 'PRODI' && (
            <InputModalSatuanKerja
              setValue={(e: any) => {
                setValueFakultas(e)
              }}
              value={valueFakultas}
              kelompok="FAKULTAS"
              label="Fakultas Asal"
              idParent={valueUniv.value == '' ? undefined : valueUniv.value}
            />
          )}

          <div className="p-4 border-primary  border bg-[#F5FFFA] text-primary rounded-lg">
            <Search
              placeholder="Cari"
              className="w-full"
              onSearch={(e) => {
                setSearch(e)
              }}
            />
            <div className="grid grid-cols-1   gap-2 mt-4 ">
              {satuanOrganisasi.map((item, index) => (
                <div key={'list-satuan-kerja' + index} className="flex h-fit gap-2 items-center">
                  <Checkbox
                    id={item.id_satuan_organisasi}
                    onCheckedChange={(e) => {
                      console.log(e)
                      if (e) {
                        const temp = [
                          ...valueSatuanKerja,
                          {
                            name: item.nama,
                            value: item.id_satuan_organisasi,
                          },
                        ]
                        setValueSatuanKerja(temp)
                        form.setValue(
                          'satuan_kerja',
                          temp.map((item) => item.value)
                        )
                      } else {
                        const temp = [...valueSatuanKerja].filter(
                          (itemFil) => itemFil.value !== item.id_satuan_organisasi
                        )
                        setValueSatuanKerja(temp)
                        form.setValue(
                          'satuan_kerja',
                          temp.map((item) => item.value)
                        )
                      }
                    }}
                    checked={
                      valueSatuanKerja.filter(
                        (itemFil) => itemFil.value == item.id_satuan_organisasi
                      ).length !== 0
                    }
                  />
                  <label htmlFor={item.id_satuan_organisasi}>
                    {valueKelompok.value == 'UNIVERSITAS' ? (
                      item.nama
                    ) : valueKelompok.value == 'PRODI' ? (
                      <>
                        <span className="text-primary">{item.singkatan_universitas}</span>{' '}
                        <span className="text-[#444]">{'>'}</span>{' '}
                        <span className="text-primary">{item.singkatan_fakultas??"-"}</span>{' '}
                        <span className="text-[#444]">
                          {'>'}
                          {item.nama??"-"}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-primary">{item.singkatan_universitas}</span>{' '}
                        <span className="text-[#444]">
                          {' '}
                          {'>'} {item.nama}
                        </span>
                      </>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end items-center">
            <Button
              className="border-primary text-primary bg-white hover:text-primary"
              variant={'outline'}
              onClick={(e) => {
                e.preventDefault()

                setValueSatuanKerja(tempValueSatuanKerja)
                form.setValue(
                  'satuan_kerja',
                  tempValueSatuanKerja.map((item) => item.value)
                )
                setOpen(false)
              }}
            >
              <X />
              Batal
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                form.setValue(
                  'satuan_kerja',
                  valueSatuanKerja.map((item) => item.value)
                )
                setOpen(false)
              }}
              className="border-primary text-white bg-primary hover:text-white hover:bg-primary/80"
            >
              <Save />
              Save
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default InputSatuanKerja
