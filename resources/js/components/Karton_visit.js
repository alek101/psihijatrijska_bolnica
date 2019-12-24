import React,{Component} from 'react';
import Visit_treatmant from './Visit_treatmant';

export default class Karton_visit extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            show_div:false,
            show_edit:false,
            dijagnoza:this.props.data.dijagnoza,
            terapija:this.props.data.terapija,
        }

        this.otkrijDetalje=this.otkrijDetalje.bind(this);
        this.izmeni=this.izmeni.bind(this);
        this.dijagnozaArea=React.createRef();
        this.setDijagnoza=this.setDijagnoza.bind(this);
        this.terapijaArea=React.createRef();
        this.setTerapija=this.setTerapija.bind(this);
        this.sendData=this.sendData.bind(this);
        this.callLaravel=this.callLaravel.bind(this);

    }

    otkrijDetalje()
    {
        this.setState({show_div:!this.state.show_div});
    }

    izmeni()
    {
        this.setState({show_edit:!this.state.show_edit});
    }

    setDijagnoza()
    {
        this.setState({dijagnoza:this.dijagnozaArea.current.value});
    }

    setTerapija()
    {
        this.setState({terapija:this.terapijaArea.current.value});
    }

    callLaravel()
    {
        this.props.callLaravel();
    }

    sendData()
    {
        let niz={
            prva_poseta:this.props.data.prva_poseta,
            tracers:this.props.id,
            dijagnoza:this.state.dijagnoza || this.props.data.dijagnoza,
            terapija:this.state.terapija || this.props.data.terapija,
            json:true, //da kazemo serveru da vrati json odogovor
        }

        let opcije={
            method: "POST",
            body: JSON.stringify(niz),
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                'Content-Type': 'application/json'   //BITNO!!!
            }
        }

        // console.log('niz',niz,'token', document.querySelector('input[name="_token"]').value);
        
        fetch('/lekar/updateVisit',opcije)
            .then(resp=>resp.json())
            .then(txt=>
                {
                  alert(txt);  
                  this.izmeni();
                  this.callLaravel();
                });
    }

    render()
    {
        let treatmants=this.props.data.lekovi.map(lek=><Visit_treatmant key={lek.ind_tracer} id={lek.ind_tracer} 
            data={lek} show_div={this.state.show_div} callLaravel={this.callLaravel}/>)

        if(this.state.show_div && !this.state.show_edit)
        {
            return(
                <div className="r_visit_screen">

                    <div className="oneVisit r_oneVisit" >
                        <div className="flexRowRight"><button onClick={this.otkrijDetalje}>X</button></div>
                        
                        <div className="flexRowES"> 
                            <div> Datum: {pf.dateToSerbianFormat(this.props.data.datum)} </div>
                            <div> Tip: {(this.props.data.prva_poseta)? "Prva poseta":"Kontrolna poseta"} </div>
                            <div> Lekar: {this.props.data.id_lekar} </div>
                        </div>
        
                        <div>
                            <h4 className="r_naslov">Dijagnoza: </h4>
                            {this.props.data.dijagnoza}
                        </div>
                        <div>
                            <h4 className="r_naslov">Terapija: </h4>
                            {this.props.data.terapija}
                        </div>
                        <button onClick={this.izmeni}>Edit</button>
                            {treatmants}
                    </div>
                    
                </div>
                
            )
        }
        if(this.state.show_div && this.state.show_edit)
        {
            return(
                <div className="r_visit_screen">
                    
                <div className="oneVisit r_oneVisit">
                    <div className="flexRowRight"><button onClick={this.otkrijDetalje}>X</button></div>
                    <div className="flexRowES"> 
                        <div> Datum: {pf.dateToSerbianFormat(this.props.data.datum)} </div>
                        <div> Tip: {(this.props.data.prva_poseta)? "Prva poseta":"Kontrolna poseta"} </div>
                        <div> Lekar: {this.props.data.id_lekar} </div>
                    </div>
    
                    <div>
                        
                        
                        <label>
                            Dijagnoza:
                            <textarea defaultValue={this.props.data.dijagnoza} ref={this.dijagnozaArea} onChange={this.setDijagnoza}/>
                        </label>
                    </div>
                    <div>
                        
                        <label>
                            Terapija:
                            <textarea defaultValue={this.props.data.terapija} ref={this.terapijaArea} onChange={this.setTerapija}/>
                        </label>
        
                    </div>
                    <button onClick={this.izmeni}>Odustani</button>
                    <button onClick={this.sendData}>Posalji</button>
                        {treatmants}
                </div>
            </div>
                
                
            )
        }
        return(
            <div className="r_visit" onClick={this.otkrijDetalje}>
                <div className="flexRow"> 
                    <div> Datum: {pf.dateToSerbianFormat(this.props.data.datum)} </div>
                    <div> Tip: {(this.props.data.prva_poseta)? "Prva poseta":"Kontrolna poseta"} </div>
                    <div> Lekar: {this.props.data.id_lekar} </div>
                </div>
   
                <div>
                    <span className="r_naslov">Dijagnoza: </span> {this.props.data.dijagnoza.slice(0,32)}
                    <span className="r_naslov">    Terapija: </span> {this.props.data.terapija.slice(0,32)}
                </div>
                    {treatmants}
            </div>
        )
    }
}