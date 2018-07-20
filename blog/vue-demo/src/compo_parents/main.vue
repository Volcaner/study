<template>
    <div id="main">
        {{message}}
        {{message}}
        <input type="button" @click='dialog' value='click'>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                message: 'Hello World!'
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            dialog: function() {
                alert(this.message);
            }
        }
    }
</script>
<style media="screen">
    #main{
        background: #aaa;
    }
</style>
