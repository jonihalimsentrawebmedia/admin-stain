import { Fragment, useEffect } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import TextInput from '@/components/common/form/TextInput.tsx'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'
import type { INUmberLetterAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/types.ts'
import { toRoman } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'

interface Props {
  form: UseFormReturn<any>
  name: string
  id: string
}

interface ListComponentProps {
  form: UseFormReturn<any>
  data?: INUmberLetterAutomatic
  name: string
}

const ListComponent = ({ form, data, name }: ListComponentProps) => {
  useEffect(() => {
    if (!data) return

    const dateNow = new Date()
    const bulan = dateNow.getMonth() + 1

    form.setValue('kode_depan', data.kode_depan ?? '')
    form.setValue('kode_belakang', data.kode_belakang ?? '')
    form.setValue('bulan', data.is_bulan_romawi ? toRoman(bulan) : String(bulan))
    form.setValue('tahun', String(dateNow.getFullYear()))
    form.setValue('pengisian_no_surat', data.pengisian_no_surat === 'OTOMATIS' ? 'OTOMATIS' : '')
  }, [data, form])

  if (!data) {
    return null
  }

  const isAutoNumber = form.watch('pengisian_no_surat') === 'OTOMATIS'

  const items = [
    {
      order: data.urutan_kode_depan,
      element: (
        <TextInput
          name="kode_depan"
          form={form}
          label="Kode Depan"
          htmlFor="kode_depan"
          placeholder="Kode Depan"
          isDisabled
        />
      ),
    },

    {
      order: data.urutan_posisi_utama_no_surat,
      element: (
        <TextInput
          name={name}
          form={form}
          label="Nomor Surat"
          htmlFor={name}
          placeholder="[Nomor Surat]"
          isDisabled={isAutoNumber}
          type={'number'}
        />
      ),
    },

    {
      order: data.urutan_kode_belakang,
      element: (
        <TextInput
          name="kode_belakang"
          form={form}
          label="Kode Belakang"
          htmlFor="kode_belakang"
          placeholder="Kode Belakang"
          isDisabled
        />
      ),
    },

    ...(data.is_perlu_bulan
      ? [
          {
            order: data.urutan_bulan,
            element: (
              <TextInput
                name="bulan"
                form={form}
                label="Bulan"
                htmlFor="bulan"
                placeholder={data.is_bulan_romawi ? 'Bulan (Romawi)' : 'Bulan'}
                isDisabled
              />
            ),
          },
        ]
      : []),

    ...(data.is_perlu_tahun
      ? [
          {
            order: data.urutan_tahun,
            element: (
              <TextInput
                name="tahun"
                form={form}
                label="Tahun"
                htmlFor="tahun"
                placeholder="Tahun"
                isDisabled
              />
            ),
          },
        ]
      : []),
  ].sort((a, b) => a.order - b.order)

  return (
    <>
      {items.map((item, index) => (
        <Fragment key={index}>{item.element}</Fragment>
      ))}
    </>
  )
}

export const ReturnOrderData = ({ form, name, id }: Props) => {
  const { letterNumber } = UseGetDetailLetterNumberAutomatic(id)

  return (
    <div className="grid grid-cols-5 gap-4">
      <ListComponent form={form} data={letterNumber} name={name} />
    </div>
  )
}
