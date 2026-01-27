import DetailField from '@/components/common/field/DetailField'

interface Props {
  form: any
}

const CardPengajuan = ({ form }: Props) => {
  const fieldIdentitas = [
    {
      label: 'Tanggal Diajukan',
      name: 'tanggal',
    },
    {
      label: 'Nama',
      name: 'nama',
    },
    {
      label: 'Jabatan',
      name: 'jabatan',
    },
    {
      label: 'Unit/Satuan Kerja',
      name: 'unit',
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
