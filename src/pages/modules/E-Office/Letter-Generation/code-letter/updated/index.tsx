import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormCodeLetterGenerated from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverCodeLetter, type TResolverCodeLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailLetterNumberAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/hooks'

const UpdatedCodeLetterGenerated = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const { letterNumber } = UseGetDetailLetterNumberAutomatic(id as string)

  const navigate = useNavigate()
  const form = useForm<TResolverCodeLetter>({
    resolver: zodResolver(ResolverCodeLetter),
  })

  useEffect(() => {
    if (letterNumber) {
      form.reset({
        ...letterNumber,
      })
    }
  }, [letterNumber])

  const HandleSave = async (value: TResolverCodeLetter) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/nomor-surat-otomatis/${id}`, value)
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

export default UpdatedCodeLetterGenerated
