<?php

require_once __DIR__.'/BaseDao.class.php';

class BrandDao extends BaseDao{
  private static $instance = null;

  private function __construct(){
    parent::__construct("brands");
  }

  public static function getInstance() {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function getMaterialByBrandId($brandId){
    return $this->query("SELECT * FROM material WHERE brand_id = :brand_id", ['brand_id' => $brandId]);
  }
}

?>
