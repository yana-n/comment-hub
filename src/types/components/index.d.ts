export interface IFormNotice {
  notice?: {
    text: string
    btn: {
      text: string
      pathName: string
    }
  }
}

export interface IComment {
  id: string
  text: string
  userId: string
  userName: string
  userEmail: string
  createdAt: Date
  likes: number
  level: number
  replies: Comment[]
}
