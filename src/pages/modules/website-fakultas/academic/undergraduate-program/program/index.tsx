import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddProgram } from './component/buttonAdd.tsx'
import { UseGetListProgram } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program/hooks'
import { ColumnsProgramUndergraduate } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const UnderGraduatedProgram = () => {
  const { program, meta, loading } = UseGetListProgram()
  const columns = ColumnsProgramUndergraduate()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddProgram />,
            },
          ]}
          label="International Undergraduate Program  - Daftar Program"
        />

        <TableCustom data={program} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
