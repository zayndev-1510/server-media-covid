<?php

namespace App\Http\Controllers\admin\page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Pagelogin extends Controller
{
    public function index(){
        return view("login");
    }

   
}
