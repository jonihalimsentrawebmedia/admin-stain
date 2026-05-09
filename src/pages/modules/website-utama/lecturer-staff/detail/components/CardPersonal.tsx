import DetailField from '@/components/common/field/DetailField'
import { type UseFormReturn } from 'react-hook-form'
interface Props {
  form: UseFormReturn<any>
}
const CardPersonal = ({ form }: Props) => {
  const field = [
    {
      label: 'Name',
      name: 'nama',
    },
    {
      label: 'NIK',
      name: 'nik',
    },
    {
      label: 'Tempat Lahir*',
      name: 'tempat_lahir',
    },
    {
      label: 'Tanggal Lahir*',
      name: 'tanggal_lahir',
    },
    {
      label: 'No. HP*',
      name: 'no_hp',
    },
    {
      label: 'Email*',
      name: 'email',
    },
  ]
  return (
    <div className="flex gap-4 flex-col">
      <div className="text-2xl text-primary font-medium">Informasi Pribadi</div>
      <div className="flex gap-4">
        <img
          src={form.watch('gambar_url') ?? '/noimg.png'}
          className="w-[228px] rounded h-[304px] object-cover"
          alt=""
        />
        <DetailField data={field} form={form} />
      </div>
    </div>
  )
}

export default CardPersonal
