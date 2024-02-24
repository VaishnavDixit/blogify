import CreateBlog from "./src/components/views/createBlog/Index";
import ViewBlog from './src/components/views/viewBlog/Index'
import MyBlogs from './src/components/views/myBlogs/Index'

const routes = [
    {path: "/create-blog", element: <CreateBlog />},
    {path: "/view/:slug", element: <ViewBlog />},
    {path: "/my-blogs", element: <MyBlogs />},
];
export default routes;
