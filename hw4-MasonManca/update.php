<!-- 
    Mason Manca
    CPSC 321: Project 4
    Dr.Bowers
    25 October 2022
 -->
<html>
<head>
    <title>Update Country</title>
</head>
<body>
    <h1>Country Information</h1>
    <?php
    $config = parse_ini_file("config.init");
    $server = $config["server"];
    $user = $config["user"];
    $password = $config["password"];
    $db = "mmanca2_DB";
    
    # php -S localhost:3000 -t ./hw4-amoltafet
    $connection = mysqli_connect($server, $user, $password, $db);
    if (!$connection) {
        die("Connection failed:" . mysqli_connect_error());
    }
    # Grab the country name from the form
    $country_name = $_POST["CountryUpdate"];
    $gdp = $_POST["countryGDPUpdate"];
    $infl = $_POST["countryInflationUpdate"];

    # Update the country
    $q_stmt = "UPDATE Country SET gdp = ?, inflation = ? WHERE country_name = ?;";
    $statement = $connection->stmt_init();
    $statement->prepare($q_stmt);
    $statement->bind_param("ids", $gdp, $infl, $country_name);
    $statement->execute();
    
    # output result
    $q_stmt = "SELECT country_code FROM Country WHERE country_name = ?";
    $statement = $connection->stmt_init();
    $statement->prepare($q_stmt);
    $statement->bind_param("s", $country_name);
    $statement->execute();
    $country_code = $statement->get_result()->fetch_assoc()["country_code"];
    $statement->bind_result($country_code);


    # output result
    echo "Country Updated Successfully!\n";
    echo "<li>Country Code: <strong>", $country_code . "</strong></li>\n";
    echo "<li>Country Name: <strong>", $country_name . "</strong></li>\n";
    echo "<li>Country Per Capita GDP: <strong>", $gdp . "</strong></li>\n";
    echo "<li>Country Inflation: <strong>", $infl . "</strong></li>\n";

    # close the connection
    $statement->close();
    $connection->close();

    ?>
    <button onclick="window.location='country.php';">Go Back</button>
</body>

</html>