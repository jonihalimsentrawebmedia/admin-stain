import { Form } from '@/components/ui/form'
import StatisticViewModel from './StatisticViewModel'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'
import ImageStatistic from './components/ImageStatistic'
import TextInput from '@/components/common/form/TextInput'

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
