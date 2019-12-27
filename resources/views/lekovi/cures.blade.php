@extends('layouts.index')

@section('content')
<link rel="stylesheet" href="{{ url('/css/osobljeStyle.css') }}">
        @php
            // var_dump($cures);
        @endphp
        @auth
            <div class="margin_20">
                
                <div class="bolestiNaslov">
                    <h1>Spisak medikamenata</h1>
                </div>

                <label for="filter">
                    <input type="text" id="filter" class='filter' style="background-image: url('/images/search.png')" placeholder="Pretraži...">
                </label>
            </div>
        @endauth
        @if (Auth::user()->role==1)
        <th>Izmeni</th>
        <!-- <th>Obrisi</th> -->
        @endif
    </tr>

    @foreach ($cures as $cure)
    <tr>
        <td>{{ $cure->sifra_lek }}</td>
        <td>{{ $cure->ime_lek }}</td>
        <td>{{ $cure->kolicina_lek }}</td>
        @if (Auth::user()->role==1)
        <td><button class='linkDugme' data-link='/lekovi/edit/{{ $cure->id }}'>Izmeni</button></td>
        <!-- <td><button class='obrisi' data-link='/lekovi/destroy/{{ $cure->id }}'>Obrisi</button></td> -->
        @endif
    </tr>
    @endforeach
</table>
@endsection