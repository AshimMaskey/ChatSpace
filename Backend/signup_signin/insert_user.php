<?php
require_once "../dbconnect/dbconnect.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


if($_SERVER['REQUEST_METHOD']==='POST'){
$values=file_get_contents('php://input');
$data=json_decode($values,true);

$username=$data['username'];
$email=$data['email'];
$phone=$data['phone'];
$password=$data['password'];

$sql="INSERT INTO user(username, email, phone_number, password) VALUES ('$username', '$email', '$phone', '$password')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
}
?>




