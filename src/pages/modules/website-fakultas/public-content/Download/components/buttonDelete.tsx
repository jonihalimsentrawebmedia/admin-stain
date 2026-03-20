import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { TbExternalLink } from 'react-icons/tb'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { BiX } from 'react-icons/bi'
import { useQueryClient } from '@tanstack/react-query'
import type { IDownload } from '@/pages/modules/website-utama/public-content/download/types'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  data: IDownload
}

export const ButtonDeleteFileDownloadFaculty = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/fakultas/downloads/${data?.id_download}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Download')
          queryClient.invalidateQueries({ queryKey: ['download-faculty'] })
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
        className={'rounded p-1.5 bg-red-500 text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Download</p>}
        description={'Apakah anda yakin untuk menghapus download ini?'}
        className={'lg:max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p>Nama Berkas</p>
          <p>{data?.nama_berkas}</p>
          <p>Kategori</p>
          <p>{data?.nama_kategori_berkas}</p>
          <p>Buka Berkas</p>
          <Link to={data?.is_link_drive ? data?.link_drive || '#' : data?.file_url || '#'}>
            <Button
              className={'border border-primary text-primary hover:text-primary'}
              variant={'outline'}
            >
              <TbExternalLink />
              Buka Berkas
            </Button>
          </Link>

          <Form {...form}>
            <form className="my-2 col-span-2">
              <TextInput
                form={form}
                name={'validator'}
                label={
                  <p className={'text-red-500'}>
                    To confirm, type <b>“DELETE”</b>
                  </p>
                }
              />
            </form>
          </Form>

          <div className="flex items-center justify-end col-span-2 gap-2">
            <Button
              className={'text-primary border border-primary hover:text-primary'}
              onClick={() => setOpen(!open)}
              variant={'outline'}
            >
              <BiX />
              Batal
            </Button>
            <Button
              disabled={loading}
              className={'bg-red-500 hover:bg-red-600 text-white'}
              onClick={HandlerDelete}
            >
              <FaTrash />
              Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
