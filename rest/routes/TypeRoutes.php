<?php

  Flight::route('GET /types', function(){
  Flight::json(Flight::typeService()->getAll());
  });

  Flight::route('GET /types/@id', function($id){
    Flight::json(Flight::typeService()->getById($id));
  });

  Flight::route('POST /types', function(){
    Flight::json(Flight::typeService()->add(Flight::request()->data->getData()));
  });

  Flight::route('PUT /types/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::typeService()->update($id, $data));
  });
  
  Flight::route('DELETE /types/@id', function($id){
    Flight::typeService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

?>
