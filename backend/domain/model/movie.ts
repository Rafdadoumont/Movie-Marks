export class Movie {
    readonly id?: number
    readonly title: string
    readonly overview: string
    readonly releaseDate: Date
    readonly voteAverage: number
    readonly voteCount: number
    readonly posterPath: string
    readonly backdropPath: string
    readonly createdAt?: Date
    readonly updatedAt?: Date

    constructor(title: string, overview: string, releaseDate: Date, voteAverage: number, voteCount: number, posterPath: string, backdropPath: string, id?: number, createdAt?: Date, updatedAt?: Date) {
        this.title = title
        this.overview = overview
        this.releaseDate = releaseDate
        this.voteAverage = voteAverage
        this.voteCount = voteCount
        this.posterPath = posterPath
        this.backdropPath = backdropPath
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}