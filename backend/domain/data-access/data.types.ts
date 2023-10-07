import { User } from "@prisma/client"

export type MarkPrisma = {
    id: number
    userId: number
    movieId: number
    createdAt: Date
    updatedAt: Date
    rating: number
    comment: string
}

export type MarkProps = {
    id?: number
    userId: number
    movieId: number
    rating: number
    comment: string
}

export type UpdateMarkProps = {
    markId: number
    rating: number
    comment: string
}

export type MoviePrisma = {
    id: number
    title: string
    overview: string
    releaseDate: Date
    voteAverage: number
    voteCount: number
    posterPath: string
    backdropPath: string
    createdAt: Date
    updatedAt: Date
}

export type UserPrisma = {
    id: number
    username: string
    password: string
    role: string
    marks?: MarkPrisma[]
    followedBy?: UserPrisma[]
    following?: UserPrisma[]
}

export type UserProps = {
    id?: number
    username: string
    password: string
    role: string
}

export type UserInput = {
    username: string
    password: string
}

export type FollowInput = {
    currentUserId: number
    otherUserId: number
    username: string
}

export type UserIdProp = {
    id: number
}