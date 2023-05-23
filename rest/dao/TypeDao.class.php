<?php

require_once __DIR__.'/BaseDao.class.php';

class TypeDao extends BaseDao{
  private static $instance = null;

  private function __construct(){
    parent::__construct("types");
  }

  public static function getInstance() {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function getMaterialByTypeId($typeId){
    return $this->query("SELECT * FROM material WHERE type_id = :type_id", ['type_id' => $typeId]);
  }
}

?>
