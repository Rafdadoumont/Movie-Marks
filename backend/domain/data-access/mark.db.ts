import { Mark } from "../model/mark"
import { PrismaClient } from '@prisma/client'
import { mapToMark, mapToMarks } from "./mark.mapper"
import { MarkProps, UpdateMarkProps } from "./data.types"

const database = new PrismaClient()

export class MarkDB {

    static async getAllMarks(): Promise<Mark[]> {
        try {
            const marksPrisma = await database.mark.findMany({
                orderBy: {
                    createdAt: 'desc'
                    }
            })
            return mapToMarks(marksPrisma)
        } catch (error) {
            console.error(error)
            throw new Error("Database error. See server log for details.")
        }
    }

    static async addMark({
        userId,
        movieId,
        rating,
        comment,
    }: MarkProps): Promise<Mark> {
        try {
            const markPrisma = await database.mark.create({
                data: {
                    userId,
                    movieId,
                    rating,
                    comment,
                }
            });
            return mapToMark(markPrisma);
        }
        catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async updateMark({
        markId,
        rating,
        comment,
    }: UpdateMarkProps): Promise<Mark> {
        try {
            const markPrisma = await database.mark.update({
                where: {
                    id: markId,
                },
                data: {
                    rating,
                    comment,
                }
            });
            return mapToMark(markPrisma);
        }
        catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }

    static async deleteMark(markId: number): Promise<Mark> {
        try {
            const markPrisma = await database.mark.delete({
                where: {
                    id: markId,
                }
            });
            return mapToMark(markPrisma);
        }
        catch (error) {
            console.error(error);
            throw new Error("Database error. See server log for details.")
        }
    }
}