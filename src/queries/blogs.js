import {useQuery} from "@tanstack/react-query";
import service from "../appwrite/config";

export const useGetPosts = (queries = [], id = "-") =>
    useQuery({
        enabled: !!id,
        queryKey: ["getPosts"],
        queryFn: () => service.getPosts(queries ?? []).then((res) => res),
    });
