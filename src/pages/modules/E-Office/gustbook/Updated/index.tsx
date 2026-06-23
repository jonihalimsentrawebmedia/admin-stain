import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ResolverGuestBook, type TResolverGuestBook } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import FormGustBook from '@/pages/modules/E-Office/gustbook/compnent/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailGuestBooks } from '@/pages/modules/E-Office/gustbook/hooks'
import { format } from 'date-fns'

const UpdatedGustBook = () => {
  const { id } = useParams()
  const { guestBook } = UseGetDetailGuestBooks(id as string)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverGuestBook>({
    resolver: zodResolver(ResolverGuestBook),
  })

  useEffect(() => {
    if (guestBook) {
      form.reset({
        id_unit: guestBook.id_unit,
        alamat_lengkap: guestBook.alamat_lengkap,
        id_jenis_keperluan: guestBook.id_jenis_keperluan,
        id_tujuan_bertamu: guestBook.id_tujuan_bertamu,
        kota: guestBook.kota,
        nik: guestBook.nik,
        keterangan_bertamu: guestBook.keterangan_bertamu,
        no_hp: guestBook.no_hp,
        nama_lengkap: guestBook.nama_lengkap,
        url_foto: guestBook?.url_foto ?? '',
        tanggal_kunjungan: guestBook?.tanggal_kunjungan
          ? format(guestBook.tanggal_kunjungan, 'yyyy-MM-dd')
          : '',
      })
    }
  }, [guestBook])

  const navigate = useNavigate()
  const HandleSave = async (value: TResolverGuestBook) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/buku-tamu/${id}`, {
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
        <ButtonTitleGroup isBack label={'Edit Buku Tamu'} buttonGroup={[]} />
        <FormGustBook loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default UpdatedGustBook
