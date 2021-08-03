
import DetailSideBar from '../../src/container/DetailSideBar';
import ProcessFlowDiagram from '../../src/container/ProcessFlowDiagram';
import { TabGroup } from '@statikly/funk'
import {tab_group,
    tab,tab_active,
    tab_panel,
    panel,panel_flex,panel_active,panel_inactive} from '../../styles/tab.module.css'
import ProcessCatigorization from '../../src/container/ProcessCategorization';

const process = ({process,processs}) => {

    return ( 
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
            <div className={tab_group}>
                <TabGroup.TabList>
                    <TabGroup.Tab
                        index={0}
                        className={tab}
                        activeClassName={tab_active}
                        inactiveClassName=""
                    >
                        Caracterización de procesos
                    </TabGroup.Tab>
                    <TabGroup.Tab
                        index={1}
                        className={tab}
                        activeClassName={tab_active}
                        inactiveClassName=""
                    >
                        Diagrama de flujo de procesos
                    </TabGroup.Tab>
                    <TabGroup.Tab
                        index={2}
                        className={tab}
                        activeClassName={tab_active}
                        inactiveClassName=""
                    >
                        Diagrama de seguimiento de actividades
                    </TabGroup.Tab>
                </TabGroup.TabList>

                <section className={tab_panel}>
                <h2 className="title_section">{process.name}</h2>
                <TabGroup.TabPanel
                    index={0}
                    className={`${panel} ${panel_flex}`}
                    activeClassName={panel_active}
                    inactiveClassName={panel_inactive}
                >
                    
                    <ProcessCatigorization />
                    
                </TabGroup.TabPanel>
                <TabGroup.TabPanel
                    index={1}
                    className={panel}
                    activeClassName={panel_active}
                    inactiveClassName={panel_inactive}
                >
                    <div className="main-full">
                    { <ProcessFlowDiagram />}
                    </div>
                </TabGroup.TabPanel>
                <TabGroup.TabPanel
                    index={2}
                    className={panel}
                    activeClassName={panel_active}
                    inactiveClassName={panel_inactive}
                >
                    <div className="main-full">
                    Diagrama de seguimiento de actividades
                    </div>
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
    const SERVER_HOST = "http://localhost:3001";
    const ENTERPRISE_ID = 2;

    const processs = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process`)
    .then(res => res.json())
    

    const process = await fetch(`${SERVER_HOST}/enterprise/${ENTERPRISE_ID}/process/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            processs:processs,
            process: process[0],
        }
    };



}