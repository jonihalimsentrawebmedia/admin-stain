import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import type { ICategoryDownload } from '@/pages/modules/website-utama/public-content/download/types'

export const ButtonDeleteCategoryDownloadUnit = (data?: ICategoryDownload) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSubmit = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/kategori-berkas/${data?.id_kategori_berkas}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({ queryKey: ['category-download-unit'] })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan.')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 hover:bg-red-600 p-1.5 rounded text-white'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded-md min-w-2xl'}
        width={'450px'}
        open={open}
        setOpen={setOpen}
        title={'Hapus Kategori Berkas?'}
      >
        <div className={'mt-5'}>
          <div className="grid grid-cols-[12rem_1fr] gap-5">
            <p className={'text-gray-500'}>Nama Kategori</p>
            <p>{data?.nama_kategori}</p>
          </div>
          <div className="flex items-center justify-end gap-5">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setOpen(!open)
              }}
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
            >
              <BiX />
              Batal
            </Button>
            <Button variant={'destructive'} disabled={loading} onClick={HandleSubmit}>
              <FaTrash />
              Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
