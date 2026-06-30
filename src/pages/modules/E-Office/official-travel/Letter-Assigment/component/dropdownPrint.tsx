import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { MdPrint } from 'react-icons/md'
import type { ListLetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import {
  LetterAssignmentSPPD,
  UseGetLetterAssigmentDetail,
  UseGetLetterAssigmentDetailSPPD,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/hooks'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { GenerateAssignmentLetter } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/letterAssignment.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import { GeneratePDFSPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerate.ts'
import { GeneratePDFSPDBack } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerateBack.ts'
import { GeneratePDFFrontV2 } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerateFrontV2.ts'

interface Props {
  data: ListLetterAssignment
}

const DropdownPrint = (props: Props) => {
  const { data } = props
  const { id_mail_surat_tugas } = data
  const { detail } = UseGetLetterAssigmentDetail(id_mail_surat_tugas)
  const { sppd } = LetterAssignmentSPPD({ id_surat_tugas: id_mail_surat_tugas })
  const { detail: DetailSPPD } = UseGetLetterAssigmentDetailSPPD(
    id_mail_surat_tugas,
    sppd?.[0]?.id_surat_tugas_sppd
  )

  const handlePreviewSuratTugas = async () => {
    if (!detail) return
    try {
      const kopSurat = detail.kop_surat ?? (detail as any)?.kop_surat
      const logoBase64 = await GetBase64FromUrl(kopSurat?.url_logo)
      const config = GenerateAssignmentLetter({
        data: detail as any,
        base64Logo: logoBase64,
        kop_surat: kopSurat as any,
      })
      await (pdfmake.createPdf(config) as any).print()
    } catch (err: any) {
      toast.error(err?.message || 'Gagal membuat preview PDF')
    }
  }

  const handlePrintFont = async () => {
    if (!detail) return
    console.log(DetailSPPD)
    const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${DetailSPPD?.id_kop_surat}`)
    const letterHeader: ILetterHeader = headerRes.data?.data
    const logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
    const pdfDefination = GeneratePDFSPD(detail, logoBase64, DetailSPPD)
    pdfmake.createPdf(pdfDefination).print()
  }

  const HandlePrintBack = async () => {
    if (!detail) return

    const pdfDefination = GeneratePDFSPDBack(detail, DetailSPPD)
    pdfmake.createPdf(pdfDefination).print()
  }

  const handlePrintFontV2 = async () => {
    if (!detail) return

    const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${DetailSPPD?.id_kop_surat}`)
    const letterHeader: ILetterHeader = headerRes.data?.data
    const logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
    const pdfDefination = GeneratePDFFrontV2(detail, logoBase64, DetailSPPD)
    pdfmake.createPdf(pdfDefination).print()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={'flex items-center gap-2 border border-primary rounded p-1.5 text-xs'}
        >
          <MdPrint className={'size-4'} />
          Cetak
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={'flex items-center gap-1'}
              onClick={handlePreviewSuratTugas}
            >
              <div className={'p-1.5 border border-primary rounded'}>
                <MdPrint className={'text-primary size-4'} />
              </div>
              <div>
                <p>Surat Tugas</p>
                <p className={'text-xs text-gray-500'}>Cetak Surat Tugas</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handlePrintFont}>
              <div className={'p-1.5 border border-primary rounded'}>
                <MdPrint className={'text-primary size-4'} />
              </div>
              <div>
                <p>SPPD Depan V1</p>
                <p className={'text-xs text-gray-500'}>Cetak Halaman Depan V1</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handlePrintFontV2}>
              <div className={'p-1.5 border border-primary rounded'}>
                <MdPrint className={'text-primary size-4'} />
              </div>
              <div>
                <p>SPPD Depan V2</p>
                <p className={'text-xs text-gray-500'}>Cetak Halaman Depan 2</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={HandlePrintBack}>
              <div className={'p-1.5 border border-primary rounded'}>
                <MdPrint className={'text-primary size-4'} />
              </div>
              <div>
                <p>SPPD Belakang</p>
                <p className={'text-xs text-gray-500'}>Cetak Halaman Belakang</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default DropdownPrint
