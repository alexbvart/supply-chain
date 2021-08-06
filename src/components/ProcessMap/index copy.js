import React, { useEffect, useRef, useState } from 'react';
import PlainText from '../../../Hooks/PlainText';
import ReactToPrint from 'react-to-print';
import Mermaid from '../Mermeid';
import processS from './process.module.css'
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';


function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    })
            });

    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle',
                { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },  // some room around the text
                new go.Binding('text').makeTwoWay()
            )
        );

    return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
    /* alert('GoJS model changed!'); */
}





const ProcessMap = ({ processmap }) => {

    console.log(processmap);
    const [process, setProcess] = useState(processmap)
    useEffect(() => {
        setProcess(processmap)
    }, [processmap])

    const strategicRef = useRef(null)
    const primaryRef = useRef(null)
    const supporttRef = useRef(null)

    const strategicPlainText = PlainText(process.strategic)
    const primaryPlainText = PlainText(process.primary)
    const supportPlainText = PlainText(process.support)

    const [stategicPT, setStategicPT] = useState(strategicPlainText)
    const [primaryPT, setPrimaryPT] = useState(primaryPlainText)
    const [supportPT, setsupportPT] = useState(supportPlainText)
    useEffect(() => {
        setStategicPT(PlainText(process.strategic))
        setPrimaryPT(PlainText(process.primary))
        setsupportPT(PlainText(process.support))
    }, [stategicPT, primaryPT, supportPT])


    return (
        <>
            <h1>Process map </h1>
            <ReactToPrint
                trigger={() => <button ><p> Export</p></button>}
                content={() => strategicRef.current}
            />
            <section className={processS.process}>

                <div className={processS.first_col}><h2>Requerimiento del Cliente</h2> </div>
                <div className={processS.process_item}>Procesos de gestion
                <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 2 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 3, to: 0 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                </div>
                <div className={processS.process_item}>Procesos productivos
                    {/* <Mermaid 
                        chart={
                    `graph TB 
                        ${primaryPT}`
                    } ref={primaryRef}
                    className={processS.svg_auto}
                    /> */}
                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 2 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 3, to: 0 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                </div>
                <div className={processS.process_item}>¨Procesos de apoyo
                    <ReactDiagram
                        initDiagram={initDiagram}
                        divClassName={processS.process_item}
                        nodeDataArray={[
                            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                        ]}
                        linkDataArray={[
                            { key: -1, from: 0, to: 1 },
                            { key: -2, from: 0, to: 2 },
                            { key: -3, from: 1, to: 1 },
                            { key: -4, from: 2, to: 3 },
                            { key: -5, from: 3, to: 0 }
                        ]}
                        onModelChange={handleModelChange}
                    />
                    </div>
                <div className={processS.third_col}> <h2>Staisfaccion del Cliente</h2> </div>
            </section>
        </>
    );
}
export default ProcessMap;