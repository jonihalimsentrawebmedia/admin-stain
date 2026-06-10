import FormCreateLetterCustomize from '@/pages/modules/E-Office/Letter-Generation/create-letter/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const CreateLetterByTemplate = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<any>()

  const HandleSave = async (value: any) => {
    setLoading(true)
    console.log(value)
  }
  return (
    <>
      <div>
        <FormCreateLetterCustomize form={form} loading={loading} HandleSave={HandleSave} />
      </div>
    </>
  )
}
export default CreateLetterByTemplate
