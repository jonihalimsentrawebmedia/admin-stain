import { useCallback, useState } from 'react'
import type { ExpandedState } from '@tanstack/react-table'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddLetterClassification from './component/buttonAdd.tsx'
import { UseGetLetterClassification } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsLetterClassification } from './data/columns.tsx'
import { DataTableRecursive } from '@/pages/modules/E-Office/component/common/tableRecursif.tsx'
import TablePagination from '@/components/common/table/TablePagination.tsx'
import SetLimitList from '@/components/common/table/SetLimitList.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ListLetterClassification = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterClassification, meta } = UseGetLetterClassification({
    page,
    limit,
    search,
  })

  // Controlled expanded state so we can programmatically expand rows
  const [expanded, setExpanded] = useState<ExpandedState>({})

  // Callback invoked after a child is successfully added
  const handleChildAdded = useCallback((parentId: string | undefined) => {
    if (parentId) {
      setExpanded((prev) => {
        // ExpandedState bisa berbentuk `true` (expand all) atau Record<string, boolean>
        const base = typeof prev === 'object' && prev !== null ? prev : {}
        return { ...base, [parentId]: true }
      })
    }
  }, [])

  const columns = ColumnsLetterClassification({ onChildAdded: handleChildAdded })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Klasifikasi Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterClassification />,
            },
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Referensi'} valueGuide="E_OFFICE_REFERENCE" />,
            },
          ]}
        />

        <DataTableRecursive
          data={letterClassification}
          columns={columns}
          expanded={expanded}
          setExpanded={setExpanded}
        />

        {meta && (
          <>
            <div className="flex items-end gap-4 w-full justify-between">
              <SetLimitList />
              <TablePagination length={meta?.total} meta={meta} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default ListLetterClassification
