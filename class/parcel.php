<?php

class Parcel extends DataBase implements Action {
    
    private $id;
    private $address_id;
    private $user_id;
    private $size_id;
    
    public function __construct($size = null, $price = -1) {
        $this->id = -1;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getAddressId(){
        return $this->address_id;
    }
    
    public function setAddressId($add){
        $this->address_id = $add;
        return $this;
    }
    
    public function getUserId(){
        return $this->user_id;
    }
    
    public function setUserId($user){
        $this->user_id = $user;
        return $this;
    }
    
    public function getSizeId(){
        return $this->size_id;
    }
    
    public function setSizeId($size){
        $this->size_id = $size;
        return $this;
    }
    
    public function loadFromDB($id)
    {
        $safe_id = Self::$conn->real_escape_string($id);
        $sql = "SELECT * FROM parcel WHERE id = $safe_id";

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

        $sql = "INSERT INTO parcel(address_id, user_id, size_id) VALUES ('$this->address_id', '$this->user_id', '$this->size_id')";
        
        if ($result = Self::$conn->query($sql)) {
             $this->id = Self::$conn->insert_id;

            return $this;
            
        } else {
            
            return false;
            
        }
    }

    public function update()
    {
        
        $sql = "UPDATE parcel SET address_id = $this->address_id, user_id=$this->user_id, size_id=$this->size_id "
            . "WHERE id=$this->id";
        
        $result = Self::$conn->query($sql);

        if ($result = Self::$conn->query($sql)) {

            return $this;
        } else {
            return false;
        }
    }

    public function deleteFromDB()
    {
        
        $sql = "DELETE FROM parcel WHERE id=$this->id";

        if ($result = Self::$conn->query($sql)) {
            $this->id = -1;
            
            return true;
            
        } else {
            
            return false;
            
        }
        
    }

    public static function loadAllFromDB() {
        $sql = "SELECT * FROM parcel";

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