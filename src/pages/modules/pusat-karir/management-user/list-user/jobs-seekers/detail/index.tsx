import { Link, useParams } from 'react-router-dom'
import { UseGetDetailJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { differenceInYears, format } from 'date-fns'

const DataItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={'flex flex-col gap-1.5'}>
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold capitalize text-gray-700">{value}</p>
    </div>
  )
}

export const DetailUserJobsSeekers = () => {
  const { id } = useParams()
  const { detail } = UseGetDetailJobsSeekers((id as string) ?? '')

  return (
    <>
      <div className={'space-y-5 w-full bg-white p-5'}>
        <ButtonTitleGroup
          label={'Detail User - Pencari Kerja'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-1.5'}>
                  <div className={'size-4 rounded-full bg-green-500'} />
                  Aktif
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                  >
                    <HiPencil />
                    Edit Data User
                  </Button>
                </div>
              ),
            },
          ]}
        />

        <img
          src={detail?.data_diri?.url_foto_profil ?? '/noimg.png'}
          alt={detail?.data_diri?.nama_lengkap}
          className={'w-[200px] h-[270px] rounded'}
        />

        <TitleLine title={'Data Diri'} />
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3">
            <DataItem label={'Nama Lengkap'} value={detail?.data_diri?.nama_lengkap ?? '-'} />
          </div>
          <DataItem label={'Tempat Lahir'} value={detail?.data_diri?.tempat_lahir ?? '-'} />
          <DataItem
            label={'Tanggal Lahir'}
            value={
              detail?.data_diri?.tanggal_lahir
                ? format(detail?.data_diri.tanggal_lahir, 'dd-MM-yyy')
                : '-'
            }
          />
          <DataItem
            label={'Usia'}
            value={differenceInYears(
              new Date(),
              new Date(detail?.data_diri?.tanggal_lahir ?? '')
            ).toString()}
          />
          <DataItem
            label={'Jenis Kelamin'}
            value={detail?.data_diri?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
          />
          <DataItem label={'Agama'} value={detail?.data_diri?.agama ?? '-'} />
          <DataItem
            label={'Status Pernikahan'}
            value={detail?.data_diri?.status_pernikahan?.split('_').join(' ').toLowerCase() ?? '-'}
          />
          <DataItem
            label={'Kewarganegaraan'}
            value={detail?.data_diri?.nama_kewarganegaraan ?? '-'}
          />
          <DataItem label={'NIK/ No. Passpor'} value={detail?.data_diri?.nik ?? '-'} />
          <div />

          <DataItem label={'No. Handphone'} value={detail?.data_diri?.no_handphone ?? '-'} />
          <DataItem
            label={'No. Handphone 2'}
            value={detail?.data_diri?.no_handphone_2 ?? 'No. Handphone 2 (Opsional)'}
          />
          <DataItem
            label={'No. Telepon'}
            value={detail?.data_diri?.no_handphone_2 ?? 'No. Telepon (Opsional)'}
          />

          <DataItem label={'Email'} value={detail?.data_diri?.email ?? '-'} />

          <DataItem label={'Email Alternatif'} value={detail?.data_diri?.email_alternatif ?? '-'} />

          <DataItem label={'Website'} value={detail?.data_diri?.website ?? '-'} />
        </div>

        <TitleLine title={'Alamat Domisili'} />
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3">
            <DataItem label={'Alamat Lengkap'} value={detail?.alamat?.alamat_lengkap ?? '-'} />
          </div>
          <DataItem label={'Provinsi'} value={detail?.alamat?.nama_provinsi ?? '-'} />
          <DataItem label={'Kota'} value={detail?.alamat?.nama_kabupaten_kota ?? '-'} />
          <DataItem label={'Kode Pos'} value={detail?.alamat?.kode_pos ?? '-'} />
        </div>

        <TitleLine title={'Alamat KTP'} />
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-3">
            <DataItem label={'Alamat Lengkap'} value={detail?.alamat_ktp?.alamat_lengkap ?? '-'} />
          </div>
          <DataItem label={'Provinsi'} value={detail?.alamat_ktp?.nama_provinsi ?? '-'} />
          <DataItem label={'Kota'} value={detail?.alamat_ktp?.nama_kabupaten_kota ?? '-'} />
          <DataItem label={'Kode Pos'} value={detail?.alamat_ktp?.kode_pos ?? '-'} />
        </div>

        <TitleLine title={'Pendidikan Terakhir'} />
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Universitas Asal*</p>
          <p className="font-semibold text-gray-800 capitalize">
            {detail?.pendidikan_terakhir?.universitas_asal?.split('_').join(' ').toLowerCase() ?? ''}
          </p>
          <p className="text-gray-500">Tingkat</p>
          <p className="font-semibold text-gray-800 capitalize">
            {detail?.pendidikan_terakhir?.pendidikan_terakhir ?? '-'}
          </p>
          <p className="text-gray-500">Universitas</p>
          <p className="font-semibold text-gray-800 capitalize">Nama</p>
          <p className="text-gray-500">Fakultas</p>
          <p className="font-semibold text-gray-800 capitalize">
            {detail?.pendidikan_terakhir?.nama_fakultas ?? '-'}
          </p>
          <p className="text-gray-500">Prodi</p>
          <p className="font-semibold text-gray-800 capitalize">
            {detail?.pendidikan_terakhir?.nama_prodi ?? '-'}
          </p>
          <p className="text-gray-500">NIM</p>
          <p className="font-semibold text-gray-800 capitalize">
            {detail?.pendidikan_terakhir?.nim ?? '-'}
          </p>
        </div>

        <TitleLine title={'Bidang / Spesialisasi Pekerjaan Yang Diminati'} />
        <div className="grid grid-cols-4 gap-5">
          {detail?.sub_spesialis?.map((row, index) => (
            <div className={'p-2 border border-primary rounded text-primary w-full'} key={index}>
              {row?.nama_sub_spesialis ?? ''}
            </div>
          ))}
        </div>

        <TitleLine title={'CV / Resume'} />
        <ul className={'text-blue-700 pl-5 list-disc'}>
          <li>harap upload cv / resume yang terbaru.</li>
          <li>Jenis file yang diterima : .pdf.</li>
          <li>Max 2 MB</li>
        </ul>

        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">CV/ Resume</p>
          <Link
            to={detail?.files?.url_cv ?? '#'}
            target={'_blank'}
            className="font-semibold text-blue-700 underline underline-offset-2 cursor-pointer"
          >
            Buka CV/ Resume
          </Link>
        </div>
      </div>
    </>
  )
}
