import {useQuery} from "@tanstack/react-query";
import authService from "../appwrite/auth";

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: () => authService.getCurrentUser().then((res) => res),
    });
