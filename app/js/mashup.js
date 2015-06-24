require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
} );


// Get the Mashup API to load your module
window.qvangularNgModules = {
    spikesApp: ''
};

require( ["js/qlik"], function ( qlik ) {

    qlik.setOnError( function ( error ) {
        alert( error.message );
    } );

    var app = qlik.openApp(appid, config);

    app.getObject('QV01','btmscA');

    
});