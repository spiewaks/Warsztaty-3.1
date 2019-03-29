<?php


class User extends DataBase implements Action{
    
    private $id;
    private $address_id;
    private $name;
    private $surname;
    private $credits;
    private $pass;
    
    public function __construct() {
        $this->id = -1;
    }
    
    public function getId(){
        return $this->id;
    }

    public function setPass($pass){
        $hashed_pass = password_hash($pass, PASSWORD_BCRYPT);
        $this->pass = $hashed_pass;
    }
    
    public function getPass(){
        return $this->pass;
    }
    
     public function getName(){
        return $this->name;
    }
    
    public function setName($name){
        $this->name = $name;
    }
    
    public function getSurname(){
        return $this->surname;
    }
    
    public function setSurname($surname){
        $this->surname = $surname;
    }
    
    public function getCredits(){
        return $this->surname;
    }
    
    public function setCredits($cre){
        $this->credits = $cre;
    }
    
     public function getAddressId(){
        return $this->surname;
    }
    
    public function setAddressId($add){
        $this->address_id = $add;
    }
    
    public function loadFromDB($id)    {
        
        $safe_id = Self::$conn->real_escape_string($id);
        $sql = "SELECT * FROM user WHERE id = $safe_id";

        if ($result = Self::$conn->query($sql)) {
            $row = $result->fetch_assoc();

            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->surname = $row['surname'];
            $this->credits = $row['credits'];
            $this->pass = $row['pass'];
            $this->address_id = $row['address_id'];

            return $row;
            
        } else {
            
            return false;
            
        }
    }
    
    
    public function saveToDB()
    {
        $pass = password_hash($pass, PASSWORD_BCRYPT);
        
        $sql = "INSERT INTO user(address_id, name, surname, credits, pass) VALUES ('$this->address_id', '$this->name', '$this->surname', '$this->credits', '$this->pass')";
        
        if ($result = Self::$conn->query($sql)) {
            $this->id = Self::$conn->insert_id;
            $this->name = $name;
            $this->surname = $surname;
            $this->credits = $credits;
            $this->pass = $pass;

            return $this;
            
        } else {
            
            return false;
            
        }
    }

    public function update()
    {
        

        $sql = "UPDATE user SET name='$this->name', surname='$this->surname', credits='$this->credits' "
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
        
        $safe_id = Self::$conn->real_escape_string($this->id);

        $sql = "DELETE FROM user WHERE id=$safe_id";
        if ($result = Self::$conn->query($sql)) {
            $this->address_id = null;
            $this->name = null;
            $this->surname = null;
            $this->credits = null;
            $this->pass = null;
            $this->id = -1;
            
            return true;
            
        } else {
            
            return false;
            
        }
    }

    public static function loadAllFromDB() {
        $sql = "SELECT * FROM user";

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
