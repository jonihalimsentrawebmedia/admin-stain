import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetTypeLetters } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCreateLetterByType } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/columns.tsx'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import { useEffect } from 'react'

const CreateLetterByTypePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('kategori_jenis_surat')

  const { letterType, meta, loading } = UseGetTypeLetters({
    page,
    limit,
    search,
    category: category ?? '',
  })

  const columns = ColumnsCreateLetterByType()
  const navigate = useNavigate()

  useEffect(() => {
    if (!category) {
      const params = new URLSearchParams(window.location.search)
      params.set('kategori_jenis_surat', 'MAHASISWA')
      navigate(`?${params.toString()}`)
    }
  }, [category])

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Buat Surat'} buttonGroup={[]} />
        <FilterSelect
          className={'w-1/4'}
          placeholder={'Cari Kelompok Jenis Surat'}
          label={'Kelompok Jenis Surat'}
          name={'kategori_jenis_surat'}
          data={['MAHASISWA', 'DOSEN', 'PEGAWAI', 'UMUM'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
        {category ? (
          <TableCustom
            isShowFilter={false}
            tdClassName={'bg-white'}
            thClassName={'bg-primary text-white'}
            data={letterType}
            columns={columns}
            loading={loading}
            meta={meta}
          />
        ) : (
          <>
            <div>
              <p className="text-blue-500 font-semibold text-xl">
                Pilih Kelompok Jenis Surat Terlebih Dahulu
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CreateLetterByTypePage
