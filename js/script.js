$(function() {
  
  // apply uniform
  $("select, input:button, input:submit, input:checkbox, input:radio, input:file").uniform();
  
  //validate the file field
  $(':file').change(function(){
    
    var file = this.files[0];
    var name = file.name;
    var type = file.type;
    
    $("#upload-progress .label").hide("fast");
    $("#parsing-progress .label").hide("fast");
    $("#link-display").hide("fast");
    
    if(type == 'image/gif'){
      //show the upload button
      $('.main-submit-area').show("fast");
    } else {
      //hide the upload button
      $('.main-submit-area').hide("fast");
    }
    
  });
  
  var formOptions = {
    success: onUploadSuccess,
    beforeSubmit: onPreUpload,
    dataType: 'json'
  };
  $(".main-form").ajaxForm(formOptions);
    
  
});

function onUploadSuccess(responseText, statusText, xhr, form){
  
  if(responseText.status = 'good'){
    $("#upload-progress p").hide("fast");
    $("#upload-progress .progress").hide("fast");
    $("#upload-progress .label-success").show("fast");
    
    startDeconstruction(responseText.msg);
    
  } else {
    $("#upload-progress p").hide("fast");
    $("#upload-progress .progress").hide("fast");
    $("#upload-progress .label-important").show("fast");
  }
  
}

function onPreUpload(){
  
  $('.main-submit-area').hide("fast");
  $("#upload-progress p").show("fast");
  $("#upload-progress .progress").show("fast");
  $("#upload-progress .label").hide("fast");
  $("#parsing-progress .label").hide("fast");
  
}

function startDeconstruction(fileLoc){
  
  $("#parsing-progress p").show("fast");
  $("#parsing-progress .progress").show("fast");
  $("#parsing-progress .label").hide("fast");
  
  $.ajax({
    type: "POST",
    url: "filedeconstruct.php",
    data: "filename="+fileLoc,
    success: onFileDeconstructFinish, 
    error: onFileDeconstructFail
  });
  
}

function onFileDeconstructFinish(data){
  
  $("#parsing-progress p").hide("fast");
  $("#parsing-progress .progress").hide("fast");
  $("#parsing-progress .label").show("fast");
  
  var stringToAppend = "<a href='"+data+"'>CLICK HERE TO DOWNLOAD YOUR AWESOME FILES!!!</a>"
  $("#link-display").html(stringToAppend);
  $("#link-display").show("fast");
  
}

function onFileDeconstructFail(data){
  alert('error');
}







