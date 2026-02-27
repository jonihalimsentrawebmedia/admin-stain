import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverGuideBook, type schemaGuideBook } from '../data/resolver'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormDocumentGuideBook } from './form'
import { useParams } from 'react-router-dom'
import type { IGuideBookDocument } from '../data/types'
import { HiPencil } from 'react-icons/hi'

export const ButtonEditDocumentGuideBook = (data: IGuideBookDocument) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const form = useForm<schemaGuideBook>({
    resolver: zodResolver(ResolverGuideBook),
    defaultValues: {
      id_kategori: id ?? '',
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_kategori: data?.id_kategori,
        nama_dokumen: data?.nama_dokumen,
        jenis: data?.jenis,
        urutan: data?.urutan,
        url: data?.url,
        url_file: data?.url_file,
        key_url_file: data?.key_file,
        public: data?.public,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleAddDocument = async (e: schemaGuideBook) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/buku-panduan/${data?.id_buku_panduan}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success tambah dokumen')
          queryClient.invalidateQueries({
            queryKey: ['guide-book'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah dokumen')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Edit Dokumen'}
        className={'rounded max-w-2xl'}
      >
        <FormDocumentGuideBook
          form={form}
          loading={loading}
          setOpen={setOpen}
          open={open}
          handleSubmit={HandleAddDocument}
        />
      </DialogCustom>
    </>
  )
}
