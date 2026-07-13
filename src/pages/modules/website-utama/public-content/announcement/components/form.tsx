import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { AnnouncementType } from '@/pages/modules/website-utama/public-content/announcement/data/resolver.tsx'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadDocument } from '@/pages/modules/website-utama/public-content/announcement/components/uploadDocument.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { TreeCheckboxController } from '@/pages/modules/website-utama/public-content/component/TreeCheckbox.tsx'
import { UseGetTreeData } from '@/pages/modules/website-utama/public-content/component/hooks.tsx'

interface Props {
  form: UseFormReturn<AnnouncementType>
  HandleSave: (e: AnnouncementType) => void
  loading: boolean
  is_website_main?: boolean
  label?: string
}

export const AnnouncementForm = (props: Props) => {
  const { label, form, HandleSave, is_website_main } = props
  const { treeNodes } = UseGetTreeData()

  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 py-5'}>
          <ButtonTitleGroup
            label={label ?? 'Tulis Pengumuman'}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />

          <TextAreaInput
            label={'Judul Pengumuman'}
            className={'items-start'}
            placeholder={'Judul Pengumuman'}
            name={'judul_pengumuman'}
            form={form}
            isRequired
            isRow
          />
          <RichText form={form} name={'isi_pengumuman'} label={'Isi Pengumuman'} required />

          <TextInput
            label={'Penulis'}
            placeholder={'Penulis'}
            isRow
            isRequired
            name={'penulis'}
            form={form}
          />

          <UploadDocument form={form} name={'dokumens'} label={'Dokumen'} required />

          {is_website_main && (
            <>
              <Separator />
              <div className="p-4 bg-white w-full space-y-4">
                <p className="text-lg sm:text-2xl font-semibold text-primary">Unit Kerja Terkait</p>
                <TreeCheckboxController
                  name="list_unit"
                  control={form.control}
                  data={treeNodes}
                  rules={{ required: 'Pilih minimal satu' }}
                  showSelectAll
                  selectAllLabel={'Pilih Semua'}
                />
              </div>
            </>
          )}

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                label: 'Batal',
                type: 'cancel',
                onClick: () => {
                  navigate(-1)
                },
              },
              { label: 'Simpan', type: 'save', onClick: () => {} },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
