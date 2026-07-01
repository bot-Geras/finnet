import type { User } from "../types";
import {createFileStorage} from "../utils/fileStorage";

const userStorage = createFileStorage<User>("users.json");

export const getAllUsers = (): User[] => {
    return userStorage.readAll();
};

export const getUserById = (id: number): User | undefined => {
    return userStorage.findById(id);
};

export const userExists = (id: number): boolean => {
    return userStorage.findById(id) !== undefined;
};

export const getUserCount = (): number => {
    return userStorage.readAll().length;
};