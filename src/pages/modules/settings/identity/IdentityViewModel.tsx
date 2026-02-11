import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useGetIdentity from './controller/useGetIdentity'
import usePutIdentity from './controller/usePutIdentity'

const IdentityViewModel = () => {
  const [isEdit, setIsEdit] = useState(false)
  const formDetail = useForm()
  const { identity, loading: loadingDetail } = useGetIdentity()
  const { form, handleSave, loading } = usePutIdentity({
    setIsEdit: setIsEdit,
  })
  const field = [
    {
      name: 'nama',
      label: 'Nama',
    },
    {
      name: 'logo',
      label: 'Logo',
      component: <img alt="gambar-identity" className="h-[100px]" src={formDetail.watch('logo')} />,
    },
    {
      name: 'background',
      label: 'Background',
      component: (
        <img alt="background-identity" className="h-[200px]" src={formDetail.watch('background')} />
      ),
    },
  ]

  useEffect(() => {
    if (identity) {
      formDetail.reset({
        ...identity,
      })
      form.reset({
        ...identity,
      })
    }
  }, [identity])
  return {
    loadingDetail,
    loading,
    form,
    formDetail,
    handleSave,
    field,
    isEdit,
    setIsEdit,
  }
}

export default IdentityViewModel
