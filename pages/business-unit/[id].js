import DetailSideBar from '../../src/container/DetailSideBar';
import SupplyChain from '../../src/container/SupplyChain';
import { TabGroup } from '@statikly/funk';
import {
	tab_group,
	tab,
	tab_active,
	tab_panel,
	panel,
	panel_flex,
	panel_active,
	panel_inactive,
} from '../../styles/tab.module.css';
import ProcessMap from '../../src/components/ProcessMap';

const businessunit = ({
	businessunits,
	supplychain,
	processmap,
}) => {

    return (
        <>
            <DetailSideBar title="Business units" data={businessunits}></DetailSideBar>
            
            <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
            <div className={tab_group}>
                <TabGroup.TabList>
                    <TabGroup.Tab
                        index={0}
                        className={tab}
                        activeClassName={tab_active}
                        inactiveClassName=""
                    >
                        Cadena de Suministro
                    </TabGroup.Tab>
                    <TabGroup.Tab
                        index={1}
                        className={tab}
                        activeClassName={tab_active}
                        inactiveClassName=""
                    >
                        Mapa de procesos
                    </TabGroup.Tab>
                </TabGroup.TabList>

					<section className={tab_panel}>

                <TabGroup.TabPanel
                    index={0}
                    className={panel}
                    activeClassName={panel_active}
                    inactiveClassName={panel_inactive}
                >
                    <div className="main">
                    {supplychain&&
                        <>
                            <h1>Supply chain</h1>
                            <SupplyChain supplychain={supplychain} />
                        </>
                    }
                    </div>
                </TabGroup.TabPanel>

                <TabGroup.TabPanel
                    index={1}
                    className={`${panel} ${panel_flex}`}
                    activeClassName={panel_active}
                    inactiveClassName={panel_inactive}
                >
                    <div className="main">
                    {processmap &&
                        <ProcessMap  processmap={processmap}/>
                    }
                    </div>
                </TabGroup.TabPanel>
                </section>

                </div>
            </TabGroup>
        
        </>
    );
}
export default businessunit;

export async function getServerSideProps(context) {
	const { params } = context;
	const { id } = params;
	const SERVER_HOST = 'http://localhost:3001';
	const ENTERPRISE_ID = 2;

	const businessunits = await fetch(
		`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit`
	).then((res) => res.json());

	const businessunit = await fetch(
		`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/business-unit/?id=${id}`
	).then((res) => res.json());

	const supplychain = await fetch(
		`${SERVER_HOST}/supply-chain?enterpriseId=${ENTERPRISE_ID}&business-unitId=${id}`
	).then((res) => res.json());

	const processmap = await fetch(
		`${SERVER_HOST}/process-map?enterpriseId=${ENTERPRISE_ID}&business-unitId=${id}`
	).then((res) => res.json());

    return {
        props: {
            businessunits: businessunits,
            businessunit: businessunit[0],
            supplychain: supplychain[0]||null,
            processmap: processmap[0]||null
        }
    };
}
