var Loader = {
    opts: {
        lines: 11 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 15 // The line thickness
        , radius: 62 // The radius of the inner circle
        , scale: 1.25 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.05 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 84 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: true // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    },
    start: function () {
        this.target = document.getElementById('spinner');
        this.spinner = new Spinner(this.opts).spin(this.target);
    },
    stop: function () {
        this.spinner.stop();
    }
};

var Modal = {
    show: function (id, title, content) {
        $(id + " #header").html(title);
        $(id + " #body").html(content);

        var modal = document.getElementById(id);
        modal.style.display = "block";

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },
    close: function (id) {
        var modal = document.getElementById(id);
        modal.style.display = "none";
    }
};

function handleHttpError(error, status, page) {
    var obj = {};

    if (!error) {
        switch (status) {
            case -1:
                error = "There was a temporary problem with the server. This issue has been reported. Try back soon.";
                break;
        }
    }
    obj.subject = "Velocity9 - Server Error";
    obj.body = "Page: " + page + "\nError: " + error;

    Alert.show("Error!", error);

    return obj;
}

/**
 * Used to manage local storage without parsing and stringifying manually
 */
var LocalStorageManager = {
    setValue: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getValue: function(key, property) {
        try {
            var obj = JSON.parse(window.localStorage.getItem(key));
            if (property) {
                return obj[property];
            } else {
                return obj;
            }
        } catch (e) {

        }
    }
};