<?php

define('UPLOAD_DESTINATION', './uploaded-images/');

if(isset($_FILES['gif_file'])){
  
  $file = $_FILES['gif_file'];
  $file_name = $_FILES['gif_file']['name'];
  $file_type = pathinfo($file_name, PATHINFO_EXTENSION);
  
  date_default_timezone_set("America/Toronto");
	$todays_date = date("YmdHis");
	
	$final_file_name = remove_extension($file_name) . "-" . $todays_date . "." . $file_type;
  
  $file_location = UPLOAD_DESTINATION.$final_file_name;
  
  if(!file_exists($file_location)){
    if(move_uploaded_file($_FILES['gif_file']['tmp_name'], $file_location)){
      result('{"status": "good", "msg": "'.$file_location.'"}');
    } else {
      throw_error('{"status": "bad", "msg": "There was an error uploading your file"}');
    }
  } else {
    throw_error('{"status": "bad", "msg": "A file by that name already exists on the server"}');
  }
  
} else {
  throw_error('{"status": "bad", "msg": "No file was specified"}');
}

function remove_extension($filename){
  $file = substr($filename, 0, strrpos($filename, '.'));
  return $file;
}

function throw_error($msg){
  echo $msg;
}

function result($msg){
  echo $msg;
}

?>