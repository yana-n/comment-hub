import { db } from '@/firebaseConfig.ts'
import { IComment } from '@/types/components'
import { set, onValue, push, ref, get, update } from 'firebase/database'
import { ref as VRef } from 'vue'
import { MAX_COMMENT_LEVEL } from '@/constants.ts'

interface IUser {
  text: string
  userId: string | null
  userName: string | null
  userEmail: string | null
  currentLevel: number
  replyId?: string | null
}

const comments = VRef<IComment[]>([])

export const useComments = () => {
  const saveComment = async (user: IUser, parentId: string | null = null) => {
    try {
      const commentId = push(ref(db, 'comments')).key

      const commentData = {
        id: commentId,
        text: user.text,
        userId: user.userId,
        userName: user.userName ?? user.userEmail,
        userEmail: user.userEmail,
        createdAt: new Date().toISOString(),
        likes: 0,
        parentId: parentId || null, // Добавляем parentId из параметра
        replies: {},
      }

      if (!parentId) {
        // Если это основной комментарий, сохраняем его в корне
        await set(ref(db, `comments/${commentData.id}`), commentData)
      } else {
        // Если это вложенный комментарий, определяем правильный путь
        const parentCommentPath = user.replyId
          ? `comments/${parentId}/replies/${user.replyId}/replies/${commentData.id}`
          : `comments/${parentId}/replies/${commentData.id}`

        await set(ref(db, parentCommentPath), commentData)
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

  const toggleLike = async (path: string, userId: string) => {
    const commentRef = ref(db, path)
    const snapshot = await get(commentRef)

    if (!snapshot.exists()) {
      console.error('Comment not found')
      return
    }

    const commentData = snapshot.val()
    const likedByUser = commentData.likedBy?.[userId]

    if (likedByUser) {
      commentData.likes = (commentData.likes || 0) - 1
      delete commentData.likedBy[userId] // Удаляем лайк пользователя
    } else {
      commentData.likes = (commentData.likes || 0) + 1
      commentData.likedBy = commentData.likedBy || {}
      commentData.likedBy[userId] = true // Добавляем лайк пользователя
    }

    await update(commentRef, commentData)
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
    toggleLike,
  }
}
