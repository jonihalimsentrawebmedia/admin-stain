import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IPlanResearchDocument } from '@/pages/modules/LPPM/research/plan/document/data/types.ts'
import { Link } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'

export const ButtonDeleteDocumentResearchPlan = (data: IPlanResearchDocument) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleAddDocument = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lppm/rencana-induk-penelitian/${data?.id_rencana_induk_penelitian}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success tambah dokumen')
          queryClient.invalidateQueries({
            queryKey: ['research-plan-document'],
          })
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
        className={'bg-red-500 text-white hover:bg-red-600 p-1.5 rounded'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Dokumen</p>}
        description={'Apakah anda yakin ingin menghapus dokumen ini?'}
        className={'rounded max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Kategori</p>
          <p>{data?.nama_kategori}</p>
          <p className="text-gray-500">Kategori</p>
          <p>{data?.nama_kategori}</p>
          <p className="text-gray-500">Public</p>
          <p>{data?.public ? 'Public' : 'Tidak Public'}</p>
          <p className="text-gray-500">Jenis</p>
          <p>{data?.jenis}</p>
          <p className="text-gray-500">{data?.jenis === 'URL' ? 'URL' : 'Upload FIle'}?</p>
          <div>
            {data?.jenis === 'URL' ? (
              data?.url
            ) : (
              <Link to={data?.url_file} target={'_blank'}>
                Buka FIle
              </Link>
            )}
          </div>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              label: 'Hapus',
              element: (
                <Button disabled={loading} onClick={HandleAddDocument}>
                  <FaTrash /> Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}
