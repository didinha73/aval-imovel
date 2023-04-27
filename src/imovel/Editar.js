import { app } from '../firebase'
import { getFirestore, setDoc} from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";
import { Form, useLoaderData } from "react-router-dom"
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import Chip from '@mui/material/Chip';


//conexao com o banco de dados
const db = getFirestore(app);

export async function carregaDados(req)
{
    const id = req.params.id;
    const ref = doc(db, "imoveis", id);
    const registro = await getDoc(ref);

    if (registro.exists()) {
        let dados = registro.data();
        dados.id = registro.id;
        return dados;
    } else {
        return { erro: "Imóvel não existe!" };
    }

    return id;
}

export default function Editar()
{
    const valor = useLoaderData();
    //console.log(valor);

    const [carregando, setCarregando] = useState(false);
    const [novoImovel, setNovoImovel] = useState(valor);

    function alteraImovel(evento)
    {
        let campo = evento.target.name;
        let valor = evento.target.value;

        novoImovel[campo] = valor;

        setNovoImovel(novoImovel);

        console.log(novoImovel);
    }

    async function salvar()
    {
        setCarregando(true);

        const novo = doc(db, "imoveis", novoImovel.id);
        await setDoc(novo, novoImovel);
        //console.log("salvando");
        setCarregando(false);
        window.location.pathname = "/imoveis";
    }

    const geoloc = (valor.geoloc) ? valor.geoloc.latitude + ',' + valor.geoloc.longitude: "";

    let extras = "";
    if( valor.extras )

    {
        extras = valor.extras.map((item) => {
            return (
                <Chip
                label={item}
                />

            )
        })

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
                    //onSubmit={cadastrar}
                >
                
                    <TextField defaultValue={valor.codigo} onChange={alteraImovel} label="Código" margin="normal" name="codigo" />
                    <TextField defaultValue={valor.endereco} onChange={alteraImovel} label="Endereço" margin="normal" name="endereco" />
                    <TextField defaultValue={valor.descricao} onChange={alteraImovel} label="Descrição" multiline rows={4} margin="normal" name="descricao" />
                    <TextField defaultValue={valor.quartos} onChange={alteraImovel} label="Quartos" margin="normal" name="quartos" />
                    <TextField defaultValue={valor.tipo} onChange={alteraImovel} label="Tipo" margin="normal" select  name="tipo">
                        <MenuItem value="AP">Apartamento</MenuItem>
                        <MenuItem value="CS">Casa</MenuItem>
                        <MenuItem value="SB">Sobrado</MenuItem>
                        <MenuItem value="LJ">Loja</MenuItem>
                        <MenuItem value="SC">Sala Comercial</MenuItem>
                    </TextField>
                    <TextField defaultValue={valor.valor_avaliado} onChange={alteraImovel} label="Valor" margin="normal" name="valor_avaliado" />
                    <TextField defaultValue={geoloc} onChange={alteraImovel} label="Geo Localização" margin="normal" name="geoloc" />
                    <TextField defaultValue={valor.extras} onChange={alteraImovel} label="Extras" margin="normal" name="extras" />
                    { extras }

                    {
                        (carregando==true)?
                        <Button disabled variant="contained" >Enviando...</Button> :
                        <Button onClick={salvar} type="submit" variant="contained" >Confirmar</Button>
                    }
                    
                </Box>
                </Paper>
            </Grid>
        </Grid>

    )
}