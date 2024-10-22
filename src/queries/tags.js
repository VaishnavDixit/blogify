import {useQuery} from "@tanstack/react-query";
import service from "../appwrite/config";

export const useGetTags = (count = 1000000000) =>
    useQuery({
        queryKey: ["getTags"],
        queryFn: () => service?.getTags(count || 1000000000).then((res) => res),
    });

export const useGetTag = (id) =>
    useQuery({
        queryKey: ["getTag"],
        queryFn: () => service.getTag(id).then((res) => res),
    });
