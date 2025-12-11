import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DetailActivityViewModel from './DetailActivityViewModel'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'
import useGetActivityDetailList from '../controller/useGetActivityDetailList'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddDetailActivity from './components/ButtonAddDetailActivity'

const DetailActivityView = () => {
  const { field, form, columns, activity } = DetailActivityViewModel()
  const { academicActivityDetailList, loading } = useGetActivityDetailList()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddDetailActivity data={activity} />,
          },
        ]}
        label="Uraian Kegiatan Kalender Akademik"
        isBack
      />
      <CardInput title="Informasi Kalender Akademik">
        <DetailField data={field} form={form} />
      </CardInput>
      {academicActivityDetailList.length == 0 ? (
        <p className='text-red-500 italic'>Belum ada kegiatan</p>
      ) : (
        <TableCustom
          columns={columns}
          data={academicActivityDetailList}
          loading={loading}
          isShowFilter={false}
          isShowPagination={false}
        />
      )}
    </div>
  )
}

export default DetailActivityView
