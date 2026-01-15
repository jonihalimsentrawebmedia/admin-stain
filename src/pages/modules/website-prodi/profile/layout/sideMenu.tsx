import { Card, CardContent } from '@/components/ui/card.tsx'
import { MENUPROFILE } from '@/pages/modules/website-prodi/profile/layout/MenuList.tsx'
import { Link, useLocation } from 'react-router-dom'
import { IconTitleText } from '@/components/common/icon'

export const SideMenuProfile = () => {
  const pathname = useLocation().pathname
  return (
    <>
      <Card className={'rounded py-5 h-fit'}>
        <CardContent className={'px-5'}>
          <ul className={'flex flex-col gap-2.5'}>
            {MENUPROFILE?.map((item, index) => (
              <Link to={item?.path} key={index}>
                <li
                  className={`flex items-center text-gray-400 gap-1.5 p-1.5 rounded
                   ${pathname.includes(item?.path) && 'bg-[#CCE6D9] border border-primary text-gray-900'}
                   `}
                >
                  <IconTitleText className={pathname.includes(item.path)?'fill-gray-900':'fill-gray-400'} />
                  {item?.name}
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
