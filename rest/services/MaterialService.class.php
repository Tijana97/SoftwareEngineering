<?php
  require_once __DIR__.'/BaseService.class.php';
  require_once __DIR__.'/../dao/MaterialDao.class.php';
  require_once __DIR__.'/../dao/BrandDao.class.php';
  require_once __DIR__.'/../dao/TypeDao.class.php';
  require_once __DIR__.'/../dao/ColorDao.class.php';

  class MaterialService extends BaseService{

    private $brandDao;
    private $typeDao;
    private $colorDao;

    public function __construct(){
      parent::__construct(MaterialDao::getInstance());
      $this->brandDao = BrandDao::getInstance();
      $this->typeDao = TypeDao::getInstance();
      $this->colorDao = ColorDao::getInstance();
    }

    public function add($entity){
      try {
        return $this->dao->add($entity);
      } catch (\Exception $e) {
        if (str_contains($e->getMessage(), 'SQLSTATE[23000]')) {
            throw new Exception('Material with the same name and color exists.');
        }
        else {
          throw $e;
        }
      }
    }

    public function getIndividualData($id){
      return $this->dao->getIndividualData($id);
    }

    public function getByColorRoute($id){
      $material = $this->dao->getById($id);

      $material['brands'] = $this->brandDao->getAll();
      $material['types'] = $this->typeDao->getAll();
      $material['colors'] = $this->colorDao->getAll();

      return $material;
    }

    public function getAllMaterialInfo(){
      return $this->dao->getAllMaterialInfo();
    }

    public function getSearched($name){
      return $this->dao->getSearched($name);
    }

    public function filterSearch($type, $order){
      return $this->dao->filterSearch($type, $order);
    }

    public function getColorLength(){
      return $this->dao->getColorLength();
    }
  }
?>
