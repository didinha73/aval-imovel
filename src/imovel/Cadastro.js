import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef } from "react";
import { app } from '../firebase'
import { getFirestore} from 'firebase/firestore'

import { doc, setDoc, collection } from "firebase/firestore";

import { getStorage } from "firebase/storage";

//conexao com o banco de dados
const db = getFirestore(app);

const storage = getStorage(app);

export default function Cadastro()
{
    const [carregando, setCarregando] = useState(false);
    const [novoImovel, setNovoImovel] = useState({});

    const inputUpload = useRef();

    async function cadastrar(evento)
    {
        evento.preventDefault();
        setCarregando(true);

        const novo = doc(collection(db, "imoveis"));

        novoImovel.data_cadastro = new Date();
        novoImovel.valor_avaliado = parseFloat(novoImovel.valor_avaliado);

        //console.log(evento.target);

        const resultado = await setDoc(novo, novoImovel);
        console.log(resultado);

        setCarregando(false);

        window.location.pathname = "/imoveis";
    }

    function alteraImovel(evento)
    {
        let campo = evento.target.name;
        let valor = evento.target.value;
        novoImovel[campo] = valor;
        setNovoImovel(novoImovel);

        console.log(novoImovel);
    }

    function upload()
    {

    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper 
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    //height: 240,
                  }}>
                <Box component="form"
                    sx={{'& > :not(style)': { m: 1, width: '100%' }}}
                    onSubmit={cadastrar}
                >
                
                    <TextField onChange={alteraImovel} label="Código" margin="normal" name="codigo" />
                    <TextField onChange={alteraImovel} label="Endereço" margin="normal" name="endereco" />
                    <TextField onChange={alteraImovel} label="Descrição" multiline rows={4} margin="normal" name="descricao" />
                    <TextField onChange={alteraImovel} label="Quartos" margin="normal" name="quartos" />
                    <TextField onChange={alteraImovel} label="Tipo" margin="normal" select  name="tipo">
                        <MenuItem value="AP">Apartamento</MenuItem>
                        <MenuItem value="CS">Casa</MenuItem>
                        <MenuItem value="SB">Sobrado</MenuItem>
                        <MenuItem value="LJ">Loja</MenuItem>
                        <MenuItem value="SC">Sala Comercial</MenuItem>
                    </TextField>
                    <TextField onChange={alteraImovel} label="Valor" margin="normal" name="valor_avaliado" />
                    <TextField onChange={alteraImovel} label="Geo Localização" margin="normal" name="geoloc" />
                    <TextField onChange={alteraImovel} label="Extras" margin="normal" name="extras" />
                    <TextField ref={inputUpload} type="file" label="Foto"></TextField>
                    <Button onClick={upload} >UPload</Button>

                    {
                        (carregando==true)?
                        <Button disabled variant="contained" >Enviando...</Button> :
                        <Button type="submit" variant="contained" >Confirmar</Button>
                    }
                    
                </Box>
                </Paper>
            </Grid>
        </Grid>

    )
}