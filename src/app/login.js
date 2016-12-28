export const login = {
  template: require('./login.html'),
  controller($log, api, $cookies, $state, $http) {
    $log.log("load login component");
    this.loadSpinner = false;
    this.error = "";
    this.doLogin = user => {
      if (user) {
        this.loadSpinner = true;
        $log.log(user);
        api.login.save({username: user.name, password: user.password}, res => {
          $log.log("login post", res);
          $cookies.putObject("login", {auth: res, username: user.name});
          $cookies.put("csrftoken", res.named_messages.csrftoken);
          $cookies.put("sessionid", res.named_messages.sessionid);
          // $http.defaults.headers.common['X-CSRFToken'] = res.named_messages.csrftoken;
          api.login.get(res2 => {
            $log.log("login get", res2);
            $cookies.put("csrftoken", res2.named_messages.csrftoken);
            $cookies.put("sessionid", res2.named_messages.sessionid);
            $http.defaults.headers.common['X-CSRFToken'] = res2.named_messages.csrftoken;
            // $http.defaults.headers.common.Authorization = `${user.name}:${user.password}`;
          });
          this.loadSpinner = false;
          $state.go('blog');
        }, err => {
          this.error = err;
          this.loadSpinner = false;
          $log.warn(err);
        });
      } else {
        this.error = "Empty fields";
      }
    };
  }
};
