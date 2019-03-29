<?php

$servername = "localhost";
$username = "paczkolaby";
$password = "paczkolaby";
$baseName = "paczkolab";

$conn = new mysqli($servername, $username, $password, $baseName);

if ($conn->connect_error) {
    echo "Connection failed. Error: " . $conn->connect_error;
    die;
}

$setEncodingSql = "SET CHARSET utf8";
$conn->query($setEncodingSql);

DataBase::$conn = $conn;