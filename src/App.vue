<template lang="pug">
#app
    router-view(
        name="AppContent" 
        v-wechat-title="$route.meta.title"
        img-set="/static/favicon.png"
    )
    router-view( name="AppBottomTitle" )
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="sass">
@import "./sass/main"
@import "./sass/Modules/ModulesStyle"

#app
    height: 100%
    +bC( $C-base )

h1 
    color: red
</style>
