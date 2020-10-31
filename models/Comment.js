import Model from '~/api/src/Model';

export default class Comment extends Model {
  baseURL() {
    return process.env.COMMENT_API + '/api/v1';
  }

  // implement a default request method
  request(config) {
    return this.$http.request(config);
  }

  resource() {
    return 'comments';
  }
}