<template lang="pug">
#app
    router-view( name="AppContent" )
    router-view( name="AppBottomTitle" )
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="sass">
@import "./sass/main"

h1 
    color: red

div
    +bC( yellow )
</style>
