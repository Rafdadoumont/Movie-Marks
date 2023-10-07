import { User as DomainUser } from "../model/user";
import { PrismaClient, User } from '@prisma/client';
import { mapToUser, mapToUserLazy, mapToUsers } from "./user.mapper";
import { UserIdProp, UserPrisma, UserProps } from "./data.types";
import { Role } from "@prisma/client";

const database = new PrismaClient()

export class UserDB {
    static async getAllUsers(): Promise<DomainUser[]> {
        try {
            const usersPrisma = await database.user.findMany({
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUsers(usersPrisma)
        } catch (error) {
            console.error(error.message)
            throw new Error("Database error. See server log for details.")
        }
    }

    static async addUser({
        username,
        password,
        role,
    }: UserProps): Promise<DomainUser> {
        try {
            const userPrisma = await database.user.create({
                data: {
                    username,
                    password,
                    role: Role[role],
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            });
            return mapToUser(userPrisma);
        }
        catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getUserById(id: number): Promise<DomainUser> {
        try {
            const userPrisma = await database.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUser(userPrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getUserByUsername(username: string): Promise<DomainUser> {
        try {
            const userPrisma = await database.user.findFirst({
                where: {
                    username: username,
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })

            return mapToUser(userPrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async isUsernameTaken(username: string): Promise<boolean> {
        try {
            const userPrisma = await database.user.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive'
                    }
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return userPrisma !== null;
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async addToFollowing(currentUserId: number, otherUserId: number): Promise<DomainUser> {
        try {
            const currentUser = await database.user.findFirst({
                where: {
                    id: currentUserId
                },
                include: {
                    following: true
                }
            })
            const idList = currentUser.following.map((follower: User): UserIdProp => ({ id: follower.id }));
            idList.push({ id: otherUserId })
            const userPrisma = await database.user.update({
                where: {
                    id: currentUserId,
                },
                data: {
                    following: {
                        set: idList
                    }
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUser(userPrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getUsersBySearchTerm(searchTerm: string): Promise<DomainUser[]> {
        try {
            const userPrisma = await database.user.findMany({
                where: {
                    username: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUsers(userPrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getFollowingList(currentUserId: number): Promise<DomainUser[]> {
        try {
            const userPrisma = await database.user.findFirst({
                where: {
                    id: currentUserId,
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUser(userPrisma).following;
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async removeFromFollowing(currentUserId: number, otherUserId: number): Promise<DomainUser> {
        try {
            const currentUser = await database.user.findFirst({
                where: {
                    id: currentUserId,
                },
                include: {
                    following: true
                }
            })
            let idList = currentUser.following.map((follower: User): UserIdProp => ({ id: follower.id }));
            idList.forEach((item, index) => { if (item.id === otherUserId) idList.splice(index, 1) })
            const userPrisma = await database.user.update({
                where: {
                    id: currentUserId,
                },
                data: {
                    following: {
                        set: idList
                    }
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true } },
                    following: { include: { marks: true } }
                }
            })
            return mapToUser(userPrisma);
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async getFollowersList(currentUserId: number): Promise<DomainUser[]> {
        try {
            const userPrisma = await database.user.findFirst({
                where: {
                    id: currentUserId,
                },
                include: {
                    marks: true,
                    followedBy: { include: { marks: true }},
                    following: { include: { marks: true }}
                }
            })
            
            return mapToUser(userPrisma).followedBy;
        } catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }
}