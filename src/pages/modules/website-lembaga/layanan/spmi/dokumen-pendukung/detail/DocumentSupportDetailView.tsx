import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DocumentSupportDetailViewModel from './DocumentSupportDetailViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const DocumentSupportDetailView = () => {
  const { columns } = DocumentSupportDetailViewModel()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAdd />,
          },
        ]}
        label="Daftar Dokumen - Organiasi Penjaminan Mutu"
        isBack
      />
      <TableCustom
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
        columns={columns}
        data={[
          {
            id_lembaga_daftar_dokumen: '767ecb77-6157-43e0-8a13-3781c97c64cd',
            id_satuan_organisasi: 'b888ee51-4aea-4bea-9752-e486a79ce758',
            nama_dokumen: 'Sertifikat Akreditasi A',
            slug: 'sertifikat-akreditasi-a',
            url: 'https://storage.link/dokumen/akreditasi-a.pdf',
            public: true,
            urutan: 1,
            created_at: '2026-02-11T21:32:05.482723+07:00',
            created_user: '1',
            updated_at: '2026-02-11T21:32:05.482723+07:00',
            updated_user: '1',
            nama_user_created: 'Administrator',
            nama_user_updated: 'Administrator',
            jumlah_dokumen_pendukung_akreditasi: 5,
          },
        ]}
        loading={false}
        isShowLimit={false}
      />
    </div>
  )
}

export default DocumentSupportDetailView
