<template lang="pug">
#app
    router-view(
        name="AppContent"
        v-wechat-title="$route.meta.title"
        img-set="/static/favicon.png"
        class="auto--routerContentBottom"
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
h1
    color: red
</style>
