// Set your application name / guid
var appid = 'Healthcare.qvf';

// Set up your server configuration\
var config = {
    host: 'localhost', //window.location.hostname,
    prefix: "/",
    port: 4848, //window.location.port,
    isSecure: false, //window.location.protocol === "https:",
    appname: appid
};

// Set your routes
var routes = [
    {
        name:'View 1',
        suffix: 'view1',
        templateUrl:'app/views/view1.html',
        controller:'View1Ctrl as view1Ctrl'
    },
    {
        name:'View 2',
        suffix: 'view2',
        templateUrl:'app/views/view2.html',
        controller:'View2Ctrl as view2Ctrl'
    },
    {
        name:'View 3',
        suffix: 'view3',
        templateUrl:'app/views/view3.html',
        controller:'View2Ctrl as view2Ctrl'
    }

];