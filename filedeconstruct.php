<?php

if(isset($_REQUEST['filename'])){
  
  $file_location = $_REQUEST['filename'];
  
  if(file_exists($file_location)){
    
    //create a directory with the file name
    $name_values = split("/", $file_location);
    $dir_name = remove_extension($name_values[count($name_values) - 1]);
    
    $bash_call = shell_exec("sh shell/deconstructor.sh ".$dir_name." ".$file_location);
    echo($bash_call);
    
  } else {
    //the file does not exist
  }
  
  
} else {
  //there is no file to deconstruct
}

function remove_extension($filename){
  $file = substr($filename, 0, strrpos($filename, '.'));
  return $file;
}


?>