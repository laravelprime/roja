<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilePondUploadController extends Controller
{
    public function store(Request $request) {
        // required
        if(!$request->hasFile('image')) abort(499) ;

        // mimes:jpeg,png,jpg,gif,svg
        $file = $request->file('image');
        $mimeType = $file->getMimeType();

        $allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/gif',
            'image/svg+xml',
        ];

        if (!in_array($mimeType, $allowedMimes)) { abort(498); }

        // max:2MB
        if($request->file('image')->getSize() > 2 * 1024 * 1024){ abort(497); }
        
        // store file in tmp-files folder
        $filename = $file->getClientOriginalName();
        $folder = uniqid() . '-' . now()->timestamp;
        $file->storeAs('tmp-files/' . $folder, $filename);
        return $folder;

        
        // if($request->hasFile('image')) {
        //     $file = $request->file('image');
        //     $filename = $file->getClientOriginalName();
        //     $folder = uniqid() . '-' . now()->timestamp;
        //     $file->storeAs('tmp-files/' . $folder, $filename);
        //     return $folder;
        // }

        // return '';
    }
}
