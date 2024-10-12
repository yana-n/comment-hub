<script setup lang="ts">
import AppCommentInput from '@/components/comments/AppCommentInput.vue'
import AppCommentBtn from '@/components/comments/AppCommentBtn.vue'
import { defineProps, ref, watch } from 'vue'

interface IProps {
  modelValue: string
  showBtn?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showBtn: true,
  modelValue: '',
})

const emit = defineEmits(['update:modelValue', 'submit-form'])

const comment = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    comment.value = newValue
  },
)

const handleSubmit = () => {
  emit('submit-form', comment.value)
  comment.value = ''
}

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <app-comment-input
      :model-value="comment"
      @update:modelValue="handleInput"
    />
    <app-comment-btn
      v-if="showBtn"
      :is-disabled="!comment"
      @submit-form="handleSubmit"
    />
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: row;
  padding: 15px;
  gap: 10px;
  background: #10132e;
  border: 1px solid #b4b7c9;
  border-radius: 14px;
}
</style>
