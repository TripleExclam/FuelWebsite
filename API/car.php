<?php 

class car_query {
	private $year;
	private $make;
	private $model;
	private $trim;
	private $car_data;

	function __construct($year, $make, $model, $trim) {
		$this->year = $year;
		$this->make = $make;
		$this->model = $model;
		$this->trim = $trim;
		$this->get_data();
	}

	function get_economy() {
		return (float) $this->car_data['model_lkm_mixed'];
	}

	function get_fuel_type() {
		include("connect.php");
		$sql = "SELECT * FROM fuel_types WHERE name = '".$this->car_data['model_engine_fuel']."' ";
		$query = mysqli_query($con, $sql);
		if (mysqli_num_rows($query) == 0) {
			$sql = "INSERT INTO fuel_types(fuel_id, name) VALUES (0, '".$this->car_data['model_engine_fuel']."')";
			$query = mysqli_query($con, $sql);
		}
		switch($this->car_data['model_engine_fuel']) {
			case "Gasoline - Premium": 
				return 5;
				break;
			case "Gasoline - unleaded 95": 
				return 5;
				break;
			case "Gasoline": 
				return 2;
				break;
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

	function get_tank_capacity() {
		return (float) $this->car_data['model_fuel_cap_l'];
	}

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