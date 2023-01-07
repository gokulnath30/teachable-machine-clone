// common variables

let box = document.getElementsByTagName('rect');
var vid = document.getElementById("screenshot");



$('#upload_video').on('submit', function () {
    var formData = new FormData($(this)[0])
    $.ajax({
        url: 'video_upload',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            console.log(response);
        },
    });


    return false;

})


$('#crops').on("click", function () {
    var point = [];
    for (var i = 1; i < box.length; i++) {
        var cor = box[i].attributes
        point.push({
            'x': cor['x'].value,
            'y': cor['y'].value,
            'h': cor['height'].value,
            'w': cor['width'].value
        })
    }
    jQuery.post("crops", {
        "point": JSON.stringify(point)
    }, function (data) {

    });
});


const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const media = new Audio(reader.result);
            media.onloadedmetadata = () => resolve(media.duration);
        };
        reader.readAsDataURL(file);
        reader.onerror = (error) => reject(error);
    });


$("#videoupload").on('change', function (event) {
    let file = event.target.files[0];
    let blob = URL.createObjectURL(file);
    vid.src = blob
    vid.play();
    getDuration(this)


});


function getDuration(control) {
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        let duration = Math.floor(video.duration);
        $("#videopass").attributes['max'].value = duration


    }

    video.src = URL.createObjectURL(control.files[0]);
}


$("#videopass").on('input', function () {
    let val = jQuery('#videopass').val()
    jQuery("#showduration").html(val)
    vid.currentTime = val
});



var stringToHTML = function (str) {
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
};


$("#addBtn").on('click', function () {

    var ops = ''
    for (var i = 1; i < box.length; i++) {
        var cor = box[i].attributes
        ops += `<option value="${[cor['x'].value, cor['y'].value,cor['height'].value,cor['width'].value]}">box ${i}</option>`
    }

    let row = '<div class="form-group mt-2 row"> <select name="points">'+ops+'</select> <input name="boxes" type="input" class="form-range" placeholder="Class Name" required/> <input name="sTime" type="number" class="form-range" placeholder="Start Time" style="width:90px" required/> <input name="eTime" type="number" class="form-range" placeholder="End Time" style="width:90px" required/> <input type="button" class="btn btn-danger gokulclass" value="Delete" style="height:35px;"/> </div>';
    
    $("#updateRow").append(row);
});

$(document).ready(function(){
    
    $("#updateRow").on("click", '.gokulclass', function(event) {
        $(event.target).closest('.form-group').remove();
    })
})

$("#pp_action").on("click", function () {
    var val = $('#pp_action').value

    if (val == 'Pause') {
        $('#pp_action').value = 'Play';
        vid.pause();

    } else {
        $('#pp_action').value = 'Pause';
        vid.play();

    }


})

let p_val = []
function save_val(ids) {
    var point = [];
    t_val = {
        'p_name': $('#p' + ids).value,
        's_time': $('#s' + ids).value,
        'e_time': $('#e' + ids).value
    }

    for (var i = 1; i < box.length; i++) {
        var cor = box[i].attributes
        point.push({
            'ids': cor['ids'].value,
            'x': cor['x'].value,
            'y': cor['y'].value,
            'h': cor['height'].value,
            'w': cor['width'].value
        })
    }


}


setInterval(function () {
    let val = Math.round(vid.currentTime)
    $("#videopass").value = (val)
    jQuery("#showduration").html(val)
}, 1000);


$('#remove_box').on('click', function () {
    document.getElementById('boxes').innerHTML = ''
    rectangles = []
})


