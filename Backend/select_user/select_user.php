<?php
require_once "../dbconnect/dbconnect.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

if($_SERVER['REQUEST_METHOD']==='GET')
{
	$user_id=$_GET['user_id'];
	$sql="SELECT * FROM user WHERE user_id=$user_id LIMIT 1";
	$result=$conn->query($sql);
	if($result->num_rows>0){
		$row=$result->fetch_assoc();
		echo json_encode(['success'=>true, 'user'=>$row]);
	}
	else{
		echo json_encode(['success'=>false, 'message'=>'no user found with the given id!!']);
	}

}
else{
	echo json_encode(['success'=>false, 'message'=>'there was problem with your request']);
}
?>