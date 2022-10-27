<!-- 
    Mason Manca
    CPSC 321: Project 4
    Dr.Bowers
    25 October 2022
 -->
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <h1>Country Information</h1>
    <?php
        $config = parse_ini_file ("config.init");
        $server = $config ["server"];
        $user = $config ["user"];
        $password = $config ["password"];
        $db = "mmanca2_DB";
        // connect to db
        $cn = mysqli_connect ( $server , $user , $password , $db );
        // check connection
        if (!$cn) {
            die(" Connection failed : " . mysqli_connect_error ());
        }
    
        $sql = "SELECT * FROM `Country`";
        $all_countries = mysqli_query($cn,$sql);

        $sql = "SELECT * FROM `Country`";
        $alll_countries = mysqli_query($cn,$sql);

        $sql = "SELECT * FROM `Country`";
        $allll_countries = mysqli_query($cn,$sql);
    ?>

    <!--Country Info-->
    <label for="AddCountry">Add country information:</label>
    <form action="insert.php" method="POST">
        <table>
            <tr>
                <td>Country Code:</td>
                <td><input type="text" name="countryCodeInsert"></td>
            </tr>
            <tr>
                <td>Country Name:</td>
                <td><input type="text" name="nameInsert"></td>
            </tr>
            <tr>
                <td>Country GDP:</td>
                <td><input type="text" name="gdpInsert"></td>
            </tr>
            <tr>
                <td>Country Inflation:</td>
                <td><input type="text" name="inflationInsert"></td>
            </tr>
        </table>
        <br>
        <button class="add-button" onclick="window.location='insert.php';">Add</button>
    </form>
    <br>

    <!--Display Country-->
    <form action="display.php" method="POST">
        <label for ="DisplayCountry">Display country information:</label>
        <select name="DisplayCountry" id="DisplayCountry">
        <?php while ($country = mysqli_fetch_array($all_countries,MYSQLI_ASSOC)):;?>
                <option value="<?php echo $country["country_name"];?>">
                    <?php echo $country["country_name"];?>
                </option>
            <?php endwhile;?>
        </select>
        <br>
        <button class="display-button" onclick="window.location='display.php';">Display</button>
    </form>
    <br>

    <!--Update Country-->
    <form action="update.php" method="POST">
        <label for="CountryUpdate">Update country information:</label>
        <table>
            <tr>
                <td>Country:</td>
                <td>
                <select name="CountryUpdate" id="CountryUpdate">
                <?php
                        while ($country = mysqli_fetch_array(
                                $allll_countries,MYSQLI_ASSOC)):;
                    ?>
                        <option value="<?php echo $country["country_name"];
                        ?>">
                            <?php echo $country["country_name"];
                            ?>
                        </option>
                <?php
                    endwhile;
                 ?>
                </select>
                </td>
            </tr>
            <tr>
                <td>Country GDP:</td>
                <td><input type="text" name="countryGDPUpdate"></td>
            </tr>
            <tr>
                <td>Country Inflation:</td>
                <td><input type="text" name="countryInflationUpdate"></td>
            </tr>
        </table>
        <button onclick="window.location='update.php';">Update</button>
    </form>
    <br>

    <!--Remove country-->
    <form action="remove.php" method="POST">
    <label for ="RemoveCountry">Remove country:</label>
        <select name="RemoveCountry" id="RemoveCountry">
        <?php while ($country = mysqli_fetch_array($alll_countries,MYSQLI_ASSOC)):;?>
                <option value="<?php echo $country["country_name"];?>">
                    <?php echo $country["country_name"];?>
                </option>
            <?php endwhile;?>
        </select>
        <br>
        <button class="remove-button" onclick="window.location='remove.php';">Remove</button>
    </form>
</body>
</html>