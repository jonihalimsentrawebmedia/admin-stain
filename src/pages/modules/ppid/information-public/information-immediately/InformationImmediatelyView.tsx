import TableCustom from '@/components/common/table/TableCustom'
import FormRichEditor from '../components/form/FormRichEditor'
import InformationImmediatelyViewModel from './InformationImmediatelyViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetInformationImmediately from './controller/useGetInformationImmediately'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const InformationImmediatelyView = () => {
  const { informationImmediately, loading, meta } = useGetInformationImmediately()
  const { columns } = InformationImmediatelyViewModel()
  return (
    <div className="flex flex-col gap-4">
      <FormRichEditor
        linkGetData="/unit-ppid/informasi-serta-merta"
        linkPostData="/unit-ppid/informasi-serta-merta"
        queryKeyGetData="/unit-ppid/informasi-serta-merta"
        queryKeyPostData="/unit-ppid/informasi-serta-merta"
        title="Informasi Serta Merta"
      />
      <div className="flex items-center justify-between">
        <div className="text-primary text-2xl font-medium">Daftar Informasi</div>
        <Link to={'/modules/ppid/information-public/information-immediately/add'}>
          <Button variant="outline" className="border-primary text-primary hover:text-primary">
            <Plus /> Tambah Data
          </Button>
        </Link>
      </div>

      <TableCustom
        addFilter={
          <SelectFilter
            isLabelTop
            selectClassName={'min-w-[8rem]'}
            label="Jumlah Data"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        columns={columns}
        data={informationImmediately}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default InformationImmediatelyView
