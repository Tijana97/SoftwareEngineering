<?php

  /**
 * @OA\Get(
 *      path="/colors/",
 *      tags={"colors"},
 *      summary="Returns all colors from the api. ",
 *      security = {{"ApiKeyAuth": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="List of colors"
 *      )
 * )
 */

  Flight::route('GET /colors', function(){
  Flight::json(Flight::colorService()->getAll());
  });

  /**
 * @OA\Get(path="/colors/{id}", tags={"colors"}, security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of color"),
 *     @OA\Response(response="200", description="Fetch individual color")
 * )
 */
  
  Flight::route('GET /colors/@id', function($id){
    Flight::json(Flight::colorService()->getById($id));
  });

  Flight::route('POST /colors', function(){
    Flight::json(Flight::colorService()->add(Flight::request()->data->getData()));
  });

  Flight::route('PUT /colors/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::colorService()->update($id, $data));
  });
  
  Flight::route('DELETE /colors/@id', function($id){
    Flight::colorService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

?>
