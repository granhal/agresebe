export default Api;

/** @ngInject */
function Api($log, $resource) {
  $log.log('load resource in api service');
  return {
    login: $resource('http://blog.agresebe.com/api/login'),
    posts: $resource('http://blog.agresebe.com/api/posts/:postId'),
    users: $resource('http://blog.agresebe.com/api/users'),
    photos: $resource('http://blog.agresebe.com/api/photos')
  };
}
