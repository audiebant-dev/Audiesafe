<?php
include('/home/audiebantcodev/include/audiesafe_db.php');

$json = file_get_contents('php://input'); 	
$obj = json_decode($json,true);

$email = $obj['email'];

$stmt = $conn -> prepare('SELECT `email` FROM `users` WHERE  `email` =?  ');
$stmt -> bind_param('s', $email);
$stmt -> execute();
$stmt -> store_result();
$stmt -> bind_result($email1);
$stmt -> fetch();   
$numberofrows = $stmt->num_rows; 
if($numberofrows === 1) { 
    
$response['status'] = "success";
echo json_encode($response);

$action = 'logged into Audiesafe app';

$sql_audit = "INSERT INTO `audit_table` ( `email`, `action` ) VALUES (?, ?)";
$stmt = $conn->prepare( $sql_audit );
$stmt->bind_param('ss', $email, $action );
$result = $stmt->execute();
$stmt->free_result();
$stmt->close();

}else{
    
$response['status'] = "error";
echo json_encode($response);  

$action = 'Failed login into Audiesafe app';

$sql_audit = "INSERT INTO `audit_table` ( `email`, `action` ) VALUES (?, ?)";
$stmt = $conn->prepare( $sql_audit );
$stmt->bind_param('ss', $email, $action );
$result = $stmt->execute();
$stmt->free_result();
$stmt->close();
}

?>