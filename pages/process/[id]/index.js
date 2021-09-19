
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
import Form from '@components/RegisterForm/Form';
import { Input, Select, SelectKeyValue, TextArea } from '@components/InputForm/Input';
import Footer from '@components/Footer/Footer';
import post from '@module/post'


const process = ({ process, processs, strategicmap, objectives, resolvedUrl, id, responsible, supplier, indicator }) => {
    const onSubmit = async (data) => {
        console.log({data})
        const res = await post({ "src": "sourcedataindicator", "data": data })
        console.log({res})
    }
    const supplierNames = supplier.map((p) => p.COMPANY_NAME)
    const indicatorKeyValue = indicator.map((i) => {
        const onei = { key: i.id, value: i.name }
        return onei
    }
    )
    console.log({ indicatorKeyValue })
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
                                <StrategicMap process={process} objectives={objectives} strategicmap={strategicmap} />
                            </div>
                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel
                            index={1}
                            className={`${panel} ${panel_flex}`}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <div className="main-full">

                                <Form onSubmit={onSubmit} title="Ingresa registros para este proceso">
                                    <SelectKeyValue name="indicatorId" label="Indicador" span="3" options={indicatorKeyValue} />
                                    <Select name="responsible" span="3" options={responsible} label="Responsable"/>
                                    <Select name="supplier" span="3" label="Cliente" options={supplierNames} />
                                    <Input name="date" span="1.5" type="date" label="Fecha de registro" />
                                    <SelectKeyValue name="status" span="1.5" options={[{key:true,value:"Fundado"},{key:false,value:"Infundado"}]} />
                                    <Footer />
                                </Form>
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
    const responsible = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/responsible`)
        .then(res => res.json())
    const supplier = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/supplier`)
        .then(res => res.json())
    const indicator = await fetch(`${SERVER_HOST_}/enterprise/${ENTERPRISE_ID}/indicator`)
        .then(res => res.json())

    return {
        props: {
            processs: processOrder,
            process: process[0],
            id: id,
            strategicmap: strategicmap[0] || {},
            objectives: objectives,
            responsible: responsible,
            supplier: supplier,
            indicator: indicator
        }
    };



}