<?php
  /**
 * @OA\Get(
 *      path="/material/",
 *      tags={"material"},
 *      summary="Returns all materials from the api. ",
 *      security = {{"ApiKeyAuth": {}}},
 *      @OA\Response(
 *          response=200,
 *          description="List of materials"
 *      )
 * )
 */

  Flight::route('GET /material', function(){
  Flight::json(Flight::materialService()->getAllMaterialInfo());
  });

  Flight::route('GET /material/individual/@id', function($id){
    Flight::json(Flight::materialService()->getIndividualData($id));
  });

  Flight::route('GET /search/@name', function($name){
  Flight::json(Flight::materialService()->getSearched($name));
  });

  Flight::route('GET /filter/@type/@order', function($type, $order){
  Flight::json(Flight::materialService()->filterSearch($type, $order));
  });

  Flight::route('GET /length', function(){
  Flight::json(Flight::materialService()->getColorLength());
  });

  /**
 * @OA\Get(path="/material/{id}", tags={"material"}, security={{"ApiKeyAuth": {}}},
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of material"),
 *     @OA\Response(response="200", description="Fetch individual material")
 * )
 */
  Flight::route('GET /material/@id', function($id){
    Flight::json(Flight::materialService()->getByColorRoute($id));
  });

  Flight::route('GET /material/@id/colors', function($id){
    Flight::json(Flight::colorService()->getMaterialByColorId($id));
  });

  /**
  * @OA\Post(
  *     path="/material",
  *     description="Add material",
  *     tags={"material"},
  *     security = {{"ApiKeyAuth": {}}},
  *   @OA\RequestBody(description="Add material", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *    				 @OA\Property(property="brand_id", type="[string]", example="3",	description="ID of Brand name" ),
  *    				 @OA\Property(property="type_id", type="[string]", example="1",	description="ID of Type name" ),
  *            @OA\Property(property="color_id", type="[string]", example="2",	description="ID of Color name" ),
  *            @OA\Property(property="Available", type="[string]", example="YES",	description="Check if available" ),
  *            @OA\Property(property="Length", type="[string]", example="69",	description="Length of material" ),
  *          )
  *       )),
  *     @OA\Response(
  *         response=200,
  *         description="Material added",
  *
  *     ),
  *     @OA\Response(
  *         response=404,
  *         description="unauthorized",
  *     )
  * )
  */
//  *     security={{"ApiKeyAuth": {}},
  Flight::route('POST /material', function(){
    Flight::json(Flight::materialService()->add(Flight::request()->data->getData()));
  });

  Flight::route('PUT /material/@id', function($id){
    $data = Flight::request()->data->getData();
    Flight::json(Flight::materialService()->update($id, $data));
  });

  /**
  *   @OA\Delete(
  *     path="/material/{id}", security={{"ApiKeyAuth": {}}},
  *     description="Hard delete material",
  *     tags={"material"},
  *     @OA\Parameter(in="path", name="id", example=1, description="Id of material"),
  *     @OA\Response(
  *         response=200,
  *         description="Material deleted"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error, may indicate JWT abuse"
  *     )
  * )
  */

  Flight::route('DELETE /material/@id', function($id){
    Flight::materialService()->delete($id);
    Flight::json(["message" => "deleted"]);
  });

?>
