import Vue from 'vue';
import manba from 'manba';

Vue.filter('format', (value, format) => {
    if (value) {
        return manba(value).format(format || 'l');
    }
    return '';
});