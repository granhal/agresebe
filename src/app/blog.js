export const blog = {
  template: require('./blog.html'),
  controller($log, api, $scope, $http, $cookies, $state) {
    $log.log("load blog component");
    api.posts.query(res => {
      this.posts = res;
      angular.forEach(res, (v, k) => {
        $http.get(v.photos).then(res2 => {
          this.posts[k].photos = res2.data;
        });
      });
    }, err => {
      $log.warn(err);
    });
    this.delPost = id => {
      api.posts.delete({postId: id}, res => {
        $log.log("success delete", res);
        $state.reload();
      });
    };
    this.addPost = post => {
      $log.log($cookies.getObject("login"));
      api.posts.save({title: post.title, body: post.body, author: {username: $cookies.getObject("login").username}}, res => {
        $log.log("success post", res);
        $state.reload();
      });
    };
  }
};
