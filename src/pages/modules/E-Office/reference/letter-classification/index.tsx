import { useState, useCallback } from 'react'
import type { ExpandedState } from '@tanstack/react-table'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddLetterClassification from './component/buttonAdd.tsx'
import { USeGetLetterClassification } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsLetterClassification } from './data/columns.tsx'
import { DataTableRecursive } from '@/pages/modules/E-Office/component/common/tableRecursif.tsx'

const ListLetterClassification = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterClassification } = USeGetLetterClassification({
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
          ]}
        />

        <DataTableRecursive
          data={letterClassification}
          columns={columns}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </div>
    </>
  )
}
export default ListLetterClassification
