<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  require_once __DIR__.'/../vendor/autoload.php';
  require_once __DIR__.'/services/MaterialService.class.php';
  require_once __DIR__.'/services/ColorService.class.php';
  require_once __DIR__.'/services/TypeService.class.php';
  require_once __DIR__.'/services/BrandService.class.php';
  require_once __DIR__.'/services/AdminService.class.php';
  require_once __DIR__.'/dao/AdminDao.class.php';
  require_once __DIR__.'/dao/TypeDao.class.php';
  require_once __DIR__.'/dao/BrandDao.class.php';
  require_once __DIR__.'/routes/ColorRoutes.php';
  require_once __DIR__.'/routes/MaterialRoutes.php';
  require_once __DIR__.'/routes/AdminRoutes.php';
  require_once __DIR__.'/routes/TypeRoutes.php';
  require_once __DIR__.'/routes/BrandRoutes.php';

  Flight::register('adminDao', 'AdminDao');
  Flight::register('brandDao', 'BrandDao');
  Flight::register('materialService', 'MaterialService');
  Flight::register('colorService', 'ColorService');
  Flight::register('adminService', 'AdminService');
  Flight::register('typeService', 'TypeService');
  Flight::register('brandService', 'BrandService');

  //MIDDLEWARE
  Flight::route('/*', function(){
    //perform JWT decode
    $path = Flight::request()->url;

    if ($path == '/login' || $path == '/docs.json') return TRUE; // exclude login route from middleware

    $headers = getallheaders();
    if (@!$headers['Authorization']){
      Flight::json(["message" => "Authorization missing!"], 403);
      return FALSE;
    }else{
      try {
        $decoded = (array)JWT::decode($headers['Authorization'], new Key(Config::JWT_SECRET(), 'HS256'));
        Flight::set('user', $decoded);
        return TRUE;
      } catch (\Exception $e) {
        Flight::json(["message" => "Authorization token is not valid"], 403);
        return FALSE;
      }
    }
  });

  Flight::route('GET /docs.json',function(){
    $openapi = \OpenApi\scan(['routes']);
    header('Content-Type: application/json');
    echo $openapi->toJson();
});

  Flight::start();
?>
