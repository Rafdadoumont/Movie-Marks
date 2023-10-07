import { Role } from "@prisma/client";
import { User } from "../model/user";
import { UserPrisma } from "./data.types";
import { mapToMarks } from "./mark.mapper";

export const mapToUsers = (usersPrisma: UserPrisma[]): User[] => usersPrisma.map(mapToUser)

export const mapToUsersLazy = (usersPrisma: UserPrisma[]): User[] => usersPrisma.map(mapToUserLazy)

export const mapToUser = ({
    id,
    password,
    role,
    username,
    marks,
    followedBy,
    following,
}: UserPrisma): User =>
    new User(
        username,
        password,
        mapToMarks(marks),
        mapToUsersLazy(followedBy),
        mapToUsersLazy(following),
        role as Role,
        id,
    );

export const mapToUserLazy = ({
    id,
    password,
    role,
    username,
    marks,
}: UserPrisma): User =>
    new User(
        username,
        password,
        mapToMarks(marks),
        [],
        [],
        role as Role,
        id,
    );

