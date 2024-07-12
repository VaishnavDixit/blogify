import React, {lazy, Suspense} from "react";

const CreateBlog = lazy(() => import("./src/components/views/createBlog/Index.jsx"));
const ViewBlog = lazy(() => import("./src/components/views/viewBlog/Index.jsx"));
const MyBlogs = lazy(() => import("./src/components/views/myBlogs/Index.jsx"));
const SavedBlogs = lazy(() => import("./src/components/views/savedBlogs/Index.jsx"));
const UserProfile = lazy(() => import("./src/components/views/userProfile/Index.jsx"));
const TagDashboard = lazy(() => import("./src/components/views/tagPage/Index.jsx"));
const AllTags = lazy(() => import("./src/components/views/allTags/Index.jsx"));
// const SignInPage = React.lazy(() => import("./src/components/pages/auth/signIn/Index.jsx"));
const Dashboard = React.lazy(() => import("./src/components/pages/layout/Index.jsx"));

const routes = [
    {path: "dashboard", element: <Dashboard />},
    {path: "create-blog", element: <CreateBlog />},
    {path: "view/:slug", element: <ViewBlog />},
    {path: "my-blogs", element: <MyBlogs />},
    {path: "saved-blogs", element: <SavedBlogs />},
    {path: "profile/:name", element: <UserProfile />},
    {path: "tag/:name", element: <TagDashboard />},
    {path: "allTags", element: <AllTags />},
];
export default routes;
