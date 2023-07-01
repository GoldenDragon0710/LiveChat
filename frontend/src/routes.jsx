import {
  Home,
} from "@/pages";
import {
  HomeIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    path: "/livechat/",
    element: <Home />,
  },
];

export default routes;
