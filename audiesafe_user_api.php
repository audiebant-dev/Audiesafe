<?php
include('/home/audiebantcodev/include/audiesafe_db.php');


$email = $_GET['email'];



    
    $sth = mysqli_query($conn, "SELECT email FROM users where email = `$email` ");
    $rows = array();
    while($r = mysqli_fetch_assoc($sth)) {
        $rows[] = $r;
    }
    print "{\"results\":".json_encode($rows, JSON_UNESCAPED_SLASHES).'}';

?>