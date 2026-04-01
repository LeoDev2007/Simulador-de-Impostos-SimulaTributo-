import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import Home from "../pages/Home";
import History from "../pages/History";
import Charts from "../pages/Charts";
import { ROUTES } from "./routes";
import IRform from "../components/IRform";
import BemImovel from "../components/Property_RealEstate";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        children: [
          {
            index: true,
            element: <IRform />,
          },
          {
            path: ROUTES.IRFORM,
            element: <IRform />,
          },
          {
            path: ROUTES.ICMSIPVAFORM,
            element: <BemImovel />,
          },
        ],
      },
      {
        path: ROUTES.HISTORY,
        element: <History />,
      },
      {
        path: ROUTES.CHARTS,
        element: <Charts />,
      },
    ],
  },
]);

export default router;
