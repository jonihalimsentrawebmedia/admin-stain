import { useState } from 'react'
import type { ExpandedState } from '@tanstack/react-table'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ButtonAddSideMenu from './components/buttonAdd'
import { UseGetListModule, UseGetSideMenu } from './hooks'
import { ColumnsSideMenu } from './data/columns'
import { DataTableRecursive } from './tableRecursif'

const SideMenuView = () => {
  const [idModules, setIdModules] = useState('1')
  const { modules, loading: loadingModules } = UseGetListModule()
  const { menu, loading } = UseGetSideMenu(idModules)
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const columns = ColumnsSideMenu({ menu, idModules })

  return (
    <div className="space-y-5">
      <ButtonTitleGroup
        label={'Side Menu'}
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddSideMenu menu={menu} idModules={idModules} />,
          },
        ]}
      />

      <div className="flex justify-end">
        <SelectFilter
          label="Modul"
          options={modules.map((item) => ({ value: item.id_module, label: item.nama_module }))}
          valueParam={idModules}
          loading={loadingModules}
          selectClassName="text-black lg:min-w-[200px]!"
          fx={(value: string) => {
            if (value) setIdModules(value)
          }}
        />
      </div>

      <DataTableRecursive
        data={menu}
        columns={columns}
        loading={loading}
        expanded={expanded}
        setExpanded={setExpanded}
        getRowId={(row) => row.id_menu}
      />
    </div>
  )
}

export default SideMenuView
