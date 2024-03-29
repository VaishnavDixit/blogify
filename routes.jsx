import CreateBlog from "./src/components/views/createBlog/Index.jsx";
import ViewBlog from "./src/components/views/viewBlog/Index.jsx";
import MyBlogs from "./src/components/views/myBlogs/Index.jsx";
import UserProfile from "./src/components/views/userProfile/Index.jsx";

const routes = [
    {path: "/create-blog", element: <CreateBlog />},
    {path: "/view/:slug", element: <ViewBlog />},
    {path: "/my-blogs", element: <MyBlogs />},
    {path: "/profile/:name", element: <UserProfile />},
];
export default routes;
