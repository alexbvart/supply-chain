
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
const customer = ({customer,customers}) => {

    return ( 
        <>
            <DetailSideBar title="Customers" data={customers}></DetailSideBar>
            <EnterpriseInfo 
                address={customer.ADDRESS} 
                name={customer.COMPANY_NAME||customer.FULL_NAME} 
                phone={customer.TELEPHONE} 
                ruc={customer.RUC}
                dni={customer.DNI} 
                salesman={customer.LEGAL_REPRESENTATIVE}
                />

        </>
    );
}
export default customer;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const customers = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/customer`)
    .then(res => res.json())
    

    const customer = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/customer/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            customers:customers,
            customer: customer[0],
        }
    };



}