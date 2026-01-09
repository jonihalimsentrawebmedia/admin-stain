import type { UseFormReturn } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetGroupOrganizationFlexible } from '@/pages/modules/website-prodi/select-prodi/hooks'
import type { CurriculumResolverType } from '../data/resolver'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<CurriculumResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: CurriculumResolverType) => void
}

export const FormCurriculumProdi = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props

  const { dataSatuan: university } = UseGetGroupOrganizationFlexible({ kelompok: 'UNIVERSITAS' })
  const { dataSatuan: faculty } = UseGetGroupOrganizationFlexible({
    kelompok: 'FAKULTAS',
  })
  const { dataSatuan: prodi } = UseGetGroupOrganizationFlexible({
    kelompok: 'PRODI',
  })

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <SelectBasicInput
            name={'id_universitas'}
            form={form}
            label={'Universitas'}
            placeholder={'Universitas'}
            data={university?.map((row) => ({
              label: row?.nama,
              value: row?.id_satuan_organisasi,
            }))}
            isDisabled
            isRow
          />
          <SelectBasicInput
            name={'id_fakultas'}
            form={form}
            label={'Fakultas'}
            placeholder={'fakultas'}
            data={faculty?.map((row) => ({
              label: row?.nama,
              value: row?.id_satuan_organisasi,
            }))}
            isDisabled
            isRow
          />
          <SelectBasicInput
            name={'id_prodi'}
            form={form}
            label={'Program Studi'}
            placeholder={'Program Studi'}
            data={prodi?.map((row) => ({
              label: row?.nama,
              value: row?.id_satuan_organisasi,
            }))}
            isDisabled
            isRow
          />

          <TextInput
            form={form}
            name={'nama_kurikulum'}
            label={'Nama Kurikulum'}
            placeholder={'Nama Kurikulum'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'lama_kuliah'}
            label={'Lama Kuliah'}
            placeholder={'Lama Kuliah'}
            type={'number'}
            isNumber
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
