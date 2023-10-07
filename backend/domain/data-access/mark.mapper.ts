import { Mark } from "../model/mark"
import { MarkPrisma } from "./data.types";

export const mapToMarks = (marksPrisma: MarkPrisma[]): Mark[] => marksPrisma.map(mapToMark)

export const mapToMark = ({
    id,
    userId,
    movieId,    
    rating,
    comment,
    createdAt,
    updatedAt,
}: MarkPrisma): Mark =>
    new Mark(
        userId,
        movieId,
        rating,
        comment,
        id,
        createdAt,
        updatedAt
    );