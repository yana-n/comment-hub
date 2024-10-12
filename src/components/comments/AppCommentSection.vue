<script setup lang="ts">
import { useComments } from '@/composables/useComments'
import { useAuth } from '@/composables/useAuth'
import AppCommentForm from '@/components/comments/AppCommentForm.vue'
import AppCommentBlock from '@/components/comments/AppCommentBlock.vue'
import { ref, onMounted } from 'vue'

const { comments, getComments, saveComment } = useComments()
const { user } = useAuth()

const newComment = ref('')

onMounted(async () => {
  try {
    await loadComments() // Загрузка комментариев при монтировании компонента
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
})

// Функция для загрузки комментариев
const loadComments = async () => {
  try {
    comments.value = await getComments()
  } catch (error) {
    console.error('Error loading comments:', error)
  }
}

const handleSubmit = async (commentText: string) => {
  if (user.value) {
    const commentData = {
      text: commentText,
      userId: user.value.uid,
      userName: user.value.displayName || user.value.email,
      userEmail: user.value.email,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: {},
    }

    await saveComment(commentData) // Сохранение нового комментария
    newComment.value = '' // Очищаем поле ввода после отправки

    await loadComments() // Перезагружаем комментарии, чтобы отобразился новый комментарий
  } else {
    console.error('User is not authenticated')
  }
}
</script>

<template>
  <div class="section">
    <app-comment-form
      class="form"
      v-model="newComment"
      @submit-form="handleSubmit"
    />

    <div v-for="comment in comments" :key="comment.id">
      <app-comment-block :comment="comment" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {
  max-width: 100%;
  width: 660px;
  display: flex;
  flex-direction: column;
}

.form {
  margin-bottom: 40px;
}
</style>
