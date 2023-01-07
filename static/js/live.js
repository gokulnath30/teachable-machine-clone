var vid = document.getElementById('screenshot');
var v_durations = 0;
var c_videoTime = 0;


// Get video durations
window.addEventListener("load", function () {
    v_durations = parseInt(vid.duration);
    $('#video_range').attr('min', 0);
    $('#video_range').attr('max', v_durations);
});


// show duration in display
setInterval(function () {
    let c_videoTime = parseInt(vid.currentTime)
    $("#showduration").html(c_videoTime.toString() + ' / ' + v_durations.toString())
    $('#video_range').val(c_videoTime)
}, 1000);


// Range bar dragable for video forward and backward
$("#video_range").on('input', function () {
    let timestp = $(this).val()
    $("#showduration").html(timestp + ' / ' + v_durations.toString())
    vid.currentTime = timestp
});

// Pass play

$('#action_btn').on('click', function () {
    if ($(this).attr('check') == 'pass') {
        $('#play_icon').hide();
        $('#pass_icon').show();
        $(this).attr('check', 'play');
        vid.play();

    } else {
        $('#pass_icon').hide();
        $('#play_icon').show();
        $(this).attr('check', 'pass');
        vid.pause();
    }

});



// Add fields  

let box = document.getElementsByTagName('rect');

$("#addBtn").on('click', function () {
    var ops = ''
    for (var i = 1; i < box.length; i++) {
        var cor = box[i].attributes
        ops += `<option value="${[cor['x'].value, cor['y'].value,cor['height'].value,cor['width'].value]}">box ${i}</option>`
    }

    let row = '<div class="card m-2"><div class="card-header"><div class="input-group"><select class="form-select" name="points">' + ops + '</select>&nbsp;&nbsp; <input type="button" class="btn btn-danger delete_btn" value="Delete" style="height:35px;" /></div></div><div class="card-body"><div class="input-group mb-3"><input class="form-control" name="boxes" type="input" placeholder="Object Name" required /></div><div class="input-group mb-2"><input name="sTime" type="number" class="form-control" placeholder="Start Time" style="width:90px" required /><input name="eTime" type="number" class="form-control" placeholder="End Time" style="width:90px" required /></div></div></div>';

    $("#updateRow").append(row);
});


$(document).ready(function () {

    // Card delete funtion 
    $("#updateRow").on("click", '.delete_btn', function (event) {
        $(event.target).closest('.card').remove();
    })

});


vid.onloadeddata = function () {
    // SET video height and width
    var vid_w = vid.videoWidth / 2.3;
    var vid_h = vid.videoHeight / 2.3;
    $(vid).attr('height', vid_h);
    $(vid).attr('width', vid_w);
    $('#draw').attr('height', vid_h);
    $('#draw').attr('width', vid_w);
};


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



// Mutiple vidoe uploads
document.querySelector("#upload_files").onchange = function (event) {
    var numberOfVideos = event.target.files.length;

    for (var i = 0; i < numberOfVideos; i++) {
        var file = event.target.files[i];
        var blobURL = URL.createObjectURL(file);
        var video = document.createElement('video');
        video.src = blobURL;
        video.setAttribute("controls", "")
        $('#show_videos').append(video);

        $('#show_videos video').attr('hight', '200px');
        $('#show_videos video').attr('width', '100%');
        $('#show_videos video').attr('controls', 'hidden');
        // $('#show_videos video').attr('onclick', `get_videos("${blobURL}")`);

    }
}



$("#show_videos video").on('click', function(e){

    console.log(this)
})




// onclick="get_videos(blob:http://127.0.0.1:5000/d8944170-8d7e-4663-8d6b-fafb90fb8312)"


// function getxy(ths,event) {
//     bounds=ths.getBoundingClientRect();
//     var left=bounds.left;
//     var top=bounds.top;
//     var x = event.pageX - left;
//     var y = event.pageY - top;

//     return [x, y];
// }


// var isDragging = false;
// var rect_ids = []


// $(draw_pannel).on('mousedown', function (e) {
//     if(isDragging == false){
//         isDragging = true;
//         var cor =getxy(this,e)
//         let ids = Math.floor(Math.random() * 50) + 1;
//         console.log('Start',cor[0],cor[1],ids);
//         rect_ids.push(ids)
//         $(draw_pannel).html('<rect id="rect_'+ids+'" x="'+cor[0]+'" y="'+cor[1]+'" />')
//     }


// });

// $(draw_pannel).on('mousemove', function (e) {

//     if(isDragging == true) {
//         ids = rect_ids[rect_ids.length - 1]
//         var cor =getxy(this,e)
//         $('#rect_'+ids).attr('width',cor[0])
//         $('#rect_'+ids).attr('height',cor[1])
//         console.log('Move',getxy(e),);
//     }

// });

// $(draw_pannel).on('mouseup', function (e) {

//     if(isDragging == true) {
//         isDragging = false;
//         var cor =getxy(this,e)
//         $('#rect_'+ids).attr('width',cor[0])
//         $('#rect_'+ids).attr('height',cor[1])
//         // console.log('End',getxy(e),);
//     }

// });



// var arr = []
// $('#updateRow .form-group').each(function(i,e){
//     var obj = {
//         "objName":$(e).find('select[name="points"]').val(),
//         "pName":$(e).find('input[name="boxes"]').val(), 
//         "sTime":$(e).find('input[name="sTime"]').val(), 
//         "eTime":$(e).find('input[name="eTime"]').val()
//     }
//     arr.push(obj)
// })




// $("#draw_pannel").on("click", function(event) {
//     bounds=ths.getBoundingClientRect();
//     var left=bounds.left;
//     var top=bounds.top;
//     var x = event.pageX - left;
//     var y = event.pageY - top;
//     console.log("mouse pos ("+x+"," + y+ ")");
// });