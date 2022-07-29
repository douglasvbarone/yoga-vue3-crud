<template>
  <v-text-field type="number" v-bind="$attrs" ref="inputRef" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { options } from '../config/money'

export default {
  name: 'MoneyInput',
  props: {
    modelValue: Number
  },
  setup() {
    const { inputRef } = useCurrencyInput(options)

    return { inputRef }
  }
}
</script>
