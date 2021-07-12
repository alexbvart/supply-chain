
import DetailSideBar from '../../src/container/DetailSideBar';
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import {supply_chain} from './businnes.module.css'

const businessunit = ({businessunit,businessunits, supplychain}) => {

    console.log(supplychain);
    const regex = / /ig;
    const relationuu = supplychain.relation.map((relation)=>(
                    
        `${Object.values(relation)[0].name.replace(regex, '-')} --> ${Object.values(relation)[1].name.replace(regex, '-')}`
    ))

    const rela2= ["IMPLEMENTOS_PERU_S.A.C. --> EMPRESA_DE_TRANSPORTE_AVE_FENIX-S.A.C.", "KinedyneLLC --> IMPLEMENTOS-PERU-S.A.C."]

    console.log(relationuu);

    return ( 
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>

            <div className={`mermaid ${supply_chain}`}>
                {`
                    graph LR
                    
                    IMPORTACIONES-NAKAMINE-E.I.R.L. --> EMPRESA-DE-TRANSPORTES-AVE-FENIX-S.A.C.
                    IMPLEMENTOS-PERU-S.A.C. --> EMPRESA-DE-TRANSPORTES-AVE-FENIX-S.A.C.
                    MARCO-PERUANA-SA --> EMPRESA-DE-TRANSPORTES-AVE-FENIX-S.A.C.
                    SCANIA-SERVICES-DEL-PERU-S.A --> EMPRESA-DE-TRANSPORTES-AVE-FENIX-S.A.C.
                    MADIC-S.A.C. --> REPSOL-COMERCIAL-SAC
                    SERVICIOS-GENERALES-THERMO-KING-EMPRESA-INDIVIDUAL-DE-RESPONSABILIDAD-LIMITADA --> MARCO-PERUANA-SA
                    Kinedyne-LLC --> IMPLEMENTOS-PERU-S.A.C.
                    DISTRIBUCIONES-DIESEL-PERU-S.A.C. --> IMPORTACIONES-NAKAMINE-E.I.R.L

                    
                `}
            </div>
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
            businessunits:businessunits,
            businessunit: businessunit[0],
            supplychain: supplychain[0]
        }
    };



}