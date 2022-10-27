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

        $cn = mysqli_connect($server, $user, $password, $db);
        if (!$cn) { // if connection fails, end program with this error message
            exit("Connection to DB has failed".mysqli_connect_error());
        }

        // reads data inputted by user
        $country_code = $_POST["countryCodeInsert"];
        $country_name = $_POST["nameInsert"];
        $gdp = $_POST["gdpInsert"];
        $inflation = $_POST["inflationInsert"];

        // search db to check if already exists
        $q = "SELECT * FROM Country WHERE country_code = ?";
        $st = $cn->stmt_init ();
        $st->prepare ($q);
        $st->bind_param ("s", $country_code); 
        $st->execute();
        if ($st->fetch()) {
            echo "Country already in databse";
            $st->close();
            $cn->close();
            return 1;
        }

        $q = "INSERT INTO Country VALUES (?,?,?,?)";
        $st = $cn->stmt_init ();
        $st->prepare($q);
        $st->bind_param ("ssid", $country_code, $country_name, $gdp, $inflation); // "s" for string
        $st->execute();

        // prints the added country
        echo "<li>Country Code: <strong>", $country_code . "</strong></li>\n";
        echo "<li>Country Name: <strong>", $country_name . "</strong></li>\n";
        echo "<li>Country Per Capita GDP: <strong>", $gdp . "</strong></li>\n";
        echo "<li>Country Inflation: <strong>", $inflation . "</strong></li>\n";

        $st->close();
        $cn->close();
    ?> 
    <!-- returns user to main page, dynamically generates html again -->
    <button onclick="window.location='country.php';">Go Back</button> 
</body>
</html>