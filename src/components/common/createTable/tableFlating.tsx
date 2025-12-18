'use client'

import { useContext, useEffect, useState } from 'react'
import { EditorContext } from '@tiptap/react'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { ToolbarGroup } from '@/components/tiptap-ui-primitive/toolbar'

export function TableFloatingToolbar() {
  const { editor } = useContext(EditorContext)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!editor) return

    const update = () => {
      setVisible(editor.isActive('table'))
    }

    editor.on('selectionUpdate', update)
    editor.on('transaction', update)

    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
    }
  }, [editor])

  if (!editor || !visible) return null

  return (
    <div className="table-floating-toolbar">
      <ToolbarGroup>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().addRowBefore().run()
          }}
        >
          + Row
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().addColumnBefore().run()
          }}
        >
          + Col
        </Button>
      </ToolbarGroup>

      <ToolbarGroup>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().deleteRow().run()
          }}
        >
          − Row
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().deleteColumn().run()
          }}
        >
          − Col
        </Button>
      </ToolbarGroup>

      <ToolbarGroup>
        <Button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().deleteTable().run()
          }}
        >
          Delete
        </Button>
      </ToolbarGroup>
    </div>
  )
}
