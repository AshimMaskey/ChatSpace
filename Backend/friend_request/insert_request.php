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

	$sql="INSERT INTO friend_requests(sender_id, receiver_id) VALUES ($sender_id, $receiver_id)";

	if($conn->query($sql)){
		// echo json_encode(["success"=>true, "message"=>'Friend request sent!!']);
		$notification_message="You have received friend request!";
		$sql="INSERT INTO notifications(user_id, message) VALUES ($receiver_id, '$notification_message')";
		if($conn->query($sql)){
			echo json_encode(["success"=>true, "message"=>'Friend request sent!!']);
		}
		else{
			echo json_encode(["success"=>false, "message"=>'Friend request not sent!!']);
		}
	}
	else{
		echo json_encode(["success"=>false, "message"=>'no request sent previously to this user']);
	}
}
else{
	echo json_encode(["success"=>false, "message"=>'There was some problem with your request']);
}
?>