import type { UseFormReturn } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'

import type { IActivityDetailTypeForm } from '../../model/resolverActivityDetail'
import TextAreaInput from '@/components/common/form/textAreaInput'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Props {
  form: UseFormReturn<IActivityDetailTypeForm>
  handleSave: (value: IActivityDetailTypeForm) => void
  handleCancel: () => void
  loading: boolean
}
const ActivityDetailForm = ({ form, handleCancel, handleSave, loading }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <TextInput
            form={form}
            name="nama_tahun_akademik"
            label="Nama Tahun Akademik"
            placeholder="Nama Tahun Akademik"
            isRow
            isDisabled
            inputClassName="disabled:bg-gray-300"
          />

          <TextInput
            form={form}
            name="nama_kegiatan"
            label="Nama Utama Kegiatan"
            placeholder="Nama Utama Kegiatan"
            isRow
            isDisabled
            inputClassName="disabled:bg-gray-300"
          />
          <TextInput
            form={form}
            name="uraian_kegiatan"
            label="Uraian Kegiatan"
            placeholder="Uraian Kegiatan"
            isRow
          />
          <TextInput
            form={form}
            name="tanggal_mulai"
            label="Tanggal Mulai*"
            placeholder="Tanggal Mulai*"
            type="date"
            isRow
            inputClassName="max-w-[150px]"
          />
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <TextInput
              form={form}
              name="tanggal_selesai"
              label="Tanggal Selesai*"
              placeholder="Tanggal Selesai*"
              type="date"
              isRow
              min={form.watch('tanggal_mulai')}
              inputClassName="max-w-[150px]"
            />
            <div className="flex gap-2 items-center">
              <Checkbox
                onCheckedChange={() => {
                  form.setValue('tanggal_selesai', form.watch('tanggal_mulai'))
                }}
                name="check"
                id="check"
              />
              <Label htmlFor="check">Kegiatan Berlangsung 1 Hari</Label>
            </div>
          </div>
          <TextAreaInput
            form={form}
            name="keterangan"
            label="Keterangan"
            placeholder="Keterangan Kegiatan"
            isRow
          />
          <ButtonForm loading={loading} onCancel={handleCancel} />
        </div>
      </form>
    </Form>
  )
}

export default ActivityDetailForm
