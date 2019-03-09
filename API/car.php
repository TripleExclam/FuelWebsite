<?php 

/*
Queries a vehicle database and returns the appropriate information about the vehicle.
params:
	year: the year of production,
	make: vehicle make,
	model: vehicle model,
	trim: vehicle specifics
	car_data: an array of data about the vehicle
*/
class car_query {
	private $year;
	private $make;
	private $model;
	private $trim;
	private $car_data;

	/*
	Builds all varibles and calls the main method.
	*/
	function __construct($year, $make, $model, $trim) {
		$this->year = $year;
		$this->make = $make;
		$this->model = $model;
		$this->trim = $trim;
		$this->get_data();
	}

	/*
	Returns vehicle economy.
	*/
	function get_economy() {
		return (float) $this->car_data['model_lkm_mixed'];
	}

	/*
	Returns vehicle fuel type.
	*/
	function get_fuel_type() {
		include("connect.php");
		$sql = "SELECT * FROM fuel_types WHERE fuel_name = '".$this->car_data['model_engine_fuel']."' ";
		$query = mysqli_query($con, $sql);
		if (mysqli_num_rows($query) == 0) {
			$sql = "INSERT INTO fuel_types(fuel_id, fuel_name) VALUES (0, '".$this->car_data['model_engine_fuel']."')";
			$query = mysqli_query($con, $sql);
		}
		switch($this->car_data['model_engine_fuel']) {
/*			case "Gasoline - Premium": 
				return 5;
				break;
			case "Gasoline - unleaded 95": 
				return 5;
				break;
			case "Gasoline": 
				return 2;
				break;*/
			case "Diesel": 
				return 3;
				break;
			case "Regular Unleaded": 
				return 2;
				break;
			case "Electric": 
				return 4;
				break;
			default:
				return 2; 
		}
	}

	/*
	Returns vehicle tank capacity.
	*/
	function get_tank_capacity() {
		if ((float) $this->car_data['model_fuel_cap_l'] > 10) {
			return (float) $this->car_data['model_fuel_cap_l'];
		} 
		return 40;
	}

	/*
	Queries the database.
	*/
	function get_data() {
		$ch = curl_init();

		curl_setopt ($ch, CURLOPT_CAINFO, "C:\wamp64\bin\php\php7.2.10\cacert.pem");
		curl_setopt($ch, CURLOPT_URL, "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&year=".$this->year."&model=".$this->model."&make=".$this->make."");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$re = curl_exec($ch);
		if($re === false) {
		    echo 'Curl error: ' . curl_error($ch);
		}

		curl_close($ch);

		$re = substr($re, 2, -2);
		$decodedarray = json_decode($re, true);

		$model_id = $decodedarray['Trims'][0]['model_id'];
		for ($i = 0; $i < count($decodedarray['Trims']); $i++) {
			if ($this->trim == $decodedarray['Trims'][$i]['model_trim']) {
				$model_id = $decodedarray['Trims'][$i]['model_id'];
			}
		}

		$ch = curl_init();
		curl_setopt ($ch, CURLOPT_CAINFO, "C:\wamp64\bin\php\php7.2.10\cacert.pem");
		curl_setopt($ch, CURLOPT_URL, "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModel&model=" . $model_id);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		$re = curl_exec($ch);
		if($re === false) {
		    echo 'Curl error: ' . curl_error($ch);
		}

		curl_close($ch);

		$re = substr($re, 3, -3);
		$decodedarray = json_decode($re, true);

		$this->car_data = $decodedarray;
	}


}

?>