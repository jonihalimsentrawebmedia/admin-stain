import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetReportAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report/hooks'
import { useParams } from 'react-router-dom'
import DetailSuratTugasTable from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report/component/details.tsx'
import FormReportOfficialTravel from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReportOfficialTravel, type TReportOfficialTravel } from './data/resolver'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import RowDetail from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report/component/rowDetail.tsx'
import { id } from 'date-fns/locale'
import { Button } from '@/components/ui/button.tsx'
import { ReportLetterPdf } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report/component/pdfmakeData.ts'
import pdfmake from '@/utils/pdfmake.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import { MdPrint } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'

const ReportLetterSPPDAssignment = () => {
  const { id: id_letter } = useParams()
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { letterAssignment } = UseGetReportAssignment(id_letter as string)
  const form = useForm<TReportOfficialTravel>({
    resolver: zodResolver(ReportOfficialTravel),
  })

  const dataReport = letterAssignment?.laporan

  useEffect(() => {
    if (letterAssignment?.laporan) {
      form.reset({
        ...(letterAssignment?.laporan as any),
        tanggal: new Date(letterAssignment.tanggal_surat),
      })
    }
  }, [letterAssignment])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TReportOfficialTravel) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-tugas/${id_letter}/laporan`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['report-assignment'],
          })
          toast.success(res.data.message || 'Success')
          setIsEdit(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.dataReport?.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Laporan'} buttonGroup={[]} isBack />

        {letterAssignment && <DetailSuratTugasTable data={letterAssignment} />}
        {isEdit || !letterAssignment?.laporan ? (
          <FormReportOfficialTravel form={form} loading={loading} HandleSave={HandleSave} />
        ) : (
          <>
            <div className="flex items-center justify-end">
              <Button
                className={'text-white bg-yellow-600 hover:bg-yellow-500'}
                onClick={() => setIsEdit(!isEdit)}
                disabled={isEdit}
              >
                <HiPencil />
                Edit Data Laporan
              </Button>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[1024px] bg-white p-4 rounded-lg shadow-md">
              <RowDetail label="Tempat">{dataReport?.tempat}</RowDetail>
              <RowDetail label="Tanggal">
                {dataReport?.tanggal
                  ? format(new Date(dataReport?.tanggal), 'dd MMMM yyyy', {
                      locale: id,
                    })
                  : ''}
              </RowDetail>

              <RowDetail label="Perihal">{dataReport?.perihal}</RowDetail>

              <RowDetail label="Isi Laporan" multiline>
                {dataReport?.isi}
              </RowDetail>

              <RowDetail label="Dasar Perjalanan Dinas">
                {dataReport?.dasar_perjalanan_dinas}
              </RowDetail>

              <RowDetail label="Laporan Pelaksana" multiline>
                <ol className="list-decimal pl-5">
                  {dataReport?.laporan_pelaksana?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </RowDetail>

              <RowDetail label="Tindak Lanjut">{dataReport?.tindak_lanjut}</RowDetail>

              <RowDetail label="Saran">{dataReport?.saran}</RowDetail>
            </div>
            <div className="flex items-center">
              <Button
                className={'text-white'}
                onClick={async () => {
                  const logoBase64 = await GetBase64FromUrl(letterAssignment?.kop_surat?.url_logo)
                  const pdfConfig = ReportLetterPdf({
                    data: letterAssignment,
                    kop_surat: letterAssignment?.kop_surat,
                    logoBase64: logoBase64,
                  })
                  pdfmake.createPdf(pdfConfig).open()
                }}
              >
                <MdPrint className={'size-4'} />
                Cetak
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ReportLetterSPPDAssignment
