<?php
//Create an account session
session_start();

$servername = "localhost";
$dbname = "accounts"
$username = "root";
$password = "password";


$connect = new mysqli($servername, $username, $password, $db);
$connect->select_db($dbname);
?>