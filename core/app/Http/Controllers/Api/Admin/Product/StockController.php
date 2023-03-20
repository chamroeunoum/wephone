<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\CrudController;
use App\Models\Product\Stock as RecordModel;

class StockController extends Controller
{
    private $selectFields = [
        'id',
        'product_id' ,
        'attribute_variant_id' ,
        'unit_id' ,
        'quantity'
    ];
    /**
     * Listing function
     */
    public function index(Request $request){
        /** Format from query string */
        $search = isset( $request->search ) && $request->serach !== "" ? $request->search : false ;
        $perPage = isset( $request->perPage ) && $request->perPage !== "" ? $request->perPage : 10 ;
        $page = isset( $request->page ) && $request->page !== "" ? $request->page : 1 ;

        $queryString = [
            // "where" => [
            //     'default' => [
            //         [
            //             'field' => 'type_id' ,
            //             'value' => $type === false ? "" : $type
            //         ]
            //     ],
            //     'in' => [] ,
            //     'not' => [] ,
            //     'like' => [
            //         [
            //             'field' => 'number' ,
            //             'value' => $number === false ? "" : $number
            //         ],
            //         [
            //             'field' => 'year' ,
            //             'value' => $date === false ? "" : $date
            //         ]
            //     ] ,
            // ] ,
            "pivots" => [
                $search ?
                [
                    "relationship" => 'product',
                    "where" => [
                        // "in" => [
                        //     "field" => "id",
                        //     "value" => [$request->unit]
                        // ],
                        // "not"=> [
                        //     [
                        //         "field" => 'fieldName' ,
                        //         "value"=> 'value'
                        //     ]
                        // ],
                        "like"=>  [
                            [
                                "field"=> 'description' ,
                                "value"=> $search
                            ],
                            [
                                "field"=> 'origin' ,
                                "value"=> $search
                            ]
                        ]
                    ]
                ]
                : []
            ],
            "pagination" => [
                'perPage' => $perPage,
                'page' => $page
            ],
            "search" => $search === false ? [] : [
                'value' => $search ,
                'fields' => [
                    'id'
                ]
            ],
            "order" => [
                'field' => 'id' ,
                'by' => 'desc'
            ],
        ];

        $request->merge( $queryString );

        $crud = new CrudController(new RecordModel(), $request, $this->selectFields );
        $crud->setRelationshipFunctions([
            'product' => ['id','description','origin'] ,
            'unit' => ['id','name'] ,
            'attributeVariant' => ['id','variants'] ,
        ]);
        $builder = $crud->getListBuilder();
        $responseData = $crud->pagination(true, $builder);
        $responseData['records'] = $responseData['records']->map(function($record){
            $record['attributeVariant']['variants'] = \App\Models\Product\Variant::select(['id','name','attribute_id'])->whereIn('id',$record['attributeVariant']['variants'])->get() ;
            return $record;
        });
        $responseData['message'] = __("crud.read.success");
        $responseData['ok'] = true ;
        return response()->json($responseData, 200);
    }
    /**
     * Create
     */
    public function create(Request $request){
        $record = RecordModel::where('product_id',$request->product_id)
        ->where('unit_id',$request->unit_id)->first() ;
        if( $record ){
            $record->attributeVariant;
            $record->unit;
            $record->product;
            return response([
                'record' => $record ,
                'variants' => !empty( $record->attributeVariant->variants ) ? \App\Models\Product\Variant::select(['id','name','attribute_id'])->whereIn('id', $record->attributeVariant->variants )->get() : [] ,
                'ok' => false ,
                'message' => 'ព័តមាន '.$record->name .' មានក្នុងប្រព័ន្ធរួចហើយ ។'
                ],403
            );
        }else{

            $attributeVariant = null ;
            if( isset( $request->variants ) && is_array( $request->variants ) && !empty( $request->variants ) ){
                $attributeVariant = \App\Models\Product\AttributeVariant::where( 'variants', $request->variants )->first();
                if( $attributeVariant === null ){
                    $attributeVariant = \App\Models\Product\AttributeVariant::create([ 'variants' => $request->variants ]);
                }
            }

            $record = new RecordModel(
                $request->except(['_token', '_method', 'current_tab', 'http_referrer'])
            );
            $record->save();

            /**
             * Record the quantity of product into stock transaction
             */
            \App\Models\Product\StockTransaction::create([
                'stock_id' => $stock->id ,
                'user_id' => \Auth::user()->id ,
                'quantity' => $request->quantity ,
                'transaction_type_id' => \App\Models\Product\StockTransactionType::where('name','stock_in')->first()->id
            ]);
            
            if( $attributeVariant !== null && $attributeVariant->id > 0 ){
                $record->attribute_variant_id = $attributeVariant->id ;
                $record->save();
            }

            if( $record ){
                return response()->json([
                    'record' => RecordModel::find( $record->id ) ,
                    'message' => 'បញ្ចូលព័ត៌មានថ្មីបានដោយជោគជ័យ !' ,
                    'ok' => true ,
                ], 200);

            }else {
                return response()->json([
                    'record' => null ,
                    'ok' => false ,
                    'message' => 'មានបញ្ហាក្នុងការបញ្ចូលព័ត៌មានថ្មី !'
                ], 403);
            }
        }
    }
    /**
     * Update
     */
    public function update(Request $request){
        $record = RecordModel::
        // where('product_id',$request->product_id)
        // ->where('unit_id',$request->unit_id)
        where('id',$request->id)->first() ;
        if( $record ){
            // Update stock
            $record->update([
                'product_id' => $request->product_id ,
                'unit_id' => $request->unit_id
            ]);

            $attributeVariant = null ;
            if( isset( $request->variants ) && is_array( $request->variants ) && !empty( $request->variants ) ){
                $attributeVariant = \App\Models\Product\AttributeVariant::where( 'variants', implode(',',$request->variants) )->first();
                if( $attributeVariant === null ){
                    $attributeVariant = \App\Models\Product\AttributeVariant::create([ 'variants' => implode(',',$request->variants) ]);
                }
            }
            
            if( $attributeVariant !== null && $attributeVariant->id > 0 ){
                $record->attribute_variant_id = $attributeVariant->id ;
                $record->save();
            }

            $record->attributeVariant ;
            $record->unit ;
            $record->product ;

            if( $record ){
                return response()->json([
                    'record' => $record ,
                    'variants' => \App\Models\Product\Variant::select(['id','name','attribute_id'])->whereIn('id', $record->attributeVariant->variants )->get() ,
                    'message' => 'កែប្រែព័ត៌មានរួចរាល់។' ,
                    'ok' => true ,
                ], 200);

            }else {
                return response()->json([
                    'record' => null ,
                    'ok' => false ,
                    'message' => 'មានបញ្ហាក្នុងការប្ដូរព័ត៌មាន។'
                ], 403);
            }
            
        }else{
            return response([
                'record' => null ,
                'ok' => false ,
                'message' => 'ព័តមាន មានក្នុងប្រព័ន្ធរួចហើយ ។'
                ],403
            );
        }
    }
    /***
     * Read
     */
    public function read($id)
    {
        $record = RecordModel::find($id);
        if ($record) {
            $record->product;
            $record->unit;
            $variants = [] ;
            if( $record->attribute_variant_id ){
                $variants = \App\Models\Product\Variant::select(['id','name'])->whereIn('id', \App\Models\Product\AttributeVariant::find( $record->attribute_variant_id )->variants )->get();
            }
            return response()->json([
                'record' => $record,
                'variants' => $variants ,
                'ok' => true ,
                'message' => 'អានទិន្ន័យបានជោគជ័យ !'
            ], 200);
        } else {
            return response()->json([
                'record' => null,
                'ok' => false ,
                'message' => 'មិនមានទិន្នន័យផ្ទៀងផ្ទាត់ ជាមួយលេខសម្គាល់ ដែលអ្នកផ្ដល់អោយឡើយ !'
            ], 403);
        }
    }
    /**
     * Function delete an account
     */
    public function delete($id){
        $record = RecordModel::find($id);
        if( $record ){
            $record->deleted_at = \Carbon\Carbon::now() ;
            $record->save();
            // record does exists
            return response([
                'record' => $record ,
                'ok' => true ,
                'message' => 'បានលុបដោយជោគជ័យ !' 
                ],
                200
            );
        }else{
            // record does not exists
            return response([
                'record' => null ,
                'ok' => false ,
                'message' => 'សូមទោស មិនមានព័ត៌មាននេះឡើយ។' ],
                403
            );
        }
    }
    /**
     * Function Restore an account from SoftDeletes
     */
    public function restore($id){
        if( $record = RecordModel::restore($id) ){
            return response([
                'record' => $record ,
                'ok' => true ,
                'message' => 'បានយកត្រឡប់មិវិញដោយជោគជ័យ !'
                ],200
            );
        }
        return response([
                'record' => null ,
                'ok' => false ,
                'message' => 'មិនមានព័ត៌មាននេះឡើយ។'
            ],403
        );
    }
    public function forFilter(Request $request)
    {
        $crud = new CrudController(new RecordModel(), $request, ['id', 'name']);
        $responseData['records'] = $crud->forFilter();
        $responseData['message'] = __("crud.read.success");
        return response()->json($responseData, 200);
    }
    public function compact(Request $request){
        /** Format from query string */
        $search = isset( $request->search ) && $request->serach !== "" ? $request->search : false ;
        $perPage = isset( $request->perPage ) && $request->perPage !== "" ? $request->perPage : 10 ;
        $page = isset( $request->page ) && $request->page !== "" ? $request->page : 1 ;

        $queryString = [
            // "where" => [
            //     'default' => [
            //         [
            //             'field' => 'type_id' ,
            //             'value' => $type === false ? "" : $type
            //         ]
            //     ],
            //     'in' => [] ,
            //     'not' => [] ,
            //     'like' => [
            //         [
            //             'field' => 'number' ,
            //             'value' => $number === false ? "" : $number
            //         ],
            //         [
            //             'field' => 'year' ,
            //             'value' => $date === false ? "" : $date
            //         ]
            //     ] ,
            // ] ,
            // "pivots" => [
            //     $unit ?
            //     [
            //         "relationship" => 'units',
            //         "where" => [
            //             "in" => [
            //                 "field" => "id",
            //                 "value" => [$request->unit]
            //             ],
            //         // "not"=> [
            //         //     [
            //         //         "field" => 'fieldName' ,
            //         //         "value"=> 'value'
            //         //     ]
            //         // ],
            //         // "like"=>  [
            //         //     [
            //         //        "field"=> 'fieldName' ,
            //         //        "value"=> 'value'
            //         //     ]
            //         // ]
            //         ]
            //     ]
            //     : []
            // ],
            "pagination" => [
                'perPage' => $perPage,
                'page' => $page
            ],
            "search" => $search === false ? [] : [
                'value' => $search ,
                'fields' => [
                    'name'
                ]
            ],
            "order" => [
                'field' => 'id' ,
                'by' => 'desc'
            ],
        ];

        $request->merge( $queryString );

        $crud = new CrudController(new RecordModel(), $request, ['id', 'name'] );
        $builder = $crud->getListBuilder()
        ->whereNull('deleted_at'); 

        $responseData['records'] = $builder->get();
        $responseData['message'] = __("crud.read.success");
        $responseData['ok'] = true ;
        return response()->json($responseData, 200);
    }
    /**
     * Stock in
     */
    public function stockIn(Request $request){
        if( $request->stock_id > 0 && $request->quantity > 0 ){
            $stock = RecordModel::find( $request->stock_id );
            if( $stock ){
                /**
                 * Record the quantity of product into stock transaction
                 */
                $stockTransaction = \App\Models\Product\StockTransaction::create([
                    'stock_id' => $stock->id ,
                    'user_id' => \Auth::user()->id ,
                    'quantity' => $request->quantity ,
                    'transaction_type_id' => \App\Models\Product\StockTransactionType::where('name','stock_in')->first()->id
                ]);

                /**
                 * Update the last quantity
                 */
                $stock->quantity += $request->quantity ;
                $stock->save();

                $stock->transactions = $stock->transactions()->get()->map(function($transaction){
                    $transaction->type;
                    return $transaction;
                });
                $stock->product;
                return response()->json([
                    'record' => $stock ,
                    'ok' => true ,
                    'message' => 'ដាក់បញ្ចូលចំនួនផលិតផលបានជោគជ័យ។'
                ],200);
            }else{
                return response()->json([
                    'record' => null ,
                    'ok' => false ,
                    'message' => 'សូមបញ្ជាក់អំពិលេខសម្គាល់ក្នុងឃ្លាំង។'
                ],403);
            }
        }else{
            return response()->json([
                'record' => null ,
                'ok' => false ,
                'message' => 'សូមបំពេញព័ត៌មានអោយបានគ្រប់គ្រាន់។'
            ],403);
        }
    }
    /**
     * Stock out
     */
    public function stockOut(Request $request){
        if( $request->stock_id > 0 && $request->quantity > 0 ){
            $stock = RecordModel::find( $request->stock_id );
            if( $stock ){
                /**
                 * Record the quantity of product into stock transaction
                 */
                $stockTransaction = \App\Models\Product\StockTransaction::create([
                    'stock_id' => $stock->id ,
                    'user_id' => \Auth::user()->id ,
                    'quantity' => $request->quantity ,
                    'transaction_type_id' => \App\Models\Product\StockTransactionType::where('name','stock_out')->first()->id
                ]);

                /**
                 * Update the last quantity
                 */
                $stock->quantity -= $request->quantity ;
                $stock->save();

                $stock->transactions;
                $stock->product;
                return response()->json([
                    'record' => $stock ,
                    'ok' => true ,
                    'message' => 'ដកចេញចំនួនផលិតផលបានជោគជ័យ។'
                ],200);
            }else{
                return response()->json([
                    'record' => null ,
                    'ok' => false ,
                    'message' => 'សូមបញ្ជាក់អំពិលេខសម្គាល់ក្នុងឃ្លាំង។'
                ],403);
            }
        }else{
            return response()->json([
                'record' => null ,
                'ok' => false ,
                'message' => 'សូមបំពេញព័ត៌មានអោយបានគ្រប់គ្រាន់។'
            ],403);
        }
    }
    /**
     * Stock Transactions
     */
    public function transactions(Request $request){
        /** Format from query string */
        $search = isset( $request->search ) && $request->serach !== "" ? $request->search : false ;
        $perPage = isset( $request->perPage ) && $request->perPage !== "" ? $request->perPage : 100 ;
        $page = isset( $request->page ) && $request->page !== "" ? $request->page : 1 ;

        $stock_id = isset( $request->stock_id ) && $request->stock_id !== "" ? $request->stock_id : false ;

        $queryString = [
            "where" => [
                'default' => [
                    [
                        'field' => 'stock_id' ,
                        'value' => $stock_id
                    ]
                ],
                // 'in' => [] ,
                // 'not' => [] ,
                // 'like' => [
                //     [
                //         'field' => 'number' ,
                //         'value' => $number === false ? "" : $number
                //     ],
                //     [
                //         'field' => 'year' ,
                //         'value' => $date === false ? "" : $date
                //     ]
                // ] ,
            ] ,
            // "pivots" => [
            //     $unit ?
            //     [
            //         "relationship" => 'units',
            //         "where" => [
            //             "in" => [
            //                 "field" => "id",
            //                 "value" => [$request->unit]
            //             ],
            //         // "not"=> [
            //         //     [
            //         //         "field" => 'fieldName' ,
            //         //         "value"=> 'value'
            //         //     ]
            //         // ],
            //         // "like"=>  [
            //         //     [
            //         //        "field"=> 'fieldName' ,
            //         //        "value"=> 'value'
            //         //     ]
            //         // ]
            //         ]
            //     ]
            //     : []
            // ],
            "pagination" => [
                'perPage' => $perPage,
                'page' => $page
            ],
            "search" => $search === false ? [] : [
                'value' => $search ,
                'fields' => [
                    'id'
                ]
            ],
            "order" => [
                'field' => 'created_at' ,
                'by' => 'desc'
            ],
        ];

        $request->merge( $queryString );

        $crud = new CrudController(new \App\Models\Product\StockTransaction(), $request, ['id','stock_id','quantity','user_id','transaction_type_id', 'created_at'] );
        $crud->setRelationshipFunctions([
            'stock' => ['id','product_id' ,'attribute_variant_id' ,'unit_id' ] ,
            'user' => ['firstname', 'lastname', 'email', 'phone', 'active' ] ,
            'type' => ['id','name','description'] ,
        ]);
        $builder = $crud->getListBuilder();
        $responseData = $crud->pagination(true, $builder);
        $responseData['records'] = $responseData['records']->map(function($record){
            $record['product'] = \App\Models\Product\Product::find( $record['stock']['product_id'] );
            $record['attributeVariant'] = \App\Models\Product\AttributeVariant::find( $record['stock']['attribute_variant_id'] );
            if( $record['attributeVariant'] ){
                $record['variants'] = \App\Models\Product\Variant::select(['id','name','attribute_id'])->whereIn('id', $record['attributeVariant']->variants )->get() ;
            }
            // $record['attributeVariant']['variants'] = \App\Models\Product\Variant::select(['id','name','attribute_id'])->whereIn('id',$record['attributeVariant']['variants'])->get() ;
            return $record;
        });
        $responseData['message'] = __("crud.read.success");
        $responseData['ok'] = true ;
        return response()->json($responseData, 200);
    }
}
