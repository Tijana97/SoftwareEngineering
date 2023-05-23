<?php

  Flight::route('GET /brands', function(){
  Flight::json(Flight::brandService()->getAll());
  });

  Flight::route('GET /brands/@id', function($id){
    Flight::json(Flight::brandService()->getById($id));
  });

  Flight::route('POST /brands', function(){
    Flight::json(Flight::brandService()->add(Flight::request()->data->getData()));
  });

  Flight::route('PUT /brands/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::brandService()->update($id, $data));
  });
  
  Flight::route('DELETE /brands/@id', function($id){
    Flight::brandService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

?>
