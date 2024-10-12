const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export function prettifyDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = dateOptions,
  code: string = 'en-US',
): string {
  const date = new Date(dateStr)

  return new Intl.DateTimeFormat(code, options).format(date)
}

export const buildCommentPath = (
  commentId: string,
  parentId?: string,
  replyId?: string,
): string => {
  if (!parentId) {
    return `comments/${commentId}`
  } else if (replyId) {
    return `comments/${parentId}/replies/${replyId}/replies/${commentId}`
  } else {
    return `comments/${parentId}/replies/${commentId}`
  }
}

export const getCommentLevelFromPath = (
  parentPath: string | undefined,
): number => {
  if (!parentPath) {
    return 1 // Это корневой комментарий
  }
  // Подсчитываем количество "replies" в пути
  const level = parentPath
    .split('/')
    .filter((segment) => segment === 'replies').length
  return level + 2 // 1 - корневой комментарий, 1 - для начального replies
}
