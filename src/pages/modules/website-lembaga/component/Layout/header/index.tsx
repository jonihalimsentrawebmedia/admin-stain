import type { IModulesList } from '@/pages/modules/interface'
import { UseGetInstitutionSession } from '@/pages/modules/website-lembaga/hooks'
import { Link } from 'react-router-dom'
import { IconModules } from '@/pages/modules/website-prodi/components/layout/header.tsx'

export const HeaderLayoutInstitution = () => {
  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')

  const { session } = UseGetInstitutionSession()

  return (
    <>
      <div className={'bg-primary'}>
        <div
          className={`w-full mx-auto max-w-[1920px] py-2 bg-[url(/Background.png)] bg-cover bg-center`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <img
                src={module?.gambar}
                alt="gambar"
                className={'size-20 w-20 object-cover rounded-full'}
              />
              <div className={'flex flex-col'}>
                <p className="text-2xl font-semibold text-white">{session?.nama_lembaga}</p>
                <p className="text-white">{session?.nama_universitas}</p>
              </div>
            </div>

            <Link to={'/modules'}>
              <IconModules />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
