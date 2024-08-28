<?php
require_once "../dbconnect/dbconnect.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD']==='POST'){
	$values=file_get_contents('php://input');
	$data=json_decode($values,true);

	$sender_id=$data['sender_id'];
	$receiver_id=$data['receiver_id'];

	$sql="SELECT status FROM friend_requests WHERE sender_id=$sender_id AND receiver_id=$receiver_id LIMIT 1";

	$result=$conn->query($sql);

	if($result->num_rows>0){
		$row=$result->fetch_assoc();
		$status=$row['status'];
		echo json_encode(["success"=>true, "status"=>$status]);
	}
	else{
		echo json_encode(["success"=>false, "message"=>"some error occurred"]);
	}
}
else{
	echo json_encode(["success"=>false, "message"=>"There was problem with your request!"]);
}
?>