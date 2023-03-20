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
        Schema::create('stocks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->nullable(false)->comment('The id of the product');
            $table->integer('attribute_variant_id')->nullable(true)->comment('The id of the attribute and variants.');
            $table->integer('unit_id')->nullable(false)->comment('The id of the unit');
            $table->integer('quantity')->nullable(false)->comment('The number of the product in stock');
            $table->string('location',191)->nullable(true)->comment('The name or id of the location of the stock located.');
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
        Schema::dropIfExists('stocks');
    }
};
