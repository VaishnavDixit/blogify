import {useQuery} from "@tanstack/react-query";
import service from "../appwrite/config";

export const useGetTags = () =>
    useQuery({
        queryKey: ["getTags"],
        queryFn: () => service.getTags().then((res) => res),
    });
