import Select from 'react-select'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
interface Props {
  setValue: any
  value: any
  kelompok: string
  idParent?: string
  label:string
}
const InputModalSatuanKerja = ({ setValue, value, kelompok, idParent,label }: Props) => {
  const { loading, satuanOrganisasi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: kelompok,
    idParent: idParent,
  })
  const options = satuanOrganisasi.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
      title:item.singkatan
    }
  })
  return (
    <div className="flex gap-4 items-center">
      <div className="min-w-[200px] max-w-[200px] w-full text-wrap text-[#999999]">
       {label}
      </div>
      <Select
        onChange={(e: any) => {
          setValue(e)
        }}
        isLoading={loading}
        placeholder="Kelompok"
        options={[
          {
            label: 'Semua',
            value: '',
          },
          ...options,
        ]}
        value={value}
        className=" w-full"
      />
    </div>
  )
}

export default InputModalSatuanKerja
