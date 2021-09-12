
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



const process = ({ process, processs,resolvedUrl,id }) => {


    /* const router = useRouter()

    useEffect(() => {
        if(true){
            router.replace(`http://localhost:3000/process/${id}/tracking`)
        }
    }, []) */
/* console.log({process}); */
    return (
        <>
            <DetailSideBar title="processs" data={processs}></DetailSideBar>
            {/* <div className={main}>

                    <Link href={`http://localhost:3000/process/${id}/tracking`}><a>Activity tracking diagram</a></Link>
                    <Link href={`http://localhost:3000/process/${id}/characterization`}><a>Process characterization</a></Link>
                    <Link href={`http://localhost:3000/process/${id}/flow`}><a>Flowchart</a></Link>
            <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                <div className={tab_group}>
                    <TabGroup.TabList>
                    <TabGroup.Tab
                            index={0}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Diagrama de seguimiento de actividades
                        </TabGroup.Tab>
                        <TabGroup.Tab
                            index={1}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Caracterización de procesos
                        </TabGroup.Tab>
                        <TabGroup.Tab
                            index={2}
                            className={tab}
                            activeClassName={tab_active}
                            inactiveClassName=""
                        >
                            Diagrama de flujo de procesos
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

                                {<ActivityTrackingDiagram processId={process.id} />}
                            </div>
                        </TabGroup.TabPanel>

                        <TabGroup.TabPanel
                            index={2}
                            className={panel}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <div className="main-full">

                                <ProcessFlowDiagram processId={process.id} />
                            </div>
                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel
                            index={1}
                            className={`${panel} ${panel_flex}`}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >

                            <ProcessCatigorization processId={process.id} />

                        </TabGroup.TabPanel>

 
                    </section>

                </div>
            </TabGroup> 
            </div>*/}

        </>
    );
}
export default process;

export async function getServerSideProps(context) {
    const { params } = context;
    const { resolvedUrl } = context;
    const { id } = params;
    const SERVER_HOST = "http://localhost:5000";
    const SERVER_HOST_ = "http://localhost:3001";
    const ENTERPRISE_ID = 2;
console.log({context});

    const processs = await fetch(`${SERVER_HOST}/data`)
        .then(res => res.json())
    const processOrder = processs.process.sort(function (a, b) {
        if (a.priority > b.priority) {
            return -1;
        }
        if (a.priority < b.priority) {
            return 1;
        }
        return 0;
    });
    /*    
       const process = processs.process.filter((p)=> p._id === id)
       console.log(process) 
        
       const processs = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process`)
           .then(res => res.json())
       */

    const process = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/process/?id=${id}`)
        .then(res => res.json())

    return {
        props: {
            processs: processOrder,
            process: process[0],
            resolvedUrl:resolvedUrl,
            id:id,
        }
    };



}