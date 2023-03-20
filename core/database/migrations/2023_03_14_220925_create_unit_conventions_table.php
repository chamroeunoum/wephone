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
        Schema::create('unit_conventions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->nullable(false)->comment('The id of the product');
            $table->integer('bunit_id')->nullable(false)->comment('The id of the unit');
            $table->integer('sunit_id')->nullable(false)->comment('The id of the unit');
            $table->integer('gaps')->nullable(false)->comment('The number of times differentiate bunit_id and sunit_id');
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
        Schema::dropIfExists('unit_conventions');
    }
};
