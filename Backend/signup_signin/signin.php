<?php
require_once "../dbconnect/dbconnect.php";
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: POST");
header("Access-Control-Allow-Headers:Content-Type");

if($_SERVER["REQUEST_METHOD"]==='POST'){
	$values=file_get_contents("php://input");
	$data=json_decode($values, true);
	$username=$data['username'];
	$password=$data['password'];

	$sql="SELECT * from user WHERE username='$username' AND password='$password'";
	$result=$conn->query($sql);
	if($result->num_rows>0)
	{
		$row=$result->fetch_assoc();
		$response=[
			'success'=>true,
			'user'=>$row
		];
		echo json_encode($response);
	}
	else{
		$response=[
			'success'=>false,
			'message'=>'Invalid username or password'
		];
		echo json_encode($response);
	}
	$conn->close();
}
?>