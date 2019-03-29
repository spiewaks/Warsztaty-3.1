<?php

class Address extends DataBase implements Action{
    
    private $id;
    private $city;
    private $code;
    private $street;
    private $flat;
    
    public function __construct( ) {
        
        $this->id = -1;
        
    }

    public function getId(){
        return $this->id;
    }


    public function setCity($city){
        $this->city = $city;
    }
    
     public function setCode($code){
        $this->code = $code;
    }
    
     public function setStreet($street){
        $this->street = $street;
    }
    
     public function setFlat($flat){
        $this->flat = $flat;
    }
    
    public function getCity(){
        return $this->city;
    }
    
     public function getCode(){
        return  $this->code;
    }
    
     public function getStreet(){
        return $this->street;
    }
    
     public function getFlat(){
        return $this->flat;
    }

    public function loadFromDB($id) {
        
        $safe_id = Self::$conn->real_escape_string($id);
        $sql = "SELECT * FROM address WHERE id = $safe_id";
        
        if ($result = Self::$conn->query($sql)) {
            $row = $result->fetch_assoc();

            $this->id = $row['id'];
            $this->city = $row['city'];
            $this->code = $row['code'];
            $this->street = $row['street'];
            $this->flat = $row['flat'];

            return $row;
            
        } else {
            
            return false;
            
        }
    }
    
    
    public function saveToDB()
    {

        $sql = "INSERT INTO address(city, code, street, flat) VALUES ('$this->city', '$this->code', '$this->street', '$this->flat')";
        
        if ($result = Self::$conn->query($sql)) {
            $this->id = Self::$conn->insert_id;

            return $this;
            
        } else {
            
            return false;
            
        }
    }

    public function update()
    {
        
        $sql = "UPDATE address SET city='$this->city', code='$this->code', street='$this->street', flat='$this->flat'"
            . "WHERE id=$this->id";
        var_dump($sql);
        $result = Self::$conn->query($sql);

        if ($result = Self::$conn->query($sql)) {

            return $this;
        } else {
            return false;
        }
    }

    public function deleteFromDB()
    {
        
        $safe_id = Self::$conn->real_escape_string($this->id);

        $sql = "DELETE FROM address WHERE id=$safe_id";
        echo $sql;
        
        if ($result = Self::$conn->query($sql)) {
            $this->city = null;
            $this->code = null;
            $this->street = null;
            $this->flat = null;
            $this->id = -1;
            
            return true;
            
        } else {
            
            return false;
            
        }
    }

     public static function loadAllFromDB() {
        $sql = "SELECT * FROM address";

         if ($result = Self::$conn->query($sql)) {
            
            foreach ($result as $key => $value) {
                $row[$key] = $value;
            }
            return $row;
        }else {
            return false;
        }
    }

}