<?php

require_once __DIR__.'/BaseDao.class.php';

class AdminDao extends BaseDao{
  private static $instance = null;

  private function __construct(){
    parent::__construct("admins");
  }

  public static function getInstance() {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function getAdminByEmail($email){
    return $this->queryUnique("SELECT * FROM admins WHERE email=:email",['email'=>$email]);
  }
}
?>
