import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { FaUserFriends } from 'react-icons/fa'
import { format } from 'date-fns'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { UseGetDetailInternshipVacancy } from '../hooks/index.tsx'

export const DetailInternshipVacancy = () => {
  const { id } = useParams()
  const { internshipVacancy } = UseGetDetailInternshipVacancy(id as string)

  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-5 bg-white p-5">
        <ButtonTitleGroup
          label={'Detail Lowongan Pekerjaan'}
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link to={`/modules/pusat-karir/service/internship-vacancy/${id}/applicant`}>
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                  >
                    <FaUserFriends /> Jumlah Pelamar ({internshipVacancy?.jumlah_pelamar})
                  </Button>
                </Link>
              ),
            },
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/pusat-karir/service/internship-vacancy/${id}/edit`),
            },
          ]}
        />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Pembuka Lowongan</p>
          <p>{internshipVacancy?.nama_mitra_kerja}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{internshipVacancy?.nama_pekerjaan}</p>
          <p className="text-gray-500">Spesialisasi</p>
          <ul className={'flex gap-2 items-center'}>
            {internshipVacancy?.list_data_spesialisasi?.map((item, k) => (
              <li key={k}>{item?.nama_spesialisasi}</li>
            ))}
          </ul>
          <p className="text-gray-500">Kouta</p>
          <p>{internshipVacancy?.kouta_pekerjaan}</p>
          <p className="text-gray-500">Jenis Lokasi Kerja</p>
          <p>{internshipVacancy?.jenis_lokasi_kerja}</p>
          <p className="text-gray-500">Provinsi</p>
          <p>{internshipVacancy?.nama_provinsi}</p>
          <p className="text-gray-500">Kabupaten / Kota</p>
          <p>{internshipVacancy?.nama_kabupaten}</p>
          <p className="text-gray-500">Jenis Pekerjaan</p>
          <p>{internshipVacancy?.jenis_pekerjaan}</p>
          <p className="text-gray-500">Periode Pendaftaran</p>
          <p>
            {internshipVacancy?.tgl_buka_pekerjaan
              ? format(internshipVacancy?.tgl_buka_pekerjaan, 'dd-MM-yyyy')
              : ''}{' '}
            s.d{' '}
            {internshipVacancy?.tgl_tutup_pekerjaan
              ? format(internshipVacancy.tgl_tutup_pekerjaan, 'dd-MM-yyyy')
              : ''}
          </p>
          <p className="text-gray-500">Deskripsi Pekerjaan</p>
          <RenderHTMLContent content={internshipVacancy?.deskripsi_pekerjaan ?? ''} />
          <p className="text-gray-500">Tugas dan Tanggung Jawab*</p>
          <RenderHTMLContent content={internshipVacancy?.tugas_dan_tanggung_jawab ?? ''} />
          <p className="text-gray-500">Persyaratan</p>
          <RenderHTMLContent content={internshipVacancy?.persyaratan ?? ''} />
        </div>
      </div>
    </>
  )
}
