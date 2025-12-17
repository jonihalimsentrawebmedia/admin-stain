import { UploadPasPhoto } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/uploadPasphoto.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import type { PlacemanType } from '../data/resolver'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import useGetGroupRank from '@/pages/modules/settings/reference/group-rank/controller/useGetGroupRank.tsx'
import useGetAcademicRank from '@/pages/modules/settings/reference/academic-rank/controller/useGetAcademicRank.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import Checkbox from '@/components/common/form/checkbox.tsx'
import type { Dispatch, SetStateAction } from 'react'

interface Props {
  form: UseFormReturn<PlacemanType>
  loading: boolean
  HandleSave: (e: PlacemanType) => void
  open: Boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormPlacemanUser = (props: Props) => {
  const { form, loading, HandleSave, open, setOpen } = props

  const { loading: load1, groupRank } = useGetGroupRank()
  const { loading: load2, academicRank } = useGetAcademicRank()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-2'}>
          <UploadPasPhoto
            label={'Foto Profil (4x6)'}
            name={'gambar'}
            form={form}
            required
            placeholder={'Uplaod Foto'}
          />

          <TextInput
            name={'nama_lengkap'}
            form={form}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap beserta gelar'}
            isRequired
            isRow
          />
          <TextInput name={'jabatan'} form={form} label={'Jabatan'} placeholder={'Jabatan'} isRow />
          <TextInput name={'nip'} form={form} label={'NIP'} placeholder={'NIP'} isRow />

          <SelectBasicInput
            label={'Pangkat Golongan'}
            name={'id_pangkat_golongan'}
            form={form}
            placeholder={'Pilih Pangkat Golongan'}
            isDisabled={load1}
            selectClassName={'w-[20rem]'}
            usePortal
            isRow
            data={
              groupRank?.map((row) => ({
                label: row?.nama_golongan,
                value: row?.id_golongan,
              })) ?? []
            }
          />

          <SelectBasicInput
            label={'Pangkat Akademik'}
            name={'id_pangkat_akademik'}
            form={form}
            placeholder={'Pilih Pangkat Akademik'}
            selectClassName={'w-[20rem]'}
            isDisabled={load2}
            usePortal
            isRow
            data={
              academicRank?.map((row) => ({
                label: row?.nama_akademik,
                value: row?.id_akademik,
              })) ?? []
            }
          />

          <div className="flex items-center gap-1.5">
            <TextInput
              name={'email'}
              form={form}
              inputClassName={'lg:min-w-[20rem]'}
              label={'Email'}
              placeholder={'Email'}
              isRow
            />
            <Checkbox name={'show_email_public'} label={'Tampilkan ke public'} form={form} />
          </div>
          <div className="flex items-center gap-1.5">
            <TextInput
              name={'no_hp'}
              form={form}
              inputClassName={'lg:min-w-[20rem]'}
              label={'No. HP'}
              placeholder={'No HP'}
              isRow
            />
            <Checkbox name={'show_no_hp_public'} label={'Tampilkan ke public'} form={form} />
          </div>

          <TextInput
            name={'urutan'}
            inputClassName={'lg:w-[20rem]'}
            form={form}
            label={'Urutan'}
            placeholder={'Urutan'}
            isNumber
            isRow
          />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: (e) => {
                  e.preventDefault()
                  setOpen(!open)
                },
              },
              { isDisabled: loading, label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
