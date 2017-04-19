<template lang="pug">
#app
    mt-button( @click.native="handleClick" ) 按钮
</template>

<script>
export default {
    name: 'app',
    methods: {
        handleClick: function() {
            this.$toast( 'Hello world!' )
        }
    }
}
</script>

<style lang="sass">

h1 
    color: red
</style>
