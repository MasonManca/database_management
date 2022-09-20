DROP TABLE IF EXISTS PricePlan;
DROP TABLE IF EXISTS VehicleType;
DROP TABLE IF EXISTS AllowedPlan;
DROP TABLE IF EXISTS DefulatPlan;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Trip;

CREATE TABLE PricePlan(
    plan_name CHAR(25),
    price_per_min INT,
    unlock_price INT,
    rate_start_min INT,
    PRIMARY KEY (plan_name)
);

CREATE TABLE VehicleType(
    vt_id INT,
    form_factor CHAR(20),
    make CHAR(20),
    model CHAR(20),
    trim_level INT,
    alt_name CHAR(15),
    max_spd INT,
    max_range INT, 
    v_weight INT,
    PRIMARY KEY (vt_id)
);

CREATE TABLE AllowedPlan(
    vt_id INT,
    price_plan CHAR(25),
    FOREIGN KEY (price_plan) REFERENCES PricePlan(plan_name),
    FOREIGN KEY (vt_id) REFERENCES VehicleType(vt_id),
    PRIMARY KEY (vt_id,price_plan)
);

CREATE TABLE DefaultPlan(
    vt_id INT,
    price_plan CHAR(25)
);

CREATE TABLE Vehicle(
    v_id INT,
    vt_id CHAR(15),
    in_circ CHAR(10),
    is_reserved CHAR(10),
    is_disabled CHAR(10),
    lat DECIMAL(8,6),
    lon DECIMAL (8,6),
    cur_fuel_pct INT,
    cur_range INT
);

CREATE TABLE Customer(
    c_id INT,
    first_name CHAR(20),
    last_name CHAR(20),
    email CHAR(50),
    PRIMARY KEY (c_id)
);

CREATE TABLE Trip(
    t_id INT,
    c_id INT,
    v_id INT,
    price_plan CHAR(25),
    start_dtime TIME,
    end_dtime TIME,
    start_lat DECIMAL(8,6),
    start_lon DECIMAL(8,6),
    end_lat DECIMAL (8,6), 
    end_lon DECIMAL(8,6),
    PRIMARY KEY (t_id)
);