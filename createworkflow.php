<?php
$hapikey = $_GET["hapikey"];
$data = $_GET["data"];



$ch = curl_init();

$postfields = $data; //incase of any filtering etc.

curl_setopt($ch, CURLOPT_URL,"https://api.hubapi.com/automation/v3/workflows/?hapikey=". $hapikey);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
$server_output = curl_exec($ch);
echo $server_output;
curl_close($ch);
?>