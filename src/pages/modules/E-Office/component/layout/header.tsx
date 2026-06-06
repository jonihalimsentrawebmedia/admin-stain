import type React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { IModulesList } from '@/pages/modules/interface'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import ButtonProfile from '@/pages/modules/settings/components/button/ButtonProfile.tsx'

interface Props {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export function HeaderEOffice({ collapsed, setCollapsed }: Props) {
  const localStorage = window.localStorage.getItem('module')
  const module: IModulesList = JSON.parse(localStorage || '{}')
  const { profileUser } = UseGetUserProfile()

  return (
    <header className="w-full bg-primary/50 border-b border-primary/30 flex items-center justify-between gap-2 px-3 lg:px-5 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/modules" className="shrink-0">
          <img
            src={module?.gambar}
            alt={module?.nama_module ?? 'logo'}
            className="size-10 lg:size-12 object-contain"
          />
        </Link>
        <div className="flex flex-col min-w-0">
          <p className="text-[11px] lg:text-xs font-medium text-primary truncate">
            Manajemen Pengelolaan Website
          </p>
          <p className="text-base lg:text-2xl font-semibold text-primary truncate">
            {module?.nama_module}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <Link to="/modules" className="hidden sm:inline-flex">
          <Button size="sm" className="text-white gap-1.5">
            <ArrowLeft className="size-4" />
            <span className="hidden md:inline">Kembali ke Daftar Module</span>
            <span className="md:hidden">Module</span>
          </Button>
        </Link>

        <Link to="/modules" className="sm:hidden">
          <Button size="icon" variant="ghost" className="text-primary">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>

        <ButtonProfile module={module} profileUser={profileUser} />

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  )
}

export default HeaderEOffice
