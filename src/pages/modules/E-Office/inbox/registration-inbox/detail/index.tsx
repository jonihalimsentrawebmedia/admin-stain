import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/hooks'
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
import { ButtonShowDisposition } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/disposisi/component/buttonShow.tsx'
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
import { ButtonComment } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/comment/component/buttonComment.tsx'

export const DetailInboxRegistration = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { detailInbox } = UseGetDetailInbox(id as string)

  return (
    <>
      <div className="space-y-5 py-10">
        <ButtonTitleGroup
          label={'Detail Surat Masuk'}
          isBack
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => navigate(`/modules/e-office/inbox/registration-inbox/edit/${id}`),
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
                <p className="text-gray-500 text-sm">Informasi Lengkap Mengenai Surat Masuk</p>
              </div>
            </div>

            <hr className={'my-2 border-green-400'} />

            <div className="grid grid-cols-2 w-fit gap-5 gap-y-4">
              <div className={'flex items-center gap-2.5 col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <RiBuildingLine className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col col-span-2">
                  <p className="text-gray-500">Satuan Kerja: </p>
                  <p>{detailInbox?.nama_unit}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <IoShieldCheckmarkSharp className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col ">
                  <p className="text-gray-500">Sifat Surat: </p>
                  <p>{detailInbox?.nama_sifat_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaRegFileAlt className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Jenis Surat: </p>
                  <p>{detailInbox?.nama_jenis_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <GoLaw className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Klasifikasi Surat: </p>
                  <p>{detailInbox?.nama_klasifikasi_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <RiBuildingLine className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Asal Surat: </p>
                  <p>{detailInbox?.nama_asal_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaRegUser className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Kepada: </p>
                  <p>{detailInbox?.penerima_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaHashtag className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Nomor Surat: </p>
                  <p>{detailInbox?.nomor_surat}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaRegCalendarAlt className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Tanggal: </p>
                  <p>
                    {detailInbox?.tanggal_surat
                      ? format(detailInbox?.tanggal_surat, 'dd/MM/yyyy')
                      : ''}
                  </p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-1'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <LuClipboard className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Nomor Agenda: </p>
                  <p>{detailInbox?.nomor_agenda ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <BsTag className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col col-span-2">
                  <p className="text-gray-500">Perihal: </p>
                  <p>{detailInbox?.perihal ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <TbShare3 className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <p className="text-gray-500">Tebusan: </p>
                  <p>{detailInbox?.tembusan ?? '-'}</p>
                </div>
              </div>

              <div className={'flex items-center gap-2.5 col-span-2'}>
                <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                  <FaRegFileLines className={'size-5 text-primary'} />
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <p className="text-gray-500">Ringkasan Surat: </p>
                  <p>{detailInbox?.ringkasan ?? '-'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {detailInbox?.is_agenda && (
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

              <div className="grid grid-cols-4 w-fit gap-5 gap-y-4">
                <div className={'flex items-center gap-2.5 col-span-2'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <FaRegFileAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-4">
                    <p className="text-gray-500">Nama Kegiatan: </p>
                    <p>{detailInbox?.nama_kegiatan}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-2'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <IoChatboxOutline className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-4">
                    <p className="text-gray-500">Keterangan: </p>
                    <p>{detailInbox?.keterangan_agenda ?? '-'}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <FaRegCalendarAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <p className="text-gray-500">Tanggal Mulai: </p>
                    <p>
                      {detailInbox?.tanggal_mulai
                        ? format(detailInbox?.tanggal_mulai, 'dd/MM/yyyy')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <FaRegClock className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <p className="text-gray-500">Jam Mulai: </p>
                    <p>
                      {detailInbox?.tanggal_mulai
                        ? format(detailInbox?.tanggal_mulai, 'HH:mm')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <FaRegCalendarAlt className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <p className="text-gray-500">Tanggal Selesai: </p>
                    <p>
                      {detailInbox?.tanggal_selesai
                        ? format(detailInbox?.tanggal_selesai, 'dd/MM/yyyy')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-1'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <FaRegClock className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <p className="text-gray-500">Jam Mulai: </p>
                    <p>
                      {detailInbox?.tanggal_selesai
                        ? format(detailInbox?.tanggal_selesai, 'HH:mm')
                        : ''}
                    </p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-4'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <GrLocation className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <p className="text-gray-500">Tempat / Lokasi: </p>
                    <p>{detailInbox?.tempat}</p>
                  </div>
                </div>

                <div className={'flex items-center gap-2.5 col-span-4'}>
                  <div className={'bg-blue-200 p-2 rounded-lg w-fit'}>
                    <BsBell className={'size-5 text-primary'} />
                  </div>
                  <div className="flex flex-col col-span-4">
                    <p className="text-gray-500">Pengingat: </p>
                    <p>{detailInbox?.nama_waktu_pengingat_agenda}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {detailInbox?.is_lampiran && (
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

              <div className="grid grid-cols-3 gap-5 mt-4">
                {detailInbox?.lampiran?.map((item, index) => (
                  <Link
                    to={item?.lampiran_url}
                    key={index}
                    className="flex items-center gap-1.5 border p-2 rounded-md bg-blue-200 hover:bg-primary hover:text-white"
                  >
                    <FaFile />
                    Lampiran FIle {index + 1}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {detailInbox?.is_disposisi && (
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
                  <p className={'capitalize'}>{detailInbox?.jenis_disposisi}</p>
                </div>
              </div>

              <div className={'flex flex-col gap-1.5'}>
                {detailInbox?.pejabat?.map((row, index) => (
                  <Fragment key={index}>
                    <div className="flex items-start gap-4">
                      <div className={'flex flex-col p-4 border w-full rounded-lg'}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className={'rounded-full p-2 bg-blue-200'}>
                              <MdMailOutline />
                            </div>
                            <p className="text-sm">{row?.status?.split('_').join(' ')}</p>
                          </div>
                          <div
                            className={
                              'text-orange-500 bg-orange-100 p-1.5 font-semibold text-xs rounded'
                            }
                          >
                            1 Orang
                          </div>
                        </div>

                        <div className="bg-blue-100 p-4 border-primary mt-4 rounded border flex items-center gap-2.5">
                          <img
                            src={row?.gambar_sdm ?? '/img/noimg.png'}
                            alt={row?.nama_sdm}
                            className={'w-16 h-16 rounded-full object-cover'}
                          />
                          <div>
                            <p className="text-lg font-semibold">{row?.nama_sdm}</p>
                            <p className={'text-primary'}>{row?.status?.split('_').join(' ')}</p>
                          </div>
                        </div>
                      </div>

                      <div className={'flex flex-col p-4 border w-full rounded-lg'}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className={'rounded-full p-2 bg-blue-200'}>
                              <FaCheck className={'size-3'} />
                            </div>
                            <p className="text-sm">Dibaca</p>
                          </div>
                          <div
                            className={
                              'text-blue-500 bg-blue-100 p-1.5 font-semibold text-xs rounded'
                            }
                          >
                            0 Orang
                          </div>
                        </div>
                        <div className="bg-blue-100 p-4 border-primary mt-4 rounded border flex items-center gap-2.5">
                          {row?.komentar ? (
                            <></>
                          ) : (
                            <>
                              <div className="flex flex-col">
                                <IoFileTrayOutline className={'size-10'} />
                                <p className="text-gray-500">Belum Ada Yang Baca</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <ButtonComment id={row?.id_pejabat_surat_masuk} />
                    </div>
                  </Fragment>
                ))}
              </div>

              <ButtonShowDisposition data={detailInbox} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
