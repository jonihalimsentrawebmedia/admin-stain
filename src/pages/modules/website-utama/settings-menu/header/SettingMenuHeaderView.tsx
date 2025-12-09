import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableSettingMenuHeader from './components/TableSettingMenuHeader'
import ButtonAdd from './components/ButtonAdd'

const SettingMenuHeaderView = () => {
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
        label="Header"
      />
      <TableSettingMenuHeader />
    </div>
  )
}

export default SettingMenuHeaderView
