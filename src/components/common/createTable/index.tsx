import { useContext } from 'react'
import { EditorContext } from '@tiptap/react'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { TableIcon } from 'lucide-react'

interface AddTableButtonProps {
  rows?: number
  cols?: number
  withHeaderRow?: boolean
}

export function AddTableButton({ rows = 3, cols = 3, withHeaderRow = true }: AddTableButtonProps) {
  const { editor } = useContext(EditorContext)

  if (!editor) return null

  const handleAddTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows,
        cols,
        withHeaderRow,
      })
      .run()
  }

  return (
    <Button
      type="button"
      onClick={handleAddTable}
      disabled={!editor.can().insertTable()}
      title="Add table"
    >
      <TableIcon className="tiptap-button-icon" />
    </Button>
  )
}
