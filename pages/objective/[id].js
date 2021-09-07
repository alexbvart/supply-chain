
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
const supplier = ({indicators,objectives,process}) => {

    return ( 
        <>

        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/objectives`)
    .then(res => res.json())
    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())
    const indicators = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicators`)
    .then(res => res.json())

    return {
        props: {
            objectives: objectives,
            process: process,
            indicators:indicators,
        }
    };




}