<?php
require_once __DIR__.'/../Config.class.php';

class BaseDao{

  protected $conn;
  private static $pdoInstance = null;
  private $tableName;

  //CONSTRUCTOR
  public function __construct($tableName){
    $this->tableName=$tableName;
    $this->conn = self::getPDO();
    // set the PDO error mode to exception
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  private static function getPDO() {
    if (!isset(self::$pdoInstance)) {
      $servername = Config::DB_HOST();
      $username = Config::DB_USERNAME();
      $password = Config::DB_PASSWORD();
      $schema = Config::DB_SCHEME();
      $port = Config::DB_PORT();
      self::$pdoInstance = new PDO("mysql:host=$servername;port=$port;dbname=$schema", $username, $password);
    }
    return self::$pdoInstance;
  }
  
  //GET ALL
  public function getAll(){
    $stmt = $this->conn->prepare("SELECT * FROM ".$this->tableName);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  //GET BY ID
  public function getById($id){
    $stmt = $this->conn->prepare("SELECT * FROM ".$this->tableName." WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }
  //DELETE 
  public function delete($id){
    $stmt = $this->conn->prepare("DELETE FROM ".$this->tableName." WHERE id=:id");
    $stmt->bindParam(':id', $id); 
    $stmt->execute();
  }
  //ADD
  public function add($entity){
    $query = "INSERT INTO ".$this->tableName." (";
    foreach ($entity as $column => $value) {
      $query .= $column.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ") VALUES (";
    foreach ($entity as $column => $value) {
      $query .= ":".$column.", ";
    }
    $query = substr($query, 0, -2);
    $query .= ")";

    $stmt= $this->conn->prepare($query);
    $stmt->execute($entity); // sql injection prevention
    $entity['id'] = $this->conn->lastInsertId();
    return $entity;
  }
  //UPDATE
  public function update($id, $entity, $idColumn = "id"){
    $query = "UPDATE ".$this->tableName." SET ";
    foreach($entity as $name => $value){
      $query .= $name ."= :". $name. ", ";
    }
    $query = substr($query, 0, -2);
    $query .= " WHERE {$idColumn} = :id";

    $stmt= $this->conn->prepare($query);
    $entity['id'] = $id;
    $stmt->execute($entity);
  }

  protected function query($query, $params){
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  protected function queryUnique($query, $params){
    $results = $this->query($query, $params);
    return reset($results);
  }
}
?>
