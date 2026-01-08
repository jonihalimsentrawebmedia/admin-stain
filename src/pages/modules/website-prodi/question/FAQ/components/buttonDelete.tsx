import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TbExternalLink } from 'react-icons/tb'

interface Props {
  data: IFAQList
}

export const ButtonDeleteFAQProdi = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/faqs/${data?.id_faq}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-faq-prodi'],
          })
          toast.success(res.data.message || 'Success Tambah F.A.Q')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'p-2 text-white bg-red-500 hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus F.A.Q</p>}
        className={'rounded lg:max-w-4xl'}
        description={'Apakah Anda yakin ingin menghapus F.A.Q ini?'}
        disableOutsideDialog
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className={'text-gray-500'}>Kategori</p>
          <p>{data?.nama_kategori_faq}</p>
          <p className={'text-gray-500'}>Pertanyaan</p>
          <p>{data?.pertanyaan}</p>
          <p className={'text-gray-500'}>Kategori</p>
          <p>{data?.nama_kategori_faq}</p>
          <p className={'text-gray-500'}>Jawaban</p>
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: data?.jawaban ?? '' }}
          />
          <p className={'text-gray-500'}>Dokumen</p>
          <ul className={'flex flex-col gap-1.5'}>
            {data?.dokumens?.map((item, index) => (
              <Link to={item} key={index} target={'_blank'}>
                <li
                  className={
                    'text-primary border-primary p-2 flex items-center border w-fit rounded gap-1.5'
                  }
                  key={index}
                >
                  <TbExternalLink />
                  Dokumen {index + 1}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant={'outline'}
            className={'text-primary hover:text-primary border-primary'}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
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
