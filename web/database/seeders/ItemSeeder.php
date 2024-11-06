<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::query()->create([
            'name' => 'Maçã',
            'user_id' => 1,
        ]);

        Item::query()->create([
            'name' => 'Lapis',
            'user_id' => 1,
        ]);

        Item::query()->create([
            'name' => 'Caneta',
            'user_id' => 1,
        ]);
    }
}
