<?php
include('/home/audiebantcodev/include/audiesafe_db.php');


$email = $_GET['email'];
$email = str_replace('{"email":"', "", $email);
$email = str_replace('"}', "", $email);


$stmt = $conn -> prepare('SELECT `PartOf` FROM `users` WHERE `email` = ?');
$stmt -> bind_param('s', $email);
$stmt -> execute();
$stmt -> store_result();
$stmt -> bind_result($PartOf);
$stmt -> fetch();




$sth = mysqli_query($conn, "SELECT Date, msg from live_message_logs where PartOf = '$PartOf' ");
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}



$json = json_encode($rows, JSON_UNESCAPED_SLASHES);

//$json = str_replace('[', "", $json);
//$json = str_replace(']', "", $json);
//$json = str_replace('"{"id":', '{"id":', $json);



echo '{
  "movies": ';

print  $json;

echo "}";

$action = "access notifications api";

$sql_audit = "INSERT INTO `audit_table` ( `email`, `action` ) VALUES (?, ?)";
$stmt = $conn->prepare( $sql_audit );
$stmt->bind_param('ss', $email, $action );
$result = $stmt->execute();
$stmt->free_result();
$stmt->close();


?>

