<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilePondUploadController extends Controller
{
    public function storeTempImg(Request $request) {   
        // required. {No image file was uploaded. Please select an image to upload.}
        if(!$request->hasFile('image')) abort(499) ; 
 
        $file = $request->file('image');
        $mimeType = $file->getMimeType();

        $allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/gif',
            'image/svg+xml',
        ];

        // mimes:jpeg,png,jpg,gif,svg. {Only jpg, jpeg, png, gif, svg are allowed.}
        if (!in_array($mimeType, $allowedMimes)) { abort(498); }

        // max:2MB {Image file is too large. Maximum allowed size is 10MB.}
        if($request->file('image')->getSize() > 10 * 1024 * 1024){ abort(497); }
        
        // store file in tmp-files folder
        $filename = $file->getClientOriginalName();
        $folder = uniqid() . '-' . now()->subDay()->timestamp;
        $file->storeAs('public/tmp-files/property-images/' . $folder, $filename, ['disk' => 'r2']);
        return $folder;
    }
}
