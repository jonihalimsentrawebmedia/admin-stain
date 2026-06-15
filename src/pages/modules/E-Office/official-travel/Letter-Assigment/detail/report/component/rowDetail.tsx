const RowDetail = ({
  label,
  children,
  multiline = false,
}: {
  label: string
  children: React.ReactNode
  multiline?: boolean
}) => {
  return (
    <div className="flex items-start">
      <div className="w-[200px] px-2 py-3">
        <span className="text-base text-[#888888]">{label}</span>
      </div>

      <div className={`flex-1 px-2 py-3 ${multiline ? 'min-h-[68px]' : 'min-h-[46px]'}`}>
        <div className="text-base text-[#0F0F12] whitespace-pre-line">{children}</div>
      </div>
    </div>
  )
}

export default RowDetail
