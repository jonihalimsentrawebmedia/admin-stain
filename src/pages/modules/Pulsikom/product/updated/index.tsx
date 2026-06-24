import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { ResolverProduct, type TResolverProduct } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { FormProduct } from '../component/form.tsx'
import { UseGetProductDetail } from '@/pages/modules/Pulsikom/product/hooks'

export const UpdatedProduct = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')

  const form = useForm<TResolverProduct>({
    resolver: zodResolver(ResolverProduct),
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const { detail } = UseGetProductDetail((id as string) ?? '')

  useEffect(() => {
    if (detail) {
      form.reset({
        url_gambar: detail?.url_gambar,
        nama_produk: detail?.nama_produk,
        urutan: detail?.urutan,
        deskripsi_lengkap: detail?.deskripsi_lengkap,
      })
    }
  }, [detail])

  const HandleSave = async (value: TResolverProduct) => {
    setLoading(true)
    await AxiosClient.put(`/pusilkom/produk/${id}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          if (from === 'detail') {
            navigate('/modules/pulsikom/products/detail/' + id)
          } else {
            navigate('/modules/pulsikom/products')
          }
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormProduct title={'Edit Produk'} form={form} loading={loading} HandleSave={HandleSave} />
    </>
  )
}
