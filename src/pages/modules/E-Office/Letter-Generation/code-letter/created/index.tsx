import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormCodeLetterGenerated from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverCodeLetter, type TResolverCodeLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreatedCodeLetterGenerated = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const form = useForm<TResolverCodeLetter>({
    resolver: zodResolver(ResolverCodeLetter),
    defaultValues: {
      pengisian_no_surat: 'OTOMATIS',
    },
  })

  console.log(form.formState.errors)

  const HandleSave = async (value: TResolverCodeLetter) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/nomor-surat-otomatis', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate('/modules/e-office/letter-generation/code-letter')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
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
