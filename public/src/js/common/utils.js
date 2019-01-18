import utils from 'hey-utils';

module.exports = utils.extend({}, utils, {
  backTop() {
    document.getElementById('app').scrollTop = 0;
  },
});
