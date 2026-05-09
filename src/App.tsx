import { RouterProvider } from 'react-router-dom'

import { Router } from './router'
import { ToastContainer, Zoom } from 'react-toastify'
import { Meta } from '@/components/Meta'
import { UseGetIdentityPublic } from '@/pages/login/hooks'
import { useEffect } from 'react'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Admin Pengelolaan Website'

function App() {
  const { publicIdentity } = UseGetIdentityPublic()

  useEffect(() => {
    if (!publicIdentity?.logo) return

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement

    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }

    link.href = publicIdentity?.logo
  }, [publicIdentity])

  return (
    <>
      <Meta title={appTitle} favicon={publicIdentity?.logo} />

      <RouterProvider router={Router} />
      <ToastContainer
        theme={'colored'}
        position={'bottom-right'}
        autoClose={2000}
        closeOnClick
        transition={Zoom}
      />
    </>
  )
}

export default App
