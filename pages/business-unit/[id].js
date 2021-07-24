


import DetailSideBar from '../../src/container/DetailSideBar';
import SupplyChain from '../../src/container/SupplyChain';



const businessunit = ({ businessunit, businessunits, supplychain }) => {


    return (
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>
            <SupplyChain supplychain={supplychain} />
        </>
    );
}
export default businessunit;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const businessunits = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit`)
        .then(res => res.json())

    const businessunit = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit/?id=${id}`)
        .then(res => res.json())

    const supplychain = await fetch(`${SERVER_HOST}/supply-chain?enterpriseId=${ENTERPRISE_ID}&business-unitId=${id}`)
        .then(res => res.json())

    return {
        props: {
            businessunits: businessunits,
            businessunit: businessunit[0],
            supplychain: supplychain[0]
        }
    };
}


