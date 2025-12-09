import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ContentViewModel from './ContentViewModel'
import useGetContent from './controller/useGetContent'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const ContentView = () => {
  const { columns, goToAdd } = ContentViewModel()
  const { contentList, loading, meta } = useGetContent()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: 'Tambah',
            onClick: goToAdd,
            type: 'add',
          },
        ]}
        label="Konten - Sejarah"
        isBack
      />

      <TableCustom
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
        columns={columns}
        data={contentList}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default ContentView
