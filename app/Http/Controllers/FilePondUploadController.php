<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FilePondUploadController extends Controller
{
    public function store(Request $request) {
        if($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $folder = uniqid() . '-' . now()->timestamp;
            $file->storeAs('tmp-files/' . $folder, $filename);
            return $folder;
        }

        return '';
    }
}
