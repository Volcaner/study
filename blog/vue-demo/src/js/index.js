import Vue from 'vue';

require('../public_js/public.js');

import index from '../compo_parents/main.vue';

const vm = new Vue({
    el: '#app',
    data: {},
    render: z => z(index)
});
