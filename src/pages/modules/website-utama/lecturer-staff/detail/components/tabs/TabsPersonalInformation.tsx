import DetailField from '@/components/common/field/DetailField'
import { type UseFormReturn } from 'react-hook-form'
interface Props{
  form:UseFormReturn<any>
}
const TabsPersonalInformation = ({form}:Props) => {
  const field = [
    {
      label: 'Status*',
      name: 'status',
    },
    {
      label: 'NIP*',
      name: 'nip',
    },
    {
      label: 'NIDN',
      name: 'nidn',
    },
    {
      label: 'Unit Kerja*',
      name: 'nama_unit_kerja',
    },
    {
      label: 'Golongan*',
      name: 'golongan',
    },
    {
      label: 'Jabatan Struktural*',
      name: 'jabatan_struktural',
    },
  ]
  return (
    <div>
    
      <div className="text-2xl text-primary font-medium">Informasi Kepegawaian </div>
      <DetailField data={field} form={form} />
    </div>
  )
}

export default TabsPersonalInformation
