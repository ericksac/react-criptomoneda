import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';

import Error from './Error';
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color:#FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }

`

const Formulario = ({ guardarMoneda , guardarCriptoMoneda}) => {


    //Listado de criptomonedas del API
    const [listadocripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);


    const Monedas = [
        {codigo:'USD', nombre:'Dólar estadounidense'},
        {codigo:'MXN', nombre:'Peso mexicano'},
        {codigo:'EUR', nombre:'Euro'},
        {codigo:'GBP', nombre:'Libra esterlina'},
        {codigo:'GTQ', nombre:'Quezal'},
    ];

    //Utilizar useMoneda
    const[moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', Monedas);

    //Utilizar cirptomoneda
    const [criptoMoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listadocripto);

    //Llamar a la API
    useEffect (()=> {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
          
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Cuando se hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();

        //validar moneda
        if(moneda ==='' || criptoMoneda ===''){
            guardarError(true);
            return;
        }

        //pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptoMoneda);

    }


    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' />: null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario
