import DetailField from '@/components/common/field/DetailField'

interface Props {
  form: any
}

const CardPengajuan = ({ form }: Props) => {
  const fieldIdentitas = [
    {
      label: 'Tanggal Diajukan',
      name: 'tanggal_diajukan',
    },
    {
      label: 'Nama',
      name: 'nama_pengaju',
    },
    {
      label: 'Jabatan',
      name: 'level_pengaju',
    },
    {
      label: 'Unit/Satuan Kerja',
      name: 'satuan_kerja',
    },
  ]
  return (
    <div className="p-4 rounded bg-[#F5F9FF] border border-[#70A4F2]">
      <p className="text-[#2769CD]">Identitas Pengajuan</p>
      <DetailField data={fieldIdentitas} form={form} />
    </div>
  )
}

export default CardPengajuan
