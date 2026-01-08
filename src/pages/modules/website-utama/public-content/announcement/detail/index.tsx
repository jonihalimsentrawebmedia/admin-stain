import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPencil } from 'react-icons/hi'
import { MdDownload } from 'react-icons/md'
import { Separator } from '@/components/ui/separator.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseGetAnnouncementDetail } from '@/pages/modules/website-utama/public-content/announcement/hooks'
import { format } from 'date-fns'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { ButtonSubmissionAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/components/buttonSubmission.tsx'

export const AnnouncementDetailPage = () => {
  const { id } = useParams()
  const { detailAnnouncement: detail } = UseGetAnnouncementDetail(id ?? '')
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
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  Status :{' '}
                  <p className="text-blue-600 font-semibold">
                    {detail?.status_publish.split('_').join(' ')}
                  </p>
                  <Button
                    onClick={() =>
                      navigate(
                        `/modules/website-utama/public-content/announcement/edit/${detail?.id_pengumuman}`
                      )
                    }
                    className={'border-primary text-primary hover:text-primary'}
                    variant={'outline'}
                  >
                    <HiPencil /> Edit Data
                  </Button>
                </div>
              ),
            },
            {
              type: 'custom',
              element:
                detail?.status_publish === 'DRAFT' ? (
                  <div className={'flex items-center gap-1.5 border-l border-gray-500 pl-2'}>
                    <ButtonSubmissionAnnouncement {...detail} />
                  </div>
                ) : (
                  <></>
                ),
            },
          ]}
          isBack={true}
        />
        <Separator className={'my-5'} />

        <div className={'flex items-start gap-x-8 px-5'}>
          <div className="w-7/12">
            <p className="text-2xl font-semibold">{detail?.judul_pengumuman}</p>

            <div className="my-5 grid grid-cols-2 gap-5">
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

          <div className={'w-5/12'}>
            <div className="flex items-center my-5 gap-2">
              Tampilkan
              <Select
                className={'w-full'}
                placeholder={'Pilih Dokumen'}
                options={options}
                onChange={(e) => setDocument(e as any)}
                value={document}
              />
            </div>

            <iframe
              src={document?.value ?? ''}
              width="100%"
              height="950px"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
