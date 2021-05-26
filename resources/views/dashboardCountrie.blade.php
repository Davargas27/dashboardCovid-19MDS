@extends ('layouts.home')
@section ('styleLanding')
       <!-- personalizados -->
@endsection

@section ('contentLanding')
    <div class="content">
        {{-- Div donde se llama al archivo  ComponenteCountrie.js y se identifica copn un id --}}
        <div id="componenteCountrie" data="{{ $name }}" ></div>
    </div>
@endsection

@section('scriptLanding')
    <!-- personalizados -->
@endsection
