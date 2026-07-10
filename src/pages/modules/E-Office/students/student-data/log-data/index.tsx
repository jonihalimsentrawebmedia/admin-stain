import { useParams } from 'react-router-dom'
import { UseGetDetailStudentData, UseGetStudentLogStatusActive } from '../hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge.tsx'

const LogDataStudent = () => {
  const { id } = useParams()
  const { studentData } = UseGetDetailStudentData(id as string)
  const { logStatus, loading } = UseGetStudentLogStatusActive(id as string)

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Log Data Mahasiswa'} buttonGroup={[]} />

        <Card>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Detail Mahasiswa'}
                />
              </div>
              <div className="col-span-2 flex gap-6">
                {studentData?.url_foto_mahasiswa ? (
                  <img
                    src={studentData.url_foto_mahasiswa}
                    alt="Foto Mahasiswa"
                    className="max-w-[120px] w-full aspect-[3/4] object-cover rounded-lg border"
                  />
                ) : (
                  <div className="max-w-[120px] w-full aspect-[3/4] bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400 shrink-0">
                    <p className="text-xs">No Photo</p>
                  </div>
                )}
                <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4 flex-1">
                  <span className="text-gray-500">NIM</span>
                  <span className="font-medium">{studentData?.nim ?? '-'}</span>

                  <span className="text-gray-500">Nama Mahasiswa</span>
                  <span className="font-medium">{studentData?.nama_mahasiswa ?? '-'}</span>

                  <span className="text-gray-500">Program Studi</span>
                  <span className="font-medium">{studentData?.nama_prodi ?? '-'}</span>

                  <span className="text-gray-500">Fakultas</span>
                  <span className="font-medium">{studentData?.nama_fakultas ?? '-'}</span>

                  <span className="text-gray-500">Status Saat Ini</span>
                  <span className="font-medium">
                    <Badge variant="outline">{studentData?.nama_status_mahasiswa ?? '-'}</Badge>
                  </span>

                  <span className="text-gray-500">Angkatan</span>
                  <span className="font-medium">{studentData?.angkatan ?? '-'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Riwayat Status'}
                />
              </div>

              <div className="col-span-2">
                {loading ? (
                  <p className="text-gray-500">Memuat...</p>
                ) : !logStatus || logStatus.length === 0 ? (
                  <p className="text-gray-500">Belum ada riwayat perubahan status</p>
                ) : (
                  <div className="space-y-4">
                    {logStatus.map((log) => (
                      <Card
                        key={log.id_mahasiswa_status_history}
                        className="border-l-4 border-l-primary"
                      >
                        <CardContent className="py-4">
                          <div className="grid grid-cols-[160px_1fr] gap-y-2 gap-x-4 text-sm">
                            <span className="text-gray-500">Tanggal</span>
                            <span className="font-medium">
                              {log.changed_at
                                ? format(new Date(log.changed_at), 'dd/MM/yyyy HH:mm')
                                : '-'}
                            </span>

                            <span className="text-gray-500">Status Lama</span>
                            <span>
                              <Badge variant="secondary">
                                {log.old_nama_status_mahasiswa ?? '-'}
                              </Badge>
                            </span>

                            <span className="text-gray-500">Status Baru</span>
                            <span>
                              <Badge>{log.new_nama_status_mahasiswa ?? '-'}</Badge>
                            </span>

                            {log.old_tahun_lulus && (
                              <>
                                <span className="text-gray-500">Tahun Lulus (Lama)</span>
                                <span className="font-medium">{log.old_tahun_lulus}</span>
                              </>
                            )}

                            {log.new_tahun_lulus && (
                              <>
                                <span className="text-gray-500">Tahun Lulus (Baru)</span>
                                <span className="font-medium">{log.new_tahun_lulus}</span>
                              </>
                            )}

                            {log.old_semester_lulus && (
                              <>
                                <span className="text-gray-500">Semester Lulus (Lama)</span>
                                <span className="font-medium">
                                  {log.old_semester_lulus === 1 ? 'Ganjil' : 'Genap'}
                                </span>
                              </>
                            )}

                            {log.new_semester_lulus && (
                              <>
                                <span className="text-gray-500">Semester Lulus (Baru)</span>
                                <span className="font-medium">
                                  {log.new_semester_lulus === 1 ? 'Ganjil' : 'Genap'}
                                </span>
                              </>
                            )}

                            {log.alasan && (
                              <>
                                <span className="text-gray-500">Alasan</span>
                                <span className="font-medium">{log.alasan}</span>
                              </>
                            )}

                            <span className="text-gray-500">Diubah Oleh</span>
                            <span className="font-medium">{log.nama_changed_user ?? '-'}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default LogDataStudent
