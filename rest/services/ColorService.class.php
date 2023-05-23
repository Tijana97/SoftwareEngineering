<?php
  require_once __DIR__.'/BaseService.class.php';
  require_once __DIR__.'/../dao/ColorDao.class.php';

  class ColorService extends BaseService{

    public function __construct(){
      parent::__construct(ColorDao::getInstance());
    }

    public function add($entity){
      try {
        return $this->dao->add($entity);
      } catch (\Exception $e) {
        if (str_contains($e->getMessage(), 'SQLSTATE[23000]')) {
            throw new Exception('Color with the same name exists.');
        }
        else {
          throw $e;
        }
      }
    }

    public function getMaterialByColorId($colorId){
      return $this->dao->getMaterialByColorId($colorId);
    }
  }
?>
