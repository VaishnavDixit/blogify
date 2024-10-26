import {useQuery, useMutation} from "@tanstack/react-query";
import service from "../appwrite/config";
import userDataService from "../appwrite/userData";
import {snackbar} from "../utilityFunctions/utilities";

export const useGetPosts = (queries = [], id = "-") =>
    useQuery({
        queryKey: ["getPosts"],
        queryFn: () => service.getPosts(queries ?? []).then((res) => res),
    });

export const useGetPost = (id) =>
    useQuery({
        enabled: id ? true : false,
        queryKey: ["getPost"],
        queryFn: () => service.getPost(id).then((res) => res),
    });

export const useDeleteBlog = (refetchGetPosts = () => {}) =>
    useMutation({
        mutationFn: (id) => service.deletePost(id),
        onSuccess: (res) => {
            snackbar("success", "Blog successfully deleted 🗑️");
            refetchGetPosts();
        },
    });
export const useLikeUnlikeBlog = () =>
    useMutation({
        mutationFn: ({blogId, toLike}) => userDataService.likeBlog(blogId, toLike),
        onSuccess: () => {},
    });
export const useSaveUnsaveBlog = () =>
    useMutation({
        mutationFn: ({blogId, toSave}) => userDataService.bookmarkBlog(blogId, toSave),
        onSuccess: () => {},
    });
