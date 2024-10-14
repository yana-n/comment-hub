<script setup lang="ts">
import { ref } from 'vue'
import ShownPasswordIcon from '@/assets/images/icons/show.svg'
import HiddenPasswordIcon from '@/assets/images/icons/hide.svg'

interface IProps {
  type: 'text' | 'password' | 'email' | 'password_confirmation'
  placeholder: string
  name: string
  modelValue: string
}

const props = defineProps<IProps>()

const isPasswordVisible = ref(false)
const isFocused = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const getInputType = () => {
  if (props.type === 'password' || props.type === 'password_confirmation') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
}

const updateValue = (event: Event) => {
  const target = event.target as EventTarget
  emit('update:modelValue', target.value)
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  if (!props.modelValue) {
    isFocused.value = false
  }
}

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="form-fieldset">
    <legend class="form-legend" :class="{ active: isFocused || modelValue }">
      {{ placeholder }}
    </legend>
    <div class="form-control">
      <input
        :value="modelValue"
        @input="updateValue"
        :type="getInputType()"
        :name="name"
        class="form-input"
        :placeholder="placeholder"
        @focus="handleFocus"
        @blur="handleBlur"
        required
      />
      <label :for="name" class="sr-only">{{ placeholder }}</label>

      <span
        v-if="
          props.type === 'password' || props.type === 'password_confirmation'
        "
        class="password-toggle"
        @click="togglePasswordVisibility"
      >
        <ShownPasswordIcon v-if="isPasswordVisible" />
        <HiddenPasswordIcon v-else />
      </span>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.form {
  &-fieldset {
    border: 1px solid #4d4d4d;
    padding: 0;
    margin: 0;
    position: relative;
    border-radius: 4px;
    background: inherit;
  }

  &-legend {
    font-size: 0;
    height: 14px;
    padding: 0;
    margin-left: 10px;
    color: #808080;
    text-align: left;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out;

    &.active {
      font-size: 12px;
      visibility: visible;
      opacity: 1;
      background-color: inherit;
      padding: 0 8px;
    }
  }

  &-control {
    position: relative;
    width: 100%;
  }

  &-input {
    padding: 14px 20px 20px;
    width: 100%;
    font-family: inherit;
    font-size: var(--size-xs);
    font-weight: 400;
    border: none;
    outline: none;
    background: inherit;
    color: var(--text-color);
  }
}

.password-toggle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: var(--text-color);
  opacity: 0.7;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
