<?php

//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name'] : $_POST['name'];
$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$comment = ($_GET['comment']) ?$_GET['comment'] : $_POST['comment'];


//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.'; 
if (!$comment) $errors[count($errors)] = 'Please enter your message.'; 

//if the errors array is empty, send the mail
if (!$errors) {

	//send the message
	$result = savemessage($name, $email, $comment);

	if ($result) echo 'Thank you! We have received your message.';
	else echo 'Sorry! unexpected error! Please try again later!';
	return $result;

} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="index.html">Back</a>';
	exit;
}

function savemessage($name, $email, $comment) {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $db = "chinese_foods";
    $db_port = "3308";

    $conn = new mysqli($servername,$username,$password,$db,$db_port);

    if ($conn->connect_error) {
        //die("Connection Error: ").$conn->connect_error;
        echo "Connection Error: ".$conn->connect_error;
        return 0;
    }

    $sql = "insert into contact_info (name, email, message) ";
    $sql .= "values (";
    $sql .= "'" . $name . "'," ;
    $sql .= "'" . $email . "'," ;
    $sql .= "'" . $comment . "'" ;
    $sql .= ")" ;

    echo $sql;

    if ($conn->query($sql)){
        echo "it updated";
        return 1;
    } else {
        echo "Update Failed";
        return 0;
    }

}

?>