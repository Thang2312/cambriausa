// M E G A S L A B
//
// This file contains the code for the M E G A S L A B image viewer itself,
// which is just the smoothZoom plugin. The logic to toggle between
// the 'sample view' and 'slab view' is contained in section-tabs.js.
;(function () {
    // Firefox has some sub-pixel rounding issues on the 4 image pieces (thin yellow
    // lines are visible while zoom is animating).  We give them a negative margin in
    // the css.


    function MegaSlab() {
        // Grab elements
        this.$viewControls = $('.view-options a')
        this.$slabView = $('.slab-view')
        this.$sampleView = $('.sample-view')

        // Bind events
        this.$viewControls.click($.proxy(this, 'togglePanel'))

        // Initialize the Zoom Plugin
        this.initZoomPlugin()

        // DEV HELPER
        //this.show()
    }

    MegaSlab.prototype = {
        // Change between the two tabs
        togglePanel: function (e) {
            var el = $(e.target)
            e.preventDefault()

            if (el.hasClass('active')) return

            // Hide / show megaslab
            if (el.hasClass('slab-view-btn')) {
                this.show()
            } else {
                this.hide()
            }
        },

        initZoomPlugin: function () {
            if (this.zoomPluginInitialized) {
                return
            }
            this.zoomPlugginIntialized = true

            var properties = {
                width: "100%",
                height: 700,
                zoom_MAX: 100, // percent
                button_ALIGN: 'top left',
                // button_MARGIN: 30,  // Had to hack inside the plugin to assign a class to use a
                // different number for horizontal and vertical margin
                pan_BUTTONS_SHOW: false,
                border_SIZE: 0,
                on_ZOOM_PAN_COMPLETE: $.proxy(this, 'onZoomComplete'),
                background_COLOR: "#F0F0F0"
            }

            //if ($.browser.msie && +$.browser.version < 9) {
            //   properties.animation_SMOOTHNESS = 0
            //}

            // Init image zoom/pan plugin
            $('.megaslab-image').smoothZoom(properties)
            this.smoothZoom = $('.megaslab-image').data('smoothZoom')
        },

        // Show M E G A S L A B
        // Also scroll to the element.  Otherwise its hard to scroll to it since
        // via mouse wheel or touch events since the plugin eats those events.
        show: function () {
            $('body').animate({ scrollTop: $('.view-options').offset().top }, 'fast')
        },

        // Hide M E G A S L A B
        hide: function () {
            // Zoom out so if the user switches back they don't get all confused if its zoomed in...
            if (this.smoothZoom) this.smoothZoom.zoomOut()
        },


        // Fire tracking on zoom.
        //
        // We need to store the last scaled height to calculate if its a zoom in or a zoom out
        // since the plugin doesn't tell us.  This callback gets called in 2 cases even when no
        // zoom happens which we also handle.
        onZoomComplete: function (data) {
            var eventName

            // We ignore the first fire of this event as that happens just when the plugin initializes.
            if (!this.lastScaledHeight) {
                this.lastScaledHeight = 1
                return
            }

            // We don't fire tracking if the scaled height didn't change, since this callback also
            // fires if you just happen to click on the image.
            if (data.scaledHeight > this.lastScaledHeight) {
                eventName = "Zoom_In"
            } else if (data.scaledHeight < this.lastScaledHeight) {
                eventName = "Zoom_Out"
            }

            if (eventName) {
                //alert(eventName)
                if (window._gaq) _gaq.push(['_trackEvent', CAMBRIA.pageName + '-' + CAMBRIA.siteName, 'body-slab_view', eventName])
            }

            this.lastScaledHeight = data.scaledHeight
        }
    }

    // Export
    window.CAMBRIA = window.CAMBRIA || {};
    window.CAMBRIA._modules = window.CAMBRIA._modules || {};
    CAMBRIA._modules.MegaSlab = MegaSlab;
} ()
);
