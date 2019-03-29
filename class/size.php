<?php


class Size extends DataBase implements Action {
    
    private $id;
    private $size;
    private $price;
    
    public function __construct($size = null, $price = -1) {
        $this->id = -1;
        $this->size = $size;
        $this->price = $price;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getSize(){
        return $this->size;
    }
    
    public function setSize($size){
        $this->size = $size;
        
        return $this;
    }
    
    public function setPrice($price){
        $this->price = $price;
        return $this;
    }
    
    public function getPrice(){
        return $this->price;
    }
    
    
    public function loadFromDB($id)
    {
        
        $sql = "SELECT * FROM size WHERE id = $id";
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
        $size = Self::$conn->real_escape_string($this->size);
        $price = Self::$conn->real_escape_string($this->price);

        $sql = "INSERT INTO size(size, price) VALUES ('$size', '$price')";
        
        
        if ($result = Self::$conn->query($sql)) {
            $this->id = Self::$conn->insert_id;
            $this->size = $size;
            $this->price = $price;

            return $this;
            
        } else {
            
            return false;
            
        }
    }

    public function update()
    {
        $size = Self::$conn->real_escape_string($this->size);
        $price = Self::$conn->real_escape_string($this->price);
        
        $sql = "UPDATE size SET size='$size', price='$price' "
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
        
        $sql = "DELETE FROM size WHERE id=$this->id";

        if ($result = Self::$conn->query($sql)) {
            $this->id = -1;
            
            return true;
            
        } else {
            
            return false;
            
        }
        
    }

    public static function loadAllFromDB() {
        $sql = "SELECT * FROM size";

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