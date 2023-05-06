<?php

namespace App\Http\Controllers\plugin;

use App\Models\admin\Loker_M;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class uploadFiles extends Controller
{
    public function uploadVideo(Request $r)
    {
        $uploadPath = public_path('video/');

        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $file = $r->file('file');
        $explode = explode('.', $file->getClientOriginalName());
        $originalName = $explode[0];
        $extension = $file->getClientOriginalExtension();
        $rename = 'file_' . date('YmdHis') . '.' . $extension;
        $mime = $file->getClientMimeType();
        $filesize = $file->getSize();
        if ($file->move($uploadPath, $rename)) {
            return response()->json(
                [
                    'val' => 1,
                    'message' => "Upload image berhasil",
                    'data' => $rename
                ]
            );
        }

        return response()->json(
            [
                'val' => 0,
                'message' => "Upload gagal",
            ]
        );
    }



}
