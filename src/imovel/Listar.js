import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import  Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { app } from '../firebase'
import { getFirestore} from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";

import { useEffect, useState } from 'react';

import Confirmar from './Confirmar';

//conexao com o banco de dados
const db = getFirestore(app);

export default function Listar()
{

    const [imoveis, setImoveis] = useState([]);
    const [dialogo, setDialogo] = useState(false);
    const [confirmar, setConfirmar] = useState();
    const [idSelecionado, setIdSelecionado] = useState();

    async function carregar () 
    {
        const resultado = await getDocs(collection(db, "imoveis"));
        const novo = resultado.docs.map(function(item)
        {
            let retorno = item.data();
            retorno.id = item.id;
            return retorno;
        });

        if( imoveis.length == 0 ){
            setImoveis(novo);
            console.log(resultado);
        }    
        
        
    }

    useEffect( function(){

        let ignore = false;

        carregar();

        return () => {
            ignore = true
        }
    }, [imoveis]);

    function deletar(id)
    {
        setIdSelecionado(id);
        setConfirmar(null);
        setDialogo(true);
        
    }

    async function removerFirebase(id)
    {
        await deleteDoc(doc(db, "imoveis", id));
        setImoveis([]);
        setConfirmar(null);
        carregar();
    }

    if(confirmar == true)
    {
        removerFirebase(idSelecionado);
        console.log(idSelecionado);
    }

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
                <Confirmar
                    abrir={dialogo}
                    texto="Deseja realmente deletar este imóvel?"
                    modificador={setDialogo}
                    retorno={setConfirmar}
                />
                  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data de Cadastro</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {imoveis.map(function (imo) {
                        return (

                            <TableRow key={imo.id}>
                                <TableCell>{imo.codigo}</TableCell>
                                <TableCell>{imo.endereco}</TableCell>
                                <TableCell>{ imo.valor_avaliado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) }</TableCell>
                                <TableCell>{ imo.data_cadastro.toDate().toLocaleString() }</TableCell>
                                <TableCell>
                                    <IconButton onClick={ () => {deletar(imo.id)} }><DeleteIcon /> </IconButton>
                                    <IconButton href='/imoveis/editar/'> <EditIcon /> </IconButton>
                                </TableCell>
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