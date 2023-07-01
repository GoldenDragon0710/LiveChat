import {
  Home,
} from "@/pages";
import {
  HomeIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    path: "/wp-content/live_chat/",
    element: <Home />,
  },
];

export default routes;
