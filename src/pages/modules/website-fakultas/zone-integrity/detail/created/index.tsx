import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { useNavigate } from 'react-router-dom'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'

export const CreatedSubCategory = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm()

  const HandelSubmit = async (e: any) => {
    setLoading(true)
    console.log(e)
  }

  return (
    <>
      <Form {...form}>
        <form className={'space-y-5'} onSubmit={form.handleSubmit(HandelSubmit)}>
          <SelectBasicInput
            name={'id_kategori'}
            form={form}
            placeholder={'Kategori'}
            data={[]}
            label={'Kategori'}
            selectClassName={'bg-white'}
            isRequired
            isRow
          />

          <TextInput
            form={form}
            name={'nama_kategori'}
            label={'Nama Kategori'}
            placeholder={'Masukkan Nama Kategori'}
            isRequired
            isRow
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} required isRow />

          <ButtonForm loading={loading} onCancel={() => navigate(-1)} />
        </form>
      </Form>
    </>
  )
}
