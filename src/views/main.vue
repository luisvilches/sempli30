<template>
    <section>
        <div class="container">
            <h1>{{name}}</h1>
            <h5>{{slogan}}</h5>
        </div>
    </section>
</template>

<script>
export default {
    name:'main',
    data(){
        return {}
    },
}
</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Comfortaa');

    h1,h5{
        font-family: 'Comfortaa', cursive;
    }

    h1{
        font-size: 40px;
        font-weight: 200;
    }

    h5{
        font-size: 20px;
        font-weight: 200;
    }

    .container{
        padding: 180px;
        line-height: 20%;
        letter-spacing: 5px;
        text-align: center;
    }
</style>
