
import DetailSideBar from '../../../src/container/DetailSideBar';
import ProcessFlowDiagram from '../../../src/container/ProcessFlowDiagram';
import { TabGroup } from '@statikly/funk'
import Link from 'next/link'
import {
    main,
    tab_group,
    tab, tab_active,
    tab_panel,
    panel, panel_flex, panel_active, panel_inactive
} from '../../../styles/tab.module.css'

import ActivityTrackingDiagram from '../../../src/container/ActivityTrackingDiagram';
import ProcessCatigorization from '../../../src/container/ProcessCategorization'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import StrategicMap from '@components/StrategicMap';



const process = ({ process, processs, strategicmap, objectives, resolvedUrl, id }) => {

    return (
        <>
            {/* <DetailSideBar title="processs" data={processs}></DetailSideBar> */}
            <TabGroup numTabs={2} direction={TabGroup.direction.HORIZONTAL}>
                <div className={tab_group}>
                    <TabGroup.TabList>
                        <TabGroup.Tab
                            index={0}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Mapa estrategico
                        </TabGroup.Tab>
                        <TabGroup.Tab
                            index={1}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Ingreso de datos
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
                                <StrategicMap process={process} objectives={objectives} strategicmap={strategicmap}/>
                            </div>
                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel
                            index={1}
                            className={`${panel} ${panel_flex}`}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >

                        </TabGroup.TabPanel>
                    </section>
                </div>
            </TabGroup>
        </>
    );
}
export default process;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const SERVER_HOST_ = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const objectives = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/objective`)
        .then(res => res.json())
    const strategicmap = await fetch(`${SERVER_HOST_}/strategic-map?processId=${id}`).then((res) => res.json());

    const processs = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process/`)
        .then(res => res.json())
    const process = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process/?id=${id}`)
        .then(res => res.json())
    const processOrder = processs.sort(function (a, b) {
        if (a.priority > b.priority) {
            return -1;
        }
        if (a.priority < b.priority) {
            return 1;
        }
        return 0;
    });

    return {
        props: {
            processs: processOrder,
            process: process[0],
            id: id,
            strategicmap: strategicmap[0] || {},
            objectives:objectives
        }
    };



}