<?php
require_once "../dbconnect/dbconnect.php";
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET');

if($_SERVER['REQUEST_METHOD']==='GET'){
	$searchQuery=$_GET['searchQuery'];
	$sql="SELECT * FROM user WHERE username LIKE '%$searchQuery%'";
	$result=$conn->query($sql);
	if($result->num_rows>0){
		$searchResult=[];
		while($row=$result->fetch_assoc())
		{
			$searchResult[]=$row;
		}	
		echo json_encode(['success'=>true,'user'=>$searchResult]);
	}
	else{
		echo json_encode(['success'=>false, 'message'=>'No user found!!']);
	}
}
else{
	echo json_encode(['success'=>false, 'message'=>'There was problem with your request!']);
}


?>