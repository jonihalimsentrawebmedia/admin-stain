import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormCodeLetterGenerated from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverCodeLetter, type TResolverCodeLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'

const CreatedCodeLetterGenerated = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<TResolverCodeLetter>({
    resolver: zodResolver(ResolverCodeLetter),
  })

  const HandleSave = async (value: TResolverCodeLetter) => {
    setLoading(true)
    console.log(value)
  }

  return (
    <>
      <div className="bg-white space-y-5">
        <ButtonTitleGroup label={'Tambah Kode Nomor Surat'} buttonGroup={[]} />
        <FormCodeLetterGenerated form={form} loading={loading} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreatedCodeLetterGenerated
