import { clsx } from 'clsx'

interface Props {
  content: string
  className?: string
}

const RenderHTMLContent = (props: Props) => {
  const { content, className } = props
  return (
    <>
      <div
        className={clsx('tiptap ProseMirror simple-editor', className)}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
    </>
  )
}

export default RenderHTMLContent
