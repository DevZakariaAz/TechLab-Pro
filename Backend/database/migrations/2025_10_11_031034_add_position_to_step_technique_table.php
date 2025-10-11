<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('step_technique', function (Blueprint $table) {
            $table->integer('position')->nullable()->after('technique_id');
        });
    }

    public function down()
    {
        Schema::table('step_technique', function (Blueprint $table) {
            $table->dropColumn('position');
        });
}
};
