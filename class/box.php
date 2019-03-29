<?php

class Box extends DataBase implements Action {
    
    private $id;
    private $size_id;
    private $address_id;
    
    public function __construct() {
        $this->id = -1;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getSizeId(){
        return $this->size_id;
    }
    
    public function setSizeId($size_id){
        $this->size_id = $size_id;
        
        return $this;
    }
    
    public function setAddressId($address_id){
        $this->address_id = $address_id;
        
        return $this;
    }
    
    public function getAddressId(){
        return $this->address_id;
    }
    
    public function loadFromDB($id)
    {
        $safe_id = Self::$conn->real_escape_string($id);
        $sql = "SELECT * FROM box WHERE id = $safe_id";

        if ($result = Self::$conn->query($sql)) {
            $row = $result->fetch_assoc();
            $this->id = $row['id'];
            
            return $row;
            
        } else {
            
            return false;
            
        }
    }
    

    public function saveToDB()
    {
        $sql = "INSERT INTO box(address_id, size_id) VALUES ('$this->address_id', '$this->size_id')";
        echo $sql;
        
        if ($result = Self::$conn->query($sql)) {
            $this->id = Self::$conn->insert_id;

            return $this;
            
        } else {
            
            return false;
            
        }
    }


    public function deleteFromDB()
    {
        if(! ($this->id > 0) ){
            return false;
        }
        
        $safe_id = Self::$conn->real_escape_string($this->id);

        $sql = "DELETE FROM box WHERE id=$safe_id";

        if ($result = Self::$conn->query($sql)) {
            $this->size_id = '';
            $this->address_id = '';
            $this->id = -1;
            
            return true;
            
        } else {
            
            return false;
            
        }
    }
    
    public function update() {
        
       $sql = "UPDATE box SET address_id = $this->address_id, size_id=$this->size_id "
            . "WHERE id=$this->id";
        
        $result = Self::$conn->query($sql);

        if ($result = Self::$conn->query($sql)) {

            return $this;
        } else {
            return false;
        }
        
    }
    
     public static function loadAllFromDB() {
        $sql = "SELECT * FROM box";
        
        if ($result = Self::$conn->query($sql)) {
            $row = [];
            $n = 1;
            foreach ($result as $key => $value) {
                $row[$n][$key] = $value;
                $n++;
            }
            return $row;
        }else {
            return false;
        }
    }
    
    
}