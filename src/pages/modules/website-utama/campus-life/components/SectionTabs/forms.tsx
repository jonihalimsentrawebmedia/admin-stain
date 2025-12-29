import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { AccordionCustom } from '@/components/common/accordion'

export const FormIntroduction = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm()

  const HandleSave = async (e: any) => {
    console.log(e)
    setLoading(true)
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Pengantar'}
            buttonGroup={[
              {
                type: 'cancel',
                label: ': Batal Edit',
                onClick: () => {},
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
          <AccordionCustom
            name={'pengantar'}
            title={'Isi'}
            contentClassName={'flex flex-col gap-5'}
          >
            <InputRadio
              form={form}
              isRow
              name={'is_warna_background'}
              label={'Isi Background'}
              data={[
                { label: 'Ya', value: true },
                { label: 'Tidak', value: false },
              ]}
            />
            {form.watch('is_warna_background') ? (
              <TextInput
                name={'warna_background'}
                form={form}
                label={'Warna Background'}
                placeholder={'Warna Background'}
                type={'color'}
                inputClassName={'w-[35px] p-1'}
                isRow
                isRequired
              />
            ) : (
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p>Isi Background</p>
                <p>Tidak Ada</p>
              </div>
            )}
            <RichText form={form} name={'teks_pengantar'} label={'Text Pengantar'} isRow required />
          </AccordionCustom>
        </form>
      </Form>
    </>
  )
}
