import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailOutbox } from '../hooks/index.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { format } from 'date-fns'
import {
  FaCheck,
  FaFile,
  FaHashtag,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegFileAlt,
  FaRegFileArchive,
  FaRegUser,
} from 'react-icons/fa'
import { IoMdMailOpen } from 'react-icons/io'
import { RiBuildingLine } from 'react-icons/ri'
import { IoChatboxOutline, IoFileTrayOutline, IoShieldCheckmarkSharp } from 'react-icons/io5'
import { GoLaw } from 'react-icons/go'
import { LuClipboard } from 'react-icons/lu'
import { BsBell, BsTag } from 'react-icons/bs'
import { TbShare3 } from 'react-icons/tb'
import { GrLocation } from 'react-icons/gr'
import { FaRegFileLines } from 'react-icons/fa6'
import { Fragment } from 'react'
import { MdMailOutline } from 'react-icons/md'

export const DetailOutboxRegistration = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { detailOutbox } = UseGetDetailOutbox(id as string)

  return (
    <>
      <div className="space-y-5 py-10">
        <ButtonTitleGroup
          label={'Detail Surat Keluar'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/e-office/outbox/registration-outbox/edit/${id}`),
            },
          ]}
        />

        <Card className={'rounded-lg border-y-0 border-r-0 border-l-6 border-primary'}>
          <CardContent className={'space-y-5'}>
            <div className="flex items-center gap-2">
              <div className="bg-primary w-fit text-white rounded-lg p-2">
                <IoMdMailOpen className={'size-5'} />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Data Surat</p>
                <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Surat Keluar</p>
              </div>
            </div>

            <hr className={'my-2 border-green-400'} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <RiBuildingLine className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Satuan Kerja: </p>
                  <p className="truncate">{detailOutbox?.nama_unit}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <IoShieldCheckmarkSharp className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Sifat Surat: </p>
                  <p className="truncate">{detailOutbox?.nama_sifat_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <FaRegFileAlt className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Jenis Surat: </p>
                  <p className="truncate">{detailOutbox?.nama_jenis_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <GoLaw className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Klasifikasi Surat: </p>
                  <p className="truncate">{detailOutbox?.nama_klasifikasi_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <FaRegUser className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Penandatangan Surat: </p>
                  <p className="truncate">{detailOutbox?.nama_penandatangan}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <MdMailOutline className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Kepada: </p>
                  <p className="truncate">{detailOutbox?.surat_kepada}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <FaHashtag className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Nomor Surat: </p>
                  <p className="truncate">{detailOutbox?.nomor_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <FaRegCalendarAlt className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Tanggal: </p>
                  <p>
                    {detailOutbox?.tanggal_surat
                      ? format(detailOutbox?.tanggal_surat, 'dd/MM/yyyy')
                      : ''}
                  </p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <LuClipboard className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Nomor Agenda: </p>
                  <p>{detailOutbox?.nomor_agenda ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <BsTag className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-500 text-sm">Perihal: </p>
                  <p>{detailOutbox?.perihal ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <TbShare3 className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <p className="text-gray-500 text-sm">Tembusan: </p>
                  <p>{detailOutbox?.tembusan ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                  <FaRegFileLines className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <p className="text-gray-500 text-sm">Ringkasan Surat: </p>
                  <p>{detailOutbox?.ringkasan ?? '-'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {detailOutbox?.is_agenda && (
          <Card className={'rounded-lg border-y-0 border-r-0 border-l-6 border-primary'}>
            <CardContent className={'space-y-5'}>
              <div className="flex items-center gap-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <FaRegCalendarAlt className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Data Agenda</p>
                  <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Data Agenda</p>
                </div>
              </div>

              <hr className={'my-2 border-green-400'} />

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-5">
                <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <FaRegFileAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Nama Kegiatan: </p>
                    <p>{detailOutbox?.nama_kegiatan}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-2'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <IoChatboxOutline className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Keterangan: </p>
                    <p>{detailOutbox?.keterangan_agenda ?? '-'}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <FaRegCalendarAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Tanggal Mulai: </p>
                    <p>
                      {detailOutbox?.tanggal_mulai
                        ? format(detailOutbox?.tanggal_mulai, 'dd/MM/yyyy')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <FaRegClock className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Jam Mulai: </p>
                    <p>
                      {detailOutbox?.tanggal_mulai
                        ? format(detailOutbox?.tanggal_mulai, 'HH:mm')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <FaRegCalendarAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Tanggal Selesai: </p>
                    <p>
                      {detailOutbox?.tanggal_selesai
                        ? format(detailOutbox?.tanggal_selesai, 'dd/MM/yyyy')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <FaRegClock className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Jam Selesai: </p>
                    <p>
                      {detailOutbox?.tanggal_selesai
                        ? format(detailOutbox?.tanggal_selesai, 'HH:mm')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-4'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <GrLocation className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Tempat / Lokasi: </p>
                    <p>{detailOutbox?.tempat}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1 sm:col-span-4'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit shrink-0'}>
                    <BsBell className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-gray-500 text-sm">Pengingat: </p>
                    <p>{detailOutbox?.nama_waktu_pengingat_agenda} Menit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {detailOutbox?.is_lampiran && (
          <Card className={'rounded-lg border-y-0 border-r-0 border-l-6 border-primary'}>
            <CardContent className={'space-y-5'}>
              <div className="flex items-center gap-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <FaRegFileArchive className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Lampiran</p>
                  <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Data Lampiran</p>
                </div>
              </div>

              <hr className={'my-2 border-green-400'} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-4">
                {detailOutbox?.lampiran?.map((item, index) => (
                  <Link
                    target={'_blank'}
                    to={item?.lampiran_url}
                    key={index}
                    className="flex items-center gap-1.5 border p-2 rounded-md bg-blue-200 hover:bg-primary hover:text-white truncate"
                  >
                    <FaFile className="shrink-0" />
                    <span className="truncate">{item?.nama_lampiran}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {detailOutbox?.is_disposisi && (
          <Card className={'rounded-lg border-y-0 border-r-0 border-l-6 border-primary'}>
            <CardContent className={'space-y-5'}>
              <div className="flex items-center gap-2">
                <div className="bg-primary w-fit text-white rounded-lg p-2">
                  <IoFileTrayOutline className={'size-5'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Disposisi</p>
                  <p className="text-gray-500 text-sm">Informasi Disposisi Surat</p>
                </div>
              </div>

              <hr className={'my-2 border-green-400'} />

              <div className={'flex items-center gap-2.5 col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaRegFileLines className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-gray-500">Jenis Disposisi: </p>
                  <p className={'capitalize'}>{detailOutbox?.jenis_disposisi}</p>
                </div>
              </div>

              <div className={'flex flex-col gap-1.5'}>
                {detailOutbox?.pejabat?.map((row, index) => (
                  <Fragment key={index}>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className={'flex flex-col p-3 sm:p-4 border w-full rounded-lg'}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className={'rounded-full p-2 bg-blue-200'}>
                              <MdMailOutline />
                            </div>
                            <p className="text-xs sm:text-sm">{row?.status?.split('_').join(' ')}</p>
                          </div>
                          <div
                            className={
                              'text-orange-500 bg-orange-100 p-1.5 font-semibold text-xs rounded'
                            }
                          >
                            1 Orang
                          </div>
                        </div>

                        <div className="bg-blue-100 p-3 sm:p-4 border-primary mt-4 rounded border flex items-center gap-2.5">
                          <img
                            src={row?.gambar_sdm ?? '/img/noimg.png'}
                            alt={row?.nama_sdm}
                            className={'w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover shrink-0'}
                          />
                          <div className="min-w-0">
                            <p className="text-sm sm:text-lg font-semibold truncate">{row?.nama_sdm}</p>
                            <p className={'text-primary text-xs sm:text-sm'}>{row?.status?.split('_').join(' ')}</p>
                          </div>
                        </div>
                      </div>

                      <div className={'flex flex-col p-3 sm:p-4 border w-full rounded-lg'}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className={'rounded-full p-2 bg-blue-200'}>
                              <FaCheck className={'size-3'} />
                            </div>
                            <p className="text-xs sm:text-sm">Dibaca</p>
                          </div>
                          <div
                            className={
                              'text-blue-500 bg-blue-100 p-1.5 font-semibold text-xs rounded'
                            }
                          >
                            0 Orang
                          </div>
                        </div>
                        <div className="bg-blue-100 p-3 sm:p-4 border-primary mt-4 rounded border flex items-center gap-2.5">
                          {row?.komentar ? (
                            <></>
                          ) : (
                            <>
                              <div className="flex flex-col">
                                <IoFileTrayOutline className={'size-8 sm:size-10'} />
                                <p className="text-gray-500 text-sm">Belum Ada Yang Baca</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
