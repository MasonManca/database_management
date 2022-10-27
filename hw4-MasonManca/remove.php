<!-- 
    Mason Manca
    CPSC 321: Project 4
    Dr.Bowers
    25 October 2022
 -->
<html>
<body>
    <h1>Country Information</h1>
    <?php
        $config = parse_ini_file ("config.init");
        $server = $config ["server"];
        $user = $config ["user"];
        $password = $config ["password"];
        $db = "mmanca2_DB";
        // connect
        $cn = mysqli_connect($server, $user, $password, $db);
        if (!$cn) {
            die("Connection failed:".mysqli_connect_error());
        }

        $country_name = $_POST["RemoveCountry"];

        $q = "DELETE FROM Country WHERE country_name = ?";
        $statement = $cn->stmt_init();
        $statement->prepare($q);
        $statement->bind_param("s", $country_name); 
        $statement->execute();

        // output that country has been removed
        echo "The country " . $country_name . " was successfully removed";

        // clean up
        $statement->close();
        $cn->close();
    ?>
    <button onclick="window.location='country.php';">Go Back</button>
</body>
</html>