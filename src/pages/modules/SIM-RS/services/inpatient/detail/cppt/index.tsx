import { useNavigate } from 'react-router-dom'
import { UseGetCPPT } from './data/types.ts'
import { CPPTList } from './components/CPPTList.tsx'
import type { IRegistration } from '@/pages/modules/SIM-RS/services/register/data/types.ts'
import { FileText } from 'lucide-react'

interface Props {
  detail: IRegistration
  detailId: string
}

const SectionCPPT = ({ detail, detailId }: Props) => {
  const navigate = useNavigate()
  const { cpptList, loading: loadingCPPT } = UseGetCPPT(detail.id_pendaftaran)

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold text-primary">
          CPPT (Catatan Perkembangan Pasien Terintegrasi)
        </p>
        {detail.status_rawat_inap !== 'PULANG' && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `/modules/sim-rs/services/inpatient/detail/${detailId}/cppt/create`
              )
            }
            className="px-4 py-2 rounded bg-primary text-white text-sm hover:bg-primary/80 flex items-center gap-1.5"
          >
            <FileText className="size-4" />
            Tambah Catatan
          </button>
        )}
      </div>

      {loadingCPPT ? (
        <p className="text-sm text-gray-500 italic">Memuat data CPPT...</p>
      ) : (
        <CPPTList
          data={cpptList}
          detailId={detailId}
        />
      )}
    </div>
  )
}

export default SectionCPPT
