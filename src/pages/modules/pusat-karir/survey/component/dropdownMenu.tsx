import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { FaCaretDown } from 'react-icons/fa'
import { clsx } from 'clsx'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { MdOutlineContentCopy } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import type { SurveyDetail } from '@/pages/modules/pusat-karir/survey/statistic/types.ts'
import { ButtonChangeDate } from '@/pages/modules/pusat-karir/survey/component/buttonChangeDate.tsx'
import { ButtonArchive } from '@/pages/modules/pusat-karir/survey/component/form/buttonArchive.tsx'

interface Props {
  data?: SurveyDetail
}

export const DropdownSurvey = (props: Props) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={clsx(
            'flex items-center gap-1.5 border p-1.5',
            'border-primary text-primary rounded'
          )}
        >
          Aksi <FaCaretDown className={'size-4'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuGroup className={'border rounded bg-white border-primary'}>
            <DropdownMenuItem
              onClick={() => {
                window.localStorage.setItem('uuid', data?.id_survei ?? '')
                navigate('/modules/pusat-karir/survey/add')
              }}
              className={'bg-white hover:bg-white text-primary font-semibold hover:text-primary!'}
            >
              <MdOutlineContentCopy className={'size-4 text-primary'} />
              Buat Salinan
            </DropdownMenuItem>

            <div className="px-2">
              <ButtonChangeDate complete data={data as any} />
            </div>

            <div className={'px-2 my-2'}>
              <ButtonArchive complete data={data as any} />
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
