<?php

$host="localhost";
$user="root";
$pass="";
$db="hab_gaming";
$conn=new mysqli($host,$user,$pass,$db);
if($conn->connect_error){
    echo "Connection Failed".$conn->connect_error;
}
?>