import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { MdInfo } from 'react-icons/md'

export const TracerStudyPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const handleSave = async () => {
    setLoading(true)
    setLoading(false)
    setLoading(false)
  }

  return (
    <>
      <div className={'space-y-5 my-5'}>
        {isEdit ? (
          <>
            <Form {...form}>
              <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(handleSave)}>
                <ButtonTitleGroup
                  label={'Tracer Study'}
                  buttonGroup={[
                    {
                      type: 'cancel',
                      label: 'Batal',
                      onClick: () => setIsEdit(!isEdit),
                    },
                    {
                      type: 'save',
                      label: 'Simpan',
                      isDisabled: loading,
                      onClick: () => {},
                    },
                  ]}
                />
                <TextInput
                  form={form}
                  name={'link_url'}
                  label={'Link URL'}
                  placeholder={'Link URL'}
                  className={'w-1/2 bg-white'}
                  isRow
                  isRequired
                  type={'url'}
                />

                <ButtonForm loading={loading} onCancel={() => setIsEdit(!isEdit)} />
              </form>
            </Form>
          </>
        ) : (
          <>
            <ButtonTitleGroup
              label={'Tracer Study'}
              buttonGroup={[{ type: 'edit', label: 'Edit URL', onClick: () => setIsEdit(!isEdit) }]}
            />

            <div
              className={
                'bg-blue-50 border-blue-500 p-2 text-sm text-blue-500 rounded-full flex items-center gap-2 w-fit border'
              }
            >
              <MdInfo className={'size-5'} />
              Masukkan URL atau link tracer study perguruan tinggi anda.
            </div>
          </>
        )}
      </div>
    </>
  )
}
