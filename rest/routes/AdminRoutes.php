<?php
  require_once __DIR__.'/../Config.class.php';
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

/**
* @OA\Post(
*     path="/login",
*     description="Login to the system",
*     tags={"login"},
*   @OA\RequestBody(description="Basic admin info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				 @OA\Property(property="email", type="[string]", example="kenan.lokvancic@stu.ibu.edu.ba",	description="Email" ),
*    				 @OA\Property(property="password", type="[string]", example="1234",	description="Password" )
*
*          )
*       )),
*     @OA\Response(
*         response=200,
*         description="JWT Token on successful response",
*
*     ),
*     @OA\Response(
*         response=403,
*         description="unauthorized",
*     )
* )
*/

  Flight::route('POST /login', function(){
    $login=Flight::request()->data->getData();
    
    $admin=Flight::adminService()->getAdminByEmail($login['email']);

    if(isset($admin['id'])){
      if($admin['password']==md5($login['password'])){
        unset($admin['password']);
        $jwt = JWT::encode($admin, Config::JWT_SECRET(), 'HS256');
        Flight::json(['token'=>$jwt]);
      }else {
        Flight::json(["message"=>"Incorrect password"],403);
      }
    }else{
      Flight::json(["message"=>"Admin doesn't exist"],403);
    }
  });

?>
