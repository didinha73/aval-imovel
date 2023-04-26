import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import  Button from '@mui/material/Button';

import { app } from '../firebase'
import { getFirestore} from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

//conexao com o banco de dados
const db = getFirestore(app);

export default function Listar()
{

    const [imoveis, setImoveis] = useState([]);

    useEffect( function(){

        let ignore = false;

        async function carregar () 
        {
            const resultado = await getDocs(collection(db, "imoveis"));
            const novo = resultado.docs.map(function(item)
            {
                return item.data();
            });

            if( imoveis.length == 0 ){
                setImoveis(novo);
                console.log(resultado);
            }    
            
            
        }
     
        carregar();

        return () => {
            ignore = true
        }
    }, [imoveis]);

    return (
        
        <Grid container spacing={3}>
            <Grid item>
                <Button href="/imoveis/cadastro"  variant="contained">Cadastrar Imóvel</Button>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    //height: 240,
                  }}
                >
                  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data de Cadastro</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {imoveis.map(function (imo) {
                        return (

                            <TableRow key={imo.codigo}>
                                <TableCell>{imo.codigo}</TableCell>
                                <TableCell>{imo.endereco}</TableCell>
                                <TableCell>{ imo.valor_avaliado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) }</TableCell>
                                <TableCell>{ imo.data_cadastro.toDate().toLocaleString() }</TableCell>
                            </TableRow>
                        )
                        })
                    }
                    </TableBody>
                  </Table>
                </Paper>
            </Grid>
        </Grid>
    )
}