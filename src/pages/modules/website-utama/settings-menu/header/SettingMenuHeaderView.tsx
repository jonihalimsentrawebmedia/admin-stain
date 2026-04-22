  import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableSettingMenuHeader from './components/TableSettingMenuHeader'
import ButtonAdd from './components/ButtonAdd'
import ButtonGoToGuide from '../../panduan/components/ButtonGoToGuide'

const SettingMenuHeaderView = () => {
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide='Header' valueGuide="WEBSITE_UTAMA_HEADER" />,
            },
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
