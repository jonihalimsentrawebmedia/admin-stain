import type { UseFormReturn } from 'react-hook-form'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { TResolverEntranceNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import type { INonUktEntrance } from '@/pages/modules/website-utama/cost-education/non-ukt/entrance-list/data/types.ts'

interface props {
  open: boolean
  setOpen: (value: boolean) => void
  loading: boolean
  HandlerSave: (value: TResolverEntranceNonUkt) => void
  form: UseFormReturn<TResolverEntranceNonUkt>
  faculty: SatuanOrganisasiList[]
  prodi: SatuanOrganisasiList[]
  jenjang: EducationalLevelList[]
  entrance: INonUktEntrance[]
}

export const FormEntranceProdiNonUkt = (props: props) => {
  const { form, loading, HandlerSave, open, setOpen, faculty, prodi, jenjang, entrance } = props

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandlerSave)}>
          <SelectBasicInput
            form={form}
            name={'id_fakultas'}
            placeholder={'Pilih Fakultas'}
            label={'Fakultas'}
            isRow
            isRequired
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
            placeholder={'Pilih Prodi'}
            label={'Prodi'}
            isRow
            isRequired
            isDisabled
            data={
              prodi?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
          />
          <SelectBasicInput
            form={form}
            name={'id_jenjang_pendidikan'}
            placeholder={'Pilih Jenjang Pendidikan'}
            label={'Jenjang Pendidikan'}
            isRow
            isRequired
            isDisabled
            data={
              jenjang?.map((row) => ({
                label: row?.nama_jenjang,
                value: row?.id_jenjang,
              })) ?? []
            }
          />
          <SelectBasicInput
            form={form}
            name={'id_jalur_masuk_non_ukt'}
            placeholder={'Pilih Jalur Masuk'}
            label={'Jalur Masuk'}
            isRow
            isRequired
            data={
              entrance?.map((row) => ({
                label: row?.nama_jalur_masuk,
                value: row?.id_jalur_masuk_non_ukt,
              })) ?? []
            }
          />
          <TextInput
            form={form}
            name={'urutan'}
            label={'Urutan'}
            placeholder={'Urutan'}
            type={'number'}
            htmlFor={'urutan'}
            isNumber
            isRow
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
