import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useQueryClient } from '@tanstack/react-query'
import type { IPublication } from '@/pages/modules/website-utama/lecturer-staff/detail/data/types.ts'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  id_sdm: string
  data: IPublication
}

export const ButtonDeletePublication = (props: Props) => {
  const { id_sdm, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${id_sdm}/publikasi/${data?.id_publikasi}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
          toast.success(res.data.message || 'Success')
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
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Ubah Publikasi'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-3xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Judul Publiaksi</p>
          <p>{data?.judul_publikasi}</p>
          <p className="text-gray-500">Jenis Publiaksi</p>
          <p>{data?.jenis_publikasi}</p>
          <p className="text-gray-500">Tanggal Terbit</p>
          <p>{data?.tanggal_terbit}</p>
          {/*<p>{data?.tanggal_terbit ? format(data?.tanggal_terbit, 'dd-MM-yyyy') : ''}</p>*/}
          <p className="text-gray-500">URL</p>
          <Link to={data?.url_jurnal}>
            <Button variant={'outline'} className="text-primary hover:text-primary border-primary">
              Link URL
            </Button>
          </Link>
          <p className="text-gray-500">Penulis</p>
          <ul className={'list-disc pl-4'}>
            {data?.penulis?.map((item, index) => (
              <li key={index}>{item?.nama_penulis}</li>
            ))}
          </ul>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              onClick: () => setOpen(!open),
              label: 'Batal',
            },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
