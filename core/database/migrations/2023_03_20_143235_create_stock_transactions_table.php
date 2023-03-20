<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('stock_id')->nullable(false)->comment('Id of stock which represent of the unique product with it features.');
            $table->integer('quantity')->nullable(false)->comment('The number of product take out or take in or defeat.');
            $table->integer('user_id')->nullable(false)->comment('The user that act for this transaction.');
            $table->integer('transaction_type_id')->nullable(false)->comment('The type of the stock transaction.');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_transactions');
    }
};
