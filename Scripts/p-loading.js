/*
 *  p-loading - v1.2.0
 *  Loading mask plugin for jQuery.
 *  http://joseshiru.github.io/p-loading/
 *
 *  Made by Jose Zuniga
 *  Under MIT License
 */
/*
 * jQuery Plugin P-loading v1.2.0
 * https://github.com/joseshiru/p-loading/
 *
 * Released under the MIT license
 *
 */

( function( $ ) {
     "use strict";

     $.fn.ploading = function( options ) {
        var $pluginElement       = this;
        var pluginTask           = {};
        var pluginPublicAction   = {};
        var pluginPrivateAction  = {};
        var settings;

        pluginTask.definePluginSettings = function() {
            var defaults;            //Default settings
            var defaultShowAnimation;//Default animation for show the loading
            var defaultHideAnimation;//Default animation for hide the loading

            //Param $container is the container of the loading
            defaultHideAnimation = function( $container ) {
                $container.hide();
            };
            defaultShowAnimation = function( $container ) {
                $container.show();
            };

            //Default settings.
            defaults = {
                action: "show",                                  //Action to execute
                containerHTML: "<div/>",                         //HTML of the container
                containerAttrs: {},                              //Container Attributes and custom attributes (class,id,for,etc)
                containerClass: "p-loading-container",           //Container CSS classes
                spinnerHTML: "<div/>",                           //HTML of the spinner
                spinnerAttrs: {},                                //Spinner Attributes and custom attributes (class,id,for,etc)
                spinnerClass: "p-loading-spinner piano-spinner", //Spinner CSS classes
                onShowContainer: undefined,                      //A function to execute when the container get displayed
                onHideContainer: undefined,                      //A function to execute when the container get hidden
                onDestroyContainer: undefined,                    //A function to execute when the container is destroyed
                hideAnimation: defaultHideAnimation,             //A function to hide the container
                showAnimation: defaultShowAnimation,             //A function to show the container
                destroyAfterHide: false,                         //Destoy the container after it gets hidden
                idPrefix: "loader",                              //ID prefix of the container
                pluginNameSpace: "p-loader",                     //Namespace of the plugin used in the data attribute of the selected node
                maskHolder: true,                                //Add the p-loading-mask class to the selected node
                maskColor: "rgba(0,0,0,0.6)",                    //The background color of the mask
                useAddOns: []
            };

            settings = $.extend( defaults, $.fn.ploading.defaults, options );
        };

        pluginTask.definePublicVariables = function() {
            if ( $.fn.ploading.state === "initialized" ) {
                return;
            }

            $.fn.ploading.state = "starting";
            $.fn.ploading.addOnManager = {};
            $.fn.ploading.addOnManager.events = {};
        };

        pluginTask.definePrivateActions = function() {
            pluginPrivateAction.buildPluginMarkup = function() {
                var renderPlugin;
                var buildPlugin = {};

                buildPlugin.$container = function() {
                    var containerHTML = settings.containerHTML;
                    var $container = $( containerHTML );
                    var randomNumberId = Math.round( new Date().getTime() + ( Math.random() * 100 ) );
                    var containerId = settings.idPrefix + randomNumberId;

                    $pluginElement.data( settings.pluginNameSpace + "id", containerId );
                    $container.prop( "id", containerId );
                    $container.attr( settings.containerAttrs );
                    $container.addClass( settings.containerClass );

                    return $container;
                };

                buildPlugin.$spinner = function() {
                    var spinnerHTML = settings.spinnerHTML;
                    var $spinner = $( spinnerHTML );

                    $spinner.attr( settings.spinnerAttrs );
                    $spinner.addClass( settings.spinnerClass );

                    return $spinner;
                };

                renderPlugin = function() {
                    var $container = buildPlugin.$container();
                    var $spinner = buildPlugin.$spinner();

                    $container.append( $spinner );

                    //Prevent to display the container without the desire animation
                    $container.hide();

                    $pluginElement.prepend( $container );
                };

                renderPlugin();
            };

           pluginPrivateAction.utils = function( utilsSettings ) {
                var utilsAction = {};

                utilsAction.getPluginContainerId = function() {
                    var containerId = $pluginElement.data( settings.pluginNameSpace + "id" );

                    return containerId;
                };

                utilsAction.getPluginContainer = function() {
                    var containerId = pluginPrivateAction.utils( { action: "getPluginContainerId" } );
                    var $container = $( "#" + containerId );

                    return $container;
                };

                utilsAction.setPluginState = function() {
                    $.fn.ploading.state = utilsSettings.state;
                };

                utilsAction.getPluginState = function() {
                    return $.fn.ploading.state;
                };

                return utilsAction[ utilsSettings.action ]();
           };

           pluginPrivateAction.events = function() {
                var events = pluginPrivateAction.events;

                var validEvents = {
                    "pl:spinner:show": true,
                    "pl:spinner:hide": true,
                    "pl:spinner:destroy": true
                };

                var isInvalidEvent = function( selector ) {

                    //selector without namespace
                    selector =  selector.indexOf( "." ) === -1 ? selector : selector.substring( 0, selector.indexOf( "." ) );

                    if ( validEvents[ selector ] ) {
                        return false;
                    } else {
                        console.error( "The event " + selector + " doesnt exist" );
                        return true;
                    }
                };

                events.on = function( event, fn ) {
                    if ( isInvalidEvent( event ) ) {
                        return;
                    }

                    return $( $.fn.ploading.addOnManager.events ).on( event, fn );
                };

                events.off = function( events, selector, handler ) {

                    return $( $.fn.ploading.addOnManager.events ).off( events, selector, handler );
                };

                events.trigger = function( event, data ) {
                    if ( isInvalidEvent( event ) ) {
                        return;
                    }

                    return $( $.fn.ploading.addOnManager.events ).trigger( event, data );
                };
           };

           pluginPrivateAction.addOnInstaller = function() {
                var initialize;
                var managerAction = {};

                managerAction.getAddOns = function() {
                    return $.fn.ploading.addOns;
                };

                //Parameters to send to the plugins
                managerAction.getParamsToSend = function() {
                    var params = {
                        pluginPublicAction: pluginPublicAction,
                        pluginSettings: settings,
                        pluginPrivateAction: {
                            utils: pluginPrivateAction.utils,
                            events: pluginPrivateAction.events
                        },
                        $pluginElement: $pluginElement
                    };

                    return params;
                };

                managerAction.applyAddOnData = function( addOnData ) {
                    settings = $.extend( settings, addOnData.pluginSettings );
                    settings = $.extend( settings, addOnData.pluginPublicAction );
                };

                managerAction.installAddOn = function() {
                    var addOns;
                    var usingAddOns = settings.useAddOns.length > 0;

                    if ( !usingAddOns ) {
                        return;
                    }

                    addOns = managerAction.getAddOns();

                    for ( var i = 0, l = settings.useAddOns.length; i < l; i++ ) {
                        var addOnName = settings.useAddOns[ i ];
                        var currentAddOn = addOns[ addOnName ];
                        var addOnExist = currentAddOn ? true : false;
                        var addOnParams;

                        if ( addOnExist ) {
                            addOnParams = managerAction.getParamsToSend();
                            managerAction.applyAddOnData( currentAddOn( addOnParams ) );
                        }
                    }
                };

                initialize = function() {
                    managerAction.installAddOn();
                };

                initialize();
           };

           pluginPrivateAction.changeMaskColor = function() {
                var containerId = pluginPrivateAction.utils( { action: "getPluginContainerId" } );
                var $container = $( "#" + containerId );

                $container.css( "background-color", settings.maskColor );
           };
        };

        pluginTask.definePublicActions = function() {

            pluginPublicAction.destroy = function() {
                var $container = pluginPrivateAction.utils( { action: "getPluginContainer" } );

                $container.remove();
                $pluginElement.removeData( settings.pluginNameSpace + "id" );

                if ( settings.onDestroyContainer ) {

                    //Support for v1.1
                    settings.onDestroyContainer( $container );
                    $pluginElement.trigger( "pl:spinner:destroy", [ $container ] );
                    pluginPrivateAction.events.trigger( "pl:spinner:destroy" );
                }
            };

            pluginPublicAction.show = function() {

                //Get the container ID of the last plugin's usage in the current element.
                var $container = pluginPrivateAction.utils( { action: "getPluginContainer" } );
                var containerExist = $container.length === 0 ? false : true;

                if ( containerExist ) {
                    settings.showAnimation( $container, $pluginElement );
                } else {
                    pluginPrivateAction.buildPluginMarkup();
                    $container = pluginPrivateAction.utils( { action: "getPluginContainer" } );
                }

                settings.showAnimation( $container, $pluginElement );

                if ( settings.maskHolder ) {
                    $pluginElement.addClass( "p-loading-element-mask" );
                }

                //Support for v1.1
                if ( settings.onShowContainer ) {
                    settings.onShowContainer( $pluginElement, $container );
                }

                $pluginElement.trigger( "pl:spinner:show", [ $pluginElement, $container ] );
                pluginPrivateAction.events.trigger( "pl:spinner:show" );
            };

            pluginPublicAction.hide = function() {

                //Get the container ID of the last plugin's usage in the current element.
                var $container = pluginPrivateAction.utils( { action: "getPluginContainer" } );

                settings.hideAnimation( $container, $pluginElement );

                if ( settings.maskHolder ) {
                    $pluginElement.removeClass( "p-loading-element-mask" );
                }

                    //Support for v1.1
                if ( settings.onHideContainer ) {
                    settings.onHideContainer( $pluginElement, $container );
                }
                $pluginElement.trigger( "pl:spinner:hide", [ $pluginElement, $container ] );
                pluginPrivateAction.events.trigger( "pl:spinner:hide" );

                if ( settings.destroyAfterHide ) {

                    pluginPublicAction.destroy();
                }
            };
        };

        pluginTask.runPlublicAction = function() {

            //Refresh the settings of the plugin, in case there're new values
            pluginTask.definePluginSettings();
            pluginPrivateAction.events();
            pluginPrivateAction.addOnInstaller();
            pluginPublicAction[ settings.action ]();
            pluginPrivateAction.changeMaskColor();
            pluginPrivateAction.utils( { action: "setPluginState", state: "initialized" } );
        };

        pluginTask.initialize = function() {
            pluginTask.definePluginSettings();
            pluginTask.definePublicVariables();
            pluginTask.definePrivateActions();
            pluginTask.definePublicActions();
            pluginTask.runPlublicAction();
        };

        pluginTask.initialize();

        return $pluginElement;
    };

    $.fn.ploading.addOns = {};

}( jQuery ) );
