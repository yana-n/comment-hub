<script setup lang="ts">
import {ref} from "vue";
import ShownPasswordIcon from '@/assets/images/icons/show.svg'
import HiddenPasswordIcon from '@/assets/images/icons/hide.svg'

interface Props {
 type: 'text' | 'password' | 'email' | 'password_confirmation';
 placeholder: string;
 name: string;
 modelValue: string;
}

const props = defineProps<Props>();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
 isPasswordVisible.value = !isPasswordVisible.value;
};

const getInputType = () => {
 if (props.type === 'password' || props.type === 'password_confirmation') {
  return isPasswordVisible.value ? 'text' : 'password';
 }
 return props.type;
};

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
 const target = event.target as HTMLInputElement;
 emit('update:modelValue', target.value);
};
</script>

<template>
 <div class="form-control">
  <input
    :value="modelValue"
    @input="updateValue"
    :type="getInputType()"
    :name="name"
    class="form-input"
    :placeholder="placeholder"
    required
  />
  <label :for="name" class="form-label">{{ placeholder }}</label>

  <span v-if="props.type === 'password' || props.type === 'password_confirmation'" class="password-toggle" @click="togglePasswordVisibility">
    <ShownPasswordIcon v-if="isPasswordVisible" />
    <HiddenPasswordIcon v-else />
  </span>
 </div>
</template>

<style scoped lang="scss">
.form-control {
 position: relative;
 width: 100%;
 height: 60px;
}

.form-label {
 position: absolute;
 left: 22px;
 top: 17px;
 font-family: inherit;
 font-size: var(--size-xs);
 font-weight: 400;
 color: #808080;
 padding: 4px;
 background: transparent;
 transition: all 0.3s ease;
 pointer-events: none;
}

.form-input {
 width: 100%;
 height: 100%;
 padding: 20px;
 font-family: inherit;
 font-size: var(--size-xs);
 font-weight: 400;
 border-radius: 4px;
 border: 1px solid #4D4D4D;
 color: var(--text-color);
 background: transparent;
 outline: none;
 transition: all 0.2s ease-in-out;

 &::placeholder {
  opacity: 0;
  visibility: hidden;
 }

 &:focus {
  border-color: #4D4D4D;
 }

 &:focus + .form-label,
 &:not(:placeholder-shown) + .form-label {
  top: -0.75rem;
  left: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color);
  z-index: 1;
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
</style>
