<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
 modelValue: String
});

const updateValue = (event: Event) => {
 const target = event.target as EventTarget;
 emit('update:modelValue', target.value);
};

const emit = defineEmits(['update:modelValue']);
</script>

<template>
 <input
   :value="modelValue"
   @input="updateValue"
   type="text"
   placeholder="Add a comment" />
</template>

<style scoped lang="scss">
input {
 background: transparent;
 font-size: var(--size-xxs);
 color: var(--text-color);
 border:none;
 flex-grow: 1;

 &::placeholder {
  color: #565973;
 }
}

input:focus {
 outline: none;
}

form:focus-within {
 outline: 1px solid blue
}
</style>
