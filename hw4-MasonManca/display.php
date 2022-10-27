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

        // conection param
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
        // get the data from the form :
        $country_name = $_POST["DisplayCountry"];
       
        // set up the prepared statement
        $q = "SELECT country_code, country_name, gdp, inflation FROM Country WHERE country_name = ?";
        $st = $cn->stmt_init();
        $st->prepare( $q );
        $st->bind_param("s", $country_name); // "s" for string

        // execute the statement and bind the result (to vars )
        $st->execute();
        $st->bind_result($country_code, $country_name, $gdp, $inflation);

        // output result
        while($st->fetch()) {
            echo "<li>Country Code: <strong>", $country_code . "</strong></li>\n";
            echo "<li>Country Name: <strong>", $country_name . "</strong></li>\n";
            echo "<li>Country Per Capita GDP: <strong>", $gdp . "</strong></li>\n";
            echo "<li>Country Inflation: <strong>", $inflation . "</strong></li>\n";
        }
        // clean up
        $st->close();
        $cn->close();
    ?>
    <button onclick="window.location='country.php';">Go Back</button>
</body>
</html>