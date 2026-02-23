export function statusAdmission(status: string) {
  switch (status) {
    case 'KESELURUHAN':
      return (
        <div className="flex gap-2 text-[#0E874E] items-center">
          <div className="size-6 rounded-full bg-[#0E874E]"></div>
          Keseluruhan
        </div>
      )
    case 'SEBAGIAN':
      return (
        <div className="flex gap-2 text-[#CDA327] items-center">
          <div className="size-6 rounded-full bg-[#CDA327]"></div>
          Sebagian
        </div>
      )
    case 'DITOLAK':
      return (
        <div className="flex gap-2 text-[#CD2738] items-center">
          <div className="size-6 rounded-full bg-[#CD2738]"></div>
          Ditolak
        </div>
      )
    default:
      return status
  }
}
export function statusEmail(status: string) {
  switch (status) {
    case 'SUDAH_TERJAWAB':
      return <div className="flex gap-2 text-[#0E874E] items-center">Sudah Terkirim</div>

    default:
      return <div className="flex gap-2 text-[#CD2738] items-center">Belum Terkirim</div>
  }
}
