import React,{Component} from 'react';

export default class Visit_treatmant extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            sifra_bolesti:this.props.data.sifra_bolest,
            sifra_leka:this.props.data.sifra_lek,
            lek_prepisana_kol:this.props.data.lek_prepisana_kol,
            show_edit_treatment:false,
        }

        this.callLaravel=this.callLaravel.bind(this);
        this.izmeni=this.izmeni.bind(this);
        this.sb=React.createRef();
        this.sl=React.createRef();
        this.kl=React.createRef();
        this.setSB=this.setSB.bind(this);
        this.setSL=this.setSL.bind(this);
        this.setKL=this.setKL.bind(this);
        this.sendData=this.sendData.bind(this);
    }

    callLaravel()
    {
        this.props.callLaravel();
    }

    izmeni()
    {
        this.setState({show_edit_treatment:!this.state.show_edit_treatment});
    }

    setSB()
    {
        this.setState({sifra_bolesti:this.sb.current.value});
    }

    setSL()
    {
        this.setState({sifra_leka:this.sl.current.value});
    }

    setKL()
    {
        this.setState({lek_prepisana_kol:this.kl.current.value});
    }

    sendData()
    {
        let niz={
            id:this.props.id,
            sifra_bolesti:this.state.sifra_bolesti || this.props.data.sifra_bolest,
            sifra_leka:this.state.sifra_leka || this.props.data.sifra_lek,
            lek_prepisana_kol:this.state.lek_prepisana_kol || this.props.data.lek_prepisana_kol,
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
        
        fetch('/lekar/updateTreatmantReact',opcije)
            .then(resp=>resp.json())
            .then(txt=>
                {
                  alert(txt);  
                  this.izmeni();
                  this.callLaravel();
                }).catch(err => {
                    console.log(err);
                });;
    }

    render()
    {
        if(this.props.show_div && !this.state.show_edit_treatment)
        {
            return(
              <div className="r_treatmant">
                    <div className="flexRowES">
                        <div>Ime Bolesti: {this.props.data.name_bolest}</div>
                        <div>Ime Leka: {this.props.data.name_lek}</div>
                        <div>Kolicina: {this.props.data.lek_prepisana_kol}</div>
                        <button onClick={this.izmeni}>Edit</button>
                    </div>
                </div>  
            )   
        }

        if(this.props.show_div && this.state.show_edit_treatment)
        {
            return(
              <div className="r_treatmant">
                    <div className="flexRowES">
                        <label>
                            Sifra Bolesti: <input type="text" defaultValue={this.props.data.sifra_bolest} ref={this.sb} onChange={this.setSB}/>
                        </label>
                        <label>
                            Sifra Leka: <input type="text" defaultValue={this.props.data.sifra_lek} ref={this.sl} onChange={this.setSL}/>
                        </label>
                        <label>
                            Kolicina:
                            <input type="number" defaultValue={this.props.data.lek_prepisana_kol} ref={this.kl} onChange={this.setKL}/>
                        </label>
                        
                        <button onClick={this.izmeni}>Odustani</button>
                        <button onClick={this.sendData}>Posalji</button>
                    </div>
                </div>  
            )   
        }

        return(
            <div className="r_treatmant">
                <div className="flexRowES">
                    <div>Ime Bolesti: {this.props.data.name_bolest}</div>
                    <div>Lek: {this.props.data.name_lek}</div>
                    <div>Kolicina: {this.props.data.lek_prepisana_kol}</div>
                </div>
            </div>
        )
    }
}