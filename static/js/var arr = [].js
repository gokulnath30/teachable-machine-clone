var arr = []
$('#updateRow .form-group').each(function(i,e){
    var obj = {
        "objName":$(e).find('select[name="points"]').val(),
        "pName":$(e).find('input[name="boxes"]').val(), 
        "sTime":$(e).find('input[name="sTime"]').val(), 
        "eTime":$(e).find('input[name="eTime"]').val()
    }
    arr.push(obj)
})