import ListItem from './ListItem';
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import LoadingSvg from "./LoadingSvg"
import PassengerInput from './PassengerInput';

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
        const [getData,{data, loading, error}] = useLazyQuery(GetData)
        const [dataId,setDataId] = useState(0);

        if(loading){
            return <LoadingSvg/>
        }

        if (error){
            console.log(error)
            return null
        }

        const onGetData = () => {
            getData();
            this.setState(data?.anggota);
        }
    
    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <button onClick={onGetData}>Get Data</button>
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