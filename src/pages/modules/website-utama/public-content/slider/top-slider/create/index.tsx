import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { FormCreateSliderOnTop } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/component/form.tsx'

export const CreateTopSlider = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Tambah Slider Atas'}
          buttonGroup={[
            {
              label: 'Batal',
              type: 'cancel',
              onClick: () => navigate(-1),
            },
            {
              label: 'Simpan',
              type: 'save',
              onClick: () => {},
            },
          ]}
        />

        <FormCreateSliderOnTop />
      </div>
    </>
  )
}
