<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\ClientController;
use App\Http\Controllers\Api\Admin\PeopleController;
use App\Http\Controllers\Api\Admin\LoanController;
use App\Http\Controllers\Api\Admin\LoanTransactionController;

Route::group([
    'prefix' => 'admin' ,
    'api'
  ],function(){

    /** SIGNING SECTION */
    Route::group([
        'prefix' => 'authentication'
    ], function () {
        Route::post('login', [AuthController::class,'login']);
        Route::group([
        'middleware' => 'auth:api'
        ], function() {
            Route::post('logout', [AuthController::class,'logout']);
            Route::get('user', [AuthController::class,'user']);
            Route::put('password/change',[UserController::class,'changePasswordOfAuthenticatedUser']);
        });
    });

    /** USER/ACCOUNT SECTION */
    Route::group([
        'prefix' => 'users' ,
        'namespace' => 'Api' ,
        'middleware' => 'auth:api'
        ], function() {
            Route::get('',[UserController::class,'index']);
            Route::post('create',[UserController::class,'store']);
            Route::put('update',[UserController::class,'update']);
            Route::get('{id}/read',[UserController::class,'read']);
            Route::delete('{id}/delete',[UserController::class,'destroy']);
            Route::put('{id}/activate',[UserController::class,'active']);
            Route::put('password/change',[UserController::class,'passwordChange']);
            Route::get('compact',[ClientController::class,'compact']);
            /**
             * Check the unique user information
             */
            Route::get('username/exist',[UserController::class,'checkUsername']);
            Route::get('phone/exist',[UserController::class,'checkPhone']);
            Route::get('email/exist',[UserController::class,'checkEmail']);

    });

    /** USER/ACCOUNT SECTION */
    Route::group([
        'prefix' => 'clients' ,
        'namespace' => 'Api' ,
        'middleware' => 'auth:api'
        ], function() {
            Route::get('',[ClientController::class,'index']);
            Route::post('create',[ClientController::class,'store']);
            Route::put('update',[ClientController::class,'update']);
            Route::get('{id}/read',[ClientController::class,'read']);
            Route::delete('{id}/delete',[ClientController::class,'destroy']);
            Route::put('{id}/activate',[ClientController::class,'active']);
            Route::put('password/change',[ClientController::class,'passwordChange']);
            Route::get('compact',[ClientController::class,'compact']);
            /**
             * Check the unique user information
             */
            Route::get('username/exist',[ClientController::class,'checkUsername']);
            Route::get('phone/exist',[ClientController::class,'checkPhone']);
            Route::get('email/exist',[ClientController::class,'checkEmail']);
    });

    /** PROFILE SECTION */
    // Route::group([
    //     'prefix' => 'profile',
    //     'namespace' => 'Api' ,
    //     'middleware' => 'auth:api'
    // ], function() {
    //     Route::get('/getAuthUser',
    //                 'ProfileController@getAuthUser');
    //     Route::put('/updateAuthUser',
    //                 'ProfileController@updateAuthUser');
    //     Route::put('/updateAuthUserPassword',
    //                 'ProfileController@updateAuthUserPassword');
    //     Route::post('/picture/upload','ProfileController@upload');
    // });

    /** LOAN SECTION */
    Route::group([
        'prefix' => 'loans',
    ], function () {

        Route::get('', [LoanController::class,'index']);
        Route::post('create', [LoanController::class,'create']);
        Route::put('update', [LoanController::class,'update']);
        Route::get('{id}/read', [LoanController::class,'read']);
        Route::delete('{id}/delete', [LoanController::class,'delete']);

        Route::post('repayment', [LoanController::class,'repayment']);
        Route::post('addmoreloan', [LoanController::class,'addmoreloan']);
        Route::get('transactions', [LoanController::class,'getTransactions']);
        Route::get('schedule', [LoanController::class,'getSchedule']);

        Route::post('import', [LoanController::class,'importAccounts']);
        Route::post('importtransactions', [LoanController::class,'importTransactions']);

        /**
         * Transactions
         */
        Route::group([
            'prefix' => 'transactions'
        ], function () {
            Route::put('update', [LoanTransactionController::class,'update']);
            Route::get('{id}/read', [LoanTransactionController::class,'read']);
            Route::delete('{id}/delete', [LoanTransactionController::class,'delete']);
        });

        /**
         * Dashboard 
         */
        // Total balances, principles, interests, owned interests of all loans
        Route::get('total_b_p_i_w', function(Request $request){
            return response()->json([
                'balance' => \App\Models\Loan::getTotalBalances() ,
                // Total principle of all loans
                'principle' => \App\Models\Loan::getTotalPrinciples() ,
                // total interest of all loans
                'interest' => \App\Models\Loan::getTotalInterests() ,
                // Total owned interest of all loans
                'owned_interest' => \App\Models\Loan::getTotalOwnedInterests() ,
                'ok' => true ,
                'message' => 'តួលេខសរុបនៃទឹកប្រាក់កម្ចី។'
            ], 200 );
        });
        
    });
     /** LOAN SECTION */
    Route::group([
        'prefix' => 'people',
    ], function () {

        Route::get('', [PeopleController::class,'index']);
        Route::post('create', [PeopleController::class,'create']);
        Route::put('update', [PeopleController::class,'update']);
        Route::get('{id}/read', [PeopleController::class,'read']);
        Route::put('{id}/delete', [PeopleController::class,'delete']);
        Route::get('compact', [PeopleController::class,'compact']);
    });
});
