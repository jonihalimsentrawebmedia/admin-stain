import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverLetterClassification,
  type TResolverLetterClassification,
} from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormLetterClassification } from './form.tsx'
import type { ILetterClassification } from '@/pages/modules/E-Office/reference/letter-classification/data/types.ts'

interface props {
  data?: ILetterClassification
  onChildAdded?: (parentId: string | undefined) => void
}

const ButtonAddLetterClassification = (props?: props) => {
  const { data, onChildAdded } = props ?? {}

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterClassification>({
    resolver: zodResolver(ResolverLetterClassification),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_parent_klasifikasi_surat: data?.id_klasifikasi_surat,
        nama_parent: data?.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterClassification) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/klasifikasi-surat', {
      nama: value.nama,
      kode_klasifikasi: value?.kode_klasifikasi,
      id_parent_klasifikasi_surat: value.id_parent_klasifikasi_surat ?? null,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-classification'],
          })
          // Expand the parent row so the newly added child is visible
          onChildAdded?.(data?.id_klasifikasi_surat)
          form.reset()
          setLoading(false)
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      {data ? (
        <Button
          variant={'outline'}
          className={'rounded-full text-primary hover:text-text-primary border-primary'}
          onClick={() => setOpen(!open)}
        >
          Tambah Children
        </Button>
      ) : (
        <Button
          className={'rounded-full text-white hover:text-white'}
          onClick={() => setOpen(!open)}
        >
          <BiPlus />
          Tambah klasifikasi Surat
        </Button>
      )}

      <DialogBasic title={'Tambah klasifikasi Surat'} open={open} setOpen={setOpen}>
        <FormLetterClassification
          loading={loading}
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonAddLetterClassification
