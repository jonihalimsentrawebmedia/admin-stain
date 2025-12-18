import { Input } from '@/components/ui/input'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor.ts'

export const EDITOR_COLORS = [
  { name: 'Default', value: '#000000' },
  { name: 'Primary', value: '#2563eb' }, // blue-600
  { name: 'Success', value: '#16a34a' }, // green-600
  { name: 'Warning', value: '#f59e0b' }, // amber-500
  { name: 'Danger', value: '#dc2626' }, // red-600
]

export const TextColorButton = () => {
  const { editor } = useTiptapEditor()

  if (!editor) return null

  const activeColor = editor.getAttributes('textStyle').color

  return (
    <>
      <Input
        type="color"
        className="w-6 h-6 p-0 border-none cursor-pointer"
        value={editor.getAttributes('textStyle').color ?? '#000000'}
        onChange={(e) => {
          editor.chain().focus().setColor(e.target.value).run()
        }}
      />
      <div className="flex items-center gap-1">
        {EDITOR_COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => editor.chain().focus().setColor(color.value).run()}
            className={`
            w-5 h-5 rounded-full border
            ${activeColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
          `}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </>
  )
}
