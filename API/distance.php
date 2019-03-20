<?php
/*
Locates the closest stations and inserts this information into the database
params:
	longtitude
	latitude
	location
	detination (optional)
*/
class distance_query {
	private $longtitude;
	private $latitude;
	private $location;
	private $destination;

	/*
	Assigns variables
	*/
	function __construct($location, $destination=false) {
		$ch = curl_init();
		$this->location = $location;
		$this->destination = $destination;
		if ($destination) {
			$lat_lng = $this->get_coords($this->destination);
			$this->dlatitude = $lat_lng[0];
			$this->dlongtitude = $lat_lng[1];
		}
		$lat_lng = $this->get_coords($this->location);
		$this->latitude = $lat_lng[0];
		$this->longtitude = $lat_lng[1];
		$this->get_stations();
	}

	/*
	Returns the coordinates of a given location
	Params:
		-Location: A google maps address
	Return:
	 	-array: latitudue, longtitude
	*/
	function get_coords($location) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/geocode/json?address=". $location . "&key=AIzaSyArHArOSEyLkGdrK5VJt7ByeeMPGxlryfI");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$re = curl_exec($ch);
		if($re === false) {
		    echo 'Curl error: ' . curl_error($ch);
		}

		curl_close($ch);
		$decodedarray = json_decode($re, true);
		$latitude = $decodedarray['results'][0]['geometry']['location']['lat'];
		$longtitude = $decodedarray['results'][0]['geometry']['location']['lng'];
		return array($latitude, $longtitude);
	}

	/*
	Creates a box to search for stations within.
	*/
	function build_box($width) {
		if ($this->destination) {
			$low_lat = ($this->dlatitude < $this->latitude ? $this->dlatitude : $this->latitude);
			$high_lat = ($low_lat == $this->latitude ? $this->dlatitude : $this->latitude);
			$low_long = ($this->dlongtitude < $this->longtitude ? $this->dlongtitude : $this->longtitude);
			$high_long = ($low_long == $this->longtitude ? $longtitude : $this->longtitude);
			$box = array($low_lat - $width, $high_lat + $width, $low_long - $width, $high_long + $width);
		} else {
			$box = array($this->latitude - $width, $this->latitude + $width, $this->longtitude - $width, $this->longtitude + $width);
		}
		return $box;
	}

	/*
	Returns ten stations closest to the box. 
	*/
	function get_stations($width=0.0005) {
		include("connect.php");
		$box = $this->build_box($width);
		$sql = "SELECT * FROM station WHERE latitude > '".$box[0]."' AND latitude < '".$box[1]."' AND longtitude > '".$box[2]."' AND longtitude < '".$box[3]."' 
			ORDER BY latitude = '".$this->latitude."', longtitude = '".$this->longtitude."'";
		$query = mysqli_query($con, $sql);
		if (mysqli_num_rows($query) <= 10) {
			mysqli_close($con);
			$this->get_stations($width += 0.0005);
		} else {
			$i = 0;
			while ($station = mysqli_fetch_array($query)) {
				if ($i == 9) {
					break;
				}
				$this->populate_distance($station['id']);
				$i++;
			}
		}
	}

	/*
	Inserts the station data into the database.
	*/
	function populate_distance($station) {
		include("connect.php");
		$sql = "SELECT * FROM distance WHERE station_id='".$station."' AND location='".$this->location."'";
		$query = mysqli_query($con, $sql);
		if (mysqli_num_rows($query) == 0) {
			$sql = "SELECT * FROM station WHERE id='".$station."'";
			$query = mysqli_query($con, $sql);
			if (!$query) {
				echo $station;
			} else {
				$station_loc = mysqli_fetch_array($query);
			}
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/directions/json?origin=".$this->location."&destination=".$station_loc['latitude'].",".$station_loc['longtitude']."&key=AIzaSyArHArOSEyLkGdrK5VJt7ByeeMPGxlryfI");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			$re = curl_exec($ch);
			if($re === false) {
			    echo 'Curl error: ' . curl_error($ch);
			}
			curl_close($ch);

			$decodedarray = json_decode($re, true);

			$distance = $decodedarray["routes"][0]["legs"][0]['distance']['value'];
			$time = $decodedarray["routes"][0]["legs"][0]['duration']['value'];

			$sql = "INSERT INTO distance(station_id, location, distance, time) VALUES ('".$station."', '".$this->location."', '".$distance."', '".$time."')";
			$query = mysqli_query($con, $sql);
			if (!$query) {
				echo("Error description: " . mysqli_error($con));
				$sql = "UPDATE distance SET distance='".$distance."', time='".$time."' WHERE station_id='".$station."' AND location='".$this->location."'";
				$query = mysqli_query($con, $sql);
				if (!$query) {
					echo("Error description: " . mysqli_error($con));
				}
			}
		} 
		mysqli_close($con);
	}

}

?>
