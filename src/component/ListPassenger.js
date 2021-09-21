import ListItem from './ListItem';
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import LoadingSvg from "./LoadingSvg"
import { useState } from "react"


const GetData = gql`
    query MyQuery {
    anggota {
    id
    jenis_kelamin
    nama
    umur
    }
}
`
const GetDataByUserId = gql `
    query MyQuery($id: Int!) {
    anggota(where: {id: {_eq: $id}}) {
        nama
        umur
        jenis_kelamin
        id
    }
    }
`;

const ListPassenger = props => {
        const [getData,{data, loading, error}] = useLazyQuery(GetDataByUserId) //salah memasukkan query
        const [dataId,setDataId] = useState(0);

        if(loading){
            return <LoadingSvg/>
        }

        if (error){
            console.log(error)
            return null
        }

        const onGetData = () => {
            console.log("masuk = ", dataId);
            getData({variables : {
                id : dataId
            }})
            // getDatanya belum di masukkan query dan vairabel
            // this.setState(data?.anggota);
        }

        const onChangeDataId = (e) =>{
            if(e.target){
                setDataId(e.target.value)
            }
        }
    
    return (
        <div>
            <input value={dataId} onChange={onChangeDataId}/>
            <button onClick={onGetData}>Get Data</button>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={props.hapusPengunjung}
                    />
                ))}
            </table>
        </div>
    )
  }

export default ListPassenger;
