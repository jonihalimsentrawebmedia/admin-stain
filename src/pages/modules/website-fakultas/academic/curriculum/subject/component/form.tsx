import type { UseFormReturn } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import { UseGetGroupOrganizationFlexible } from '@/pages/modules/website-prodi/select-prodi/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { SubjectResolverType } from '@/pages/modules/website-prodi/curriculum/suject-detail/data/resolver.tsx'

interface Props {
  form: UseFormReturn<SubjectResolverType>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: SubjectResolverType) => void
}

export const FormSubjectCurriculum = (props: Props) => {
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
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-4'}>
          <SelectBasicInput
            form={form}
            name={'id_universitas'}
            placeholder={'Pilih Universitas digunakan'}
            selectClassName={'z-50'}
            label={'Universitas'}
            isRow
            isDisabled
            data={
              university?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />

          <SelectBasicInput
            form={form}
            name={'id_fakultas'}
            placeholder={'Pilih Fakultas'}
            selectClassName={'z-40'}
            label={'Fakultas'}
            isRow
            isDisabled
            data={
              faculty?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />

          <SelectBasicInput
            form={form}
            name={'id_prodi'}
            selectClassName={'z-30'}
            placeholder={'Pilih Program Studi'}
            label={'Prodi'}
            isRow
            isDisabled
            data={
              prodi?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />

          <TextInput
            form={form}
            name={'tahun'}
            label={'Tahun Ke'}
            placeholder={'Tahun'}
            inputClassName={'disabled:bg-gray-200'}
            isRow
            isDisabled
          />

          <TextInput
            form={form}
            name={'semester'}
            label={'Semester'}
            placeholder={'Semester'}
            inputClassName={'disabled:bg-gray-200'}
            isRow
            isDisabled
          />
          <TextInput
            form={form}
            name={'nama_mata_kuliah'}
            label={'Nama Mata Kuliah'}
            placeholder={'Nama Mata Kuliah'}
            isRow
          />
          <TextInput
            form={form}
            name={'sks'}
            label={'SKS'}
            placeholder={'SKS'}
            type={'number'}
            isNumber
            isRow
            isRequired
          />

          <InputRadio
            form={form}
            name={'jenis_mata_kuliah'}
            label={'Jenis Mata Kuliah'}
            data={[
              { label: 'Wajib', value: 'WAJIB' },
              { label: 'Pilihan', value: 'PILIHAN' },
            ]}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
