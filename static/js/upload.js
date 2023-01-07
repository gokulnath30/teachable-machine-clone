
function imagesPreview(input, placeToInsertImagePreview) {
    if (input.files) {
        var filesAmount = input.files.length;
        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = function(event) {
                $($.parseHTML('<img height="60" width="70">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }

}

function update_img(id){
    var input_id =  document.getElementById("imgupload"+id)
    
    imagesPreview(input_id, '#gallery'+id);
}

function remove_card(id){
    $("#rm_cd"+id).remove()
}

function update_name(id){

    $('#imgupload'+id).attr('name',$('#pname'+id).val()+    '[]')
}

$("#add_process").on('click',function() {
    ids = Math.floor((Math.random() * 50));
    ids = ids.toString();

    card = `<div id="rm_cd${ids}" class="mt-3 card"><div class="card-header d-flex"><input id="pname${ids}" type="text" onchange="update_name(${ids})" name="process_name[]"  placeholder="Process Name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a onclick="remove_card(${ids})" style="float: right;" class="btn btn-danger">Delete</a></div><div class="card-body"><input type="file" onchange="update_img(${ids})" id="imgupload${ids}" name="imgs[]" multiple accept="image/*" /><br><br><div id="gallery${ids}" class="scroll_cls"></div></div></div>`
    
    $('#card_create').append(card)

});


$('#train').on('click', function(){

    var formData = new FormData($('#img_data')[0])

    $.ajax({
        url: 'http://127.0.0.1:5000/upload',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response){
            if(response != 0){
                $("#img").attr("src",response); 
                $(".preview img").show(); // Display image element
            }else{
                alert('file not uploaded');
            }
        },
    });


    return false;
    
})




