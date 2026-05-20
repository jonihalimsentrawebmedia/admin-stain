import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { UseGetDetailAcademicRules } from '@/pages/modules/website-utama/peraturan-akademik/hooks'
import { TbExternalLink } from 'react-icons/tb'
import { IoLanguage } from 'react-icons/io5'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'
import ButtonAddMoreInformation from '@/pages/modules/website-utama/peraturan-akademik/more-information/component/buttonAdd.tsx'
import { UseGetMoreInformation } from '@/pages/modules/website-utama/peraturan-akademik/more-information/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsMoreInformation } from '@/pages/modules/website-utama/peraturan-akademik/more-information/data/columns.tsx'

export const AcademicRegulation = () => {
  const navigate = useNavigate()

  const { academicRules } = UseGetDetailAcademicRules()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, meta, information } = UseGetMoreInformation({
    page,
    limit,
    search,
  })
  const columns = ColumnsMoreInformation()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Peraturan Akademik'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link to={'language'} className={'bg-primary p-1.5 mt-1 rounded text-white'}>
                  <IoLanguage />
                </Link>
              ),
            },
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Peraturan Akademik"
                  valueGuide="WEBSITE_UTAMA_PENGATURAN_AKADEMIK"
                />
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
            {
              type: 'edit',
              label: 'Edit Data',
              onClick: () => {
                navigate('update')
              },
            },
          ]}
        />

        <Accordion
          className={'flex flex-col gap-5'}
          type={'multiple'}
          defaultValue={['pengantar', 'isi', 'penutup', 'dokumen']}
        >
          <AccordionCustom name={'pengantar'} title={'Pengantar'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Pengantar</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.pengantar ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'isi'} title={'Isi'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Isi</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.isi ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'penutup'} title={'Penutup'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Penutup</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.penutup ?? '' }}
              />
            </div>
          </AccordionCustom>
          <AccordionCustom name={'dokumen'} title={'Dokumen'}>
            <div className="grid grid-cols-[12rem_1fr] gap-5">
              <p className="text-gray-500">Isi Pengantar</p>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: academicRules?.dokumen_teks_pengantar ?? '' }}
              />

              <p className="text-gray-500">Dokumen</p>
              <Link to={academicRules?.dokumen_status_url ?? '#'} target={'_blank'}>
                <Button
                  className={'border border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                >
                  <TbExternalLink />
                  Buka Dokumen
                </Button>
              </Link>
            </div>
          </AccordionCustom>
        </Accordion>

        <ButtonTitleGroup
          label={'Informasi Tambahan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddMoreInformation />,
            },
          ]}
        />
        <TableCustom
          isShowFilter={false}
          columns={columns}
          data={information}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
