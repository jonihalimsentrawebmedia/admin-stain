import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ShortcutViewModel from './ShortcutViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import useGetShortcut from './controller/useGetShortcut'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ShortcutView = () => {
  const { columns } = ShortcutViewModel()
  const { shortcuts, loading, meta } = useGetShortcut({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonGoToGuide
                titleGuide={'Konten Publik - Pintasan'}
                valueGuide="PPID_KONTEN_PUBLIK_PINTASAN"
              />
            ),
          },
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
