<?php

interface Action {
    
    public function saveToDB();
    public function update();
    public function deleteFromDB();
    public function loadFromDB($id);
    
    public static function loadAllFromDB();
}
