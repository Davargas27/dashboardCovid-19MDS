<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Dashboard General</title>
        <!-- Styles -->
        <link href="{{asset('css/style.css')}}" rel="stylesheet" type="text/css" />
        @yield('styleLanding')
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @yield('contentLanding')
        </div>
    </body>
</html>

<script src="{{ asset('js/app.js') }}" ></script>
@yield('scriptLanding')
