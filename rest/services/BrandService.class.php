<?php
  require_once __DIR__.'/BaseService.class.php';
  require_once __DIR__.'/../dao/BrandDao.class.php';

  class BrandService extends BaseService{

    public function __construct(){
      parent::__construct(BrandDao::getInstance());
    }
    
    public function getMaterialByBrandId($brandId){
      return $this->dao->getMaterialByBrandId($brandId);
    }
  }
?>
