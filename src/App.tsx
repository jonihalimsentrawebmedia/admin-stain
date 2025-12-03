import { RouterProvider } from "react-router-dom";

import { Router } from "./router";
import {ToastContainer, Zoom} from "react-toastify";

function App() {
  return (
    <>
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
