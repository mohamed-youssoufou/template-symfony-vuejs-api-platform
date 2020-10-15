import vue from 'vue'

const history = {
    methods: {
        back(){
            window.history.length > 0 ? this.$router.go(-1) : this.$router.push("/")
        }
    }
};

vue.mixin(history)
