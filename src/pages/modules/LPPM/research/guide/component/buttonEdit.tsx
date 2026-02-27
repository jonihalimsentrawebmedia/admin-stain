import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { CategoryGuideResolver, type SchemaGuideCategory } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormResearchGuideCategory } from './form'
import type { IGUideCategory } from '../data/types'
import { HiPencil } from 'react-icons/hi'

interface props {
  data?: IGUideCategory
}

export const ButtonEditGuideCategory = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaGuideCategory>({
    resolver: zodResolver(CategoryGuideResolver),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        nama_kategori: data?.nama_kategori,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const HandleAddPlanning = async (e: SchemaGuideCategory) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/buku-panduan-kategori/${data?.id_buku_panduan_kategori}`, e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kategori')
          queryClient.invalidateQueries({
            queryKey: ['guide-category'],
          })
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kategori')
        setLoading(false)
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
        title={'Tambah Kategori'}
        className={'rounded max-w-2xl'}
      >
        <FormResearchGuideCategory
          form={form}
          loading={loading}
          setOpen={setOpen}
          open={open}
          handleSubmit={HandleAddPlanning}
        />
      </DialogCustom>
    </>
  )
}
