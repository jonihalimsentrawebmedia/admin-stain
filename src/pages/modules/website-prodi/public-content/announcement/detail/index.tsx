import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdDownload } from 'react-icons/md'
import { Separator } from '@/components/ui/separator.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Select from 'react-select'
import { useState } from 'react'
import { UseGetProdiAnnouncementDetail } from '../hooks/index'
import { ButtonSubmissionAnnouncementProdi } from '@/pages/modules/website-prodi/public-content/announcement/components/buttonSubmission.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'

export const AnnouncementProdiDetailPage = () => {
  const { id } = useParams()
  const { prodiAnnouncementDetail: detail } = UseGetProdiAnnouncementDetail(id ?? '')
  const navigate = useNavigate()

  const options =
    detail?.dokumens?.map((item, index) => ({
      value: item?.url_dokumen,
      label: `Dokumen ${index + 1}`,
    })) ?? []

  const [document, setDocument] = useState<any>(null)
  const doc = document ?? options[0]

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Detail Pengumuman'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => {},
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish.split('_').join(' ')}
                  </p>
                  {detail?.status_publish !== 'PUBLISHED' && (
                    <Button
                      size={'sm'}
                      onClick={() =>
                        navigate(
                          `/modules/website-prodi/public-content/announcement/edit/${detail?.id_pengumuman}?from=detail`
                        )
                      }
                      className={'border-primary text-primary hover:text-primary'}
                      variant={'outline'}
                    >
                      <HiPencil /> Edit Data
                    </Button>
                  )}
                </div>
              ),
            },
            {
              type: 'custom',
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <ButtonSubmissionAnnouncementProdi {...(detail as IAnnouncement)} />
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
          link={'/modules/website-prodi/public-content/announcement'}
        />
        <Separator className={'my-5'} />

        <div className={'flex flex-col lg:flex-row items-start gap-6 lg:gap-x-8 px-2 lg:px-0'}>
          <div className="w-full lg:w-7/12">
            <p className="lg:text-2xl font-semibold">{detail?.judul_pengumuman}</p>

            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-gray-500">Tanggal Terbit</p>
                <p className="text-primary">
                  {detail?.published_at
                    ? format(detail?.published_at, 'dd-MM-yyyy, HH:mm:ss')
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Diterbitkan Oleh</p>
                <p className="text-primary">{detail?.penulis}</p>
              </div>
              <div>
                <p className="text-gray-500">Dokumen</p>
                <ul className={'flex flex-col gap-2'}>
                  {detail?.dokumens?.map((item, index) => (
                    <li key={index} className="">
                      <Link
                        to={item?.url_dokumen}
                        target="_blank"
                        className={
                          'text-primary underline underline-offset-2 flex items-center gap-1.5 p-2 border border-primary rounded w-fit'
                        }
                      >
                        <MdDownload /> Unduh Dokumen {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500">Deskripsi</p>
                <div
                  className={'flex flex-col gap-4 mt-2'}
                  dangerouslySetInnerHTML={{ __html: detail?.isi_pengumuman ?? '' }}
                />
              </div>
            </div>
          </div>

          <div className={'w-full lg:w-5/12'}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center my-5 gap-2">
              <span className="text-nowrap">Tampilkan</span>
              <Select
                className={'w-full'}
                placeholder={'Pilih Dokumen'}
                options={options}
                onChange={(e) => setDocument(e as any)}
                value={doc}
              />
            </div>

            {doc?.value ? (
              <iframe
                src={doc.value}
                width="100%"
                height="950px"
                className="max-lg:h-[500px]"
                style={{ border: 'none' }}
              />
            ) : (
              <div className="flex items-center justify-center h-[300px] lg:h-[950px] bg-gray-50 rounded border">
                <p className="text-gray-400">Belum ada dokumen</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}