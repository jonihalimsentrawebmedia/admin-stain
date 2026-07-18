import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdDownload } from 'react-icons/md'
import { Separator } from '@/components/ui/separator.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { UseGetUnitAnnouncementDetail } from '../hooks/index'
import { ButtonSubmissionAnnouncementUnit } from '../components/buttonSubmission'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'

export const AnnouncementProdiDetailUnit = () => {
  const { id } = useParams()
  const { unitAnnouncementDetail: detail } = UseGetUnitAnnouncementDetail(id ?? '')
  const navigate = useNavigate()

  const options =
    detail?.dokumens?.map((item, index) => ({
      value: item?.url_dokumen,
      label: `Dokumen ${index + 1}`,
    })) ?? []

  const [document, setDocument] = useState<any>(options[0] ?? null)

  useEffect(() => {
    if (options.length > 0 && !document) {
      setDocument(options[0])
    }
  }, [options])

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
                          `/modules/website-unit/public-content/announcement/edit/${detail?.id_pengumuman}?from=detail`
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
                  <ButtonSubmissionAnnouncementUnit {...(detail as IAnnouncement)} />
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
          link={'/modules/website-unit/public-content/announcement'}
        />
        <Separator className={'my-5'} />

        <div className={'flex flex-col lg:flex-row items-start gap-6 lg:gap-x-8 px-4 sm:px-5'}>
          <div className="w-full lg:w-7/12">
            <p className="text-xl sm:text-2xl font-semibold">{detail?.judul_pengumuman}</p>

            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <p className="text-gray-500 text-sm">Tanggal Terbit</p>
                <p className="text-primary text-sm sm:text-base">
                  {detail?.published_at
                    ? format(detail?.published_at, 'dd-MM-yyyy, HH:mm:ss')
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Diterbitkan Oleh</p>
                <p className="text-primary text-sm sm:text-base">{detail?.penulis}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Dokumen</p>
                <ul className={'flex flex-col gap-2'}>
                  {detail?.dokumens?.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item?.url_dokumen}
                        target="_blank"
                        className={
                          'text-primary underline underline-offset-2 flex items-center gap-1.5 p-2 border border-primary rounded w-fit text-sm sm:text-base'
                        }
                      >
                        <MdDownload /> Unduh Dokumen {index + 1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <p className="text-gray-500 text-sm">Deskripsi</p>
                <div
                  className={'flex flex-col gap-4 mt-2 text-sm sm:text-base'}
                  dangerouslySetInnerHTML={{ __html: detail?.isi_pengumuman ?? '' }}
                />
              </div>
            </div>
          </div>

          <div className={'w-full lg:w-5/12'}>
            <div className="flex items-center my-5 gap-2">
              <span className="text-sm sm:text-base whitespace-nowrap">Tampilkan</span>
              <Select
                className={'w-full'}
                placeholder={'Pilih Dokumen'}
                options={options}
                onChange={(e) => setDocument(e as any)}
                value={document}
              />
            </div>

            {document?.value && (
              <iframe
                src={document?.value}
                width="100%"
                height="500"
                className="sm:h-[950px]"
                style={{ border: 'none' }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
