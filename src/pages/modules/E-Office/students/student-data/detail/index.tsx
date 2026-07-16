import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailStudentData } from '../hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge.tsx'
import { Button } from '@/components/ui/button.tsx'
import { History } from 'lucide-react'

const DetailStudentData = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studentData } = UseGetDetailStudentData(id as string)

  const jenisKelaminLabel =
    studentData?.jenis_kelamin === 'LAKI_LAKI'
      ? 'Laki-laki'
      : studentData?.jenis_kelamin === 'PEREMPUAN'
        ? 'Perempuan'
        : studentData?.jenis_kelamin

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={'Detail Data Mahasiswa'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/e-office/student/student-data/edit/${id}`),
            },
            {
              type: 'custom',
              element: (
                <Button
                  variant="outline"
                  className="bg-white text-primary border-primary hover:text-primary"
                  onClick={() =>
                    navigate(
                      `/modules/e-office/student/student-data/log/${studentData?.id_mahasiswa}`,
                    )
                  }
                >
                  <History />
                  Log Status
                </Button>
              ),
            },
          ]}
        />

        <Card>
          <CardContent className="space-y-6">
            {/* Foto */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine className={'text-2xl font-semibold text-primary'} title={'Foto'} />
              </div>
              <div className="col-span-2">
                {studentData?.url_foto_mahasiswa ? (
                  <img
                    src={studentData.url_foto_mahasiswa}
                    alt="Foto Mahasiswa"
                    className="max-w-[240px] w-full aspect-[3/4] object-cover rounded-lg border"
                  />
                ) : (
                  <div className="max-w-[240px] w-full aspect-[3/4] bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400">
                    <p className="text-sm">Tidak ada foto</p>
                  </div>
                )}
              </div>
            </div>

            {/* Data Akademik */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Data Akademik'}
                />
              </div>

              <div className="col-span-2">
                <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4">
                  <span className="text-gray-500">NIM</span>
                  <span className="font-medium">{studentData?.nim ?? '-'}</span>

                  <span className="text-gray-500">Nama Mahasiswa</span>
                  <span className="font-medium">{studentData?.nama_mahasiswa ?? '-'}</span>

                  <span className="text-gray-500">Program Studi</span>
                  <span className="font-medium">{studentData?.nama_prodi ?? '-'}</span>

                  <span className="text-gray-500">Status Mahasiswa</span>
                  <span className="font-medium">
                    <Badge variant="outline">{studentData?.nama_status_mahasiswa ?? '-'}</Badge>
                  </span>

                  <span className="text-gray-500">Angkatan/Tahun Masuk</span>
                  <span className="font-medium">{studentData?.angkatan ?? '-'}</span>

                  <span className="text-gray-500">Semester Masuk</span>
                  <span className="font-medium">
                    {studentData?.semester_masuk_label ?? studentData?.semester_masuk ?? '-'}
                  </span>

                  <span className="text-gray-500">Jalur Masuk</span>
                  <span className="font-medium">{studentData?.nama_jalur_masuk ?? '-'}</span>
                </div>
              </div>
            </div>

            {/* Data Pribadi */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Data Pribadi'}
                />
              </div>

              <div className="col-span-2">
                <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4">
                  <span className="text-gray-500">NIK</span>
                  <span className="font-medium">{studentData?.nik ?? '-'}</span>

                  <span className="text-gray-500">Jenis Kelamin</span>
                  <span className="font-medium">{jenisKelaminLabel ?? '-'}</span>

                  <span className="text-gray-500">Agama</span>
                  <span className="font-medium">{studentData?.nama_agama ?? '-'}</span>

                  <span className="text-gray-500">Tempat Lahir</span>
                  <span className="font-medium">{studentData?.tempat_lahir ?? '-'}</span>

                  <span className="text-gray-500">Tanggal Lahir</span>
                  <span className="font-medium">
                    {studentData?.tanggal_lahir
                      ? format(new Date(studentData.tanggal_lahir), 'dd/MM/yyyy')
                      : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Informasi Kontak */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Informasi Kontak'}
                />
              </div>

              <div className="col-span-2">
                <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4">
                  <span className="text-gray-500">No Handphone</span>
                  <span className="font-medium">{studentData?.no_hp ?? '-'}</span>

                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">{studentData?.email ?? '-'}</span>

                  <span className="text-gray-500">Alamat</span>
                  <span className="font-medium">{studentData?.alamat ?? '-'}</span>
                </div>
              </div>
            </div>

            {/* Informasi Orang Tua & Wali */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TitleLine
                  className={'text-2xl font-semibold text-primary'}
                  title={'Informasi Orang Tua & Wali'}
                />
              </div>

              <div className="col-span-2">
                <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4">
                  <span className="text-gray-500">Nama Ayah</span>
                  <span className="font-medium">{studentData?.nama_ayah ?? '-'}</span>

                  <span className="text-gray-500">Nama Ibu</span>
                  <span className="font-medium">{studentData?.nama_ibu ?? '-'}</span>

                  <span className="text-gray-500">Nama Wali</span>
                  <span className="font-medium">{studentData?.nama_wali ?? '-'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default DetailStudentData
