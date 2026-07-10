import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { INUmberLetterAutomatic } from '../data/types.ts'
import { GenerateLetterCodeNumber } from '@/pages/modules/E-Office/Letter-Generation/code-letter/component/exampleView.tsx'

interface props {
  data: INUmberLetterAutomatic
}

const ButtonDeleteNumberLetterAutomatic = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const result = GenerateLetterCodeNumber({
    kode_depan: data?.kode_depan,
    urutan_kode_depan: data?.urutan_kode_depan,
    kode_belakang: data?.kode_belakang,
    urutan_kode_belakang: data?.urutan_kode_belakang,
    is_bulan: data?.is_perlu_bulan,
    is_bulan_romawi: data?.is_bulan_romawi,
    is_tahun: data?.is_perlu_tahun,
    urutan_bulan: data?.urutan_bulan,
    urutan_nomor_surat: data?.urutan_posisi_utama_no_surat,
    urutan_tahun: data?.urutan_tahun,
  })

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/nomor-surat-otomatis/${data?.id_nomor_surat_otomatis}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-number-automatic'],
          })
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
      <button
        className={'p-1.5 bg-red-500 text-white rounded hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Klasifikasi Surat'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-4'}>
          <p className="text-gray-500 text-sm">Nama Kode Surat</p>
          <p className="text-sm sm:text-base">{data?.nama_nomor_surat}</p>
          <p className="text-gray-500 text-sm">Satuan Kerja</p>
          <p className="text-sm sm:text-base">{data?.nama_satuan_organisasi}</p>
          <p className="text-gray-500 text-sm">Format Surat</p>
          <div className="text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: result ?? '' }} />
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <>
                  <Button variant="destructive" onClick={HandleSave} disabled={loading}>
                    <FaTrash />
                    Hapus
                  </Button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonDeleteNumberLetterAutomatic
