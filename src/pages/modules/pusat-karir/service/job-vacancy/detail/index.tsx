import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/hoooks'
import { Button } from '@/components/ui/button.tsx'
import { FaUserFriends } from 'react-icons/fa'
import { format } from 'date-fns'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

export const DetailJobVacancy = () => {
  const { id } = useParams()
  const { jobVacancy } = UseGetDetailJobVacancy(id as string)

  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Detail Lowongan Pekerjaan'}
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link to={`/modules/pusat-karir/service/job-vacancy/${id}/applicant`}>
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                  >
                    <FaUserFriends /> Jumlah Pelamar ({jobVacancy?.jumlah_pelamar})
                  </Button>
                </Link>
              ),
            },
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/pusat-karir/service/job-vacancy/${id}/edit`),
            },
          ]}
        />

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Pembuka Lowongan</p>
          <p>{jobVacancy?.nama_mitra_kerja}</p>
          <p className="text-gray-500">Jabatan</p>
          <p>{jobVacancy?.nama_pekerjaan}</p>
          <p className="text-gray-500">Spesialisasi</p>
          <ul className={'flex gap-2 items-center'}>
            {jobVacancy?.list_data_spesialisasi?.map((item, k) => (
              <li key={k}>{item?.nama_spesialisasi}</li>
            ))}
          </ul>
          <p className="text-gray-500">Kouta</p>
          <p>{jobVacancy?.kouta_pekerjaan}</p>
          <p className="text-gray-500">Jenis Lokasi Kerja</p>
          <p>{jobVacancy?.jenis_lokasi_kerja}</p>
          <p className="text-gray-500">Provinsi</p>
          <p>{jobVacancy?.nama_provinsi}</p>
          <p className="text-gray-500">Kabupaten / Kota</p>
          <p>{jobVacancy?.nama_kabupaten}</p>
          <p className="text-gray-500">Jenis Pekerjaan</p>
          <p>{jobVacancy?.jenis_pekerjaan}</p>
          <p className="text-gray-500">Periode Pendaftaran</p>
          <p>
            {jobVacancy?.tgl_buka_pekerjaan
              ? format(jobVacancy?.tgl_buka_pekerjaan, 'dd-MM-yyyy')
              : ''}{' '}
            s.d{' '}
            {jobVacancy?.tgl_tutup_pekerjaan
              ? format(jobVacancy.tgl_tutup_pekerjaan, 'dd-MM-yyyy')
              : ''}
          </p>
          <p className="text-gray-500">Deskripsi Pekerjaan</p>
          <RenderHTMLContent content={jobVacancy?.deskripsi_pekerjaan ?? ''} />
          <p className="text-gray-500">Tugas dan Tanggung Jawab*</p>
          <RenderHTMLContent content={jobVacancy?.tugas_dan_tanggung_jawab ?? ''} />
          <p className="text-gray-500">Persyaratan</p>
          <RenderHTMLContent content={jobVacancy?.persyaratan ?? ''} />
        </div>
      </div>
    </>
  )
}
