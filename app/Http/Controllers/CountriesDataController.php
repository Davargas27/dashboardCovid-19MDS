<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CountriesDataController extends Controller
{
    public function index($name){

        /* funcion para enviar variables a la pagina de graficas por pais  */
        return view('dashboardCountrie',compact('name'));
    }
}
