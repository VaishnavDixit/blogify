import CreateBlog from "./src/components/views/createBlog/Index.jsx";
import ViewBlog from "./src/components/views/viewBlog/Index.jsx";
import MyBlogs from "./src/components/views/myBlogs/Index.jsx";
import SavedBlogs from "./src/components/views/savedBlogs/Index.jsx";
import UserProfile from "./src/components/views/userProfile/Index.jsx";
import TagDashboard from "./src/components/views/tagPage/Index.jsx";
const routes = [
    {path: "/create-blog", element: <CreateBlog />},
    {path: "/view/:slug", element: <ViewBlog />},
    {path: "/my-blogs", element: <MyBlogs />},
    {path: "/saved-blogs", element: <SavedBlogs />},
    {path: "/profile/:name", element: <UserProfile />},
    {path: "/tag/:name", element: <TagDashboard />},
];
export default routes;
