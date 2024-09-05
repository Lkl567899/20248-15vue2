<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  name: 'ListIndex',
  computed: {
    id () {
      return this.$route.query.id
    }
  }
}
</script>

<style lang="scss"></style>
