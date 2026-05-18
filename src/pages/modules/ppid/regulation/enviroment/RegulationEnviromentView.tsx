import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'

import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import RegulationEnviromentViewModel from './RegulationEnviromentViewModel'
import useGetRegulationEnviroment from './controller/useGetRegulationEnviroment'
import ButtonAddDocument from '../../information-public/components/button/ButtonAddDocument'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetPPIDSession } from '@/pages/modules/ppid/hooks'

const RegulationEnviromentView = () => {
  const { columns } = RegulationEnviromentViewModel()
  const { document, loading, meta, title } = useGetRegulationEnviroment({})
  const { session } = UseGetPPIDSession()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonGoToGuide
                titleGuide={`Regulasi Mengenai Keterbukaan Informasi di Lingkungan ${session?.nama_universitas}`}
                valueGuide="PPID_REGULASI_LINGKUNGAN"
              />
            ),
          },
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: (
              <ButtonAddDocument
                keyLinkPost="ppip-regulation-enviroment"
                linkPost="/unit-ppid/regulasi-lingkungan-dokumen"
                title="Dokumen"
                titleField={title}
                idCategory={undefined}
                idName="id_kategori"
              />
            ),
          },
        ]}
        label={`Regulasi Mengenai Keterbukaan Informasi di Lingkungan ${session?.nama_universitas}`}
      />
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
        data={document}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default RegulationEnviromentView
