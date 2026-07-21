import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion'
import type { ICPPTItem, ICPPTDiagnosisItem, ICPPTProcedureItem, ICPPTDaftarResepObat } from '../data/types'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteCPPT } from './buttonDelete'

interface Props {
  data: ICPPTItem[]
  detailId: string
}

export const CPPTList = ({ data, detailId }: Props) => {
  const navigate = useNavigate()

  if (data.length === 0) {
    return <p className="text-sm text-white italic">Belum ada catatan CPPT</p>
  }

  return (
    <Accordion type="multiple" className="flex flex-col gap-2">
      {data.map((item) => (
        <AccordionCustom
          key={item.id_cppt}
          name={item.id_cppt}
          title={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {format(new Date(item.tanggal_catat), 'dd-MM-yyyy HH:mm')}
                </span>
                <span className="text-sm text-white">|</span>
                <span className="text-sm text-white">{item.nama_dokter}</span>
                {item.nama_spesialis && (
                  <>
                    <span className="text-sm text-white">-</span>
                    <span className="text-xs text-white">{item.nama_spesialis}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white">
                  {item.nama_ruangan} ({item.nomor_ruangan})
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(
                      `/modules/sim-rs/services/inpatient/detail/${detailId}/cppt/edit/${item.id_cppt}`
                    )
                  }}
                  className="bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded"
                >
                  <HiPencil className="size-3" />
                </button>
                <ButtonDeleteCPPT data={item} />
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Keluhan</p>
              <p className="text-sm text-black">{item.keluhan}</p>
            </div>

            {item.catatan && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Catatan</p>
                <p className="text-sm text-black">{item.catatan}</p>
              </div>
            )}

            {item.daftar_diagnosis && item.daftar_diagnosis.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Diagnosa</p>
                <ul className="list-disc list-inside text-sm text-black">
                  {item.daftar_diagnosis.map((d: ICPPTDiagnosisItem) => (
                    <li key={d.id_diagnosis}>{d.nama_diagnosis}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.daftar_procedure && item.daftar_procedure.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Rencana Tindakan</p>
                <ul className="list-disc list-inside text-sm text-black">
                  {item.daftar_procedure.map((p: ICPPTProcedureItem) => (
                    <li key={p.id_procedure}>{p.nama_procedure}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.daftar_resep_obat && item.daftar_resep_obat.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Resep Obat</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border px-3 py-1.5 text-left">#</th>
                        <th className="border px-3 py-1.5 text-left">Nama Obat</th>
                        <th className="border px-3 py-1.5 text-left">Satuan</th>
                        <th className="border px-3 py-1.5 text-center">Frekuensi</th>
                        <th className="border px-3 py-1.5 text-center">Durasi</th>
                        <th className="border px-3 py-1.5 text-center">Jumlah</th>
                        <th className="border px-3 py-1.5 text-right">Harga Satuan</th>
                        <th className="border px-3 py-1.5 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.daftar_resep_obat.map((obat: ICPPTDaftarResepObat, idx: number) => (
                        <tr key={obat.id_obat} className="hover:bg-gray-50">
                          <td className="border px-3 py-1.5">{idx + 1}</td>
                          <td className="border px-3 py-1.5">{obat.nama_obat}</td>
                          <td className="border px-3 py-1.5">{obat.satuan}</td>
                          <td className="border px-3 py-1.5 text-center">{obat.frekuensi}x</td>
                          <td className="border px-3 py-1.5 text-center">{obat.durasi} hari</td>
                          <td className="border px-3 py-1.5 text-center">{obat.jumlah}</td>
                          <td className="border px-3 py-1.5 text-right">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(obat.harga_satuan)}
                          </td>
                          <td className="border px-3 py-1.5 text-right font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(obat.total_harga)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="text-xs text-white border-t pt-2">
              Dicatat oleh: {item.nama_user_created} |{' '}
              {format(new Date(item.created_at), 'dd-MM-yyyy HH:mm')}
            </div>
          </div>
        </AccordionCustom>
      ))}
    </Accordion>
  )
}
