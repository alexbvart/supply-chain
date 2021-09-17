
import DetailSideBar from '../../src/container/DetailSideBar';

import { TabGroup } from '@statikly/funk'
import {
    main,
    tab_group,
    tab, tab_active,
    tab_panel,
    panel, panel_flex, panel_active, panel_inactive
} from '@styles/tab.module.css'
import EnterpriseInfo from '../../src/container/EnterpriseInfo/EnterpriseInfo';
import ControlPanel from 'src/container/ControlPanel';
const supplier = ({ indicators, indicator, process }) => {

    return (
        <>
            {/* <DetailSideBar title="Indicators" data={indicators}></DetailSideBar> */}
            <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                <div className={tab_group}>
                    <TabGroup.TabList>
                        <TabGroup.Tab
                            index={0}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Tablero de comandos
                        </TabGroup.Tab>
                        <TabGroup.Tab
                            index={1}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Ver datafuente
                        </TabGroup.Tab>
                    </TabGroup.TabList>

                    <section className={tab_panel}>
                        <h2 className="title_section">{process.name}</h2>

                        <TabGroup.TabPanel
                            index={0}
                            className={panel}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <div className="main-full">
                            <ControlPanel indicator={indicator} />
                            </div>
                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel
                            index={2}
                            className={panel}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <div className="main-full">

                            </div>
                        </TabGroup.TabPanel>
                    </section>
                </div>
            </TabGroup>
        </>
    );
}
export default supplier;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const indicators = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicator`)
        .then(res => res.json())
    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
        .then(res => res.json())
    const indicator = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/indicator/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            indicators: indicators,
            process: process,
            indicator:indicator[0],
        }
    };




}