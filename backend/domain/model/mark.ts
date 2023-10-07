export class Mark {
    readonly id?: number
    readonly userId: number
    readonly movieId: number
    readonly rating: number
    readonly comment: string
    readonly createdAt?: Date
    readonly updatedAt?: Date

    constructor(userId: number, movieId: number, rating: number, comment: string, id?: number, createdAt?: Date, updatedAt?: Date) {
        this.userId = userId
        this.movieId = movieId
        this.rating = rating
        this.comment = comment
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        
    }
}