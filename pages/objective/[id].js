
import Table from '@components/Table';

const ObjetiveID = ({objectives}) => {
    const orderedRow = {
        "id": <Link href={`/objectives/${objectives.id}`}><a>{objectives.id}</a></Link>,
        "process": objectives.process,
        "name": objectives.name,
        "description": objectives.description
    }
    const heading = ["# ", "Procesos", "Objetivo ", "Descripción"]

    return ( 
        <>
            <Table
                tableData={[orderedRow]}
                headingColumns={heading}
                title="Objetivo"
            />
        </>
    );
}
export default ObjetiveID;

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