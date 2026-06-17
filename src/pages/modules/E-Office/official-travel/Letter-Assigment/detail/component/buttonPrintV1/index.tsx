import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { MdPrint } from 'react-icons/md'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types.ts'
import type { ILetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { GeneratePDFSPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerate.ts'
import { GeneratePDFSPDBack } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerateBack.ts'
import { GeneratePDFFrontV2 } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/pdfGenerateFrontV2.ts'
import pdfmake from '@/utils/pdfmake.ts'

interface Props {
  detailSppd?: IDetailSPPD
  detail?: ILetterAssignment
}

export const UseGetButtonPrintV1LetterAssignment = (props: Props) => {
  const { detailSppd, detail } = props

  const handlePrintFont = async () => {
    if (!detail) return
    const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${detailSppd?.id_kop_surat}`)
    const letterHeader: ILetterHeader = headerRes.data?.data
    const logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
    const pdfDefination = GeneratePDFSPD(detail, logoBase64, detailSppd)
    pdfmake.createPdf(pdfDefination).print()
  }

  const HandlePrintBack = async () => {
    if (!detail) return

    const pdfDefination = GeneratePDFSPDBack(detail, detailSppd)
    pdfmake.createPdf(pdfDefination).print()
  }

  const handlePrintFontV2 = async () => {
    if (!detail) return

    const headerRes = await AxiosClient.get(`/eoffice/kop-surat/detail/${detailSppd?.id_kop_surat}`)
    const letterHeader: ILetterHeader = headerRes.data?.data
    const logoBase64 = await GetBase64FromUrl(letterHeader.url_logo)
    const pdfDefination = GeneratePDFFrontV2(detail, logoBase64, detailSppd)
    pdfmake.createPdf(pdfDefination).print()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={'flex items-center gap-2 border border-primary rounded p-1.5 text-xs'}
          >
            <MdPrint className={'size-4'} />
            Cetak SPPD V1
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handlePrintFont()}>
                <MdPrint />
                Cetak Depan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => HandlePrintBack()}>
                <MdPrint />
                Cetak Belakang
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={'flex items-center gap-2 border border-primary rounded p-1.5 text-xs'}
          >
            <MdPrint className={'size-4'} />
            Cetak SPPD V2
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handlePrintFontV2()}>
                <MdPrint />
                Cetak Depan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => HandlePrintBack()}>
                <MdPrint />
                Cetak Belakang
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
