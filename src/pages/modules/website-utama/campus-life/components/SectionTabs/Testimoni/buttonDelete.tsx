import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  type ITestimonials,
  TestimonialsResolver,
} from '@/pages/modules/website-utama/campus-life/types/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FaTrash } from 'react-icons/fa'
import type { ITestimonialCampusLife } from '@/pages/modules/website-utama/campus-life/types'

interface props {
  data?: ITestimonialCampusLife
}

export const ButtonDeleteTestimonial = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ITestimonials>({
    resolver: zodResolver(TestimonialsResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        foto_url: data.foto_url,
        nama_lengkap: data.nama_lengkap,
        pekerjaan: data.pekerjaan,
        Komentar: data.komentar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/kehidupan-kampus-testimoni/${data?.id_kehidupan_kampus_testimoni}`
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['campus-life-testimonial'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(true)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Testimoni'}
        className={'rounded lg:max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <div className="col-span-2">
            <img src={data?.foto_url} alt="imag" className={'w-[180px] object-contain'} />
          </div>
          <p className="text-gray-500">Nama Lengkap</p>
          <p>{data?.nama_lengkap}</p>
          <p className="text-gray-500">Pekerjaan</p>
          <p>{data?.pekerjaan}</p>
          <p className="text-gray-500">Komentar</p>
          <p>{data?.komentar}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => setOpen(false)}
            variant={'outline'}
            className={'text-primary border-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button variant={'destructive'} disabled={loading} onClick={HandleSave}>
            <FaTrash />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
