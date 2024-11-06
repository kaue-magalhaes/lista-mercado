<?php

namespace App\Http\Controllers\Item;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Item $item)
    {
        $item->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Item deleted successfully',
        ], Response::HTTP_OK);
    }
}
