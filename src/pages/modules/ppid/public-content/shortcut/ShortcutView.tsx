import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ShortcutViewModel from './ShortcutViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import useGetShortcut from './controller/useGetShortcut'

const ShortcutView = () => {
  const { columns } = ShortcutViewModel()
  const { shortcuts, loading, meta } = useGetShortcut({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAdd />,
          },
        ]}
        label="Pintasan"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={shortcuts}
        loading={loading}
        isShowLimit={false}
        meta={meta}
        isShowPagination={false}
      />
    </div>
  )
}

export default ShortcutView
