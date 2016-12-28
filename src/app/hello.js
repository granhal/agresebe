export const hello = {
  template: require('./hello.html'),
  controller($log) {
    $log.log("load hello component");
    this.hello = 'Hello World!';
  }
};
