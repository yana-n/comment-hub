import { db } from '@/firebaseConfig.ts'
import { IComment } from '@/types/components'
import { set, onValue, push, ref, get } from 'firebase/database'
import { ref as VRef } from 'vue'
import { MAX_COMMENT_LEVEL } from '@/constants.ts'

interface IUser {
  text: string
  userId: string | null
  userName: string | null
  userEmail: string | null
  parentId: string | null
  currentLevel: number
  replyId: string | null
}

const comments = VRef<IComment[]>([])

export const useComments = () => {
  const saveComment = async (user: IUser) => {
    try {
      const commentData = {
        id: push(ref(db, 'comments')).key,
        text: user.text,
        userId: user.userId,
        userName: user.userName ?? user.userEmail,
        userEmail: user.userEmail,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: {},
      }

      if (!user.parentId) {
        await set(ref(db, `comments/${commentData.id}`), commentData)
      } else {
        const parentRef = ref(db, `comments/${user.parentId}`)
        const snapshot = await get(parentRef)

        if (snapshot.exists()) {
          if (user.currentLevel >= MAX_COMMENT_LEVEL) {
            const replyPath = `comments/${user.parentId}/replies/${commentData.id}`
            await set(ref(db, replyPath), commentData)
          } else if (user.replyId) {
            const replyPath = `comments/${user.parentId}/replies/${user.replyId}/replies/${commentData.id}`
            await set(ref(db, replyPath), commentData)
          } else {
            const replyPath = `comments/${user.parentId}/replies/${commentData.id}`
            await set(ref(db, replyPath), commentData)
          }
        } else {
          console.error('Parent comment does not exist')
        }
      }
    } catch (error) {
      console.error('Error saving comment:', error)
    }
  }

  const getComments = () => {
    const commentsRef = ref(db, 'comments')

    return new Promise((resolve, reject) => {
      onValue(
        commentsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const commentsData = snapshot.val()
            const commentsArray = parseComments(commentsData)
            resolve(commentsArray)
          } else {
            console.log('No comments available')
            resolve([])
          }
        },
        reject,
      )
    })
  }

  const parseComments = (data: any): any[] => {
    return Object.entries(data)
      .map(([key, value]: [string, any]) => ({
        id: key,
        ...value,
        replies: value.replies ? parseComments(value.replies) : [],
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
  }

  return {
    comments,
    getComments,
    saveComment,
  }
}
