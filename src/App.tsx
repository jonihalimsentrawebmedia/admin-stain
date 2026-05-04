import { RouterProvider } from "react-router-dom";

import { Router } from "./router";
import {ToastContainer, Zoom} from "react-toastify";
import { Meta } from '@/components/Meta'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Admin Pengelolaan Website'

function App() {
  return (
    <>
      <Meta title={appTitle} />
      
      <RouterProvider router={Router} />
      <ToastContainer
        theme={'colored'}
        position={'bottom-right'}
        autoClose={2000}
        closeOnClick
        transition={Zoom}
      />
    </>
  );
}

export default App;
