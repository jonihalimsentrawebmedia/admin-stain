import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { UseGetProdiSession } from '@/pages/modules/website-prodi/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISubjectDetail } from '@/pages/modules/website-prodi/curriculum/suject-detail/data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: ISubjectDetail
}

export const ButtonDeleteSubject = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetProdiSession()
  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/fakultas/mata-kuliah/${data?.id_mata_kuliah}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah mata kuliah')
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['subject-detail'],
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
        onClick={() => setOpen(!open)}
        className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-4xl rounded'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Mata Kuliah</p>}
        description={'Apakah anda yakin untuk menghapus data matakuliah kurikulum ini?'}
      >
        <div>
          <div className="grid grid-cols-[15rem_1fr] gap-2.5">
            <p className="text-gray-500">Universitas/PT</p>
            <p>{session?.nama_universitas}</p>
            <p className="text-gray-500">Fakultas</p>
            <p>{session?.nama_fakultas}</p>
            <p className="text-gray-500">Program Studi</p>
            <p>{session?.nama_prodi}</p>
            <p className="text-gray-500">Tahun</p>
            <p>{data?.tahun}</p>
            <p className="text-gray-500">Semester</p>
            <p>{data?.semester}</p>
            <p className="text-gray-500">Nama Mata Kuliah*</p>
            <p>{data?.nama_mata_kuliah}</p>
            <p className="text-gray-500">SKS</p>
            <p>{data?.sks}</p>
            <p className="text-gray-500">Jenis Mata Kuliah*</p>
            <p>{data?.jenis_mata_kuliah}</p>
          </div>
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              { type: 'cancel', isDisabled: loading, onClick: () => setOpen(false) },
              {
                type: 'custom',
                element: (
                  <>
                    <Button variant={'destructive'} disabled={loading} onClick={HandleSave}>
                      <FaTrash /> Hapus
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </DialogCustom>
    </>
  )
}
