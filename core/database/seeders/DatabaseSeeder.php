<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        
        /**
         * Create admin user for development purpose
         */
        $chamroeunoum = \App\Models\User::create([
            'firstname' => 'Chamroeun' ,
            'lastname' => 'OUM' ,
            'email' => 'chamroeunoum@gmail.com' ,
            'active' => 1 ,
            'password' => bcrypt('1234567890+1') ,
            'phone' => '012557200' ,
            'username' => 'chamroeunoum'
        ]);
        
        $people = \App\Models\People::create([
            'firstname' => $chamroeunoum->firstname , 
            'lastname' => $chamroeunoum->lastname , 
            'gender' => 0 , // Male
            'dob' => \Carbon\Carbon::parse('1984-03-18 9:00') ,
            'mobile_phone' => $chamroeunoum->phone , 
            'email' => $chamroeunoum->email , 
            'member_since' => \Carbon\Carbon::today()->format('Y-m-d H:i:s')
        ]);
        $chamroeunoum->people_id = $people->id ;
        $chamroeunoum->save();
        $people->selfAssignCode();

        /**
         * Create admin user for development purpose
         */
        $sophannithchea = \App\Models\User::create([
            'firstname' => 'Sophanith' ,
            'lastname' => 'CHEA' ,
            'email' => 'chea.sophannith@gmail.com' ,
            'active' => 1 ,
            'password' => bcrypt('081828182') ,
            'phone' => '081828182' ,
            'username' => 'sophannithchea'
        ]);
        
        $people = \App\Models\People::create([
            'firstname' => $sophannithchea->firstname , 
            'lastname' => $sophannithchea->lastname , 
            'gender' => 0 , // Male
            'dob' => \Carbon\Carbon::parse('1987-02-21 9:00') ,
            'mobile_phone' => $sophannithchea->phone , 
            'email' => $sophannithchea->email , 
            'member_since' => \Carbon\Carbon::today()->format('Y-m-d H:i:s')
        ]);
        $sophannithchea->people_id = $people->id ;
        $sophannithchea->save();
        $people->selfAssignCode();

        /**
         * Create role for the user
         */
        $super = \App\Models\Role::create(['name' => 'Super Administrator', 'guard_name' => 'api' , 'tag' => 'core_service']);
        $administrator = \App\Models\Role::create(['name' => 'Administrator', 'guard_name' => 'api' , 'tag' => 'core_service']);
        $backendMember = \App\Models\Role::create(['name' => 'Backend member', 'guard_name' => 'api' , 'tag' => 'core_service']);
        $client = \App\Models\Role::create(['name' => 'Client', 'guard_name' => 'api' , 'tag' => 'webapp']);

        /**
         * Permissions
         */
        /**
         * Loan permissions for admin
         */
        $loanPermissions = [] ;
        $loanPermissions['list'] = \App\Models\Permission::create(['name' => 'list loans', 'guard_name' => 'api']);
        $loanPermissions['create'] = \App\Models\Permission::create(['name' => 'create loan', 'guard_name' => 'api']);
        $loanPermissions['update'] = \App\Models\Permission::create(['name' => 'update loan', 'guard_name' => 'api']);
        $loanPermissions['delete'] = \App\Models\Permission::create(['name' => 'delete loan', 'guard_name' => 'api']);

        $userPermissions = [] ;
        $userPermissions['list'] = \App\Models\Permission::create(['name' => 'list users', 'guard_name' => 'api']);
        $userPermissions['create'] = \App\Models\Permission::create(['name' => 'create user', 'guard_name' => 'api']);
        $userPermissions['update'] = \App\Models\Permission::create(['name' => 'update user', 'guard_name' => 'api']);
        $userPermissions['delete'] = \App\Models\Permission::create(['name' => 'delete user', 'guard_name' => 'api']);
    
        $chamroeunoum->assignRole( $super );
        $sophannithchea->assignRole( $super );

        $this->call(TransactionTypesTableSeeder::class);
    }
}
