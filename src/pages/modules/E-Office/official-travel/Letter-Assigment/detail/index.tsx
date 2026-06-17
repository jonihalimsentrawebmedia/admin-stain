import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  LetterAssignmentSPPD,
  UseGetLetterAssigmentDetail,
  UseGetLetterAssigmentDetailSPPD,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent, CardTitle } from '@/components/ui/card.tsx'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Button } from '@/components/ui/button.tsx'
import { MdUpload } from 'react-icons/md'
import { useCallback, useEffect, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FaDownload, FaEye, FaFile, FaForward, FaPrint, FaTrash } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6'
import FormSPPDLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/form.tsx'
import { useForm } from 'react-hook-form'
import { ResolverSPPD, type TResolverSPPD } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { HiPencil } from 'react-icons/hi'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table.tsx'
import { GenerateAssignmentLetter } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/component/letterAssignment.ts'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import pdfmake from '@/utils/pdfmake.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { UseGetButtonPrintV1LetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/component/buttonPrintV1'

const DetailLetterAssigment = () => {
  const { id: id_letter } = useParams()
  const { detail } = UseGetLetterAssigmentDetail(id_letter as string)
  const { sppd } = LetterAssignmentSPPD({ id_surat_tugas: id_letter as string })
  const { detail: DetailSPPD } = UseGetLetterAssigmentDetailSPPD(
    id_letter as string,
    sppd?.[0]?.id_surat_tugas_sppd
  )
  const navigate = useNavigate()
  const refUpload = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  // ─── Preview Surat Tugas PDF ───
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const previewUrlRef = useRef<string>('')

  const cleanupPreviewUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = ''
    }
    setPreviewUrl('')
  }, [])

  useEffect(() => {
    return () => cleanupPreviewUrl()
  }, [cleanupPreviewUrl])

  const handlePreviewSuratTugas = async () => {
    if (!detail) return
    setPreviewLoading(true)
    try {
      const kopSurat = detail.kop_surat ?? (detail as any)?.kop_surat
      const logoBase64 = await GetBase64FromUrl(kopSurat?.url_logo)
      const config = GenerateAssignmentLetter({
        data: detail as any,
        base64Logo: logoBase64,
        kop_surat: kopSurat as any,
      })
      const blob = await (pdfmake.createPdf(config) as any).getBlob()
      const url = URL.createObjectURL(blob)
      cleanupPreviewUrl()
      previewUrlRef.current = url
      setPreviewUrl(url)
      setPreviewOpen(true)
    } catch (err: any) {
      toast.error(err?.message || 'Gagal membuat preview PDF')
    } finally {
      setPreviewLoading(false)
    }
  }

  const handlePreviewDownload = () => {
    if (!previewUrl) return
    const link = document.createElement('a')
    link.href = previewUrl
    link.download = 'Surat_Tugas_SPD.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreviewPrint = () => {
    if (!previewUrl) return
    const win = window.open(previewUrl, '_blank')
    if (win) {
      win.onload = () => win.print()
    }
  }

  const form = useForm<TResolverSPPD>({
    resolver: zodResolver(ResolverSPPD),
  })

  useEffect(() => {
    if (DetailSPPD) {
      form.reset({
        ...DetailSPPD,
        tanggal_surat: DetailSPPD?.tanggal_surat
          ? format(DetailSPPD.tanggal_surat, 'yyyy-MM-dd')
          : '',
      })
    }
  }, [DetailSPPD])

  const queryClient = useQueryClient()
  const HandleSubmit = async (value: TResolverSPPD) => {
    setLoading(true)
    if (!DetailSPPD && sppd.length === 0) {
      await AxiosClient.post(`/eoffice/mail-surat-tugas/${id_letter}/sppd`, {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            setIsEdit(false)
            toast.success(res.data.message || 'Success')
            queryClient.invalidateQueries({
              queryKey: ['letter-assignment-sppd'],
            })
            queryClient.invalidateQueries({
              queryKey: ['letter-assignment-detail'],
            })
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data.message || 'Error')
        })
    } else {
      await AxiosClient.put(
        `/eoffice/mail-surat-tugas/${id_letter}/sppd/${sppd?.[0]?.id_surat_tugas_sppd}`,
        {
          ...value,
          tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        }
      )
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            setIsEdit(false)
            toast.success(res.data.message || 'Success')
            queryClient.invalidateQueries({
              queryKey: ['letter-assignment-sppd'],
            })
            queryClient.invalidateQueries({
              queryKey: ['letter-assignment-detail'],
            })
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data.message || 'Error')
        })
    }
  }

  const HandleUpload = async (file: FileList | null) => {
    if (file) {
      const formData = new FormData()
      formData.append('berkas', file[0])
      await AxiosClient.post('/upload', formData)
        .then(async (res) => {
          if (res.data.status) {
            await AxiosClient.patch(`/eoffice/mail-surat-tugas/${id_letter}/surat-undangan`, {
              url_file_undangan: res.data.url,
            })
              .then((res2) => {
                if (res2.data.status) {
                  toast.success(res2.data.message || 'Success')
                  queryClient.invalidateQueries({
                    queryKey: ['letter-assignment-detail'],
                  })
                }
              })
              .catch((err) => {
                toast.error(err.response.data.message || 'Error')
              })
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message || 'Error')
        })
    }
  }

  const HandleRemoveGuestLetter = async () => {
    await AxiosClient.delete(
      `/eoffice/mail-surat-tugas/${detail?.id_mail_surat_tugas}/surat-undangan`
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res?.data?.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['letter-assignment-detail'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Detail Surat Tugas'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Surat Tugas',
              onClick: () =>
                navigate(`/modules/e-office/official-travel/letter-assignment/edit/${id_letter}`),
            },
            {
              type: 'custom',
              element: (
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  disabled={!detail || previewLoading}
                  onClick={handlePreviewSuratTugas}
                >
                  <FaEye className="mr-2 size-3" />
                  {previewLoading ? 'Memproses...' : 'Preview Surat Tugas'}
                </Button>
              ),
            },
          ]}
        />

        <Card className={'rounded shadow-none border'}>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-blue-700">
                Tanggal Surat :{' '}
                {detail?.tanggal_surat
                  ? format(detail.tanggal_surat, 'dd MMMM yyyy', { locale: id })
                  : ''}
              </p>
              <p className="text-blue-700">No. Surat : {detail?.nomor_surat}</p>
            </div>
            <p className="text-2xl">Kegiatan</p>
            <ul className={'list-decimal pl-5 mt-2.5 space-y-2.5'}>
              {detail?.kegiatan?.map((row, index) => (
                <li key={index}>{row}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={'rounded shadow-none border'}>
          <CardContent className="flex items-start gap-4">
            <div className="grid grid-cols-[12rem_1fr] gap-4 w-full">
              <p className="text-gray-500">Dibuat Oleh</p>
              <p>
                {detail?.nama_user_created} (
                {detail?.created_at
                  ? format(detail?.created_at, 'dd MMMM yyyy', {
                      locale: id,
                    })
                  : ''}
                )
              </p>
              <p className="text-gray-500">Satuan Kerja</p>
              <p>{detail?.nama_unit_kerja}</p>
              <p className="text-gray-500">Penanda Tangan</p>
              <p>{detail?.nama_disahkan_oleh}</p>
              <p className="text-gray-500">Daftar Pegawai</p>
              <ul className={'list-decimal pl-5'}>
                {detail?.pegawai?.map((row, index) => (
                  <li key={index}>
                    <p>{row?.nama_lengkap}</p>
                    <p className="text-gray-500">NIP {row?.nip}</p>
                    <p>{detail?.nama_jabatan_struktural}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={'grid grid-cols-[12rem_1fr] gap-4 w-full'}>
              <p className="text-gray-500">Undangan Kegiatan</p>
              <p>{detail?.url_file_undangan ? 'Undangan sudah diupload' : 'Belum ada undangan'}</p>
              <div />
              {detail?.url_file_undangan ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <Link to={detail?.url_file_undangan} target="_blank">
                      <Button
                        variant={'outline'}
                        className={'border-primary text-primary hover:text-primary w-fit'}
                      >
                        <FaFile />
                        Lihat Undangan
                      </Button>
                    </Link>
                    <Button
                      size={'sm'}
                      className={'w-fit text-white'}
                      onClick={() => refUpload.current.click()}
                    >
                      <MdUpload />
                    </Button>
                    <button
                      onClick={HandleRemoveGuestLetter}
                      className={
                        'p-1.5 border-red-500 text-red-500 hover:text-red-600 border rounded'
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              ) : (
                <Button className={'text-white w-fit'} onClick={() => refUpload.current.click()}>
                  <MdUpload />
                  Uplaod Undangan
                </Button>
              )}
              <input
                type="file"
                hidden
                ref={refUpload}
                onChange={async (e) => {
                  await HandleUpload(e.target.files)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {isEdit ? (
          <FormSPPDLetterAssigment
            form={form}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            loading={loading}
            HandleSave={HandleSubmit}
          />
        ) : (
          <Card className={'rounded shadow-none border'}>
            <CardContent className={'space-y-4'}>
              <CardTitle>SPPD</CardTitle>
              {sppd?.length > 0 ? (
                <>
                  <div className="flex items-center justify-end gap-2">
                    <UseGetButtonPrintV1LetterAssignment detailSppd={DetailSPPD} detail={detail} />

                    <Button
                      onClick={() => setIsEdit(!isEdit)}
                      className={'bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
                      size={'sm'}
                    >
                      <HiPencil />
                      Edit SPPD
                    </Button>
                  </div>
                  <TableCustom
                    columnsName={['']}
                    isShowFilter={false}
                    isShowPagination={false}
                    columns={ColumnSPPD}
                    data={sppd}
                    isShowFooterTable={true}
                    footerContent={
                      <TableFooter className={'bg-gray-100'}>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                className={'text-white bg-blue-600 hover:bg-blue-700'}
                                onClick={() => {
                                  navigate('lupsum')
                                }}
                              >
                                Lupsum <FaForward />
                              </Button>
                              <Button
                                className={'text-white'}
                                onClick={() => {
                                  navigate('report')
                                }}
                              >
                                Laporan <FaForward />
                              </Button>
                              <Button
                                onClick={() => {
                                  navigate('documentation')
                                }}
                                className={'text-white bg-green-600 hover:bg-green-700'}
                              >
                                Dokumentasi <FaForward />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    }
                  />
                </>
              ) : (
                <>
                  <p className="text-red-500">Belum Dibuat</p>
                  <Button
                    className={'rounded-full text-white'}
                    onClick={() => {
                      setIsEdit(!isEdit)
                    }}
                  >
                    <FaCirclePlus className={'text-yellow-500'} />
                    Buat SPPD
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* ═══════════ Dialog Preview Surat Tugas ═══════════ */}
      <DialogBasic
        open={previewOpen}
        setOpen={setPreviewOpen}
        title="Preview Surat Tugas / SPD"
        className="min-w-4xl w-full"
      >
        <div className="space-y-4">
          {previewLoading && (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <p>Sedang memproses PDF...</p>
            </div>
          )}

          {previewUrl && !previewLoading && (
            <iframe
              src={previewUrl}
              className="w-full h-[500px] border rounded-lg"
              title="Preview Surat Tugas"
            />
          )}

          <div className="flex items-center justify-between gap-2 pt-2">
            <div />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-green-600 border-green-400 hover:bg-green-50"
                disabled={!previewUrl || previewLoading}
                onClick={handlePreviewDownload}
              >
                <FaDownload className="mr-2 size-3" />
                Download
              </Button>
              <Button
                className="text-white"
                disabled={!previewUrl || previewLoading}
                onClick={handlePreviewPrint}
              >
                <FaPrint className="mr-2 size-3" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}
export default DetailLetterAssigment
