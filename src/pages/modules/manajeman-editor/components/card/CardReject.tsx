interface Props {
  form: any
}
const CardReject = ({ form }: Props) => {
  return (
    <div className="p-4 rounded bg-[#FFFCF5] border border-[#CDA327]">
      <p className="text-[#CDA327]">Alasan Penolakan</p>
      <p>{form.watch('alasan_ditolak')??"-"}</p>
    </div>
  )
}

export default CardReject
