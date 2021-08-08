import React, { useState } from 'react';
import UploadedFilesLog from '../../components/UploadedFilesLog';
import UploadFile from '../../components/UploadFile';
import {
    wrapper,
    container
} from '../ProcessCategorization/styles.module.css'
import {
    tab_group,
    tab, tab_active,
    tab_panel,
    panel, panel_flex, panel_active, panel_inactive
} from '../../../styles/tab.module.css'
import { nav } from './flowDragram.module.css'
import { TabGroup } from '@statikly/funk'
import ProcessCatigorization from '../ProcessCategorization';

const ProcessFlowDiagram = ({processId}) => {
    return (
        <>
            <h3 className="subtitle_section">Diagrama de flujo de procesos</h3>

            <TabGroup numTabs={2} direction={TabGroup.direction.HORIZONTAL}>
                <div className={tab_group}>
                    <nav className={nav}>
                        <TabGroup.TabList>
                            <TabGroup.Tab
                                index={0}
                                className={tab}
                                activeClassName={tab_active}
                                inactiveClassName=""
                            >
                                Current diagram
                            </TabGroup.Tab>
                            <TabGroup.Tab
                                index={1}
                                className={tab}
                                activeClassName={tab_active}
                                inactiveClassName=""
                            >
                                Redesigned diagram
                            </TabGroup.Tab>
                        </TabGroup.TabList>
                    </nav>

                    <section className={tab_panel}>
                        <h2 className="subtitle_section">{process.name}</h2>
                        <TabGroup.TabPanel
                            index={0}
                            className={`${panel} ${panel_flex}`}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <h3 className="subtitle_section">Current diagram</h3>
                            <div className={wrapper}>
                                <div className={container}>
                                    <UploadFile
                                        key={`FlowCurrent${processId}`}
                                        process={processId}
                                        types="610e55aee91a3d5a64e81057"
                                        status="610e55aee91a3d5a64e81049"
                                    />
                                    <UploadedFilesLog 
                                        key={`ListFlowCurrent${processId}`}
                                        process={processId}
                                        types="610e55aee91a3d5a64e81057"
                                        status="610e55aee91a3d5a64e81049"
                                    />
                                </div>
                            </div>

                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel
                            index={1}
                            className={panel}
                            activeClassName={panel_active}
                            inactiveClassName={panel_inactive}
                        >
                            <div className="main-full">
                                <h3 className="subtitle_section">Redesigned diagram</h3>
                                <div className={wrapper}>
                                    <div className={container}>
                                        <UploadFile 
                                            key={`FlowRedesing${processId}`}
                                            process={processId}
                                            types="610e55aee91a3d5a64e81057"
                                            status="610e55aee91a3d5a64e8104a"
                                        />
                                        <UploadedFilesLog 
                                            key={`FlowRedesing${processId}`}
                                            process={processId}
                                            types="610e55aee91a3d5a64e81057"
                                            status="610e55aee91a3d5a64e8104a"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabGroup.TabPanel>

                    </section>

                </div>
            </TabGroup>
        </>
    );
}
export default ProcessFlowDiagram;