<?php
  require_once __DIR__.'/BaseService.class.php';
  require_once __DIR__.'/../dao/TypeDao.class.php';

  class TypeService extends BaseService{

    public function __construct(){
      parent::__construct(TypeDao::getInstance());
    }
    
    public function getMaterialByTypeId($typeId){
      return $this->dao->getMaterialByTypeId($typeId);
    }
  }
?>
