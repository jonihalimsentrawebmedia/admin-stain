import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetAcreditation from './controller/useGetAcreditation'
import AcreditationViewModel from './AcreditationViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddAcreditation from './components/ButtonAddAcreditation'
import useGetBgAcreditation from './controller/useGetBgAcreditation'
import { Button } from '@/components/ui/button'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import useGetSatuanOrganisasi from '../../settings/controller/useGetSatuanOrganisasi'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SelectFilter from '@/components/common/filter/SelectFilter'

const AcreditationView = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading, meta, acreditationList } = useGetAcreditation()
  const { columns, goToBackground } = AcreditationViewModel()
  const { background, loading: loadingBg } = useGetBgAcreditation()
  const [idOrganisasi, setIdOrganisasi] = useState('')
  const { satuanOrganisasi: univ } = useGetSatuanOrganisasi({
    isFilter: true,
    kelompok: 'UNIVERSITAS',
  })
  const { satuanOrganisasi: prodi } = useGetSatuanOrganisasi({
    isFilter: true,
    kelompok: 'PRODI',
  })
  const optionsUniv = univ.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
    }
  })
  const optionsProd = prodi.map((item) => {
    return {
      value: item.id_satuan_organisasi,
      label: item.nama,
    }
  })
  const optionsJoin = [
    {
      value: '',
      label: 'Semua',
    },
    ...optionsProd,
    ...optionsUniv,
  ]

  useEffect(() => {
    if (searchParams.get('id_satuan_organisasi_akreditas')) {
      setIdOrganisasi(searchParams.get('id_satuan_organisasi_akreditas') ?? '')
    }
  }, [searchParams.get('id_satuan_organisasi_akreditas')])

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: loadingBg ? (
              <Skeleton className="h-[30px] " />
            ) : background.length == 0 ? (
              <Button
                onClick={goToBackground}
                variant={'outline'}
                className="border border-red-500 text-red-500"
              >
                <IoWarning className="text-red- hover:text-red-500 size-6" />
                Gambar Background Belum Ada
              </Button>
            ) : (
              <Button
                onClick={goToBackground}
                variant={'outline'}
                className="border border-primary text-primary hover:text-primary"
              >
                <Image className="text-primary" />
                Gambar Background
              </Button>
            ),
          },
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddAcreditation />,
          },
        ]}
        label="Akreditasi"
      />
      <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
        <div>Pilih Universitas / Prodi*</div>
        <select
          value={idOrganisasi}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set('id_satuan_organisasi_akreditas', e.target.value)
            if (e.target.value === '') newParams.delete('id_satuan_organisasi_akreditas')
            setSearchParams(newParams)
            setIdOrganisasi(e.target.value)
          }}
          className="border px-4 py-2 "
        >
          {optionsJoin.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      <TableCustom
        tdClassName="whitespace-pre-line"
        columns={columns}
        data={acreditationList}
        loading={loading}
        meta={meta}
        isShowLimit={false}
          addFilter={
          <SelectFilter
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
      />
    </div>
  )
}

export default AcreditationView
