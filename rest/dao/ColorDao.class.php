<?php

require_once __DIR__.'/BaseDao.class.php';

class ColorDao extends BaseDao{
  private static $instance = null;

  private function __construct(){
    parent::__construct("colors");
  }
  
  public static function getInstance() {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function add($entity){
    return $this->query("INSERT INTO colors (name) VALUES (:color)",['color'=>$entity['color-name']]);
  }

  public function getMaterialByColorId($colorId){
    return $this->query("SELECT * FROM material WHERE color_id = :color_id", ['color_id' => $colorId]);
  }
}

?>
