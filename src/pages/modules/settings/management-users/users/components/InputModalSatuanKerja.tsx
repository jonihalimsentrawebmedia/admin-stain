import Select, { type StylesConfig } from 'react-select'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
export const customStylesSelect: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderColor: '#CECECE', // hijau
    boxShadow: state.isFocused ? '0 0 0 1px #22c55e' : 'none',
    '&:hover': { borderColor: '#CECECE' },
    borderRadius: '8px',
    minHeight: '48px',
    paddingLeft: '4px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
    fontSize: '16px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#666',
    fontSize: '16px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#CECECE', // hijau
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    backgroundColor: '#fff',
    '&:hover': { backgroundColor: '#F5FFFA' },
    // zIndex: 99,
  }),
  option: (provided, state) => ({
    ...provided,
    // Mengubah background saat item diklik/terpilih (isSelected)
    // atau saat kursor di atasnya (isFocused)
    backgroundColor: state.isSelected
      ? '#0E874A' // Hijau gelap saat aktif/selected
      : state.isFocused
        ? '#e8f5e9' // Hijau sangat muda saat hover/focus
        : '#fff',

    // Mengubah warna teks agar tetap terbaca
    color: state.isSelected ? '#fff' : '#333',

    '&:active': {
      backgroundColor: '#0E874A',
      color: '#fff', // Warna saat ditekan mouse
    },
  }),
}
interface Props {
  setValue: any
  value: any
  kelompok: string
  idParent?: string
  label: string
}
const InputModalSatuanKerja = ({ setValue, value, kelompok, idParent, label }: Props) => {
  const { loading, satuanOrganisasi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: kelompok,
    idParent: idParent,
  })
  const options = satuanOrganisasi.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
      title: item.singkatan,
    }
  })
  return (
    <div className="flex gap-4 items-center">
      <div className="min-w-[200px] max-w-[200px] w-full text-wrap text-[#999999]">{label}</div>
      <Select
        styles={customStylesSelect}
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
