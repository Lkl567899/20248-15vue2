<template>
  <div class="input">
    <button class="clear" @click="clear" :class="this.value <= 1 ? 'def' : ''">-</button>
    <input type="text" class="ipt" :value="value" @change="handChange">
    <button class="add" @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: 'numInput',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      this.$emit('input', this.value + 1)
    },
    clear () {
      if (this.value <= 1) {
        return false
      }
      this.$emit('input', this.value - 1)
    },
    handChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return false
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="scss">
.input {
  width: 110px;
  display: flex;

  .add,
  .clear {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }

  .def {
    color: #cccccc;
  }

  .ipt {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
