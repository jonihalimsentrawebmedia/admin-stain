import { BiX } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FaTrash } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'

interface Props {
  data: ICategoryFAQ
}

export const ButtonDeleteCategoryFaqUnit = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(!loading)
    await AxiosClient.delete(`/unit/kategori-faq/${data?.id_kategori_faq}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['unit-category-faq'],
          })
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
        onClick={() => setOpen(!open)}
        className={'text-white p-2 bg-red-500 hover:bg-red-600 rounded'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Edit Kategori'}
        className={'max-w-2xl rounded'}
      >
        <div className={'grid grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Nama Kategori FAQ</p>
          <p>{data?.nama_kategori_faq}</p>
        </div>
        <div className="flex justify-end gap-2">
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
