import Page1 from "./src/components/views/dashboardDefault/Index";
import Page2 from "./src/components/views/page2/Index";
import Page3 from "./src/components/views/page3/Index";

const routes = [
    {path: "/page1", element: <Page1 />},
    {path: "/page2", element: <Page2 />},
    {path: "/page3", element: <Page3 />},
];
export default routes;
