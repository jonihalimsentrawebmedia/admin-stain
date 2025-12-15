import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalendarAcademicDetailViewModel from './CalendarAcademicDetailViewModel'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'
import useGetAcademicYearActivity from '../controller/useGetAcademicYearActivity'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddActivity from './components/ButtonAddActivity'

const CalendarAcademicDetailView = () => {
  const { field, form, columns } = CalendarAcademicDetailViewModel()
  const { academicActivityList, loading } = useGetAcademicYearActivity()
 
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddActivity nama_tahun_akademik={form.watch('nama_tahun_akademik')} />,
          },
        ]}
        label="Rincian Kegiatan Kalender Akademik"
        isBack
      />
      <CardInput title="Informasi Kalender Akademik">
        <DetailField data={field} form={form} />
      </CardInput>
      {academicActivityList.length == 0 ? (
        <div className="text-red-500 italic">Belum ada kegiatan</div>
      ) : (
        <TableCustom
          columns={columns}
          data={academicActivityList}
          isShowPagination={false}
          isShowFilter={false}
          loading={loading}
        />
      )}
    </div>
  )
}

export default CalendarAcademicDetailView
