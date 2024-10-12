<script setup lang="ts">
import AppCommentInput from "@/components/comments/AppCommentInput.vue";
import AppCommentBtn from "@/components/comments/AppCommentBtn.vue";
import {defineProps, ref} from "vue";

interface IProps {
 showBtn?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
 showBtn: true
})

const comment = ref('')

const handleSubmit = () => {
 comment.value = ''
}
</script>

<template>
 <form @submit.prevent>
  <app-comment-input
    v-model="comment"
    @keyup.enter="handleSubmit"
  />
  <app-comment-btn
    v-if="showBtn"
    :is-disabled="!comment"
    @submit-form.enter="handleSubmit"
  />
 </form>
</template>

<style scoped lang="scss">
form {
 display: flex;
 flex-direction: row;
 padding: 15px;
 gap: 10px;
 background: #10132E;
 border: 1px solid #B4B7C9;
 border-radius: 14px;
}
</style>
