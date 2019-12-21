@extends('layouts.index')

@section('content')

{{-- @php
    var_dump($users);
@endphp --}}

<form method="POST" action="/admin/change">
    
    {{-- <input type="hidden" name="_token" value="{{ csrf_token() }}" id='token'> --}}
    <div class="flexRow">@csrf</div>
    <div class="flexRow"><input type="number" name='id' id='id' value={{ $users->id }} hidden></div>
    <div class="flexRow">
        <label for="name" class="w33">Name <input type="text" name="name" id="name" value="{{ $users->name }}" readonly required></label>
        <label for="meil" class="w33">Email <input type="email" name="meil" id="meil" value="{{ $users->email }}" readonly required></label>
        <label for="role">
            <select name="role" id="role">
                <option value="0" @if ($users->role=='0')
                    {!! "selected" !!}
                @endif>Nista</option>
                <option value="1"@if ($users->role=='1')
                    {!! "selected" !!}
                @endif>Osoblje</option>
                <option value="2"@if ($users->role=='2')
                    {!! "selected" !!}
                @endif>Lekar</option>
            </select>
        </label>
        {{-- <label for="role" class="w33">Role    <input type="number" name="role" id="role" value="{{ $users->role }}" required></label> --}}
    </div>
    <div class="flexRow"><input type="submit" value="Promeni" id="dugme"></div>
</form>
@endsection