
import DetailSideBar from '../../src/container/DetailSideBar';
const supplier = ({supplier}) => {
    console.log(supplier);
    return ( 
        <>
            <DetailSideBar title="Suppliers" data={supplier}></DetailSideBar>

        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;
    const supplier = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/supplier/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            supplier: supplier,
        }
    };



}