import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ResolverGuestBook, type TResolverGuestBook } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import FormGustBook from '@/pages/modules/E-Office/gustbook/compnent/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateGustBook = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverGuestBook>({
    resolver: zodResolver(ResolverGuestBook),
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverGuestBook) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/buku-tamu', {
      ...value,
      tanggal_kunjungan: new Date(value.tanggal_kunjungan).toISOString(),
    })
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Success')
          navigate('/modules/e-office/guestbook/guestbook-list')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div>
        <ButtonTitleGroup isBack label={'Tambah Buku Tamu'} buttonGroup={[
          { type: 'custom', element: <ButtonGoToGuide titleGuide={'Tambah Buku Tamu'} valueGuide="E_OFFICE_GUESTBOOK" /> },
        ]} />
        <FormGustBook loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreateGustBook
