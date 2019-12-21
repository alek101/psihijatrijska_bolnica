@extends('layouts.index')

@section('content')

<button class='linkDugme' data-link='/lekar/chart/{{ $id_pacijent }}'>Nazad</button>

<div class="vueFormaVisit">
        <div class="disapear">
            hidden div <br>
            <div>@csrf</div>
           Pacijent: <label for="pacijent"><input type="text" id="pacijent" value='{{ $id_pacijent }}' v-model='pacijent_id'></label>
           Lekar: <label for="lekar"><input type="text" id="lekar" value='{{ $id_lekar }}' v-model='lekar_id'></label>
        </div>

        
        
        
        <div class="donje">
            <label for="tipPosete">
                <select name="tip_pos" id="tipPosete" v-model='tip_pos'>
                    <option value="1">Prva Poseta</option>
                    <option value="0">Kontrolna Poseta</option>
                </select>
            </label>
            <label for="dijagnoza">Dijagnoza <br><textarea id="dijagnoza" cols="30" rows="10" v-model='dijagnoza'></textarea></label><br>
            <label for="terapija">Terapija <br><textarea id="terapija" cols="30" rows="10" v-model='terapija'></textarea></label><br>

            <div class="parentUpis">
                        <div v-for='red in redovi'>
                            <unos :zadnji=red @unetoemit='uneto'></unos>
                
                </div>
            </div>

            <button class="submit" @click='submit'>Posalji u bazu</button>
        </div>

        <div  v-show="errors.length>0">
            <p v-for="error in errors">@{{ error }}</p>
        </div>

        <div v-show="odgovor!=null">@{{ odgovor }}</div>
</div>

<script src="{{ asset('/js/vueVisit.js') }}" defer></script>

@endsection