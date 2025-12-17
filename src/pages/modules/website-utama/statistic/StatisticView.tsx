import { Form } from '@/components/ui/form'
import StatisticViewModel from './StatisticViewModel'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'
import ImageStatistic from './components/ImageStatistic'
import TextInput from '@/components/common/form/TextInput'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput'
import { dateOptions, generateYearData, monthOptions } from './data'
import { RichText } from '@/components/common/richtext'

const StatisticView = () => {
  const {
    changeOnEdit,
    field,
    form,
    isEdit,
    imageStatistic,
    handleSave,
    loadingSave,
    setImageStatistic,
    goToLog,
  } = StatisticViewModel()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={
            isEdit
              ? [
                  {
                    label: 'Batal',
                    onClick: () => {
                      changeOnEdit()
                    },
                    type: 'cancel',
                    isDisabled: loadingSave,
                  },
                  {
                    label: 'Simpan',
                    onClick: handleSave,
                    type: 'save',
                    isDisabled: loadingSave,
                  },
                ]
              : [
                  {
                    label: '',
                    onClick: () => {},
                    type: 'add',
                    element: (
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          goToLog()
                        }}
                        variant={'outline'}
                        className="border border-[#2769CD] text-[#2769CD] hover:text-[#2769CD]"
                      >
                        <History />
                        Log Data
                      </Button>
                    ),
                  },
                  {
                    label: 'Edit Data',
                    onClick: (e) => {
                      e.preventDefault()
                      changeOnEdit()
                    },
                    type: 'edit',
                  },
                ]
          }
          label="Statistik"
        />
        <CardInput title="Gambar">
          {isEdit ? (
            <div className="px-4 py 2 border border-[#2769CD] rounded-lg bg-[#F5F9FF]">
              <ul className="list-outside text-[#464646] list-disc pl-4 ml-4">
                <li>Minimal ada 1 gambar</li>
                <li>
                  Kriteria Gambar:
                  <ul className="ml-4 pl-4 list-[lower-alpha] list-outside">
                    <li>Ukuran 280 x 320 px</li>
                    <li>Berekstensi PNG/JPG/JPEG</li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-[#2769CD]">Minimal ada 1 gambar yang diupload</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageStatistic.map((item, index) => (
              <ImageStatistic
                key={'image-statistic' + index}
                form={form}
                setImage={(image) => {
                  const temp = [...imageStatistic]
                  temp[index] = image
                  setImageStatistic(temp)
                }}
                minWidth={280}
                minheight={320}
                image={item}
                index={index}
                isEdit={isEdit}
                handleSave={handleSave}
              />
            ))}
          </div>
        </CardInput>
        <CardInput title="Tanggal Berdiri">
          {isEdit ? (
            <div className="flex gap-4">
              <SelectBasicInput
                data={dateOptions}
                form={form}
                name="tanggal"
                placeholder="Pilih"
                label="Tanggal"
                selectClassName="min-w-[150px]"
              />
              <SelectBasicInput
                data={monthOptions}
                form={form}
                name="bulan"
                placeholder="Pilih"
                label="Bulan"
                selectClassName="min-w-[150px]"
              />
              <SelectBasicInput
                data={generateYearData(1940)}
                form={form}
                name="tahun"
                placeholder="Pilih"
                label="Tahun"
                selectClassName="min-w-[150px]"
              />
            </div>
          ) : (
            <div>
              {form.watch('tanggal')}-
              {monthOptions.filter((item) => item.value == form.watch('bulan'))[0]?.label}-
              {form.watch('tahun')}
            </div>
          )}
        </CardInput>
        <CardInput title="Teks Pengantar">
          {isEdit ? (
            <RichText isRow={false} className='gap-2!'  form={form} name="teks_pengantar" label="Isi Teks Pengantar" />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: form.watch('teks_pengantar') }}></div>
          )}
        </CardInput>
        <CardInput title="Angka">
          {isEdit ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput form={form} name="mahasiswa" isNumber type="number" label="Mahasiswa" />
              <TextInput form={form} name="lektor" isNumber type="number" label="Lektor" />
              <TextInput
                form={form}
                name="program_studi"
                isNumber
                type="number"
                label="Program Studi"
              />
              <TextInput
                form={form}
                name="asisten_ahli"
                isNumber
                type="number"
                label="Asisten Ahli"
              />
              <TextInput form={form} name="guru_besar" isNumber type="number" label="Guru Besar" />
              <TextInput
                form={form}
                name="staf_pengajar"
                isNumber
                type="number"
                label="Staf Pengajar"
              />
              <TextInput
                form={form}
                name="lektor_kepala"
                isNumber
                type="number"
                label="Lektor Kepala"
              />
            </div>
          ) : (
            <DetailField
              classNameParent="grid! grid-cols-1 lg:grid-cols-2"
              isRow
              data={field}
              form={form}
            />
          )}
        </CardInput>
      </form>
    </Form>
  )
}

export default StatisticView
