import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import {
  UseGetStepApproved,
  UseGetStudentLetter,
} from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/hook'
import { ButtonUpdateStepApproval } from './components/buttonUpdate.tsx'
import { ButtonAddLetter } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/components/buttonAddLetter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStudentLetter } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/types/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const CertificateStudent = () => {
  const navigate = useNavigate()
  const { stepApproval } = UseGetStepApproved()
  const { studentLetter, meta, loading } = UseGetStudentLetter()
  const columns = ColumnsStudentLetter()

  console.log(studentLetter)

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Surat Keterangan Mahasiswa'}
          buttonGroup={[
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
          ]}
        />

        <Accordion type={'single'} defaultValue={'alur'} collapsible>
          <AccordionCustom
            name={'alur'}
            title={'Alur Pengajuan'}
            contentClassName={'flex flex-col gap-5'}
          >
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: stepApproval?.alur_pengajuan ?? '' }}
            />
            <ButtonUpdateStepApproval data={stepApproval} />
          </AccordionCustom>
        </Accordion>

        <ButtonTitleGroup
          label={'Daftar Surat Keterangan Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetter />,
            },
          ]}
        />

        <TableCustom
          columns={columns ?? []}
          data={studentLetter}
          loading={loading}
          meta={meta}
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          }
        />
      </div>
    </>
  )
}
