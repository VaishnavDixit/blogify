import {useQuery} from "@tanstack/react-query";
import authService from "../appwrite/auth";
import userDataService from "../appwrite/userData";

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: () => authService.getCurrentUser().then((res) => res),
    });

export const useGetUserData = (id) =>
    useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: () => userDataService.getUserData(id).then((res) => res),
    });
